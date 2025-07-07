const express = require('express');
const router = express.Router();

const ImovelController = require('../../imoveis/controllers/imoveis.controller');
const AutenticacaoController = require('../../autenticacao/controllers/autenticacao.controller');

// Rotas públicas
router.get('/imoveis', ImovelController.listar);
router.get('/imoveis/:id', ImovelController.buscarPorId);

// Rotas privadas
router.post('/imoveis', AutenticacaoController.autenticar, ImovelController.criar);
router.put('/imoveis/:id', AutenticacaoController.autenticar, ImovelController.atualizar);
router.delete('/imoveis/:id', AutenticacaoController.autenticar, ImovelController.deletar);

module.exports = router;