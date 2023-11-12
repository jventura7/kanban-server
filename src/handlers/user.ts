import prisma from "../util/db";
import express from "express";
import { Request, Response } from "express";
import { hashPassword, comparePassword } from "../util/auth";
import { Session, SessionData } from "express-session";

interface AuthenticatedRequest extends express.Request {
  session: Session &
    Partial<SessionData> & {
      user?: {
        username: string;
        id: string;
      };
    };
}

const createUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const newUser = await prisma.user.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      },
    });
    req.session.user = {
      username: newUser.username,
      id: newUser.id,
    };
    res.json({ message: "User created" });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const loginUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const validPassword = await comparePassword(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    req.session.user = {
      username: user.username,
      id: user.id,
    };
    res.json({ message: "User logged in" });
  } catch (err) {
    res.json({ err });
  }
};

const authenticateUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (req.session.user) {
      const user = await prisma.user.findUnique({
        where: {
          username: req.session.user.username,
        },
      });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({
        username: user.username,
        id: user.id,
      });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (err) {
    res.json({ err });
  }
};

const logoutUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    req.session.destroy(() => {
      res.clearCookie("sid");
      res.json({ message: "User logged out" });
    });
  } catch (err) {
    res.json({ err });
  }
};

export { createUser, loginUser, authenticateUser, logoutUser };
