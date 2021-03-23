function validateInput (req, res, next) {
    const newProduct = req.body;
    if (newProduct.productName === "" ) {
        res.status(400).send("Nome é um campo obrigatório");
        return;
    } else if (newProduct.price === "" ){
        res.status(400).send("Preço é um campo obrigatório");
        return;
    } else if (newProduct.type === undefined ){
        res.status(400).send("Tipo de produto é um campo obrigatório");
        return;
    }
    next();

}

function validateUser (req, res, next) {
    const user = req.session.user;
    if (user) {
        return next();
    } else {
        res.redirect('/login');
    }
}

module.exports = {
    validateInput: validateInput,
    validateUser: validateUser
}