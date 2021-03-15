function validateInput (req, res, next) {
    const newProduct = req.body;
    if (newProduct.productName === "" ) {
        res.status(400).send("Nome é um campo obrigatório");
        return;
    } else if (newProduct.price === "" ){
        res.status(400).send("Preço é um campo obrigatório");
        return;
    } else if (newProduct.type === "" ){
        res.status(400).send("Preço é um campo obrigatório");
        return;
    }
    next();

}

module.exports = {
    validateInput: validateInput
}