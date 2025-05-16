const express = require('express');
const rota = express.Router();
const novoUsuario = require('../controlador/controlecriador');
const { verificarToken } = require('../middleware/auth');
const tarefaFuncao = require('../controlador/controletarefas'); 

// Rotas públicas (não precisam de autenticação)
rota.post('/criarusuario', novoUsuario.lidarNovoUsuario);
rota.post('/login', novoUsuario.verificarlogin);

// Rotas protegidas (precisam de autenticação)
// Rotas protegidas(Usuário)
rota.get('/listarusuario', verificarToken, novoUsuario.buscarUsuario);
rota.get('/listarporid/:id', verificarToken, novoUsuario.buscarPorId);
rota.delete('/deletar/:id', verificarToken, novoUsuario.deletarUsuarioId);
// Rotas protegidas(Tarefas)
rota.post('/criartarefa', verificarToken, tarefaFuncao.criarTarefa);
rota.get('/buscartarefa', verificarToken, tarefaFuncao.buscarTarefa);
rota.delete('/deletartarefa', verificarToken, tarefaFuncao.deletarTarefa);

module.exports = rota;