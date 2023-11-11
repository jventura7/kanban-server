import bcrypt from "bcrypt";
import { Response, NextFunction } from "express";
import { AuthenticatedRequest } from "./types";

const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = (password: string, hashPassword: string) => {
  return bcrypt.compare(password, hashPassword);
};

const protect = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.session.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export { hashPassword, comparePassword, protect };
