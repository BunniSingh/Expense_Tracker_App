
const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  amount: Number,
  category: String,
  date: { type: Date, default: Date.now }
},{
    timestamps: true,
});

let ExpenseModel = mongoose.model('Expense', expenseSchema);
module.exports = ExpenseModel;