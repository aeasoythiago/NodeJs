const { z } = require('zod');

const usuarioSchema = z.object({
    primeironome :z.string().min(1, 'O nome é obrigatório'),
    email : z.string().email(1 , 'Email inválido'),
    senha : z.string().min(8, 'A senha deve conter pelo menos 8 caracteres')
});

function validarUsuario(dados){
    try {
        const valido = usuarioSchema.parse(dados);
        return {valido : true, dados : resultado};
    } catch (error) {
        return {valido : false, erro :error.erros};
    }
}
module.exports = { validarUsuario }; 