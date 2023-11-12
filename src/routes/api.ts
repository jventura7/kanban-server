import express from "express";
import { body } from "express-validator";
import { handleInputErrors } from "../util/middleware";
import { createBoard, getAllBoards, getBoard } from "../handlers/board";

const router = express.Router();

router.post("/board", body("name").isString(), handleInputErrors, createBoard);
router.get("/board", getAllBoards);
router.get("/board/:id", getBoard);

export { router };
