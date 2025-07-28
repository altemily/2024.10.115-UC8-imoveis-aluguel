const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const ProprietarioController = require('../controllers/proprietario.controller');
const AutenticacaoController = require('../../autenticacao/controllers/autenticacao.controller');

// Middleware de validação
const validarProprietario = [
  check('nome')
    .notEmpty().withMessage('Nome é obrigatório.')
    .isLength({ min: 3, max: 100 }).withMessage('Nome deve ter entre 3 e 100 caracteres.'),
  check('email')
    .notEmpty().withMessage('Email é obrigatório.')
    .isEmail().withMessage('Email inválido.'),
  check('telefone')
    .notEmpty().withMessage('Telefone é obrigatório.')
    .isLength({ min: 8, max: 20 }).withMessage('Telefone inválido.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Proprietário Autenticado
router.get('/me', AutenticacaoController.autenticar, AutenticacaoController.autorizar('proprietario'), ProprietarioController.perfilProprietario);
router.put('/me', AutenticacaoController.autenticar, AutenticacaoController.autorizar('proprietario'), validarProprietario, ProprietarioController.atualizarProprietario);

// Admin
router.get('/', AutenticacaoController.autenticar, AutenticacaoController.autorizar('admin'), ProprietarioController.listarTodos);
router.get('/:id', AutenticacaoController.autenticar, AutenticacaoController.autorizar('admin'), ProprietarioController.obterPorId);
router.post('/', AutenticacaoController.autenticar, AutenticacaoController.autorizar('admin'), validarProprietario, ProprietarioController.cadastrar);
router.put('/:id', AutenticacaoController.autenticar, AutenticacaoController.autorizar('admin'), validarProprietario, ProprietarioController.atualizar);
router.delete('/:id', AutenticacaoController.autenticar, AutenticacaoController.autorizar('admin'), ProprietarioController.deletar);

module.exports = router;