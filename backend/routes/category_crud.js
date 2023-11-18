const express = require("express");
const mongoose = require("mongoose")
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Category = require("../models/category.js");

router.delete('/deleteCategory/:categoryId', async(req, res) => {
  const categoryId = req.params.categoryId;
  console.log(categoryId)
  try {
    const categoryIdObj = new mongoose.Types.ObjectId(categoryId);

    // Delete the category from the database
    const deletedCategory = await Category.findByIdAndDelete(categoryIdObj);

    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    return res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

router.delete('/delete-Category/:id',async (req,res)=>{
  let data = await Category.deleteOne({_id : req.params.id});
  res.send(data)
 
})

router.post("/newcategory", async (req, res) => {
  console.log("enter in backend")
  const shopkeeperid = req.body.shopkeeperid;
  const CategoryName = req.body.Category;
  // console.log("shopkeeper id in backend");
  // console.log(shopkeeperid)
  // console.log("Category in backend");
  // console.log(CategoryName)
  // const error = validationResult(req);

  // if (!error.isEmpty()) {
  //   console.log("There is some error");
  //   const errorMessages = error.array().map((error) => error.msg);
  //   console.log(errorMessages);
  //   const message = errorMessages[0];
  //   return res.status(400).json({ message });
  // }

  try {
    //find category with req categoryname

    let categorys = await Category.findOne({ category_name: { $regex: CategoryName, $options: 'i' }, shopkeeperid: shopkeeperid })

    if (categorys) {
      return res
        .status(400)
        .json({ message: 'Sorry, the given category already exists' });
    }
    //create category and save into DB
    else {
      categorys = await Category.create({
        shopkeeperid: shopkeeperid,
        category_name: CategoryName,
      });
    }
    return res
      .status(200)
      .json({ message: "Successfully Category added", categorys });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}
);

router.post('/fetch_categories', async (req, res) => {
  try {
    // Retrieve all categories from the database
    const shopkeeperID = req.body.shopkeeperid;
    console.log("Successfully fetched categories in backend")
    const categories = await Category.find({shopkeeperid:shopkeeperID});
    console.log(categories)
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;
