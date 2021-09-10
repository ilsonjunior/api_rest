// faz a requisição para utilizar todos esses arquivos
const customExpress = require('./config/customExpress')
const conexao = require('./infraestrutura/conexao')
const Tabelas = require('./infraestrutura/tabelas')

conexao.connect(erro => {
    // Tenta a conexão se der erro ele mostra dentro do if
    if(erro) {
        console.log(erro)
    } else {
        // se não mostra no log que foi conectado
        console.log('conectado com sucesso')
        
        Tabelas.init(conexao)
        
        const app = customExpress()
        // Mostra em qual porta o app está rodando
        app.listen(3000, () => console.log('Servidor rodando na porta 3000'))
    }
})
