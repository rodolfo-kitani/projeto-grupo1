var express = require('express');
const model = require('../models/products')

var router = express.Router();

// http://localhost:3000/products

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('products', { title: 'produtos', products: model.getProducts() });
});

module.exports = router;
