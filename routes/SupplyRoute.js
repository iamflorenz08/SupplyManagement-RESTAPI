const express = require('express')
const route = express.Router()
const SupplyController = require('../controllers/SupplyController')
const middlewares = require('../middlewares/authenticateToken')

route.post('/supply/add', SupplyController.post_add_item)
route.post('/supply/edit', SupplyController.post_edit_details)
route.post('/supply/delete', SupplyController.delete_item)
route.post('/supply/details', middlewares.authenticateToken,SupplyController.post_all_details)
route.get('/supply/details', SupplyController.get_all_details)
route.get('/supply/details/:page/:limit' ,SupplyController.get_all_details)
route.get('/supply/count', SupplyController.get_supply_count)
route.get('/supply/info/:stock_id', SupplyController.get_supply_detail)


module.exports = route