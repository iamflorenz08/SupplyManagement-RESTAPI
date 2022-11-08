const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FullNameSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    middle_name: {
        type: String
    }
},{_id:false})

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String
    },
    photo_URL: {
        type: String,
        required: true
    },
    full_name: {
        type: FullNameSchema
    },
    mobile_number: {
        type: String
    },
    department: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    isApproved: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;

