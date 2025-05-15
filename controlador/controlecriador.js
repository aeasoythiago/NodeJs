const usuario = require('./../bancodedados/criador');
const bcrypt = require('bcrypt');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { validarUsuario } = require('./../verificador');


const buscarUsuario = async (req,res) => {
    try {
        const user = await usuario.find({});
        if(!user){
            return res.status(400).json({message : "Usuário nao existe"})
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Erro ao encontrar usuário:", error);
        res.status(500).json({ erro: "Erro ao encontrar usuários" });
    }
};

const lidarNovoUsuario = async (req, res) => {
    const { user, email, senha } = req.body;
    const validacao = validarUsuario({primeironome : user, email, senha});
    if(!validacao.validado){
        return res.status(400).json({'message': 'Erro ao validar dados'});
    }
    const duplicado = await usuario.findOne({ primeironome: user });
    if (duplicado) {
        return res.status(400).json({ 'message': 'Usuário já existente.\n' });
    }
    try {
        const senha2 = await bcrypt.hash(senha, 10);
        const novoUsuario = await usuario.create({
            primeironome: user,
            email: email,
            senha: senha2
        });
        res.status(200).json({ 'message': `Novo usuário ${user} criado.\n` });
    } catch (error) {
        res.status(400).json({ 'message': error.message });
    }
};

const deletarUsuarioId = async (req, res) => {
    try {
        const id = req.params.id;
        const resultado = await usuario.deleteOne({_id: id});
        if(resultado.deletedCount === 0){
            return res.status(400).json({message : "Usuário nao existe"})
        }
        res.status(200).json({ message: "Usuário deletado com sucesso" });
    } catch (error) {
        console.error("Erro ao deletar usuário", error);
        res.status(500).json({ erro: "Erro ao deletar usuário" });
    }
};

const buscarPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await usuario.findById(id);
        if(!user){
            return res.status(400).json({message : "Usuário nao existe"})
        }
        res.status(200).json(user);
    } catch (error) {
        console.error("Erro ao encontrar usuário", error);
        res.status(500).json({ erro: "Erro ao encontrar usuário" });
    }
};

const verificarlogin = async (req, res) => {
    const {user,senha2} = req.body;
    if(!user || !senha2){
        return res.status(400).json({'message':'Usuário e senha são necessários.\n'})
    }
    const encontrarUser = await usuario.findOne({primeironome : user});
    if(!encontrarUser){
        return res.status(400).json({'message':'Usuário não existe'});
    }
    const encontrarsenha = await bcrypt.compare(senha2, encontrarUser.senha);
    if(encontrarsenha){
        const token = jwt.sign({
            id : encontrarUser._id , primeironome : encontrarUser.primeironome}, process.env.JWT_SECRET,{expiresIn : '2m'}
        )
        res.json({'message':'Usuário logado com sucesso',token});
    }
    else
        res.status(400).json({'message':'Senha incorreta.\n'});
};

module.exports = {buscarUsuario, lidarNovoUsuario, deletarUsuarioId, buscarPorId, verificarlogin };


