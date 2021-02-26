const products = [];


//Função para leitura dos produtos cadastrados
function getProducts() {
    return products;
}

//Função para inserir novos produtos
//Obs, os produtos podem ficar em um products.json na models tbm, podem ser importados e exportados para lá, de forma a manter os arquivos enquanto não temos database
function insertProduct(product) {
    products.push(product);
}



module.exports = {
   getProducts: getProducts,
   insertProduct: insertProduct,
};