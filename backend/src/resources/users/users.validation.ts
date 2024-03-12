import { check } from "express-validator";

export const registerUserValidator = [
  check("firstName", "First name is required").isString(),
  check("lastName", "Last name is required").isString(),
  check("email", "Email is required").isString(),
  check("password", "Password must have at least 6 characters").isLength({
    min: 6,
  }),
];
