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

//let productsEdit = getProducts(); //verificar esse código

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

//*******Rota para deletar um produto

//Inicialmente seria utilizada a rota /create/:id, mas devido ao Middleware de validação do formulário foi utilizada a /create/delete 
/*
router.get('/create/delete/:id', function (req, res) {
    
    console.log("aqui 1", req.params.id);
    
    //res.send("vendo o produto: ", req.params.id);
})
*/

router.delete('/create/delete/', function(req, res) {
    let productId = req.body.id;
    products.deleteProduct(productId);
    res.redirect("/products/create");
});

//Rota para editar um produto
router.get('/create/edit/:id', function(req,res) {
    let types = newProductControllers.types;
    let productId = req.params.id
    let tempProduct = products.findProduct(productId);
    //console.log("temp product > ", tempProduct);
    //console.log("type > ", types);
    res.render('editproduct', { tempProduct: tempProduct[0], types: types })
});


//Rota com PUT para edição do produto
router.put("/create", function(req, res) {
    res.send("PUT");

    //Essa rota precisa ser implementada.
    //Mas já esta declarada pois em breve será feita a conexão com o MYSQL
});

module.exports = router;