require('dotenv').config()
const nodemailer = require('nodemailer')
const ejs = require('ejs')

const sendRecoveryEmail = (email,token) => {

    ejs.renderFile('./views/email_template.ejs', {token: token} ,async(err,data)=>{
        let transporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.EMAIL_PASSWORD,
            },
        });
    
        let info = await transporter.sendMail({
            from: process.env.EMAIL, // sender address
            to: email, // list of receivers
            subject: "Password Recovery", // Subject line
            html: data, // html body
        })

        console.log("Message sent: %s", info.messageId);
    })
}

module.exports = {sendRecoveryEmail}