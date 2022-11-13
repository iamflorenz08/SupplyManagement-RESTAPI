const express = require('express')
const route = express.Router()
const SupplyController = require('../controllers/SupplyController')

route.post('/supply', SupplyController.post_detail)

// route.get('/supply/details')
// route.get('/supply/details/:id')

module.exports = route