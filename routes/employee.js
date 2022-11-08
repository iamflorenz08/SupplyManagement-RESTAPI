const express = require('express');

const router = express.Router()

router.get('/server', (req, res) => {
    res.json({mssg: 'GET all employees'})
})

router.get('/:id', (req, res) => {
    res.json({mssg: "GET a single employee"})
})

router.post('/:id', (req, res) => {
    res.json({mssg: "POST a single request"})
})

router.delete('/:id', (req, res) => {
    res.json({mssg: "DELETE an employee"})
})

router.patch('/:id', (req, res) => {
    res.json({mssg: "UPDATE an employee"})
})


module.exports = router