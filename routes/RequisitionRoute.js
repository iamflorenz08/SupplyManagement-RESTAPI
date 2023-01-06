const express = require('express')
const route = express.Router()
const middlewares = require('../middlewares/authenticateToken')
const RequisitionController = require('../controllers/RequisitionController')



route.get('/requisition', RequisitionController.get_mobile_requisition)
route.post('/requisition/complete', RequisitionController.post_complete_request)
route.get('/requisition/count', RequisitionController.get_requisition_count)
route.get('/requisition/page/:page/:limit', RequisitionController.get_requisition)
route.post('/requisition/:requestID/:isApprove', RequisitionController.post_approve)
route.post('/requisition/add', RequisitionController.post_add_request)
route.post('/requisition/users', RequisitionController.post_users)
route.post('/requisition/request-item', middlewares.authenticateToken, RequisitionController.post_request_item)
route.get('/requisition/:id', RequisitionController.request_info)



module.exports = route