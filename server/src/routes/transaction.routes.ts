import express from "express";
import MiddlewareToken from "../middlewares/token";
import MiddlewareTransaction from "../middlewares/transaction";
import TransactionController from "../controllers/transaction";
import TransactionService from "../services/transaction";
import UserService from "../services/user";

const router = express.Router();

const middlewareToken = new MiddlewareToken();
const transactionService = new TransactionService();
const userService = new UserService();
const middlewareTransaction = new MiddlewareTransaction(userService);
const transactionController = new TransactionController(
  transactionService,
  userService
);

router.post(
  "/",
  middlewareTransaction.validation,
  middlewareToken.validationToken,
  transactionController.transactions
);

// router.get(
//   "/",
//   middlewareToken.validationToken,
//   transactionController.getTransaction
// );

router.get(
  "/filter",
  middlewareToken.validationToken,
  transactionController.filterTransactions
);

export default router;
