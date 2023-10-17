const express = require("express");
const router = express.Router();
const User = require("../models/User.js")
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const transpoter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user:"ashishmak2406@gmail.com",
        pass:"absq uyme ugbo gnud"
    }
})

const keysecret = "ahishahhbccboeiwcbnlkencbeiubckl";


//ROUTE 1 : Create a User and store in database using :POST "/auth/createuser". it Does Not require authentication
router.post("/createuser", [

    //for validation using express-validator packge
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid Email").isEmail(),
    body("password", "Password length must be atlist six character").isLength({ min: 6 })

], async (req, res) => {
    // console.log(req.body);

    //destructure req.body
    const { name, email, password } = req.body;

    //if userDetail is not follow above validation then there is an error
    const error = validationResult(req)

    if (!error.isEmpty()) {
        // console.log("jmj")
        const errorMessages = error.array().map(error => error.msg);
        const message = errorMessages[0];
        return res.status(400).json({ message })
    }

    try {
        //find user with req email
        let user = await User.findOne({ email: req.body.email })

        //if user exist then send bad request
        if (user) {
            return res.status(400).json({ message: "Sorry an user with this email is already exist" })
        }

        //create user and save into DB
        user = await User.create({
            name: name,
            password: password,
            email: email
        })
        return res.status(200).json({ message: "Successfully signup" })
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Internal server error" });
    }
})




//ROUTE 2 : Authenticate a user  :POST "/auth/login". it Does Not require login
router.post("/login", [

    //for validation using express-validator packge
    body('email', "Enter a valid Email").isEmail(),
    body("password", "password can not be blank").exists()

], async (req, res) => {


    //for email and password validation 
    //if email is not in form or password is empty then do not move ahead and just give above error
    const error = validationResult(req)

    if (!error.isEmpty()) {
        // console.log("jmj")
        const errorMessages = error.array().map(error => error.msg);
        const message = errorMessages[0];
        console.log(message)
        return res.status(400).json({ message })
    }

    const email = req.body.email;
    const password = req.body.password;
    try {

        //find user from the database by email
        let user = await User.findOne({ email });

        //if user not exist then send return error to client side
        if (!user) {
            return res.status(400).json({ message: "Sorry an user with this email is already exist" })
        }

        //if user exist then check password

        if (password != user.password) {
            return res.status(400).json({ message: "please Enter correct creadencial - password incorrect" })
        }

        const data = {
            user: {
                id: user.id,
                username:user.name,
                psw:user.password
            }
        }

        return res.status(200).json({ message: "Successfully Logged In" ,data})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({ message: "Internal server error" });
    }
})

//ROUTE for Forgot Password
router.post("/sendPassowordLink",async(req,res)=>{
    console.log(req.body);

    const {email}  = req.body;
    if(!email){
        res.status(401).json({message:"Enter Your Email"})
    }
    try {
        let user= await User.findOne({email:email});

        //token generate for reset password
        const token = jwt.sign({_id:user.id},keysecret,{
            expiresIn:"120s"
        });
        
        const userToken = await User.findByIdAndUpdate({_id:user.id},{verifytoken:token},{new:true});

        console.log(userToken);
        
        if(userToken){
            const mailOptions={
                from:"ashishmak2406@gmail.com",
                to:email,
                subject:`Reset your passwod`,
                text : `This Link Valid For 2 minutes http://localhost:3000/forgotpassword/${user.id}/${userToken.verifytoken}`
            }
            transpoter.sendMail(mailOptions,(error,info)=>{
                if(error){ 
                   return res.status(401).json({message:"email not send "})
                }
                else{
                  return res.status(201).json({message:"email sent success "})
                }
            });
        }
        return res.status(201).json({message:"email sent success "})
    } catch (error) {
        res.status(401).json({message:"invalid user"})
    }
})


//VERIFY USER FOR FORGOT PASSWORD
router.get("/forgotpassword/:id/:token",async(req,res)=>{
    const {id,token} = req.params;
    try {
        const validateuser = await User.findOne({_id:id,verifytoken:token})
        
        const verifyToken = jwt.verify(token,keysecret);
        if(validateuser && verifyToken._id){
            return res.status(201).json({validateuser})
        }
        else{
            return res.status(404).json({message:"User not exist"});
        }
        
    } catch (error) {
       return res.status(401).json({error});
    }
})

     //CHANGE PASSWORD
     
     router.post('/:id/:token',async(req,res)=>{
         const {id,token} = req.params ;
         const {password} = req.body;
         try {
             const validateuser = await User.findOne({_id:id,verifytoken:token})
             
             const verifyToken = jwt.verify(token,keysecret);
             if(validateuser && verifyToken._id){
                 const newpassword = await (password);
                 const setnewuserpassword = await User.findByIdAndUpdate({_id:id},{password:newpassword});
                 setnewuserpassword.save();
                 return res.status(201).json({setnewuserpassword})
             }
             else{
                 return res.status(404).json({message:"User not exist"});
             }
         } catch (error) {
             return res.status(401).json({error});
         }
     })

module.exports = router