
const express = require('express');
const router = express.Router();
const Transaction = require("../models/transaction.js");

// Route to save a new transaction
router.post('/save_transaction', async (req, res) => {
    // console.log("darshil")
    // console.log(req.body)

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

router.get('/fetch_transaction',async(req,res)=>{
  try{
    const transaction = await Transaction.find({});
    // console.log(customers)
    res.json(transaction);

}
catch(error){
    console.error("Error Fetching transactions",error);
    res.status(500).json({error:"Internal Server Error"});
}
})
router.get('/save-transaction/:customerPhone', async (req, res) => {
  try {
    const customerPhone = req.params.customerPhone;
    console.log(customerPhone);
    const payment = await Transaction.findOne({ customerPhone: customerPhone });
    if (!payment) {
      res.status(404).json({ message: "User not found" }); // Corrected status code
    } else {
      res.json(payment);
      console.log(payment);
    }
  } catch (error) {
    res.status(500).json({ message: "Error occurred in fetching payment details" });
  }
});

module.exports = router;