const mongoose = require('mongoose')
const Schema = mongoose.Schema

const otpSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    otp: {
        type: String,
        required: true
    },
    status: {
        type: Boolean
    },
    time: {
        type: Number,
        default: Date.now
    }
})

module.exports = mongoose.model('Otp', otpSchema)