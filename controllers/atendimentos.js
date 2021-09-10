


// faz a request na pasta models e pega o arquivo atendimentos onde contem as functions a serem utilizadas
const Atendimento = require('../models/atendimentos')


// funcoes de um CRUD
module.exports = app => {

// lista os atendimentos
    app.get('/atendimentos', (req, res) => {
        Atendimento.lista(res)
    })
// buscar pelo id do atendimento
    app.get('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.buscaPorId(id, res)
    })
    
// adiciona um atendimento
    app.post('/atendimentos', (req, res) => {
       const atendimento = req.body

        Atendimento.adiciona(atendimento, res)
    }) 

// altera um atendimento
    app.patch('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const valores = req.body

        Atendimento.altera(id, valores, res)
    })
// deleta um atendimento
    app.delete('/atendimentos/:id', (req, res) => {
        const id = parseInt(req.params.id)

        Atendimento.deleta(id, res)
    })
}