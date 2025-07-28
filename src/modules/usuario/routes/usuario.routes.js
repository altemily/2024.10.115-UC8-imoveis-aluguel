const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();

const UsuarioController = require('../controllers/usuario.controller');
const AutenticacaoController = require('../../autenticacao/controllers/autenticacao.controller');

// Middleware de validação
const validarCadastro = [
  check('nome')
    .notEmpty().withMessage('Nome é obrigatório.')
    .isLength({ min: 3, max: 100 }).withMessage('Nome deve ter entre 3 e 100 caracteres.'),
  check('email')
    .notEmpty().withMessage('Email é obrigatório.')
    .isEmail().withMessage('Email inválido.'),
  check('senha')
    .notEmpty().withMessage('Senha é obrigatória.')
    .isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres.')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/)
      .withMessage('Senha deve conter maiúscula, minúscula, número e caractere especial.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Público
router.post('/', validarCadastro, UsuarioController.cadastrar);

// Protegido
router.get('/me', AutenticacaoController.autenticar, UsuarioController.perfil);
router.put('/me', AutenticacaoController.autenticar, UsuarioController.atualizar);
router.delete('/me', AutenticacaoController.autenticar, UsuarioController.deletar);

module.exports = router;