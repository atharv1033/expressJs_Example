var mongoose = require('mongoose')

const cartScheme = new mongoose.Schema({
    product_ids: Array,
    quantity: Number
});

module.exports = mongoose.model('Cart', cartScheme);