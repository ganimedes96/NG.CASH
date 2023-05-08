import { PrismaClient } from "@prisma/client";
import { IAccount, IAccountInfo, IUser } from "../interfaces/IUser";
import bcrypt from "bcrypt";
import getError from "../errors/getError";

export default class UserService {
  prisma = new PrismaClient();
  public createUser = async (user: IUser) => {
    const { username, password } = user;

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
       username,
        password: hashPassword,
        Account: {
          create: {
            balance: 100,
          },
        },
      },
    });
    return newUser;
  };

  public account = async (username: string): Promise<IAccountInfo> => {
    const accountBalance = await this.prisma.user.findUnique({
      where: {
        username
      },
      select: {
        id: true,
        username: true,
        accountId: true,
        Account: {
          select: {
            balance: true,
          },
        },
      },
    })as unknown as IAccountInfo;;
    
    return accountBalance;
  }

  public getUSer = async (username: string): Promise<IUser> => {
    const user = await this.prisma.user.findUnique({
      where: {
        username,
      },
      select: {
        username: true,
        accountId: true,
      },
    }) as unknown as IUser;
    return user;
  };
}
