require('dotenv').config()
const express = require('express')
const app = express()
const axios = require('axios')
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000
const AuthRoute = require('./routes/AuthRoute')
const SupplyRoute = require('./routes/SupplyRoute')
const Profileroute = require('./routes/ProfileRoute')
const RequisitionRoute = require('./routes/RequisitionRoute')
const LogRoute = require('./routes/LogRoute')
const NotificationRoute = require('./routes/NotificationRoute')

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
        //setInterval(refresh,1000)
    }) 
    .catch((error) =>{
        console.log(error)
    })



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(AuthRoute)
app.use(SupplyRoute)
app.use(Profileroute)
app.use(RequisitionRoute)
app.use(LogRoute)
app.use(NotificationRoute)
app.get('/',(req,res)=>{
    res.status(200).send('Welcome to RES REST Api')
})

const refresh = ()=> {
    axios.get('http://localhost:3000/')
        .then((response)=>{
            console.log(response.data)
        })
        .catch((error)=> {
            // handle error
            console.log(error);
          })
}


