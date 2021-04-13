const products = require('../models/products')
const newProductMiddleware = require('../middlewares/newProduct');


//Lista dos tipos de produtos
const types = [{
    id: "notebook",
    label: "Notebook",
}, {
    id: "desktop",
    label: "Desktop",
}, {
    id: "cellphone",
    label: "Celular",
}];

function get(req, res, next) {
    res.render('newProduct', { title: 'Cadastrar Produto', types: types, products: products.getProducts(), });
}

function post(req, res, next) {
    let newProduct;
    let { productName, price, type } = req.body;
    let { file } = req;
    let id = Math.random() * 1000;
    id = Math.round(id);
    if (file !== undefined) {
        newProduct = { id, productName, price, type, photo: file.originalname };
    } else {
        newProduct = { id, productName, price, type, photo: 'sem-foto.jpg' };
    }
    products.insertProduct(newProduct);
    res.redirect("/products/create");
}

module.exports = {
    types: types,
    get: get,
    post: post
}