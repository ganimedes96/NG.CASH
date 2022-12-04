import { Response, Request, NextFunction } from "express";
import { PrismaClient } from "@prisma/client";

export default class CreateUserValidation {
  public userValidation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username, password } = req.body;
    const prisma = new PrismaClient();
    const users = await prisma.user.findMany();
    const regex =
      /^(?=(?:.*?[A-Z]){1})(?=(?:.*?[0-9]){1})(?=(?:.*?[!@#$%*()_+^&}{:;?.]){1})(?!.*\s)[0-9a-zA-Z!@#$%;*(){}_+^&]*$/;
    if (!regex.test(password)) {
      return res.status(400).json({
        message:
          "The password must contain at least 8 characters in uppercase, 1 number and 1 special character!",
      });
    }
    if (username.length < 3) {
      return res.status(400).json({ message: "Invalid username" });
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Invalid password" });
    }
    const userAlreadyExists = users.some(
      (user) => user.username === username
    );

    if (userAlreadyExists) {
      return res.status(400).json({ message: "User already exists!" });
    }
    next();
  };
}
