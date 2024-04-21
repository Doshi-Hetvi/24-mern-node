const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    name:{
        type: String,
    },
    email:{
        type:String,
        unique: true,
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
    },
    address: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Address'
        },
    ]
})

userSchema.virtual('defaultAddress').get(function () {
    return this.address.length > 0 ? this.address[0] : null;
})

module.exports=mongoose.model('User',userSchema)