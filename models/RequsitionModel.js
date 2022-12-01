const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ItemSchema = new Schema({
    product_code: String,
    item_type: String,
    item_name: String,
    quantity: Number,
    unit_measurement: String,
    total_cost: Number,
    notes: String
},{_id:false})


const RequisitionSchema = new Schema({
    user_id: String,
    status: String,
    items: [ItemSchema]
},{timestamps: true})


const RequisitionModel = mongoose.model('requisition', RequisitionSchema)

module.exports = RequisitionModel