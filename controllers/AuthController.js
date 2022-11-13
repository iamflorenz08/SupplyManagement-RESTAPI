const UserModel = require('../models/UserModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { json } = require('express')
require('dotenv').config()

const post_add_user = async (req, res) =>{
    const userData = req.body
    let password = userData.password.password
    let token = null

    if(password){
        password = await bcrypt.hash(password, 10)
    }

    if(!userData.password.isGmail) token = generateToken(userData.email)

    try{
        const User = await UserModel.create(
            { 
                email: userData.email, 
                password: {
                    password: password,
                    isGmail: userData.password.isGmail
                }, 
                photo_URL: userData.photo_URL, 
                full_name: {
                    first_name: userData.full_name.first_name,
                    last_name: userData.full_name.last_name,
                    middle_name: userData.full_name.middle_name
                },
                mobile_number: userData.mobile_number, 
                department: userData.department, 
                position: userData.position,
                access_token: token,
                isApproved: userData.isApproved
            })
        res.status(200).json(token)
    } catch (error){
        res.status(400).json({error: error.message})
    }

}

const post_sign_in = async (req,res) =>{
    const email = req.body.email
    const rawPassword = req.body.password

    if(!email || !rawPassword) return res.status(400).json({message: "Invalid input"})

    let userData = await UserModel.findOne({email})
    if(!userData) return res.status(200).json({ message: "User not found"})
    if(userData.password.isGmail) return res.status(200).json({ message: "Continue with gmail instead"})

    const hashedPassword = userData.password.password

    const isMatch = await bcrypt.compare(rawPassword, userData.password.password)
    if(!isMatch) return res.status(200).json({message: "Wrong password"})
    
    return res.status(200).json(userData.access_token)
}

const get_check = async (req,res)=>{
    const email = req.query.email
    let userData = await UserModel.findOne({email})
    
    if(userData){
        return res.status(200).json({
            isExist: true,
            isGmail: userData.password.isGmail
        })
    }

    return res.json({
        isExist: false,
        isGmail: false
    })
}   

const generateToken = (email) =>{
    const token = jwt.sign({email}, process.env.ACCESS_SECRET_TOKEN)
    return token
}

module.exports = {
    post_add_user,
    post_sign_in,
    get_check
}