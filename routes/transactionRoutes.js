const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

const auth = require("../middleware/authMiddleware");

router.use(auth);

router.post('/', transactionController.createTransaction);
router.get('/', transactionController.getTransactions);
router.get('/:id', transactionController.getTransactionById);
router.put('/:id', transactionController.updateTransaction);
router.delete('/:id', transactionController.deleteTransaction);

module.exports = router;
