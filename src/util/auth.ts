import bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "./types";

const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hash(password, salt);
};

const comparePassword = (password: string, hashPassword: string) => {
  return bcrypt.compare(password, hashPassword);
};

const createJWT = (username: string) => {
  const token = jwt.sign(
    { username, expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 },
    process.env.JWT_SECRET as string
  );
  return token;
};

const verifyJWT = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string);
};

const protect = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ message: "No authorization header" });
  }
  const [bearer, token] = req.headers.authorization.split(" ");
  if (!(bearer === "Bearer" || !token)) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  try {
    const decodedToken = verifyJWT(token);
    (req as AuthenticatedRequest).user = decodedToken as { username: string };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
};

export { hashPassword, comparePassword, createJWT, protect };
