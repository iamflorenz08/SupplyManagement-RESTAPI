const mongoose = require('mongoose')
const Schema = mongoose.Schema

const NotificationSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    request : {type: Schema.Types.ObjectId, ref: 'requisition'},
    approval: String,
    isRead: Boolean,
    isAdminRead: { type: Boolean, default: false},
}, {timestamps:true})

const NotificationModel = mongoose.model('notification', NotificationSchema)

module.exports = NotificationModel