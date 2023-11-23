const User = require('../models/User.js') ; 
const jwt = require('jsonwebtoken') ;

const handleRefresh = async (req,res)=> {
    // console.log(req);
    const cookies = req.cookies ; 
    if (!cookies?.jwt) return res.sendStatus(401); // unauthorized

    const user_token = cookies.jwt ; 
    const user = await User.findOne({user_token}) ;

    if (!user) return res.sendStatus(403); //Forbidden 

    jwt.verify(user_token, 'test', (error, decoded) => {
        if(error)   return res.sendStatus(403) ;
        return res.status(200).send({user_token}) ;
    })
}

module.exports = handleRefresh ;