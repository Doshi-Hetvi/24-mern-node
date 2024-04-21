const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const serviceProviderSchema = new Schema ({
    name:{
        type: String,
    },
    email:{
        type:String,
        unique: true,
    },
    company:{
        type:String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    country: {
        type: String,
    },
    postalcode: {
        type: String,
    },
    aboutme: {
        type: String,
    },
    password:{
        type: String,
        unique:true,
        required: true
    },
    phone: {
        type: String,
    },
    role:{
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }
})

module.exports=mongoose.model('Serviceprovider',serviceProviderSchema)