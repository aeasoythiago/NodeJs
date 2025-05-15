const express = require('express');
const rota = express.Router();
const novoUsuario = require('../controlador/controlecriador');
const { verificarToken } = require('../middleware/auth');

// Rotas públicas (não precisam de autenticação)
rota.post('/criarusuario', novoUsuario.lidarNovoUsuario);
rota.post('/login', novoUsuario.verificarlogin);

// Rotas protegidas (precisam de autenticação)
rota.get('/listarusuario', verificarToken, novoUsuario.buscarUsuario);
rota.get('/listarporid/:id', verificarToken, novoUsuario.buscarPorId);
rota.delete('/deletar/:id', verificarToken, novoUsuario.deletarUsuarioId);

module.exports = rota;