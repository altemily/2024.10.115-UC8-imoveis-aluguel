const express = require('express');
const router = express.Router();

const UsuarioController = require('../controllers/usuario.controller');
const AutenticacaoMiddleware = require('../middleware/usuario.middleware');

// Rota pública
router.post('/usuarios', UsuarioController.criar);

// Rota protegida
router.get('/usuarios', AutenticacaoMiddleware.autenticarToken, UsuarioController.listarTodos);

module.exports = router;
