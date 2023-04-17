const express = require('express')
const route = express.Router()
const NotificationController = require('../controllers/NotificationController')

route.post('/notification', NotificationController.get_notification)
route.post('/notification/read', NotificationController.read_notification)
route.get('/notification', NotificationController.get_all_notification)
route.post('/notification/read-all', NotificationController.post_read_all)

module.exports = route