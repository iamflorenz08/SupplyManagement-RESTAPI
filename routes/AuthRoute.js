const express = require('express');
const route = express.Router()
const AuthController = require('../controllers/AuthController')
const AccessTokenMiddleware = require('../middlewares/authenticateToken')
const RecoveryToken = require('../middlewares/RecoveryToken')

route.post('/auth/create', AuthController.post_add_user)
route.post('/auth/signin', AuthController.post_sign_in)
route.get('/auth/check', AuthController.get_check)
route.post('/auth/admin', AuthController.post_admin_auth)
route.post('/auth/recover', AuthController.post_recover)
route.post('/auth/reset', RecoveryToken.authenticateToken,AuthController.post_auth_reset)
route.post('/user/edit', AuthController.post_edit_user)
route.get('/users/:page/:limit', AuthController.get_users)
route.get('/user/count', AuthController.get_user_count)
route.get('/user/:employee_id', AuthController.get_user_data)
route.post('/user', AccessTokenMiddleware.authenticateToken, AuthController.get_user)

module.exports = route