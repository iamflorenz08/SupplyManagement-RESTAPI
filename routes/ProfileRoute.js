const express = require('express')
const route = express.Router()
const ProfileController = require('../controllers/ProfileController')
const middlewares = require('../middlewares/authenticateToken')

route.post('/profile/update_photo', middlewares.authenticateToken,ProfileController.post_update_photo)

module.exports = route