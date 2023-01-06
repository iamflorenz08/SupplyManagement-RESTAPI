const express = require('express')
const route = express.Router()
const LogController = require('../controllers/LogController')


route.get('/log/stock/:page/:limit', LogController.get_stock_logs)
route.get('/log/stock/:page/:limit/:sort', LogController.get_stock_logs)
route.get('/log/requisition/count/:sort', LogController.get_requisition_counts)

module.exports = route