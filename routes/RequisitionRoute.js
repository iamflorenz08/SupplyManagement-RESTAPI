const express = require('express')
const route = express.Router()
const middlewares = require('../middlewares/authenticateToken')
const RequisitionController = require('../controllers/RequisitionController')

route.get('/requisition', RequisitionController.get_requisition)
route.post('/requsition/approve/:isApprove', RequisitionController.post_approve)
route.post('/requisition/users', RequisitionController.post_users)
route.post('/requisition/request-item', middlewares.authenticateToken, RequisitionController.post_request_item)


module.exports = route