const express = require('express');
const app = express();
const { ligar } = require('./bancodedados/connector');
const Usuariomodelo = require('./bancodedados/criador');
const PORT = 3000;
const rotas = require('./rotas/root');
const errorhandler = require('./middleware/errorhandler');


ligar();

app.use(express.json());
app.use('',rotas);


app.use(errorhandler);

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));