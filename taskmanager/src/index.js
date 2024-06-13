// Importar dependências
const express = require('express'); // Framework para criar servidor web
const mongoose = require('mongoose'); // Biblioteca para interagir com MongoDB
const bodyParser = require('body-parser'); // Middleware para parsear JSON
const cors = require('cors'); // Middleware para habilitar CORS (Cross-Origin Resource Sharing)
require('dotenv').config(); // Carregar variáveis de ambiente do arquivo .env

// Configurar a aplicação Express
const app = express(); // Inicializar a aplicação Express
const PORT = process.env.PORT || 3000; // Definir a porta do servidor

// Middleware para parsear JSON e permitir CORS
app.use(bodyParser.json()); // Middleware para parsear JSON nas requisições
app.use(cors()); // Middleware para permitir CORS

// Conectar ao MongoDB Atlas
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB Atlas'); // Mensagem de sucesso na conexão
}).catch(err => {
    console.error('Erro ao conectar ao MongoDB Atlas:', err); // Mensagem de erro na conexão
});

// Importar rotas
const taskRoutes = require('./routes/taskRoutes'); // Importar as rotas de tarefas
app.use('/api/tasks', taskRoutes); // Usar as rotas de tarefas na aplicação

// Iniciar o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`); // Mensagem indicando que o servidor está rodando
});
