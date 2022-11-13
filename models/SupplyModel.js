const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SupplySchema = new Schema({
    serial_number: {
        type: String,
        unique: true,
        required: true
    },
    item_name: {
        type: String,
        required: true
    },
    item_image:{
        type: String,
        default: null
    },
    item_desc: {
        type: String,
        default: null
    },
    category: {
        type: String,
        default: "Others"
    },
    max_quantity: {
        type: Number,
        default: 0
    },
    available: {
        type: Number,
        default: 0
    },
    location:{
        type: String,
        default: null
    },
    isReturnable:{
        type: Boolean,
        default: false
    }
})

const SupplyModel = mongoose.model('supplies', SupplySchema)

module.exports = SupplyModel