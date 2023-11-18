const express = require("express")
const User = require("../models/User.js")
const Transaction = require("../models/transaction.js")
const router = express.Router();

router.post('/fetch_transactions', async (req, res) => {
    try {
      // Get the user's MongoDB ID from the request
        // Assuming your User model has a field called 'shopkeeperid' to associate users with customers
        // const shopkeeperid = req.body.shopkeeperid;
        // const user = await User.find({shopkeeperid:shopkeeperid});

        // if (!user) {
        //     return res.status(404).json({ error: 'User not found' });
        // }

        // Fetch customers associated with the user's shopkeeperid
        const shopkeeperID = req.body.shopkeeperid;
        const transaction = await Transaction.find({ shopkeeperid: shopkeeperID});
        console.log(transaction);
        res.json(transaction);
    } catch (error) {
        console.error("Error Fetching Transactions", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router