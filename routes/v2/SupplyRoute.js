const express = require('express')
const route = express.Router()
const SupplyController = require('../../controllers/v2/SupplyController')


route.put('/add', SupplyController.put_add_supply)
route.post('/saved-items', SupplyController.post_saved_items)
route.delete('/saved-items', SupplyController.delete_saved_items)
route.get('/saved-items/:user_id', SupplyController.get_saved_items)
route.get('/recommend/:user_id', SupplyController.get_recommend)


module.exports = route