/* Enquanto não instalamos o banco de dados
os dados dos usuários ficarão registrados aqui */

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

const loginModel = {
    authenticator: authenticator = function(email, password) {
        const user = users.find (function(user) {
            return user.email === email && user.password === password;
        })

        return user;

    }
}

module.exports = loginModel;
