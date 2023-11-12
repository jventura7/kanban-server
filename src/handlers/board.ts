import { AuthenticatedRequest } from "../util/types";
import { Response } from "express";
import prisma from "../util/db";

const createBoard = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const newBoard = await prisma.board.create({
      data: {
        name: req.body.name,
        belongsToUserId: user.id,
        columns: {
          create: req.body.columns.map((column: any) => ({
            name: column.name,
          })),
        },
      },
    });

    const updatedBoards = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        boards: true,
      },
    });

    res.json({ boards: updatedBoards?.boards, board: newBoard });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const getBoard = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.session.user;
    const boardId = req.params.id;

    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const board = prisma.board.findUnique({
      where: {
        id: boardId,
        belongsToUserId: user.id,
      },
    });

    res.json({ board });
  } catch (err) {
    res.status(400).json({ err });
  }
};

const getAllBoards = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = req.session.user;
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const boards = await prisma.board.findMany({
      where: {
        belongsToUserId: user.id,
      },
    });
    res.json({ boards });
  } catch (err) {
    res.status(400).json({ err });
  }
};

export { createBoard, getBoard, getAllBoards };
