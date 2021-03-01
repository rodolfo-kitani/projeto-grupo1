var express = require('express');
const multer = require('multer');
var router = express.Router();
const path = require('path');


//Multer recebra o upload de img
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('/public/images/uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})
 
var upload = multer({ storage: storage })

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


//Get product-create page

router.get('/', function(req, res, next) {
    res.render('product', { title: 'Cadastrar Produto', types: types,});
  });

router.post('/', upload.any(), function(req, res, next) {
    const newProduct = req.body;
    
    res.redirect("/product");
  });





  module.exports = router;