const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  expenseType: {
    type: String,
    enum: ['income', 'expense'],
    required: true,
  },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, default: Date.now },
  monthlyLimit: { type: Number, default: 0 }, 
  paymentMethod: { type: String },
  description: { type: String },
  recurringFrequency: { type: String }, 
  tags: [String],
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  paymentStatus: { type: String, enum: ['pending', 'paid'], default: 'paid' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
