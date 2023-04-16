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
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(AuthRoute)
app.use(SupplyRoute)
app.use(Profileroute)
app.use(RequisitionRoute)
app.use(LogRoute)
app.use(NotificationRoute)
app.use('/api/v2/supply', SupplyRouteV2)
app.get('/', (req, res) => {
    res.status(200).send('Welcome to RES REST Api')
})

io.on("connection", (socket) => {
    socket.on("notify-server", (data) => {
        io.emit("notify-admin", socket.id)
    })
})



