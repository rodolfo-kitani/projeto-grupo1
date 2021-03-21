const express = require('express');

const router = express.Router();

const model = require('../models/login');

router.get('/', function(req, res){
    res.render('login')
});

router.post('/', function(req, res) {
    let {email, password} = req.body
    let user = model.authenticator(email, password)
    if (user === undefined) {
        res.redirect('/login');
    } else {
        res.redirect()
    }
    req.session.user = user;
    console.log(req.session)
    res.redirect('/novo-produto')
})

module.exports = router;