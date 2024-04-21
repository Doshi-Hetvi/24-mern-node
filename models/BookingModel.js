const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    service:{
        type:Schema.Types.ObjectId,
        ref:'Service'
    },
    serviceprovider:{
        type: Schema.Types.ObjectId,
        ref: 'Serviceprovider'
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    amount:{
        type:Number
    },
    status:{
        type:String,
        default:"Pending"
    },
    address: {
        type: Schema.Types.ObjectId,
        ref: 'Address',
        default: null
    }
})

module.exports = mongoose.model('Booking', bookingSchema)