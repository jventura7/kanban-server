import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

const handleInputErrors = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ data: errors.array() });
  }
  next();
};

export { handleInputErrors };
