const Sequelize = require('sequelize');
const config = require('../config/database')
const db = new Sequelize(config);

const usersMockup = [
    {
        email: 'teste@teste.com',
        password: '1234'
    },
    {
        email: 'user@user.com',
        password: '1234'
    }
]

async function login(email, password) {
    const user = await db.query('SELECT * FROM user WHERE email = :email', {
        replacements: { email: email},
        type: Sequelize.QueryTypes.SELECT
    });
    
    if(!user[0]) {
        return false;
    };
    if(user[0].userPassword !== password) {
        return false;
    };

    return user[0];
}

module.exports = {
    login: login,
};
