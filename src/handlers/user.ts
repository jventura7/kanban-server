import prisma from "../util/db";

const createUser = (req, res) => {
  console.log(req.body);
  res.send({ data: req.body });
};

const loginUser = (req, res) => {
  console.log(req.body);
  res.send({ data: req.body });
};

export { createUser };
