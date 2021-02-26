var express = require('express');
var router = express.Router();

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

router.post('/', function(req, res, next) {
    const newProduct = req.body;
    
    //res.render('product-create', { title: 'Cadastrar Produto' });
    res.redirect("/product");
  });

  module.exports = router;