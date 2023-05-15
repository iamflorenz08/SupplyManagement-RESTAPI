const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SupplySchema = new Schema({
    item_code_type: {
        type: String
    },
    item_type: {
        type: String,
        required: true
    },
    product_code: {
        type: String,
        required: true
    },
    photo_url: {
        type: String,
        default: null
    },
    item_name: {
        type: String,
        required: true,
    },
    storage_no: {
        type: String,
        default: null,
    },
    category: {
        type: String,
        default: null
    },
    current_supply:{
        type: Number,
        default: 0
    },
    unit_measurement: {
        type: String,
        default: null
    },
    source_of_fund: {
        type: String,
        default: null
    },
    unit_cost: {
        type: Number,
        default: null
    },
    desc: {
        type: String,
        default: null
    },
    buffer: {
        type: Number,
        default: 0
    }
})

const SupplyModel = mongoose.model('stock', SupplySchema)

module.exports = SupplyModel