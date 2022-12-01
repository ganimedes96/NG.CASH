import { IAccountInfo } from "../interfaces/IUser";
import { PrismaClient } from "@prisma/client";
import { ITransaction, IAllTransaction } from "../interfaces/ITransaction";

export default class TransactionService {
  public transaction = async (
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

  public getTransactions = async (user: IAccountInfo):Promise<IAllTransaction[]> => {
    const prisma = new PrismaClient();
    const transactions = await prisma.transactions.findMany({
      where: {
        OR: [
          {
            creditedAccountId: user.accountId,
            
          },
          { debitedAccountId: user.accountId },
        ],
      },
      orderBy:{createdAt: 'desc'},
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
    }) as unknown as IAllTransaction[];
    return transactions;
  };
}
