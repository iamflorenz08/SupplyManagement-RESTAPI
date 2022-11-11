const express = require('express');
const route = express.Router()
const AuthController = require('../controllers/AuthController')
const middlewares = require('../middlewares/authenticateToken')

route.post('/auth/create', AuthController.post_add_user)
route.post('/auth/signin', AuthController.post_sign_in)
route.get('/auth/check', AuthController.get_check)

module.exports = route