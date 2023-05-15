require('dotenv').config()
const express = require('express')
const { createServer } = require('http')
const { Server } = require('socket.io')
const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin: "http://localhost:3000"
    }
})

const axios = require('axios')
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3000
const AuthRoute = require('./routes/AuthRoute')
const SupplyRoute = require('./routes/SupplyRoute')
const Profileroute = require('./routes/ProfileRoute')
const RequisitionRoute = require('./routes/RequisitionRoute')
const LogRoute = require('./routes/LogRoute')
const NotificationRoute = require('./routes/NotificationRoute')
const SupplyRouteV2 = require('./routes/v2/SupplyRoute')

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        httpServer.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`))
    })
    .catch((error) => {
        console.log(error)
    })

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000")
    res.header("Access-Control-Allow-Methods", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
});

app.use(AuthRoute)
app.use(SupplyRoute)
app.use(Profileroute)
app.use(RequisitionRoute)
app.use(LogRoute)
app.use(NotificationRoute)
app.use('/api/v2/supply', SupplyRouteV2)
app.get('*', (req, res) => {
    res.status(200).send('Welcome to RES REST Api')
})

io.on("connection", (socket) => {
    socket.on("notify-server", (data) => {
        io.emit("notify-admin", socket.id)
    })
})

// const csv = require('csv-parser')
// const fs = require('fs')
// const SupplyModel = require('./models/SupplyModel')
// const results = [];

// fs.createReadStream('sample.csv')
//     .pipe(csv())
//     .on('data', (data) => {

//         const unit_cost = parseFloat(data.unit_cost)
//         const unit_measurement = data.unit_measurement.trim()
//         const item_type = (unit_cost < 15000.0) ? "RIS" : (unit_cost < 50000.0) ? "ICS" : "PAR";
//         const source_of_fund = (item_type === "ICS" || item_type === "PAR") ? "National fund" : null;
//         const item_code_type = (item_type === "ICS" || item_type === "PAR") ? "PropertyNo" : "StockNo";
    
//         results.push({...data, item_type, source_of_fund, item_code_type,unit_cost})
//     })
//     .on('end', async() => {
//         console.log(results)
//         await SupplyModel.insertMany(results)
//         // [
//         //   { NAME: 'Daffy Duck', AGE: '24' },
//         //   { NAME: 'Bugs Bunny', AGE: '22' }
//         // ]
//     });

