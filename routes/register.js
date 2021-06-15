const express = require('express');

const router = express.Router();

const loginController = require('../controllers/login');

router.get('/', function(req, res){
    res.render('register')
});

router.post('/', loginController.post)

module.exports = router;