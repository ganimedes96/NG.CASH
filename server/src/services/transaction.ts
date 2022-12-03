import { IAccountInfo, IUser } from "../interfaces/IUser";
import { PrismaClient } from "@prisma/client";
import { ITransaction, IAllTransaction } from "../interfaces/ITransaction";
import moment from "moment";

export default class TransactionService {
  public transactions = async (
    shippingData: IAccountInfo,
    receiptData: IAccountInfo,
    amount: number
  ): Promise<ITransaction> => {
    const prisma = new PrismaClient();
    const outcome = await prisma.transactions.create({
      data: {
        debitedAccountId: String(shippingData.accountId),
        creditedAccountId: String(receiptData.accountId),
        value: Number(amount),
        createdAt: new Date(),
      },
    });
    return outcome;
  };

  public updateBalance = async (
    shippingData: IAccountInfo,
    receiptData: IAccountInfo,
    amount: number
  ): Promise<void> => {
    const prisma = new PrismaClient();
    console.log("value", amount);

    await prisma.accounts.update({
      where: {
        id: String(shippingData.accountId),
      },
      data: {
        balance: {
          decrement: amount,
        },
      },
    });

    await prisma.accounts.update({
      where: { id: String(receiptData.accountId) },
      data: {
        balance: {
          increment: amount,
        },
      },
    });
  };

  public getTransactions = async (
    user: IAccountInfo
  ): Promise<IAllTransaction[]> => {
    const prisma = new PrismaClient();
    const transactions = (await prisma.transactions.findMany({
      where: {
        OR: [
          {
            creditedAccountId: user.accountId,
          },
          { debitedAccountId: user.accountId },
        ],
      },
      orderBy: { createdAt: "desc" },
      include: {
        debitAccount: {
          select: {
            id: true,
            User: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },

        creditAccount: {
          select: {
            id: true,
            User: {
              select: {
                id: true,
                username: true,
              },
            },
          },
        },
      },
    })) as unknown as IAllTransaction[];
    return transactions;
  };

  public filterTransactions = async (
    userData: IUser,
    date: string,
    filter: string
  ): Promise<IAllTransaction[]> => {
    const transactions = await this.getTransactions(userData);
    switch (filter) {
      case "cash-in":
        return transactions.filter(
          (transaction) => transaction.creditedAccountId === userData.accountId
        );
      case "cash-out":
        return transactions.filter(
          (transaction) => transaction.debitedAccountId === userData.accountId
        );
      case "date":
        return transactions.filter(
          (transaction) =>
            moment(transaction.createdAt).format("YYYY-MM-DD") === date
        );

      default:
        return transactions;
    }
  };
}
