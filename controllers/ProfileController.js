const UserModel = require('../models/UserModel')

const post_update_photo = async (req,res) => {
    console.log(req.body)
    const email = req.email
    const photo_URL = req.body.photo_URL
    if(!photo_URL || !email) return res.status(200).json({message: "Failed", isError: true})
    const UserData = await UserModel.findOneAndUpdate({email}, {photo_URL})
    if(UserData) return res.status(200).json({message: "Success", isError: false})
    return res.status(200).json({message: "Failed", isError: true})
}

module.exports = {
    post_update_photo
}