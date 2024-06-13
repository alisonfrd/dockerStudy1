const mongoose = require('mongoose'); // Importar a biblioteca Mongoose
const Schema = mongoose.Schema; // Desestruturação para obter o Schema

// Definir o esquema de tarefa
const taskSchema = new Schema({
    title: {
        type: String, // Tipo do campo: String
        required: true // Campo obrigatório
    },
    description: {
        type: String, // Tipo do campo: String
        required: true // Campo obrigatório
    },
    status: {
        type: String, // Tipo do campo: String
        enum: ['pending', 'in progress', 'completed'], // Valores permitidos
        default: 'pending' // Valor padrão
    },
    created_at: {
        type: Date, // Tipo do campo: Date
        default: Date.now // Valor padrão: data atual
    }
});

// Exportar o modelo de tarefa
module.exports = mongoose.model('Task', taskSchema); // Criar e exportar o modelo com o esquema definido
