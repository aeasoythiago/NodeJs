const tarefa = require('../bancodedados/tarefas');

const criarTarefa = async (req, res) =>{
    try {
    const {titulo1, descricao1, status1, prioridade1, data1} = req.body;
        const novaTarefa = await tarefa.create({
            titulo : titulo1,
            descricao : descricao1,
            status : status1,
            prioridade : prioridade1,
            data : data1,
            criadapor : req.usuario.id
        })
        res.status(200).json({message : 'Nova tarefa criada com sucesso', tarefa : novaTarefa});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
};

const buscarTarefa = async (req, res) => {
    try {
        const tarefaBuscada = await tarefa.find({ criadapor: req.usuario.id });
        if(tarefaBuscada.length === 0){
            return res.status(404).json({ message: 'Você não possui tarefas cadastradas'});
        }
        res.status(200).json(tarefaBuscada);
    } catch (error) {
        console.error("Erro ao buscar tarefas:", error);
        res.status(500).json({ message: 'Erro ao buscar tarefas'});
    }
};

const deletarTarefa = async (req, res) => {
    try {
        const {nome} = req.body;
        const tarefaDeletada = await tarefa.deleteOne({ titulo : nome, criadapor : req.usuario.id});
        if(tarefaDeletada.deletedCount === 0){
            res.status(404).json({ message : 'Tarefa inexistente ou você não tem perimissão'});
        }
        res.status(200).json({message : 'Tarefa deletada com sucesso'});
    } catch (error) {
        res.status(500).json({ message : 'Erro ao deletar tarefa'});
    }
}

const alterarTarefa = async (req, res) => {
    try {
        const id = req.params.id;
        const { titulo, descricao, status, prioridade, data } = req.body;
        const tarefaEncontrada = await tarefa.findOne({ _id: id, criadapor: req.usuario.id });
        if(!tarefaEncontrada){
            return res.status(404).json({ message: 'Tarefa não encontrada ou você não tem permissão'});
        }
        const tarefaAtualizada = await tarefa.findByIdAndUpdate(
            id,
            {
                titulo: titulo || tarefaEncontrada.titulo,
                descricao: descricao || tarefaEncontrada.descricao,
                status: status || tarefaEncontrada.status,
                prioridade: prioridade || tarefaEncontrada.prioridade,
                data: data || tarefaEncontrada.data
            },
            { new: true }
        );
        res.status(200).json({
            message: 'Tarefa atualizada com sucesso',
            tarefa: tarefaAtualizada
        });
    } catch (error) {
        console.error("Erro ao alterar tarefa:", error);
        res.status(500).json({ message: 'Erro ao alterar tarefa' });
    }
}

module.exports = { criarTarefa, buscarTarefa, deletarTarefa, alterarTarefa };