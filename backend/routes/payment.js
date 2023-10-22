const express = require('express');
const router = express.Router();
const Payment = require('../models/payment.js');
const ChequeDetails = require('../models/ChequeDetails');
const CardDetails = require("../models/CardDetails.js")
const UpiDetails = require("../models/UpiDetails.js");
const CashDetails = require("../models/cashdetails.js")


// Create a new payment
router.post('/confirm_cheque_payment', async (req, res) => {
    try {
        console.log("backend sideeeee")
        const { totalCost, customerName, customerPhone, amountpaid, remaining_amount, paymentMethod, chequeDetails } = req.body;
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
        const { totalCost, customerName, customerPhone, amountpaid, remaining_amount, paymentMethod, cardDetails } = req.body;
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
        const { totalCost, customerName, customerPhone, amountpaid, remaining_amount, paymentMethod, upiDetails } = req.body;
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
        const { totalCost, customerName, customerPhone, amountpaid, remaining_amount, paymentMethod, cashDetails } = req.body;
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
        const { customerPhone } = req.body;

        // Implement the logic to fetch the remaining amount from the database
        // Use customerPhone to find the specific customer's remaining amount

        const result = await Payment.findOne({ customerphoneno: customerPhone })
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

module.exports = router;