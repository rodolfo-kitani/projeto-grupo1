var express = require('express');
const multer = require('multer');
var router = express.Router();
const path = require('path');
const newProductMiddleware = require('../middlewares/newProduct');
const newProductControllers = require('../controllers/newProductController')

//Multer recebe o upload de img
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join('public','images','uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, /*file.fieldname + '-' + Date.now()*/ file.originalname)
  }
})
 
var upload = multer({ storage: storage })
var products = require('../models/newProduct')


//Get product-create page

router.get('/', 
  newProductControllers.get
);


router.post('/', upload.any(), newProductMiddleware.validateInput, newProductControllers.post);

module.exports = router;