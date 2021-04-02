const fs = require('fs');
const Sequelize = require('sequelize');
const config = require("../config/database");

const db = new Sequelize(config);

//Função para leitura dos produtos cadastrados
// function getProducts() {
//     //return fs.readFileSync('../models/products.json', { encoding: 'utf8', });
//     let file = fs.readFileSync('./models/products.json', { encoding: 'utf8', });
//     file = JSON.parse(file);
//     return file;
// }

async function getProducts() {
    const file = await db.query("SELECT * FROM product", { type: Sequelize.QueryTypes.SELECT })
    console.log(file)
    return file;
}

//Função para inserir novos produtos
async function insertProduct(product) {
    console.log("product: ", product)
    await db.query("INSERT INTO product (name, type, price, photo) VALUES (:name, :type, :price, :photo)", {
        replacements: {
            name: product.productName,
            type: product.type,
            price: product.price,
            photo: product.photo
        }
    })
    console.log("Produto Inserido products.js")
}

module.exports = {
   getProducts: getProducts,
   insertProduct: insertProduct,
};