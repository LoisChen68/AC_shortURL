const mongoose = require('mongoose')
const Schema = mongoose.Schema

const URLSchema = new Schema({
  URL: {
    type: String,
    required: true
  },
  stortURL: {
    type: String,
    required: true
  }
})

module.exports = mongoose.model('URL', URLSchema)