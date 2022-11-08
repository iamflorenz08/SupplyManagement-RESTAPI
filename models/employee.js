const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    id: {
        type: String,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photoURL: {
        type: String,
    },
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    mi: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: String,
        required: true
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
        type: Boolean
    }
}, {timestamps: true});

const Employee = mongoose.model('/employee', employeeSchema);

module.exports = Employee;

Employee.find();