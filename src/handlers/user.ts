import prisma from "../util/db";
import { Request, Response } from "express";
import { hashPassword, comparePassword, createJWT } from "../util/auth";

const createUser = async (req: Request, res: Response) => {
  try {
    const hashedPassword = await hashPassword(req.body.password);
    const newUser = await prisma.user.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      },
    });
    const token = createJWT(newUser.username);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const loginUser = async (req: Request, res: Response) => {
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

    const token = createJWT(user.username);
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
};

export { createUser, loginUser };
