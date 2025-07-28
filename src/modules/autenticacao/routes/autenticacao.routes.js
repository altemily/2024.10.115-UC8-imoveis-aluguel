const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const AutenticacaoController = require('../controllers/autenticacao.controller');

// Middleware de validação para login
const validarLogin = [
  check('email').notEmpty().withMessage('E-mail é obrigatório.').isEmail().withMessage('E-mail inválido.'),
  check('senha').notEmpty().withMessage('Senha é obrigatória.'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

router.post('/login', validarLogin, AutenticacaoController.login);

router.post('/refresh-token', AutenticacaoController.refreshToken);

router.post('/logout', AutenticacaoController.sair);

module.exports = router;