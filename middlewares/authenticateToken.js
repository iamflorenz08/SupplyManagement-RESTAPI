require('dotenv').config()
const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const authenticateToken = async (req,res,next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const type = req.body
    if(token == null) return res.sendStatus(401)

    const User = await UserModel.findOne({access_token: token})

    if(User){
        jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, data)=>{
            if(err) return res.sendStatus(401)
            req.email = User.email
            req.userData = User
            next()
        })
    }
    
    try{
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.CLIENT_ID 
        });
        const payload = ticket.getPayload();        
        req.email = payload.email
        next() 
    }
    catch(err){
        return res.status(401) 
    }
    
    return res.status(401) 
    
    
    // if(type.isGmail){
    //     try{
    //         const ticket = await client.verifyIdToken({
    //             idToken: token,
    //             audience: process.env.CLIENT_ID, 
    //         });
    //         const payload = ticket.getPayload();        
    //         req.email = payload.email
    //         next()
    //     }catch(error){
    //         return res.status(401)
    //     }
    // }
    // else{
    //     const User = await UserModel.findOne({access_token: token})
    //     if(User){
    //         jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, data)=>{
    //             if(err) return res.sendStatus(401)
    //             req.email = User.email
    //             req.userData = User
    //             next()
    //         })
    //     }
    //     return res.status(401) 
    // }   
}


module.exports = {
    authenticateToken
}