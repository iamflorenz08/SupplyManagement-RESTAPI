require('dotenv').config()
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

const authenticateToken = async (req,res,next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const type = req.body
    if(token == null) return res.sendStatus(401)
    
    if(type.isGmail){
        try{
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: process.env.CLIENT_ID, 
            });
            const payload = ticket.getPayload();
            req.payload = payload
            next()
        }catch(error){
            return res.sendStatus(401)
        }
    }
    else{
        jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (err, data)=>{
            if(err) return res.sendStatus(401)
            req.token = token
            next()
        })
    }   
}


module.exports = {
    authenticateToken
}