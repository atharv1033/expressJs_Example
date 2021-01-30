var mongoose = require('mongoose')

const productScheme = new mongoose.Schema({
    name: String,
    image_name: String,
    description: String,
    quantity: Number,
    unit_price: Number
});

module.exports = mongoose.model('Product', productScheme);