const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Aqui está sendo criada a rota Post de Login
// O controller de autenticação é chamado para lidar com a lógica de autenticação
router.post('/login', authController.login);

module.exports = router;
 