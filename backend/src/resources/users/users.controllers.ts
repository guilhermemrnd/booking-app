import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";

import * as services from "./users.services";
import { UserType } from "../../models/user";

const ONE_DAY = 24 * 60 * 60 * 1000;

export const registerUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array() });
  }

  try {
    const user = await services.registerUser(req.body as UserType);

    if (!user) return res.status(400).json({ message: "User already exists" });

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET_KEY as string,
      { expiresIn: "1d" }
    );

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: ONE_DAY,
    });

    return res.status(200).send({ message: "User registered OK" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};
