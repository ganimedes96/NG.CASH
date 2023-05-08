import express from "express";
import LoginController from "../controllers/login";
import LoginService from '../services/login'
import Middleware from '../middlewares/login'


const router = express.Router();
const middleware = new Middleware();
const loginService = new LoginService();
const loginController = new LoginController(loginService);

router.post('/',middleware.validationLogin, loginController.login)

export default router