const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const ImovelController = require('../controllers/imovel.controller');
const AutenticacaoMiddleware = require('../../../middleware/autenticacao.middleware');
const AutorizacaoMiddleware = require('../../../middleware/autorizacao.middleware');

// Middleware de validação
const validarImovel = [
  check('endereco')
    .notEmpty().withMessage('Endereço é obrigatório.'),
  check('tipo')
    .notEmpty().withMessage('Tipo é obrigatório.')
    .isIn(['apartamento', 'casa', 'sala comercial']).withMessage('Tipo inválido.'),
  check('valor_aluguel')
    .notEmpty().withMessage('Valor do aluguel é obrigatório.')
    .isFloat({ min: 0 }).withMessage('Valor do aluguel deve ser positivo.'),
  check('proprietarioId')
    .notEmpty().withMessage('Proprietário é obrigatório.')
    .isInt().withMessage('proprietarioId deve ser um número inteiro.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Rotas públicas
router.get('/', ImovelController.listar);
router.get('/:id', ImovelController.buscarPorId);

// Rotas protegidas
router.post('/', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.permitirAcesso(['proprietario', 'admin']), validarImovel, ImovelController.criar);
router.put('/:id', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.permitirAcesso(['proprietario', 'admin']), validarImovel, ImovelController.atualizar);
router.delete('/:id', AutenticacaoMiddleware.autenticarToken, AutorizacaoMiddleware.permitirAcesso(['proprietario', 'admin']), ImovelController.deletar);

module.exports = router;