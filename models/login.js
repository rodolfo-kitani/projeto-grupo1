const Sequelize = require('sequelize');
const config = require('../config/database')
const db = new Sequelize(config);

const users = [
    {
        email: 'teste@teste.com',
        password: '1234'
    },
    {
        email: 'user@user.com',
        password: '1234'
    }
]

async function getUsers() {
    const result = await db.query('select * from user;', {
        type: Sequelize.QueryTypes.SELECT
    });
}

const loginModel = {
    authenticator: authenticator = function(email, password) {
        const user = users.find (function(user) {
            return user.email === email && user.password === password;
        })

        return user;

    }
}

module.exports = {
    getUsers: getUsers,
};
