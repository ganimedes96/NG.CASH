import { Request, Response } from "express";
import LoginService from "../services/login";

export default class LoginController {
  constructor(private _loginService: LoginService) {}
  public login = async (req: Request, res: Response) => {
    try {
      const { username } = req.body;
      
      
      const token = await this._loginService.login(username);
      return res.status(200).json({token});
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error logging in, please try again" });
    }
  };
}
