import { Request, Response } from "express";
import { IAccountInfo } from "./../interfaces/IUser";
import userService from "../services/user";
import transactionService from "../services/transaction";
import { tokenUsername } from "../utils/tokenUsername";
import { IAllTransaction } from "../interfaces/ITransaction";

export default class TransactionController {
  constructor(
    private _transactionService: transactionService,
    private _userService: userService
  ) {}
  public transactions = async (req: Request, res: Response) => {
    try {
      const { recipient, value } = req.body;
      const token = req.headers.authorization;
      const username = tokenUsername(String(token));
      
    
      if (!recipient || !value || !username) {
        return res.status(401).json({ message: "Missing credentials" });
      }

      const shippingData = (await this._userService.account(username)) as IAccountInfo;

      const receiptData = (await this._userService.account(recipient)) as IAccountInfo;

      await this._transactionService.updateBalance(shippingData, receiptData, value);

      const transaction = await this._transactionService.transaction(
        shippingData,
        receiptData,
        value
      );
      res.status(201).json(transaction);
    } catch (err) {
      console.log(err);
      res
        .status(500)
        .json({ message: "Error performing transaction, please try again" });
    }
  };

  public getTransaction = async (req: Request, res: Response) => {
    const token = req.headers.authorization;
    const username = tokenUsername(String(token));
    const userData = (await this._userService.getUSer(username)) as IAccountInfo;
    
    const transactions = await this._transactionService.getTransactions(
      userData
    ) as IAllTransaction[];
    return res.status(200).json( transactions);
  };
}
