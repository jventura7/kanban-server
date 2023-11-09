import express from "express";
import { createUser } from "../handlers/user";
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

export default router;
