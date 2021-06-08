const fs = require('fs');
const { type } = require('os');
const Sequelize = require('sequelize');
const config = require('../config/database')
const db = new Sequelize(config);

//Função para leitura dos produtos cadastrados


async function getProducts() {
    let file = await db.query('SELECT * FROM product', {
        type: Sequelize.QueryTypes.SELECT

       
    });
    return file;
}
//Função para inserir novos produtos
//Obs, os produtos podem ficar em um products.json na models tbm, podem ser importados e exportados para lá, de forma a manter os arquivos enquanto não temos database


async function insertProduct(product) {
    console.log(product)
    await db.query("INSERT INTO product (name, type, price, photo) VALUES (:name, :type, :price, :photo)", {
        replacements: { 
            name: product.productName,
            type: product.type,
            price: product.price,
            photo: product.photo
        },

        type: Sequelize.QueryTypes.INSERT
   
}

)}

function deleteProduct(productId) {
    
    //Abre o arquivo JSON com os produtos cadastrados
    let tempProducts = fs.readFileSync('./models/products.json', { encoding: 'utf8', });

    //Transforma o arquivo JSON em um array com objetos em JS
    tempProducts = JSON.parse(tempProducts);

    //Faz um filtro utilizando o productId que foi enviado como parametro da função
    //E seleciona todos os produtos menos o com id informado
    tempProducts = tempProducts.filter(function(product) {
        return product.id !== parseInt(productId);
        //salva o array filtrado na variavel tempProduct
    })

    //Transforma a string filtrada em arquivo JSON
    tempProducts = JSON.stringify(tempProducts, null, '\t');

    //Salva o array filtrado utilzando o módulo fs
    fs.writeFileSync('./models/products.json', tempProducts);
}

function findProduct(productId) {
    
    //Abre o arquivo JSON com os produtos cadastrados
    let tempProducts = fs.readFileSync('./models/products.json', { encoding: 'utf8', });

    //Transforma o arquivo JSON em um array com objetos em JS
    tempProducts = JSON.parse(tempProducts);

    //Faz um filtro utilizando o productId que foi enviado como parametro da função
    //E seleciona APENAS o produto com id informado
    tempProducts = tempProducts.filter(function(product) {
        return product.id === parseInt(productId);
        //salva o array filtrado na variavel tempProduct
    })
    
    return tempProducts;
}


function updatePutProduct(editProduct) {
    let tempProducts = fs.readFileSync('./models/products.json', { encoding: 'utf8', });
    tempProducts = JSON.parse(tempProducts);
    tempProducts.forEach(function(product, contador) {
        
        if ( product.id === editProduct.id ) {
            return tempProducts[contador] = editProduct;
        } 
    })

    tempProducts = JSON.stringify(tempProducts, null, '\t');
    fs.writeFileSync('./models/products.json', tempProducts);
}

module.exports = {
   getProducts: getProducts,
   insertProduct: insertProduct,
   deleteProduct: deleteProduct,
   findProduct: findProduct,
   updatePutProduct: updatePutProduct
};