const express = require('express')
const route = express.Router()
const SupplyController = require('../controllers/SupplyController')
const middlewares = require('../middlewares/authenticateToken')

route.post('/supply/add', SupplyController.post_add_item)
route.post('/supply/details', middlewares.authenticateToken,SupplyController.post_all_details)
route.get('/supply/details' ,SupplyController.get_all_details)

module.exports = route