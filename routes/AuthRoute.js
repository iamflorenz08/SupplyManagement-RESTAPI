const express = require('express');
const route = express.Router()
const AuthController = require('../controllers/AuthController')

// route.post('/signup', signup);
//route.post('/email-activate', activateAccount);


route.post('/add', AuthController.post_add_user)

module.exports = route