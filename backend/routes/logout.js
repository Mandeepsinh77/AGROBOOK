const jwt = require('jsonwebtoken') ;
const User = require('../models/User.js') ; 


const handleLogout = async (req, res)=> {
    const cookies = req.cookies ; 
    if (!cookies?.jwt) return res.sendStatus(401); // unauthorized

    const user_token = cookies.jwt ; 
    const user = User.findOne({user_token}) ;

    const updatedUser = User.findByIdAndUpdate(user._id, {...user._doc, user_token: ""}, {new: true}) ; 
    console.log(updatedUser);

    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    res.sendStatus(204);
}

module.exports = handleLogout;