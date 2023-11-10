import express from "express";
import { createUser, loginUser } from "../handlers/user";
import { body } from "express-validator";
import { handleInputErrors } from "../util/middleware";

const router = express.Router();

router.post(
  "/user",
  body("username").isString(),
  body("email").isEmail(),
  body("password").isString(),
  handleInputErrors,
  createUser
);

router.post(
  "/login",
  body("username").isString(),
  body("password").isString(),
  handleInputErrors,
  loginUser
);

export { router };
