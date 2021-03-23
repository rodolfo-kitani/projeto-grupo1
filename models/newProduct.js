const fs = require('fs');

//Função para leitura dos produtos cadastrados
function getProducts() {
    //return fs.readFileSync('../models/products.json', { encoding: 'utf8', });
    let file = fs.readFileSync('./models/products.json', { encoding: 'utf8', });
    return file;
}

//Função para inserir novos produtos
//Obs, os produtos podem ficar em um products.json na models tbm, podem ser importados e exportados para lá, de forma a manter os arquivos enquanto não temos database
function insertProduct(product) {
    let tempProducts = fs.readFileSync('./models/products.json', { encoding: 'utf8', });
    tempProducts = JSON.parse(tempProducts);
    tempProducts.push(product);
    tempProducts = JSON.stringify(tempProducts, null, '\t');
    fs.writeFileSync('./models/products.json', tempProducts);
}

module.exports = {
   getProducts: getProducts,
   insertProduct: insertProduct,
};