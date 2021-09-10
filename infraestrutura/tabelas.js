class Tabelas {

    // inicia conexao
    init(conexao) {
        this.conexao = conexao

        // usa a funcao declarada abaixo
        this.criarAtendimentos()
    }

// funcao para criar tabela Atendimentos
    criarAtendimentos() {
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id int NOT NULL AUTO_INCREMENT, cliente varchar(50) NOT NULL, pet varchar(20), servico varchar(20) NOT NULL, data datetime NOT NULL, dataCriacao datetime NOT NULL, status varchar(20) NOT NULL, observacoes text, PRIMARY KEY(id))'

        this.conexao.query(sql, erro => {
            if(erro) {

                // retorna erro na condição
                console.log(erro)
            } else {
                // executa a query na constante 'sql'
                console.log('Tabela Atendimentos criada com sucesso')
            }
        })
    }
}
// exporta Tabelas
module.exports = new Tabelas