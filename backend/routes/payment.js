const express = require('express');
const router = express.Router();
const Payment = require('../models/payment.js');
const ChequeDetails = require('../models/ChequeDetails');
const CardDetails = require("../models/CardDetails.js")
const UpiDetails = require("../models/UpiDetails.js");
const CashDetails = require("../models/cashdetails.js")
const Transaction = require("../models/transaction.js")


router.get('/confirm_cheque_payment/:customerphoneno', async (req, res) => {
    try {
        const customerphoneno = req.params.customerphoneno;
        console.log(customerphoneno);
        const paymentDetails = await Payment.findOne({ customerphoneno: customerphoneno });
        if (!paymentDetails) {
            res.status(404).json({ message: "User Not Found" });
        } else {
            res.json(paymentDetails);
            console.log(paymentDetails);
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Create a new payment
router.post('/confirm_cheque_payment', async (req, res) => {
    try {
        console.log("backend sideeeee")
        const { shopkeeperid,totalCost, customerName, customerPhone, amountpaid, remaining_amount, paymentMethod, chequeDetails } = req.body;
        console.log("backend side")
        console.log(req.body)
        // Create a new ChequeDetails document
        const newChequeDetails = new ChequeDetails({

            chequeNo: chequeDetails.chequeNo,
            chequeAmount: chequeDetails.chequeAmount,
            accountHolderName: chequeDetails.accountHolderName,
            bankName: chequeDetails.bankName,
        });

        // Save the ChequeDetails document
        const savedChequeDetails = await newChequeDetails.save();

        // Create a new Payment document with a reference to the saved ChequeDetails
        const newPayment = new Payment({
            shopkeeperid : shopkeeperid,
            totalCost: totalCost,
            customername: customerName,
            customerphoneno: customerPhone,
            amountpaid: amountpaid,
            remaining_amount: remaining_amount,
            payment_method: paymentMethod,
            chequeDetails: savedChequeDetails._id,
        });

        // Save the Payment document
        const savedPayment = await newPayment.save();

        res.status(200).json({ message: 'Payment details saved successfully', payment: savedPayment });
    } catch (error) {
        console.error('Error saving payment details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/confirm_card_payment', async (req, res) => {
    try {
        console.log("backend sideeeee")
        const {shopkeeperid, totalCost, customerName, customerPhone, amountpaid, remaining_amount, paymentMethod, cardDetails } = req.body;
        console.log("backend side")
        console.log(req.body)
        // Create a new ChequeDetails document
        const newCardDetails = new CardDetails({

            cardNumber: cardDetails.cardNumber,
            cardBankName: cardDetails.cardBankName,
            cardHolderName: cardDetails.cardHolderName,

        });

        // Save the ChequeDetails document
        const savedCardDetails = await newCardDetails.save();

        // Create a new Payment document with a reference to the saved ChequeDetails
        const newPayment = new Payment({
            shopkeeperid:shopkeeperid,
            totalCost: totalCost,
            customername: customerName,
            customerphoneno: customerPhone,
            amountpaid: amountpaid,
            remaining_amount: remaining_amount,
            payment_method: paymentMethod,
            cardDetails: savedCardDetails._id,
        });

        // Save the Payment document
        const savedPayment = await newPayment.save();

        res.status(200).json({ message: 'Payment details saved successfully', payment: savedPayment });
    } catch (error) {
        console.error('Error saving payment details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/confirm_upi_payment', async (req, res) => {
    try {
        console.log("backend sideeeee")
        const { shopkeeperid,totalCost, customerName, customerPhone, amountpaid, remaining_amount, paymentMethod, upiDetails } = req.body;
        console.log("backend side")
        console.log(req.body)
        // Create a new ChequeDetails document
        const newUpiDetails = new UpiDetails({
            upiID: upiDetails.upiID
        });

        // Save the ChequeDetails document
        const savedUpiDetails = await newUpiDetails.save();

        // Create a new Payment document with a reference to the saved ChequeDetails
        const newPayment = new Payment({
            shopkeeperid : shopkeeperid,
            totalCost: totalCost,
            customername: customerName,
            customerphoneno: customerPhone,
            amountpaid: amountpaid,
            remaining_amount: remaining_amount,
            payment_method: paymentMethod,
            upiDetails: savedUpiDetails._id,
        });

        // Save the Payment document
        const savedPayment = await newPayment.save();

        res.status(200).json({ message: 'Payment details saved successfully', payment: savedPayment });
    } catch (error) {
        console.error('Error saving payment details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/confirm_cash_payment', async (req, res) => {
    try {
        console.log("backend sideeeee")
        const {shopkeeperid, totalCost, customerName, customerPhone, amountpaid, remaining_amount, paymentMethod, cashDetails } = req.body;
        console.log("backend side")
        console.log(req.body)
        // Create a new ChequeDetails document
        const newCashDetails = new CashDetails({
            cash_amount: cashDetails.cash_amount
        });

        // Save the ChequeDetails document
        const savedCashDetails = await newCashDetails.save();

        // Create a new Payment document with a reference to the saved ChequeDetails
        const newPayment = new Payment({
            shopkeeperid : shopkeeperid,
            totalCost: totalCost,
            customername: customerName,
            customerphoneno: customerPhone,
            amountpaid: amountpaid,
            remaining_amount: remaining_amount,
            payment_method: paymentMethod,
            cashDetails: savedCashDetails._id,
        });

        // Save the Payment document
        const savedPayment = await newPayment.save();

        res.status(200).json({ message: 'Payment details saved successfully', payment: savedPayment });
    } catch (error) {
        console.error('Error saving payment details:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/fetch_remaining_amount', async (req, res) => {
    console.log("backend")
    console.log(req.body)
    try {
        const { customerPhone } = req.body.customerPhone;
        const shopkeeperid = req.body.shopkeeperid;
        // Implement the logic to fetch the remaining amount from the database
        // Use customerPhone to find the specific customer's remaining amount

        const result = await Payment.findOne({ customerphoneno: customerPhone, shopkeeperid: shopkeeperid  })
            .sort({ _id: -1 }) // Sort by the unique ID in descending order (most recent first)
            .limit(1)
        if (result) {
            // Send the previousRemainingAmount to the client
            console.log("backend result")
            res.json({ previousRemainingAmount: result.remaining_amount });
        } else {
            console.log("backend not found")
            res.status(404).json({ error: 'Previous remaining amount not found' });
        }
    } catch (error) {
        console.log("backend catch")
        console.error('Error fetching previous remaining amount:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/fetch_remaining_amount/:customerphoneno', async (req, res) => {
    const customerphoneno = req.params.customerphoneno;
    console.log('Received request for customer phoneno:', customerphoneno);
    try {
        const payment = await Payment.find({ customerphoneno: customerphoneno }).sort({ _id: -1 }).limit(1);
      console.log(payment);
      if (!payment) {
        return res.status(404).json({ error: 'Payment record not found' });
      }
  
      // Adjust this based on your actual data structure.
      const remainingAmount = payment[0].remaining_amount;
   
      res.json({remainingAmount} );
    } catch (error) {
      console.error('Error fetching updated remaining amount:', error);
      res.status(500).json({ error: 'An error occurred' });
    }
  });
  
  // Add this route to your Express.js server
// Add this route to your Express.js server
router.post('/fetch_customer_data', async (req, res) => {
    try {
        const shopkeeperID = req.body.shopkeeperid;
        const payments = await Payment.find({shopkeeperid:shopkeeperID});
        console.log(payments);
        res.json(payments);
    } catch (error) {
        console.error('Error fetching all payment data:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

router.get('/get_items_bill/:phoneno', async (req, res) => {
    console.log("be")
    const phoneno = req.params.phoneno;
    console.log(phoneno)
    try {
        // Find transactions in the database that match the phone number
        const transactions = await Transaction.find({ customerPhone: phoneno }).sort({ _id: -1 }) 
            .limit(1)

        // Return the transactions as JSON response
        console.log(transactions)
        res.json(transactions);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;