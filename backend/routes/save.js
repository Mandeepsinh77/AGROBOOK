
const express = require('express');
const router = express.Router();
const Transaction = require("../models/transaction.js");

// Route to save a new transaction
router.post('/save_transaction', async (req, res) => {
    console.log("darshil")
    console.log(req.body)

  try {
    const {
      customerId,
      customerName,
      customerPhone,
      date,
      items,
      totalPayment, // Include the total amount in the request
    } = req.body;

    const transaction = new Transaction({
      customerId,
      customerName,
      customerPhone,
      date,
      items,
      totalPayment, // Save the total amount in the database
    });

    await transaction.save();

    res.json({ message: 'Transaction saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while saving the transaction' });
  }
});

module.exports = router;