import { check } from "express-validator";

export const loginValidator = [
  check("email", "Email is required").isEmail(),
  check("password", "Password must have at least 6 characters").isLength({
    min: 6,
  }),
];
