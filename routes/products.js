const express = require('express');
const productsModel = require('../models/products')
const multer = require('multer');
const path = require('path');

// Importação dos  Middleware
const newProductMiddleware = require('../middlewares/newProduct');
const newProductControllers = require('../controllers/newProductController');

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
    res.render('products', { title: 'produtos', products: productsModel.getProducts() });
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

router.delete('/create/delete/', function(req, res) {
    let productId = req.body.id;
    productsModel.deleteProduct(productId);
    res.redirect("/products/create");
});

//Rota para editar um produto
router.get('/create/edit/:id', function(req, res) {
    let types = newProductControllers.types;
    let productId = req.params.id
    let tempProduct = productsModel.findProduct(productId);
    //console.log("temp product > ", tempProduct);
    //console.log("type > ", types);
    console.log(tempProduct[0])
    res.render('editproduct', { tempProduct: tempProduct[0], types: types })
});


//Rota com PUT para edição do produto
router.put("/create/edit", upload.single("photo"), function(req, res) {
    let editProduct = req.body;
    let { file } = req;

    editProduct.id = parseInt(editProduct.id);

    if (file !== undefined) {
        editProduct.photo = file.originalname;
    } else {
        editProduct.photo = 'sem-foto.jpg';
    }

    productsModel.updatePutProduct(editProduct);

    res.redirect("/products/create")
    
});

module.exports = router;