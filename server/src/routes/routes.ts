import express from "express";
import userRouter from "./user.routes"
import loginRouter from "./login.routes"
import transactionRouter from './transaction.routes'

const routers = express.Router();


routers.use('/users', userRouter);
routers.use('/login', loginRouter);
routers.use('/transactions', transactionRouter)

export default routers;