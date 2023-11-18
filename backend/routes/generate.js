const express = require('express');
const router = express.Router();
const Transaction = require("../models/transaction.js");
const payment = require("../models/payment.js")

router.get("/generate_invoice/:customerPhone", async (req, res) => {
    try {
        const { customerPhone } = req.params.customerPhone;

        const transaction = await Transaction.findOne({ customerPhone });

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction data not found' });
        }
        else {
            console.log("Transaction Data Found");
            const invoice = {
                customerName: transaction.customerName,
                customerPhone: transaction.customerPhone,
                date: transaction.date,
                items: transaction.items,
                totalPayment: transaction.totalPayment,
                paymentMethod: payment.payment_method,
                amountpaid: payment.amountpaid,
                remainingAmount: payment.remaining_amount,
                cashDetails: payment.cashDetails,
                chequeDetails: payment.chequeDetails,
                cardDetails: payment.cardDetails,
                upiDetails: payment.upiDetails,
            };
        }
        return res.status(200).json(invoice);
    }
    catch (error) {
        console.log("Error Fetching Invoice Data :", error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router