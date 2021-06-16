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
router.get('/', async function(req, res, next) {
    let productsList = await productsModel.getProducts();
    res.render('products', { title: 'produtos', products: productsList });
});


router.post('/', async function(req, res) {
    let search = req.body.search;
    let productSearch = await productsModel.searchProductForm(search);
    res.render('products', { title: 'Produtos', products: productSearch})
})

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
router.delete('/create/delete/', newProductMiddleware.validateUser, async function(req, res) {
    let productId = req.body.id;
    productsModel.deleteProduct(productId);
    res.redirect("/products/create");
});

//Rota para editar um produto
router.get('/create/edit/:id', newProductMiddleware.validateUser, async function(req, res) {
    let types = newProductControllers.types;
    let productId = req.params.id
    let tempProduct =  await productsModel.findProduct(productId);

    res.render('editproduct', { tempProduct: tempProduct, types: types })
});

//Rota para mostrar os detalhes
router.get('/details/:id', async function(req, res) {

    let tempProduct =  await productsModel.findProduct(req.params.id);
   
    res.render('details', {tempProduct: tempProduct})
})


//Rota com PUT para edição do produto
router.put("/create/edit", 
    upload.single("photo"), 
    newProductMiddleware.validateUser, 
   async function(req, res) {
        let editProduct = req.body;
        let { file } = req;

        let productId = parseInt(editProduct.id);
        editProduct.id = productId;

        if(!editProduct.photoUpdate) {
            let oldProductData = await productsModel.findProduct(productId)
            
            editProduct.photo = oldProductData.photo;

        } else if (file !== undefined) {
            editProduct.photo = file.originalname;
        } else {
            editProduct.photo = 'sem-foto.jpg';
        }
        
        await productsModel.updatePutProduct(editProduct);
        res.redirect("/products/create")
});

module.exports = router;