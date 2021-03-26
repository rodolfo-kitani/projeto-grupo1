// const express = require('express');
// const multer = require('multer');
// const path = require('path');
// const router = express.Router();
// const newProductMiddleware = require('../middlewares/newProduct');
// const newProductControllers = require('../controllers/newProductController')
// const products = require('../models/newProduct')

// //Multer recebe o upload de img
// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join('public','images','uploads'))
//   },
//   filename: function (req, file, cb) {
//     cb(null, /*file.fieldname + '-' + Date.now()*/ file.originalname)
//   }
// })
 
// var upload = multer({ storage: storage })


// //Get product-create page

// router.get('/', 
//     // newProductMiddleware.validateUser, 
//     newProductControllers.get
// );


// router.post('/',
//   upload.single("photo"),
//   newProductMiddleware.validateUser,
//   newProductMiddleware.validateInput,
//   newProductControllers.post
// );

// module.exports = router;

/*

ESSA ROTA FOI ADICIONADA A ROTA PRODUTCS

*/