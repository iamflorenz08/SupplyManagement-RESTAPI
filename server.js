const express = require('express')
require ('dotenv').config()
// const morgan = require('morgan');
// const bodyparser = require('body-parser');
// const path = require('path');
const mongoose = require('mongoose');

const app = express()

const employeeRoutes = require('./routes/employee')

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(process.env.PORT, () => console.log(`Server is running on http://localhost:${PORT}`));

}) .catch ((error) =>{
    console.log(error)
})

const PORT = process.env.PORT || 3000

app.use(express.json())

app.get((req, res, next) =>{
    console.log(req.path, req.method)
    next()
})


app.use('/employee', employeeRoutes);

//log requests
// app.use(morgan('tiny'));

//parse request to body-parser
// app.use(bodyparser.urlencoded ({extended: true}))

//set view engine
// app.set("view engine", "ejs")
// //app.set("views", path.resolve(__dirname, "views/ejs"))

// //load assets
// app.use("/css", express.static(path.resolve(__dirname, "assets/css")))
// app.use("/img", express.static(path.resolve(__dirname, "assets/img")))
// app.use("/js", express.static(path.resolve(__dirname, "assets/js")))

app.get('/', (req, res) =>{
    res.json({mssg: 'Welcome to the app'})
})

// app.get('/', (req, res) =>{
//     res.render('index');
// });

router.post('/employee', async (req, res) =>{
    const{id, email, password, photoURL, fname, lname, mi, mobileNumber, department, position, isApproved} = req.body

    try{
        const employee = await Employee.create({id, email, password, photoURL, fname, lname, mi, mobileNumber, department, position, isApproved})
        res.status(200).json(employee)
    } catch (error){
        res.status(400).json({error: error.message})
    }
})

// app.get('add_user', (req, res) =>{
//     res.render('add_user');
// });





