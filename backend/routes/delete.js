const express = require("express");
const router = express.Router();
const mongoose = require("mongoose")
const Item = require("../models/item.js")

router.delete("/deleteItem/:itemId",async(req, res) => {
    const itemId = req.params.itemId;
    
    try {
      const itemIdObj = new mongoose.Types.ObjectId(itemId);
  
      // Delete the item from the database
      const deletedItem = await Item.findByIdAndDelete(itemIdObj);
  
      if (!deletedItem) {
        return res.status(404).json({ error: 'Item not found' });
      }
      return res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
      console.error('Error deleting Item:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = router