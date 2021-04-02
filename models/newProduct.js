// const fs = require('fs');
// const Sequelize = require('sequelize');
// const config = require("../config/database");

// const db = new Sequelize(config);

// //Função para leitura dos produtos cadastrados
// async function getProducts() {
//     const file = await db.query("SELECT * FROM product", { type: Sequelize.QueryTypes.SELECT })
//     return file;
// }

// //Função para inserir novos produtos
// //Obs, os produtos podem ficar em um products.json na models tbm, podem ser importados e exportados para lá, de forma a manter os arquivos enquanto não temos database

// async function insertProduct(product) {
//     await db.query("INSERT INTO product (name, type, price, photo) VALUES (:name, :type, :price, :photo)", {
//         replacements: {
//             name: product.name,
//             type: product.type,
//             price: product.price,
//             photo: product.photo
//         }
//     })
//     console.log("Produto Inserido")
// }

// module.exports = {
//    getProducts: getProducts,
//    insertProduct: insertProduct,
// };