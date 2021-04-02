const express = require('express');
const products = require('../models/products')
const multer = require('multer');
const path = require('path');

// Importação dos  Middleware
const newProductMiddleware = require('../middlewares/newProduct');
const newProductControllers = require('../controllers/newProductController');
const { getProducts } = require('../models/products');

const router = express.Router();

// const listaDeProdutos = products.getProducts();

//Multer recebe o upload de img
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join('public', 'images', 'uploads'))
    },
    filename: function(req, file, cb) {
        cb(null, /*file.fieldname + '-' + Date.now()*/ file.originalname)
    }
})

const upload = multer({ storage: storage })

let productsEdit = getProducts();

// http://localhost:3000/products

/* GET Listagem de Produto */
router.get('/', async function(req, res, next) {
    res.render('products', { title: 'produtos', products: await products.getProducts() });
    console.log(await products)
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

router.delete('/create/:id', function(req, res) {


    products = products.filter(function(product) {
        return product.id !== parseInt(req.params.id);
    })
    res.render('products', { products: products })
});
module.exports = router;