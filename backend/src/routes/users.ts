import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";

import User from "../models/user";

const router = express.Router();

const ONE_DAY = 24 * 60 * 60 * 1000;

router.post(
  "/register",
  [
    check("firstName", "First name is required").isString(),
    check("lastName", "Last name is required").isString(),
    check("email", "Email is required").isString(),
    check("password", "Password must have at least 6 characters").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) return res.status(400).json({ message: "User already exists" });

      user = new User(req.body);
      await user.save();

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

      return res.status(200).send({ message: "User registered OK" })
    } catch (err) {
      console.log(err);
      res.status(500).send({ message: "Something went wrong" });
    }
  }
);

export default router;