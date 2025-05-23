require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());


// Rotas
const exampleRoutes = require('./routes/exampleRoutes');
app.use('/api/example', exampleRoutes);

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  console.log(`Acesse: http://localhost:${PORT}`);
});

// index.js: Está sendo configurado para usar a rota de autenticação com o prefixo '/api/auth'.
// authController.js: A lógica de autenticação é implementada .
// authRoutes.js: A rota POST está sendo criada.

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Teste de GET
app.get('/api/users', (req, res) => {
  const users = [
    { id: 1, name: 'Ronaldo' },
    { id: 2, name: 'Piter' },
  ];
  res.json(users);
}); 

app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));