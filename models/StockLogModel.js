const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserDetails = new Schema({
    full_name: String,
    position: String,
    department: String,
    id_no: String,
    mobile_number: String,
}, { _id: false })

const StockLogSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    userDetails:{
        type: UserDetails,
        default: null
    },
    requestID: {
        type:Schema.Types.ObjectId,
        ref: 'requisition'
    },
    requestItem: {
        type: Schema.Types.ObjectId,
        ref: 'stock'
    },
    itemQuantity: Number,
    remainingItem: Number,
    isReturned: Boolean
},{timestamps: true})

const StockLogModel = mongoose.model('StockLog', StockLogSchema)

module.exports = StockLogModel