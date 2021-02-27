const productsData = require("../products.json");

//productsData is not defined

function getProducts() {
  return productsData
}

module.exports = {
  getProducts: getProducts // colocamos em um objeto por termos um leque de posisbilidades maior quando formos importar o arquivo em outra pasta/arquivo
}

//1. criar a pasta model
//2. criar um arquivo dentro da pasta model chamado products.js
//3. copiar o código do professor

// pasta model -> M
// pasta views -> V
// pasta routes -> C (controller)