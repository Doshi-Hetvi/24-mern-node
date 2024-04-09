const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const serviceSchema = new Schema ({
    servicename:{
        type:String,
        required: true
    },
    category:{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    },
    type:{
        type: Schema.Types.ObjectId,
        ref: 'Type'
    },
    serviceprovider:{
        type: Schema.Types.ObjectId,
        ref: 'Serviceprovider'
    },
    subCategory:{
        type: Schema.Types.ObjectId,
        ref: 'SubCategory'
    },
    amount:{
        type:Number
    },
    area:{
        type:String,
        required: true
    },
    city:{
        type:String,
        required: true
    },
    state:{
        type:String,
        required:true
    }
,imageUrl:{
    type: String,
    required:true
}

})

module.exports=mongoose.model('Service',serviceSchema)