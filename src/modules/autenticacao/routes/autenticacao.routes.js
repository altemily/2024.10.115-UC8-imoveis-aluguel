const express = require('express');
const router = express.Router();
const AutenticacaoController = require('../controllers/autenticacao.controller');

router.post('/login', AutenticacaoController.login);

router.post('/refresh-token', AutenticacaoController.refreshToken);

router.post('/logout', AutenticacaoController.sair);

module.exports = router;