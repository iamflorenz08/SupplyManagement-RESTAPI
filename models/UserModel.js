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

const PasswordSchema = new Schema({
    password: {
        type: String,
        default: null
    },
    isGmail: {
        type: Boolean,
        default: false
    }
}, {_id:false})

const UserSchema = new Schema({
    id_no: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: PasswordSchema
    },
    photo_URL: {
        type: String,
        default: null
    },
    full_name: {
        type: FullNameSchema
    },
    mobile_number: {
        type: String,
        default: null
    },
    department: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    access_token: {
        type: String,
        default: null
    },
    
    isApproved: {
        type: Boolean,
        default: false
    },
    archive: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;

