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

async function get(req, res, next) {
    res.render('newProduct', { types: types, products: await products.getProducts(), });
}

async function post(req, res, next) {
    let newProduct;
    let { productName, price, type } = req.body;
    let { file } = req;
    if (file !== undefined) {
        newProduct = { productName, price, type, photo: file.originalname };
    } else {
        newProduct = { productName, price, type, photo: 'sem-foto.jpg' };
    }
    await products.insertProduct(newProduct);
    res.redirect("/products/create");
}

module.exports = {
    types: types,
    get: get,
    post: post
}