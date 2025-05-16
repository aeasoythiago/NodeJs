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
        const tarefaBuscada = await tarefa.find();
        if(tarefaBuscada.length === 0){
            res.status(400).json({ message : 'Tarefa inexistente'});
        }
        res.status(200).json(tarefaBuscada);
    } catch (error) {
        res.status(400).json({ message : 'Erro ao buscar tarefa'});
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

module.exports = { criarTarefa, buscarTarefa, deletarTarefa};