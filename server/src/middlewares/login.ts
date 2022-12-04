import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcrypt";


export default class MiddlewareLogin {
  public validationLogin = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const prisma = new PrismaClient();
    const { username, password } = req.body;

    const getUsers = await prisma.user.findMany();
    const [user] = getUsers;

    const getUsername = getUsers.some((name) => name.username === username);

    const hash = await bcrypt.compare(password, user.password);

    if (!getUsername || !hash) {
      return res
        .status(401)
        .json({ message: "username or password incorrect" });
    }

    next();
  };
}
