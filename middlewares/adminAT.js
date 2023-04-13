require('dotenv').config()
const jwt = require('jsonwebtoken')

const authenticateToken = async (req,res,next) =>{
    const token = req.query.token
    console.log(token)
    jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, data)=>{
        if(err) return res.sendStatus(401)
        req.username = data.username
        next()
    })
    return res.status(401) 
}

module.exports = {authenticateToken}