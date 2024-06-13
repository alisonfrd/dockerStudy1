const express = require('express'); // Importar a biblioteca Express
const router = express.Router(); // Criar um roteador
const Task = require('../models/task'); // Importar o modelo de tarefa

// Rota para criar uma nova tarefa
router.post('/', async (req, res) => {
    try {
        const task = new Task(req.body); // Criar uma nova tarefa com os dados do corpo da requisição
        await task.save(); // Salvar a tarefa no banco de dados
        res.status(201).json(task); // Responder com a tarefa criada e status 201 (Created)
    } catch (err) {
        res.status(400).json({ message: err.message }); // Responder com status 400 (Bad Request) em caso de erro
    }
});

// Rota para obter todas as tarefas
router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find(); // Buscar todas as tarefas no banco de dados
        res.status(200).json(tasks); // Responder com a lista de tarefas e status 200 (OK)
    } catch (err) {
        res.status(500).json({ message: err.message }); // Responder com status 500 (Internal Server Error) em caso de erro
    }
});

// Rota para obter uma tarefa pelo ID
router.get('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id); // Buscar uma tarefa pelo ID
        if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' }); // Responder com status 404 (Not Found) se a tarefa não for encontrada
        res.status(200).json(task); // Responder com a tarefa encontrada e status 200 (OK)
    } catch (err) {
        res.status(500).json({ message: err.message }); // Responder com status 500 (Internal Server Error) em caso de erro
    }
});

// Rota para atualizar uma tarefa pelo ID
router.put('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }); // Atualizar a tarefa pelo ID
        if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' }); // Responder com status 404 (Not Found) se a tarefa não for encontrada
        res.status(200).json(task); // Responder com a tarefa atualizada e status 200 (OK)
    } catch (err) {
        res.status(400).json({ message: err.message }); // Responder com status 400 (Bad Request) em caso de erro
    }
});

// Rota para deletar uma tarefa pelo ID
router.delete('/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id); // Deletar a tarefa pelo ID
        if (!task) return res.status(404).json({ message: 'Tarefa não encontrada' }); // Responder com status 404 (Not Found) se a tarefa não for encontrada
        res.status(200).json({ message: 'Tarefa deletada com sucesso' }); // Responder com status 200 (OK) e mensagem de sucesso
    } catch (err) {
        res.status(500).json({ message: err.message }); // Responder com status 500 (Internal Server Error) em caso de erro
    }
});

// Exportar o roteador
module.exports = router; // Exportar o roteador para ser usado na aplicação principal
