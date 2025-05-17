const { z } = require('zod');

const usuarioSchema = z.object({
    primeironome :z.string().min(1, 'O nome é obrigatório'),
    email : z.string().email('Email inválido'),
    senha : z.string().min(8, 'A senha deve conter pelo menos 8 caracteres')
});

const tarefasSchema = z.object({
    titulo : z.string().min(1, 'O título é obrigatório'),
    descricao : z.string().optional(),
    status : z.enum(['Pendente', 'Andamento', 'Concluido'], {
        errorMap: () => ({ message: 'Status deve ser Pendente, Andamento ou Concluido' })
    }),
    prioridade : z.enum(['Baixa', 'Media', 'Alta'], {
        errorMap: () => ({ message: 'Prioridade deve ser Baixa, Media ou Alta' })
    }),
    data : z.date().optional().default(() => new Date())
});

function validarUsuario(dados){
    try {
        const valido = usuarioSchema.parse(dados);
        return {valido : true, dados : valido};
    } catch (error) {
        return {valido : false, erro :error.errors};
    }
};

function validarTarefa(dados){
    try {
        const valido = tarefasSchema.parse(dados);
        return {valido : true, dados : valido};
    } catch (error) {
        return {valido : false, erro : error.errors};
    }
}
module.exports = { validarUsuario, validarTarefa }; 