const fs = require('fs');

/*const products = [{
    id: '00001',
    name: 'Notebook i5 17pol',
    type: 'notebook',
    price: '50.00',
    adress: 'São Paulo - SP',
    picture: '',
},{
    id: '00002',
    name: 'Desktop i5, Monitor 24pol, 8gb',
    type: 'desktop',
    price: '75.00',
    adress: 'Cotia - SP',
    picture: '',

},{
    id: '00003',
    name: 'Macbook Pro i7 19pol + SSD ',
    type: 'notebook',
    price: '95.00',
    adress: 'São Paulo - SP',
    picture: '',
}];
*/

//Função para leitura dos produtos cadastrados
function getProducts() {
    //return fs.readFileSync('../products.json', { encoding: 'utf8', });
    let file = fs.readFileSync('./models/products.json', { encoding: 'utf8', });
    console.log('arquivo aberto:' + '\n'+ file)
    return file;
    //return products;
}

//Função para inserir novos produtos
//Obs, os produtos podem ficar em um products.json na models tbm, podem ser importados e exportados para lá, de forma a manter os arquivos enquanto não temos database
function insertProduct(product) {
    //products.push(product);
    let tempProducts = fs.readFileSync('./models/products.json', { encoding: 'utf8', });
    console.log('antes: ' + '\n' + tempProducts);
    tempProducts = JSON.parse(tempProducts);
    tempProducts.push(product);
    tempProducts = JSON.stringify(tempProducts);
    fs.writeFileSync('./models/products.json', tempProducts);
    console.log('depois: ' + '\n' + tempProducts)
}

module.exports = {
   getProducts: getProducts,
   insertProduct: insertProduct,
};