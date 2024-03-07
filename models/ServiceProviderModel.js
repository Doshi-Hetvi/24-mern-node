const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const serviceProviderSchema = new Schema ({
    name:{
        type: String,
        required: true
    },
    email:{
        type:String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phone: {
        type: String,
        unique:true,
        required: true
    },
    role:{
        type: Schema.Types.ObjectId,
        ref: 'Role'
    }
})

module.exports=mongoose.model('Serviceprovider',serviceProviderSchema)