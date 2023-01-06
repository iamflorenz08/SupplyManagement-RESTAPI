const express = require('express')
const route = express.Router()
const NotificationController = require('../controllers/NotificationController')

route.post('/notification', NotificationController.get_notification)
route.post('/notification/read', NotificationController.read_notification)
module.exports = route