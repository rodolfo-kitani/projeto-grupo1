const loginModel = require('../models/login');
const bcrypt = require('bcrypt');


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
    res.render('login', {error: false})
}

//cadastro
async function post(req, res) {
    let recuperar = req.body
    const userExist = loginModel.getByEmail(recuperar.email)
    if(userExist) {
        res.render("register", {error: true}) //usuario ja existe
    } 
    const senhaIncript = bcrypt.hashSync(recuperar.password, 12)
    await loginModel.insertUser({nome:recuperar.nome, email: recuperar.email, senha: recuperar.password})

    res.redirect("login", { error: false})
}

module.exports = {
    login: login,
    get: get,
    post: post
}