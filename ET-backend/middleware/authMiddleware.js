let jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = async (req , res, next) => {
    let {token} = req.cookies;
    
    if(!token){
        return res.status(401).json({
            success: false,
            message: "User Unauthorized"
        })
    }

    let isValidToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = isValidToken.id;
    next();
}


module.exports = authMiddleware;