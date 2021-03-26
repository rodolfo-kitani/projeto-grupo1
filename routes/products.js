const express = require('express');
const products = require('../models/products')
const multer = require('multer');
const path = require('path');

// Importação dos  Middleware
const newProductMiddleware = require('../middlewares/newProduct');
const newProductControllers = require('../controllers/newProductController')

const router = express.Router();

// const listaDeProdutos = products.getProducts();

//Multer recebe o upload de img
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('public','images','uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, /*file.fieldname + '-' + Date.now()*/ file.originalname)
  }
})

const upload = multer({ storage: storage })

// http://localhost:3000/products

/* GET Listagem de Produto */
router.get('/', function(req, res, next) {
  res.render('products', { title: 'produtos', products: products.getProducts() });
});


/* GET do Cadastro de Produto */
router.get('/create', 
    newProductMiddleware.validateUser, 
    newProductControllers.get
);

/* POST do Cadastro de Produto */
router.post('/create',
  upload.single("photo"),
  newProductMiddleware.validateUser,
  newProductMiddleware.validateInput,
  newProductControllers.post
);


module.exports = router;
