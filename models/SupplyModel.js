const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SupplySchema = new Schema({
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
        required: true,
    },
    category: {
        type: String,
        required: true
    },
    current_supply:{
        type: Number,
        default: 0
    },
    unit_measurement: {
        type: String,
        required: true
    },
    source_of_fund: {
        type: String,
        required: true
    },
    unit_cost: {
        type: Number,
        required: true
    },
    desc: {
        type: String,
        default: null
    }
})

const SupplyModel = mongoose.model('stock', SupplySchema)

module.exports = SupplyModel