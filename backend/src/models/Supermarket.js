const mongoose = require('mongoose')

const SupermarketSchema = new mongoose.Schema({
  market_id: {
    type: String
  },

  market_name: {
    type: String,
    required: true
  },
  market_mail: {
    type: String,
    required: true
  },
  market_password: {
    type: String,
    required: true
  },
  market_cnpj: {
    type: String,
    required: true,
    minlength: 14,
    maxlength: 20
  },

  market_cep: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 11
  },

  market_street: {
    type: String,
    required: true
  },

  market_number: {
    type: Number,
    required: true
  },

  market_neighborhood: {
    type: String,
    required: true
  },

  market_city: {
    type: String,
    required: true
  },

  market_uf: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 2
  },

  market_latitude: {
    type: Number
  },

  market_longitude: {
    type: Number
  },

  market_picture_url: {
    type: String
  },
})

SupermarketSchema.pre('save', function() {
  if(!this.market_picture_url) {
    this.market_picture_url = `${process.env.APP_URL}/files/${this.market_picture_key}`
  }
})

module.exports = mongoose.model('Supermarket', SupermarketSchema)