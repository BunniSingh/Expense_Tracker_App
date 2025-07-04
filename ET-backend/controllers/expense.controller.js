const ExpenseModel = require("../models/expence.model");

// Create expense
const createExpense = async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    if (!title || !amount || !category) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const expense = await ExpenseModel.create({
      userId: req.useId,
      title,
      amount,
      category,
      date
    });

    res.status(201).json({ success: true, data: expense });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to create expense",
        error: err.message,
      });
  }
};

// Get all expenses for a user
const getExpenses = async (req, res) => {
  try {
    const expenses = await ExpenseModel.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.json({ success: true, data: expenses });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching expenses",
        error: err.message,
      });
  }
};

// Get a single expense by ID
const getExpenseById = async (req, res) => {
  try {
    const expense = await ExpenseModel.findOne({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    res.json({ success: true, data: expense });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching expense",
        error: err.message,
      });
  }
};

/*
// Update expense
const updateExpense = async (req, res) => {
  try {
    const expense = await ExpenseModel.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );

    if (!expense) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Expense not found or not authorized",
        });
    }

    res.json({ success: true, data: expense });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error updating expense",
        error: err.message,
      });
  }
};

// Delete expense
const deleteExpense = async (req, res) => {
  try {
    const deleted = await ExpenseModel.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!deleted) {
      return res
        .status(404)
        .json({
          success: false,
          message: "Expense not found or not authorized",
        });
    }

    res.json({ success: true, message: "Expense deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error deleting expense",
        error: err.message,
      });
  }
};

*/

module.exports = {
  createExpense,
  getExpenses,
  getExpenseById,
};
