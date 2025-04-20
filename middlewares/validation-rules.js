import { body } from "express-validator";

export const validateCredentials = [
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
  body("email")
    .isEmail()
    .withMessage("Email must be a valid email address")
    .matches(/@gmail\.com$/)
    .withMessage("Email must be a valid @gmail.com address"),

  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
];

export const validateLoginCredentials = [
  body("email")
    .isLength({ min: 3 })
    .withMessage("Email must be at least 3 characters long"),
  body("password")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
];
