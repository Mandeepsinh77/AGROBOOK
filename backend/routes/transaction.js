const express = require("express");
const User = require("../models/User.js");
const Transaction = require("../models/transaction.js");
const router = express.Router();

router.post("/fetch_transactions", async (req, res) => {
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
    const transaction = await Transaction.find({ shopkeeperid: shopkeeperID });
    console.log(transaction);
    res.json(transaction);
  } catch (error) {
    console.error("Error Fetching Transactions", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post('/getTransactionsByDateRange', async (req, res) => {
  try {
      const { startDate, endDate } = req.body;
      const shopkeeperid = req.body.shopkeeperid;
      
      const transactions = await Transaction.find({
          date: {
              $gte: new Date(startDate + "T00:00:00.000Z"),
              $lte: new Date(endDate + "T23:59:59.999Z"),
          },
          shopkeeperid: shopkeeperid,
      });

      res.json(transactions);
  } catch (error) {
      console.error('Error fetching transactions:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/selling-item-counts', async (req, res) => {
  try {
      const { startDate, endDate } = req.body;
      const shopkeeperid = req.body.shopkeeperid;

      const result = await Transaction.aggregate([
          {
              $match: {
                  date: {
                      $gte: new Date(startDate + "T00:00:00.000Z"),
                      $lte: new Date(endDate + "T23:59:59.999Z"),
                  },
                  shopkeeperid: shopkeeperid,
              },
          },
          { $unwind: '$items' },
          {
              $group: {
                  _id: '$items.itemname',
                  count: { $sum: 1 },
              },
          },
          { $sort: { count: -1 } },
          {
              $lookup: {
                  from: 'items',
                  localField: '_id',
                  foreignField: 'itemname',
                  as: 'itemDetails',
              },
          },
          { $unwind: '$itemDetails' },
          {
              $project: {
                  _id: 0,
                  itemName: '$_id',
                  count: 1,
                  category: '$itemDetails.category',
              },
          },
      ]);

      res.json({ sellingItemCounts: result });
  } catch (error) {
      console.error('Error fetching selling item counts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
module.exports = router;
