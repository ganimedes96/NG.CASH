import { PrismaClient } from "@prisma/client";

import jwt from "../utils/jwt";

export default class LoginService {
  public login = async (username: string) => {
    const prisma = new PrismaClient();
    const getUsers = await prisma.user.findMany();
    const userAndPassword = getUsers.map((user) => {
      return { username: user.username, password: user.password };
    });
    if (userAndPassword.length === 0) {
      return userAndPassword;
    }
    return jwt.createToken(username);
  };
}
