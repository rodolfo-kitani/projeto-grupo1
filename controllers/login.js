const loginModel = require('../models/login');
const bcrypt = require('bcrypt');


async function login(req, res) {
    const { email, password } = req.body;
    if(email.trim() === "") {
        return res.redirect('/login')
    }
    const user = await loginModel.getByEmail(email);
    if(!user) {
        console.log("user controller", user);
        return res.redirect('/')
    }
    const comparePassword = bcrypt.compareSync(password, user.userPassword);
    if(!comparePassword){
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
    const userExist = await loginModel.getByEmail(recuperar.email)
    console.log('recuperar', recuperar)
    if(userExist) {
        return res.render("register", {error: true}) //usuario ja existe
    } 
    const senhaIncript = bcrypt.hashSync(recuperar.password, 12)
    console.log('bcrypt', senhaIncript);
    await loginModel.insertUser({nome:recuperar.nome, email: recuperar.email, senha: senhaIncript})

    res.redirect('/login');
}

module.exports = {
    login: login,
    get: get,
    post: post
}