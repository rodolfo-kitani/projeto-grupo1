const fs = require('fs');

//Função para leitura dos produtos cadastrados
function getProducts() {
    let file = fs.readFileSync('./models/products.json', { encoding: 'utf8', });
    file = JSON.parse(file);
    return file;
}

module.exports = {
  getProducts: getProducts
}
