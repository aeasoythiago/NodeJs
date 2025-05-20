const express = require('express');
const rota = express.Router();
const { verificarToken } = require('../middleware/auth');
const tarefaFuncao = require('./controletarefas'); 
const validador = require('../utils/validador');
const { tarefasSchema } = require('./validartarefa')

// Rotas protegidas(Tarefas)
rota.post('/criartarefa',validador(tarefasSchema),verificarToken, tarefaFuncao.criarTarefa);
rota.get('/buscartarefa', verificarToken, tarefaFuncao.buscarTarefa);
rota.put('/atualizartarefa/:id', verificarToken, tarefaFuncao.alterarTarefa);
rota.delete('/deletartarefa', verificarToken, tarefaFuncao.deletarTarefa);

module.exports = rota;