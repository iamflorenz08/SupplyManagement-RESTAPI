const express = require('express')
const route = express.Router()
const SupplyController = require('../controllers/SupplyController')
const middlewares = require('../middlewares/authenticateToken')

route.post('/supply', SupplyController.post_detail)
route.post('/supply/details', middlewares.authenticateToken,SupplyController.post_all_details)
// route.get('/supply/details/:id')

module.exports = route