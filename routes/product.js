var express = require('express');
var router = express.Router();
const multer = require('multer');
const upload = multer({ dest: '../uploads/' });
const Product = require('../models/product');
const Cart = require('../models/cart');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/product', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function () {

    router.post('/add', upload.single('file-to-upload'), async function (req, res, next) {

        const product = new Product({
            name: req.body.name,
            image_name: req.file.filename,
            description: req.body.description,
            quantity: req.body.quantity,
            unit_price: req.body.unit_price
        });

        var document = await product.save();

        res.send(document._id);
    });

    router.get('/list', async function (req, res, next) {
        const product_list = await Product.find();
        res.send(product_list);
    });

    router.post('/add_to_cart', async function (req, res, next) {
        const cart_id = req.body.cart_id;

        const cart = await Cart.findOne({ name: cart_id })
        cart.product_ids.push(req.body.product_id);
        cart.quantity = cart.quantity + 1;

        letdoc = await cart.save();

        res.send('added to cart')
    });

    router.post('/list_cart', async function (req, res, next) {
        const list_cart = await Cart.find();
        res.send(list_cart);
    });
});

module.exports = router;
