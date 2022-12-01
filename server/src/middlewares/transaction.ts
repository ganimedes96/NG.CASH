import { NextFunction, Request, Response } from "express";
import UserService from "../services/user";
import { tokenUsername } from "../utils/tokenUsername";

export default class Transaction {
  constructor(private _userService: UserService){}
  public validation = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { recipient, value } = req.body;
      const { authorization } = req.headers;
      const username = await tokenUsername(String(authorization));
     const userAccount = await this._userService.account(username);

      if (recipient === username) {
        return res.status(400).json({ message: "you cannot make a transfer to yourself" });
      }
      if (userAccount?.Account.balance < value) {
        return res.status(400).json({ message: " insufficient funds" });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}
