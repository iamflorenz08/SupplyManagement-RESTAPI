const UserModel = require('../models/UserModel')

//const jwt = require('jsonwebtoken')
// const mailgun = require('mail-gun')
// const DOMAIN = 'Domain URL'
// const mg = mailgun({apikey: process.env.MAILGUN_APIKEY, domain: DOMAIN});

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


// exports.signup = (req, res) => {
//     console.log(req.body);
//     const {name, email, password} = req.body;
//     User.findOne({email}).exec((err, user) =>{
//         if (user) {
//             return res.status(400).json({error: "User with this email already exists. "});
//         }

//         const token = jwt.sign({name, email, password}, process.env.JWT_ACC_ACTIVATE, {expiresIn: '20m'});

//         const data = {
//             from: 'noreply@gmail.com',
//             to: email,
//             subject: 'Account Activation Link',
//             html: `
//                 <h2>Please click on given link to activate your account</h2>
//                 <p>${process.env.CLIENT_URL}/authentication/activate ${token}</p>
            
//             `
//         }
//         me.messages().send(data, function (error, body){
//             if(error) {
//                 return res.json({
//                     message: err.message
//                 })
//             }
//             return res.json({message: 'Email has been sent, kindly check your account'})
//         });
//     });
// }

// exports.activateAccount =(req, res) => {
//     const {token} = req.body;
//     if (token) {
//         jwt.verify(token.process.env.JWT_ACC_ACTIVATE, function (err, decodedToken){
//             if (err){
//                 return res.status(400).json({error: "Incorrect or Expired link. "})
//             }
//             const {name, email, password} = decodedToken;
//             User.findOne({email}).exec((err, user) =>{
//                 if (user) {
//                     return res.status(400).json ({error: "User with this email already exists."});
//                 }
//                 let newUser = new User ({name, email, password});
//                 newUser.save((err, sucess) => {
//                     if (err) {
//                         console.log("Error in signup while account activation", err)
//                         return res.status(400), json ({error: 'Error activating account'})
//                     }
//                     res.json ({
//                         message: "Sign-Up Success"
//                     })
//                 })
//             });
//         })
//     } else{
//         return res.json({error: "Something went wrong!"})
//     }
// }




module.exports = {
    post_add_user
}