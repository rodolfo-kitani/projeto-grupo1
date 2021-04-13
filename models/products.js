const fs = require('fs');

//Função para leitura dos produtos cadastrados
function getProducts() {
    let file = fs.readFileSync('./models/products.json', { encoding: 'utf8', });
    file = JSON.parse(file);
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

function deleteProduct(productId) {
    
    //Abre o arquivo JSON com os produtos cadastrados
    let tempProducts = fs.readFileSync('./models/products.json', { encoding: 'utf8', });

    //Transforma o arquivo JSON em um array com objetos em JS
    tempProducts = JSON.parse(tempProducts);

    //Faz um filtro utilizando o productId que foi enviado como parametro da função
    tempProducts = tempProducts.filter(function(product) {
        console.log("Chegou no temp1", productId);
        return product.id !== parseInt(productId);
        //salva o array filtrado na variavel tempProduct
    })
    
    console.log("Saida do filter>", tempProducts);

    //Transforma a string filtrada em arquivo JSON
    tempProducts = JSON.stringify(tempProducts, null, '\t');
    console.log("JSON>", tempProducts);

    //Salva o array filtrado utilzando o módulo fs
    fs.writeFileSync('./models/products.json', tempProducts);
}

module.exports = {
   getProducts: getProducts,
   insertProduct: insertProduct,
   deleteProduct: deleteProduct,
};