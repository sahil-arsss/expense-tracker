import express from 'express'
import { addTransaction,getDashboardInformation,getTransaction,transferMoneyToAccount } from '../controllers/transactionController.js';
import authMiddleware from '../middleware/authMiddleware.js';



const route = express.Router();

route.get("/",authMiddleware,getTransaction);
route.get("/dashboard",authMiddleware,getDashboardInformation);
route.post("/addTransaction/:account_id",authMiddleware,addTransaction);
route.put("/transfer-money",authMiddleware,transferMoneyToAccount);

export default route;