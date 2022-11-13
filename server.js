require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000
const AuthRoute = require('./routes/AuthRoute')
const SupplyRoute = require('./routes/SupplyRoute')

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
app.use(SupplyRoute)

app.get('/',(req,res)=>{
    res.status(200).send('Welcome to RES REST Api')
})




