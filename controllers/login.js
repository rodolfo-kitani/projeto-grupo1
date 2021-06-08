const loginModel = require('../models/login');

async function login(req, res) {
    const { email, password } = req.body;
    if(email.trim() === "") {
        return res.redirect('/login')
    }
    const user = await loginModel.login(email, password);
    if(!user) {
        console.log("user controller", user);
        return res.redirect('/')
    }
    req.session.user = {
        email: user.email,
    }
    return res.redirect('/products/create');
}

function get(req, res) {
    res.render('login')
}

module.exports = {
    login: login,
    get: get,
}