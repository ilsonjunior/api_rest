// Arquivo de conexao
const mysql = require('mysql')

// cria conexao
const conexao = mysql.createConnection({
    // servidor utilizado como host
    // portat
    port: 3306,
    // user
    user: 'root',
    // senha 
    password: 'admin',
    // nomebanco de dados
    database: 'agenda-petshop'
})

module.exports = conexao 