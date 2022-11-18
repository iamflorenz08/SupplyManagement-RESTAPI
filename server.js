require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000
const AuthRoute = require('./routes/AuthRoute')
const SupplyRoute = require('./routes/SupplyRoute');
const { response } = require('express');

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
        setInterval(refresh,240000)
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

const refresh = ()=> {
    axios.get('https://supply-management-restapi.vercel.app')
        .then((response)=>{
            console.log(response.data)
        })
        .catch((error)=> {
            // handle error
            console.log(error);
          })
}


