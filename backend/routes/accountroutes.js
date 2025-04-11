import express from 'express'
import { createAccount,addMoneyToAccount,getAccount } from "../controllers/accountcontroller.js";
import authMiddleware from '../middleware/authMiddleware.js';

const router= express.Router();

router.get("/:id?", authMiddleware, getAccount);
router.post("/create", authMiddleware, createAccount);
router.put("/add-money/:id", authMiddleware, addMoneyToAccount);

export default router;


