const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    product_code: String,
    item_type: String,
    item_name: String,
    item_image: String,
    quantity: Number,
    unit_measurement: String,
    total_cost: Number,
    notes: String
}, { _id: false })

const UserDetails = new Schema({
    full_name: String,
    position: String,
    department: String,
    id_no: String,
    mobile_number: String,
}, { _id: false })


const RequisitionSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        default: null
    },
    userDetails: {type: UserDetails, default: null},
    status: String,
    items: [ItemSchema]
}, { timestamps: true })


const RequisitionModel = mongoose.model('requisition', RequisitionSchema)

module.exports = RequisitionModel