require('dotenv').config()
const nodemailer = require('nodemailer')
const ejs = require('ejs')

const sendRecoveryEmail = async (email, token) => {

    // ejs.renderFile('./views/email_template.ejs', {token: token} , async (err,data)=>{
    //     let transporter = nodemailer.createTransport({
    //         service: "gmail",
    //         port: 465,
    //         auth: {
    //           user: process.env.EMAIL,
    //           pass: process.env.EMAIL_PASSWORD,
    //         },
    //     });

    //     let info = await transporter.sendMail({
    //         from: process.env.EMAIL, // sender address
    //         to: email, // list of receivers
    //         subject: "Password Recovery", // Subject line
    //         html: data, // html body
    //     })

    //     console.log("Message sent: %s", info.messageId);
    // })

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
        html: `<div style="display: flex; font-family: Arial">
        <div
            style="text-align: center; border: 2px solid #4B5563;padding: 1rem; border-radius: 10px;  background-color: white;">
            <div style="display: flex; align-items: center;">
                <img src="https://i.ibb.co/qNmYXgF/smslogo.png" height="50px" width="50px">
                <h3 style="margin-left: 20px; color: #4B5563;">Forgot your password? Let's get you new one.</h3>
            </div>
            <hr>
            <div>
                <h4 style="color: #4B5563;">Supply Management System</h4>
            </div>
            <hr>
            <div style="margin: 40px 40px 30px 40px;">
                <a href="http://www.ressupplymanagement.com/${token}"
                    style="background-color: #1D4ED8; border: 1px solid #4B5563; padding: 15px 30px; border-radius: 10px; color: white; text-decoration: none;">
                    Reset Password
                </a>
            </div>
    
        </div>
    </div>`, // html body
    })

    console.log("Message sent: %s", info.messageId);
}

module.exports = { sendRecoveryEmail }