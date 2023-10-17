const express = require("express");
const router = express.Router();
const User = require("../models/User.js")
const Customer =require("../models/customer.js")
const Item = require("../models/item.js")
const { body, validationResult } = require('express-validator');

router.post("/createcustomer", [

    //for validation using express-validator packge
    body('firstname', "Enter a valid firstname").isLength({ min: 3 }),
    body('middlename', "Enter a valid middlename").isLength({ min: 3 }),
    body('email', "Enter a valid Email").isEmail(),
    body('lastname', "Enter a valid lastname").isLength({ min: 3 }),
    body('phoneno', "Enter a valid lastname").isMobilePhone()
], async (req, res) => {
    // console.log(req.body);
    
    console.log(req.body);
    console.log("dar");
    //destructure req.body
    const { shopkeeperid,firstname,middlename,lastname,address,city,pincode,state,country,email,phoneno } = req.body;

    //if userDetail is not follow above validation then there is an error
    const error = validationResult(req)

    if (!error.isEmpty()) {
        console.log("jmj")
        const errorMessages = error.array().map(error => error.msg);
        console.log(errorMessages)
        const message = errorMessages[0];
        return res.status(400).json({ message })
    }

    try {
        //find user with req email
        let customer = await Customer.findOne({ email: req.body.email })

        //if user exist then send bad request
        if (customer) {
            return res.status(400).json({ message: "Sorry an Customer with this email is already exist" })
        }

        //create user and save into DB
        customer = await Customer.create({
            shopkeeperid: shopkeeperid,
            firstname: firstname,
            middlename: middlename,
            lastname: lastname,
            address: address,
            city: city,
            pincode: pincode,
            state: state,
            country: country,
            email: email,
            phoneno: phoneno
        });
        return res.status(200).json({ message: "Successfully Added" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post("/createitem", [
], async (req, res) => {
    
    const { itemname,itemcategory,costprice,sellingprice,quantity,units } = req.body;

    try {
        //find user with req email
        let item = await Item.findOne({ itemname: req.body.itemname })

        //if user exist then send bad request
        if (item) {
            return res.status(400).json({ message: "Sorry an Item with this name is already exist" })
        }

        //create user and save into DB
        item = await Item.create({
            itemname: itemname,
            itemcategory: itemcategory,
            costprice: costprice,
            sellingprice: sellingprice,
            quantity: quantity,
            units: units
        });
        return res.status(200).json({ message: "Successfully Added" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/fetch_customers',async (req,res)=> {
    try{
        const customers = await Customer.find({});
        res.json(customers);
    }
    catch(error){
        console.error("Error Fetching Customers",error);
        res.status(500).json({error:"Internal Server Error"});
    }
});

router.get('/fetch_items',async (req,res) => {
    try{
        const items = await Item.find({});
        res.json(items);
    }
    catch(error)
    {
       console.error("Error Fetching Items");
       res.status(500).json({error:"Internal Server Error"}); 
    }
});

router.put('/updatecustomer/:customerId', [

], async (req, res) => {
    try {
        const customerId = req.params.customerId;
        const updateData = req.body;

        const customer = await Customer.findById(customerId);

        if (!customer) {
            return res.status(400).json({ message: "Customer Not Found" });
        }
        customer.firstname = updateData.firstname;
        customer.middlename = updateData.middlename;
        customer.lastname = updateData.lastname;
        customer.address = updateData.address;
        customer.email = updateData.email;
        customer.city = updateData.city;
        customer.state = updateData.state;
        customer.country = updateData.country;
        customer.phoneno = updateData.phoneno;

        await customer.save();

        return res.status(200).json({ message: "Customer Update Successfully" })

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

//DELETE THE CUSTOMER
router.delete('/deletecustomer/:customerId', async (req, res) => {
    const customerId = req.params.customerId;
    try {
        const customer = await Customer.findById(customerId);
        if (!customer) {
            return res.status(404).json({ message: "Customer Not Found" });
        }

        await customer.deleteOne();

        res.status(200).json({ message: 'Customer deleted successfully' });

    } catch (error) {
        console.error('Error', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

module.exports = router