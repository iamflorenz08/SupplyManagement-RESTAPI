const NotificationModel = require('../models/NotificationModel')
const get_notification = async(req,res) => {
    const user = req.query
    const notifications = await NotificationModel.find(user).populate('request').sort({createdAt: -1})
    if(!notifications) return res.sendStatus(400)
    res.status(200).json(notifications)
}

const read_notification = async(req,res) => {
    const _id = req.query.notif_id
    await NotificationModel.findByIdAndUpdate({_id}, {isRead: true})
}

module.exports = {
    get_notification,
    read_notification
}