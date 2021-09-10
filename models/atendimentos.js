
// requer arquivos
const moment = require('moment')
const conexao = require('../infraestrutura/conexao')

// classe Atendimento
class Atendimento {

    // Função para adicionar um atendimento na tabela
    adiciona(atendimento, res) {
        const dataCriacao = moment().format('YYYY-MM-DD HH:MM:SS')
        const data = moment(atendimento.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        
        const dataEhValida = moment(data).isSameOrAfter(dataCriacao)
        const clienteEhValido = atendimento.cliente.length >= 5
// Verifica se o cadastro é valido, e pode ser inserido na tabela
        const validacoes = [
            {
                nome: 'data',
                valido: dataEhValida,
                mensagem: 'Data deve ser maior ou igual a data atual'
            },
            {
                nome: 'cliente',
                valido: clienteEhValido,
                mensagem: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]
//  erros armazenados
        const erros = validacoes.filter(campo => !campo.valido)
        const existemErros = erros.length
// erros armazenados tendo um tratamento
        if(existemErros) {
            // se existir erro
            res.status(400).json(erros)
        } else {
            //  se não existir ele irá enviar os dados 

            // dados
            const atendimentoDatado = {...atendimento, dataCriacao, data}
            // constante com comando para inserção na tabela
            const sql = 'INSERT INTO Atendimentos SET ?'
    
            // status do resultado
            conexao.query(sql, atendimentoDatado, (erro, resultados) => {
                if(erro) {
                    // bad request
                    res.status(400).json(erro)
                } else {
                    // criado
                    res.status(201).json(atendimento)
                }
            })
        }
       
    }

//  lista todos os atendimentos
    lista(res) {
        // consulta sql
        const sql = 'SELECT * FROM Atendimentos'

        // status do resultado
        conexao.query(sql, (erro, resultados) => {
            if(erro) {
                // bad request
                res.status(400).json(erro)
            } else {
                // ok
                res.status(200).json(resultados)
            }
        })
    }
    
// lista todos os atendimentos de um determinado id
    buscaPorId(id, res) {
        // consulta sql
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        // status do resultado
        conexao.query(sql, (erro, resultados) => {
            const atendimento = resultados[0]
            if(erro) {
                // bad request
                res.status(400).json(erro)
            } else {
                // ok
                res.status(200).json(atendimento)
            }
        })
    }
// altera um determinado atendimento
    altera(id, valores, res) {
        // dados
        if(valores.data) {
            valores.data = moment(valores.data, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }  
        // query de update
        const sql = 'UPDATE Atendimentos SET ? WHERE id=?'

            // status do resultado
        conexao.query(sql, [valores, id], (erro, resultados) => {
            if(erro) {
                // bad request
                res.status(400).json(erro)
            } else {
                // ok
                res.status(200).json({...valores, id})
            }
        })
    }
//  deleta um determinado atendimento
    deleta(id, res) {
        // query de deleção
        const sql = 'DELETE FROM Atendimentos WHERE id=?'

        // status do resultado
        conexao.query(sql, id, (erro, resultados) => {
            if(erro) {
                // bad request
                res.status(400).json(erro)
            } else {
                // ok
                res.status(200).json({id})
            }
        })
    }
}

// exporta Atendimento
module.exports = new Atendimento