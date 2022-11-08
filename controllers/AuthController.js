const UserModel = require('../models/UserModel')
const post_add_user = async (req, res) =>{
    const userData = req.body
    try{
        const User = await UserModel.create(
            { 
                email: userData.email, 
                password: userData.password, 
                photo_URL: userData.photo_URL, 
                full_name: {
                    first_name: userData.full_name.first_name,
                    last_name: userData.full_name.last_name,
                    middle_name: userData.full_name.middle_name
                },
                mobile_number: userData.mobile_number, 
                department: userData.department, 
                position: userData.position, 
                isApproved: userData.isApproved
            })
        res.status(200).json(User)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    post_add_user
}