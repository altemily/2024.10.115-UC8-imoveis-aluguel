const Proprietario = require('../models/proprietario.model');

class ProprietarioController {

  static async cadastrar(req, res) {
    try {
      const { nome, email, telefone } = req.body;

      if (!nome || !email || !telefone) {
        return res.status(400).json({ msg: "Todos os campos são obrigatórios." });
      }

      const verificarEmail = await Proprietario.findOne({ where: { email } });
      if (verificarEmail) {
        return res.status(400).json({ msg: "E-mail já cadastrado." });
      }

      const novo = await Proprietario.create({ nome, email, telefone });
      return res.status(201).json(novo);
    } catch (error) {
      return res.status(500).json({ msg: "Erro ao cadastrar proprietário.", erro: error.message });
    }
  }

  static async listarTodos(req, res) {
    try {
      const lista = await Proprietario.findAll();
      return res.status(200).json(lista);
    } catch (error) {
      return res.status(500).json({ msg: "Erro ao listar proprietários.", erro: error.message });
    }
  }

  static async obterPorId(req, res) {
    try {
      const { id } = req.params;
      const prop = await Proprietario.findByPk(id);
      if (!prop) {
        return res.status(404).json({ msg: "Proprietário não encontrado." });
      }
      return res.status(200).json(prop);
    } catch (error) {
      return res.status(500).json({ msg: "Erro ao buscar proprietário.", erro: error.message });
    }
  }

  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, telefone } = req.body;

      const prop = await Proprietario.findByPk(id);
      if (!prop) {
        return res.status(404).json({ msg: "Proprietário não encontrado." });
      }

      // Atualiza apenas os campos enviados na requisição. Não é necessário alterar todos os dados ao mesmo tempo
      if (nome) prop.nome = nome;
      if (email) prop.email = email;
      if (telefone) prop.telefone = telefone;
      await prop.save();

      return res.status(200).json(prop);
    } catch (error) {
      return res.status(500).json({ msg: "Erro ao atualizar proprietário.", erro: error.message });
    }
  }

  static async deletar(req, res) {
    try {
      const { id } = req.params;
      const prop = await Proprietario.findByPk(id);
      if (!prop) {
        return res.status(404).json({ msg: "Proprietário não encontrado." });
      }
      await prop.destroy();
      return res.status(200).json({ msg: "Proprietário excluído com sucesso." });
    } catch (error) {
      return res.status(500).json({ msg: "Erro ao excluir proprietário.", erro: error.message });
    }
  }

  // Proprietário autenticado
  static async perfilProprietario(req, res) {
    try {
      const id = req.user.id;
      const prop = await Proprietario.findByPk(id);
      if (!prop) {
        return res.status(404).json({ msg: "Proprietário não encontrado." });
      }
      return res.status(200).json(prop);
    } catch (error) {
      return res.status(500).json({ msg: "Erro ao buscar perfil.", erro: error.message });
    }
  }

  static async atualizarProprietario(req, res) {
    try {
      const id = req.user.id;
      const { nome, email, telefone } = req.body;

      const prop = await Proprietario.findByPk(id);
      if (!prop) {
        return res.status(404).json({ msg: "Proprietário não encontrado." });
      }

      if (nome) prop.nome = nome;
      if (email) prop.email = email;
      if (telefone) prop.telefone = telefone;
      await prop.save();

      return res.status(200).json(prop);
    } catch (error) {
      return res.status(500).json({ msg: "Erro ao atualizar perfil.", erro: error.message });
    }
  }
}

module.exports = ProprietarioController;