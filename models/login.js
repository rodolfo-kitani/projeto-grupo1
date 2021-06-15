const Sequelize = require('sequelize');
const config = require('../config/database')
const db = new Sequelize(config);
const bcrypt = require('bcrypt');



async function getByEmail(email) {
    const user = await db.query('SELECT * FROM user WHERE email = :email', {
        replacements: { email: email},
        type: Sequelize.QueryTypes.SELECT
    });
    return user[0]
} 

async function insertUser({nome, email, senha}) {
  console.log('senha model', senha);
  await db.query("INSERT INTO user (name, email, userPassword) VALUES(:name, :email, :userPassword)", {
    replacements: {
        name: nome,
        email: email,
        userPassword: senha
    }
  })
}

module.exports = {
    getByEmail: getByEmail,
    insertUser: insertUser
};
