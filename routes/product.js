var express = require('express');
const multer = require('multer');
var router = express.Router();
const path = require('path');


//Multer recebra o upload de img
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('public','images','uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, /*file.fieldname + '-' + Date.now()*/ file.originalname)
  }
})
 
var upload = multer({ storage: storage })
var products = require('../models/product')

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

//Function de validação
/*
function validation (postData) {
  for (const item of array) {
    if (item === "") {
      const err = array.item;
      return break;
    }
  }
*/
//Get product-create page

router.get('/', function(req, res, next) {
    res.render('product', { title: 'Cadastrar Produto', types: types, products: products.getProducts(),});
  });

router.post('/', upload.any(), function(req, res, next) {
    //const newProduct = req.body;
    let {name, price, type} = req.body;
    let {files} = req;
    //validade user populated data
    //validation(newProduct);
    
    let newProduct = {name, price, type, photo:files[0].originalname}
    console.log(newProduct);

    products.insertProduct(newProduct);
    res.redirect("/product");
  });





  module.exports = router;