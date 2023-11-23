const express = require("express")
const connectToMongo = require("./db.js")
connectToMongo();
const auth = require("./routes/auth.js");
const category_crud = require("./routes/category_crud.js");
const add = require("./routes/add.js")
const dlt=require("./routes/delete.js")
const save=require("./routes/save.js")
const cors = require("cors")
const Payment = require("./routes/payment.js");
const fetch = require('./routes/fetch.js');
const transaction = require('./routes/transaction.js')
const generate = require("./routes/generate.js");
const session = require("express-session")
const passport = require("passport")
const jwt = require('jsonwebtoken');

// const User = re 
const app = express();
const port = 4000;
const handleRefresh = require('./routes/refresh.js') ;
const handleLogout = require('./routes/logout.js') ;
const cookieParser = require('cookie-parser');
const {urlencoded} = require('express');

//to get data from the client we need to make a cors beetween two
const corsOptions = {
    origin:['http://localhost:3000','http://192.168.1.3:3000'], 
    credentials:true,        
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

//to send some information to server
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true })); 

//Available Routes
app.use("/auth", auth);
app.use("/category_crud", category_crud);
app.use("/add", add);
app.use("/save", save);
app.use("/delete", dlt);
app.use("/payment", Payment);
app.use("/fetch",fetch);
app.use("/transaction",transaction);
app.use("/generate",generate)
app.get("/refresh", handleRefresh) ;
app.get("/logout", handleLogout) ;

app.listen(port, (err) => {
    console.log(`Server Running on port ${port}`)
})