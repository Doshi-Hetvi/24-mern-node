const mongoose = require('mongoose')
const Schema = mongoose.Schema

const addressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  address: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
  },
  country: {
    type: String,
  },

})

module.exports = mongoose.model('Address', addressSchema)