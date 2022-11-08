require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000
const AuthRoute = require('./routes/AuthRoute')

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
    }) 
    .catch((error) =>{
        console.log(error)
    })


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(AuthRoute);




