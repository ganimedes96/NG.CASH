import { Request, Response } from "express";
import UserService from "../services/user";
import { tokenUsername } from "../utils/tokenUsername";

export default class UserController {
  constructor(private _userService: UserService) {}

  public createUser = async (req: Request, res: Response) => {
    try {
      const user = req.body;
      const newUser = await this._userService.createUser(user);
      res.status(201).json(newUser);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error creating user, try again" });
    }
  };

  public getUserAccount = async (req: Request, res: Response) => {
    try {
      const token = req.headers.authorization;

      const username = await tokenUsername(String(token));

      const account = await this._userService.account(username);
      res.status(200).json(account);
    } catch (err) {
      console.log(err);
      return res
        .status(500)
        .json({ message: "Error fetching account, please try again" });
    }
  };
}
