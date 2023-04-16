const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SavedItemSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    item: {
        type: Schema.Types.ObjectId,
        ref: 'stock'
    }
})

const SavedItemModel = mongoose.model('SavedItem', SavedItemSchema)

module.exports = SavedItemModel