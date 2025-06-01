const Transaction = require('../models/Transaction');

exports.createTransaction = async (req, res) => {
  try {
    const transaction = new Transaction({
      ...req.body,
      userId: req.user.id,
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    if (transaction.userId.toString() !== req.user.id) return res.status(403).json({ error: 'Not authorized' });
    res.status(200).json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    if (transaction.userId.toString() !== req.user.id) return res.status(403).json({ error: 'Not authorized' });
    res.status(200).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    if (transaction.userId.toString() !== req.user.id) return res.status(403).json({ error: 'Not authorized' });
    res.status(200).json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
