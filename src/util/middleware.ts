import { validationResult } from "express-validator";

const handleInputErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ data: errors.array() });
  }
  next();
};

export { handleInputErrors };
