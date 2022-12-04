import express from "express";
import UserController from "../controllers/user";
import UserService from "../services/user";
import MiddlewareUser from "../middlewares/user";
import MiddlewareToken from "../middlewares/token";

const router = express.Router();
const userService = new UserService();
const userController = new UserController(userService);
const middlewareUser = new MiddlewareUser();
const middlewareToken = new MiddlewareToken();

router.post(
  "/register",
  middlewareUser.userValidation,
  userController.createUser
);
router.get(
  "/account",
  middlewareToken.validationToken,
  userController.getUserAccount
);

export default router;
