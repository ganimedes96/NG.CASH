import { NextFunction, Request, Response } from "express";
import jwt from "../utils/jwt";


export default class MiddlewareToken {
  public validationToken = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: "Token not found" });
    }

    const { type } = jwt.validateToken(authorization);

    if (type) {
      return res.status(401).json({ message: type });
    }

    next();
  };
}
