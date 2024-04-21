const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    servicename: {
        type: String,
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    type: {
        type: Schema.Types.ObjectId,
        ref: 'Type'
    },
    serviceprovider: {
        type: Schema.Types.ObjectId,
        ref: 'Serviceprovider'
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: 'SubCategory'
    },
    servicedescription: {
        type: String,
    },
    amount: {
        type: Number
    },
    area: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    }
    , 
    imageUrl: {
        type: String,
    }

})

module.exports = mongoose.model('Service', serviceSchema)