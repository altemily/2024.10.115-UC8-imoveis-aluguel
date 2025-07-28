const Usuario = require("../models/usuario.model");
const bcrypt = require("bcryptjs");

class UsuarioController {

  static async cadastrar(req, res) {
    try {
      const { nome, email, senha, role } = req.body;

      if (!nome || !email || !senha) {
        return res
          .status(400)
          .json({ msg: "Todos os campos são obrigatórios." });
      }

      const verificaEmail = await Usuario.findOne({ where: { email } });
      if (verificaEmail) {
        return res.status(400).json({ msg: "E-mail já cadastrado." });
      }

      // Criptografa senha
      const hash = await bcrypt.hash(senha, 10);

      await Usuario.create({
        nome,
        email,
        senha: hash,
        role: role || "cliente", // Default para cliente
      });

      return res.status(201).json({ msg: "Usuário cadastrado com sucesso." });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Erro ao cadastrar usuário.", erro: error.message });
    }
  }

  static async atualizar(req, res) {
    try {
      const { id } = req.user;
      const { nome, email, senha } = req.body;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ msg: "Usuário não encontrado." });
      }

      if (nome) usuario.nome = nome;
      if (email) usuario.email = email;
      if (senha) usuario.senha = await bcrypt.hash(senha, 10);

      await usuario.save();

      return res.status(200).json({ msg: "Usuário atualizado com sucesso." });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Erro ao atualizar usuário.", erro: error.message });
    }
  }

  static async deletar(req, res) {
    try {
      const { id } = req.user;

      const usuario = await Usuario.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ msg: "Usuário não encontrado." });
      }

      await usuario.destroy();

      return res.status(200).json({ msg: "Usuário deletado com sucesso." });
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Erro ao deletar usuário.", erro: error.message });
    }
  }

  // Perfil do usuário autenticado
  static async perfil(req, res) {
    try {
      // req.usuario vem do middleware de autenticação
      const { id } = req.user;
      const usuario = await Usuario.findByPk(id, {
        attributes: ["id", "nome", "email", "role"],
      });
      if (!usuario) {
        return res.status(404).json({ msg: "Usuário não encontrado." });
      }
      return res.status(200).json(usuario);
    } catch (error) {
      return res
        .status(500)
        .json({ msg: "Erro ao consultar perfil.", erro: error.message });
    }
  }
}

module.exports = UsuarioController;