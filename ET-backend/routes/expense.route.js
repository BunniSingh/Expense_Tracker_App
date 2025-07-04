const express = require('express');
const expenseRouter = express.Router();
const { createExpense, getExpenses, getExpenseById } = require('../controllers/expense.controller');
const authMiddleware = require('../middleware/authMiddleware');


// expenseRouter.use(authMiddleware);

expenseRouter.post('/create', authMiddleware, createExpense);
expenseRouter.get('/', getExpenses);
expenseRouter.get('/:id', getExpenseById);
// expenseRouter.put('/:id', updateExpense);
// expenseRouter.delete('/:id', deleteExpense);

module.exports = expenseRouter;
