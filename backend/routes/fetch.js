const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction'); // Adjust the path to your model
const Payment = require('../models/payment'); 

router.post('/item_grp_category', async (req, res) => {
  const shopkeeperid = req.body.shopkeeperid;
  try {
    const categories = await Transaction.aggregate([
        {
            $unwind:"$items",
        },
       {
        $group: {
          _id: {
            shopkeeperid: shopkeeperid,
            transactionId: "$_id",
            itemcategory: "$items.itemcategory"
          }
        }
      },
      {
        $group: {
          _id: "$_id.itemcategory",
          count: { $sum: 1 }
        }
      }
    ]);
    // console.log(categories)
    // res.json(categories);
    const formattedCategories = {};
    categories.forEach((category) => {
      formattedCategories[category._id] = category.count;
    });

    console.log(formattedCategories);

    res.json(formattedCategories);
    // console.log(categories)
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.get('/sales',async(req,res)=>{
    try{
        const items = await Payment.find({});
        res.json(items);
    }
    catch(error)
    {
       console.error("Error Fetching Items");
       res.status(500).json({error:"Internal Server Error"}); 
    }
}
)
module.exports = router;
