import express from 'express'
import verifyToken from '../middleware/auth.middleware.js';
import { addExpense, getExpense, updateExpense } from '../controllers/expense.controller.js';

const expenseRouter=express.Router();

expenseRouter.post('/add',verifyToken, addExpense)
expenseRouter.get('/',verifyToken, getExpense)
expenseRouter.put('/:id', verifyToken , updateExpense)
export default expenseRouter
