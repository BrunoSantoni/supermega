const mongoose = require('mongoose')
const Supermarket = require('./Supermarket')

const ProductSchema = new mongoose.Schema({
  product_name: {
    type: String,
    required: true
  },

  product_description: {
    type: String,
    required: true
  },

  product_price: {
    type: Number,
    required: true
  },

  product_picture_url: {
    type: String
  },

  product_picture_key: {
    type: String
  },

  market_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Supermarket
  }
})

ProductSchema.pre('save', function() {
  if(!this.product_picture_url) {
    this.product_picture_url = `${process.env.APP_URL}/files/${this.product_picture_key}`
  }
})

module.exports = mongoose.model('Product', ProductSchema)