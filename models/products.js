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
    await db.query("INSERT INTO product(name, type, price, photo) VALUES (:name, :type, :price, :photo)",{
        replacements: { 
            name: product.productName,
            type: product.type,
            price: product.price,
            photo: product.photo
        }
   
})

}

async function deleteProduct(productId) {
    
    db.query("DELETE FROM product WHERE id = :id",
    {
    replacements: {
            id: productId
        }
    });
}


async function findProduct(productId) {
    
    let tempProducts = await db.query('SELECT * FROM product WHERE id = :id', {

        replacements: { 
          id: productId
        },

        type: Sequelize.QueryTypes.SELECT
    });

    return tempProducts[0];
    }
    
async function updatePutProduct(editProduct) {
    console.log(editProduct)
    await db.query(
       "UPDATE product SET name = :name, price = :price, type = :type, photo = :photo WHERE id = :id", {

   
        replacements: {
            id: editProduct.id,
            name: editProduct.productName, 
            price: editProduct.price,
            type: editProduct.type,
            photo: editProduct.photo
        }
   });

}

module.exports = {
   getProducts: getProducts,
   insertProduct: insertProduct,
   deleteProduct: deleteProduct,
   findProduct: findProduct,
   updatePutProduct: updatePutProduct
};