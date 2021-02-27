const fs = require('fs');

let objeto = [{
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

let nome = "products.json";

function convert2json (objeto, nome) {
    let convertido = JSON.stringify(objeto);
    return fs.writeFileSync(nome, convertido);
}

convert2json (objeto, nome);

console.log('Conversão realizada');