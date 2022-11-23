require('dotenv').config()
const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const authenticateToken = async (req,res,next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const password = req.body.newPassword
    if(token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.RECOVERY_TOKEN, (err, data)=>{
        if(err) return res.status(200).json({message: err.message, isError: true})
        req.email = data.email
        req.password = password
        next()
    })
    
    return res.status(401) 
}


module.exports = {
    authenticateToken
}