const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');

class UsuarioController {
  static async criar(req, res) {
    try {
      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({ msg: 'Nome, e-mail e senha são obrigatórios.' });
      }

      const usuarioExiste = await Usuario.findOne({ where: { email } });
      if (usuarioExiste) {
        return res.status(400).json({ msg: 'Já existe um usuário cadastrado com esse e-mail.' });
      }

      const hash = await bcrypt.hash(senha, 10);
      const novoUsuario = await Usuario.create({
        nome,
        email,
        senha: hash
      });

      return res.status(201).json({
        msg: 'Usuário criado com sucesso.',
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
      });
    } catch (error) {
      return res.status(500).json({ msg: 'Erro ao criar usuário.', erro: error.message });
    }
  }

  static async listarTodos(req, res) {
    try {
      const usuarios = await Usuario.findAll({
        attributes: ['id', 'nome', 'email']
      });
      return res.status(200).json(usuarios);
    } catch (error) {
      return res.status(500).json({ msg: 'Erro ao listar usuários.', erro: error.message });
    }
  }
}

module.exports = UsuarioController;
