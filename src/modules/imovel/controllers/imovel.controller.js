const Imovel = require('../models/imovel.model');
const Proprietario = require('../../proprietario/models/proprietario.model');

class ImovelController {

  static async criar(req, res) {
    try {
      const { endereco, tipo, valor_aluguel, fotos, proprietarioId } = req.body;

      if (!endereco || !tipo || !valor_aluguel || !proprietarioId) {
        return res.status(400).json({ msg: 'Todos os campos obrigatórios devem ser preenchidos.' });
      }

      const proprietario = await Proprietario.findByPk(proprietarioId);
      if (!proprietario) {
        return res.status(404).json({ msg: 'Proprietário não encontrado.' });
      }

      const imovel = await Imovel.create({
        endereco,
        tipo,
        valor_aluguel,
        fotos,
        proprietarioId
      });

      return res.status(201).json({ msg: 'Imóvel cadastrado com sucesso.', imovel });
    } catch (error) {
      return res.status(500).json({ msg: 'Erro ao criar imóvel.', erro: error.message });
    }
  }

  static async listar(req, res) {
    try {
      const imoveis = await Imovel.findAll({
        include: {
          model: Proprietario,
          as: 'proprietario',
          attributes: ['id', 'nome', 'telefone', 'email'],
        },
      });

      if (!imoveis || imoveis.length === 0) {
        return res.status(200).json({ msg: 'Nenhum imóvel cadastrado no sistema.' });
      }

      return res.status(200).json(imoveis);
    } catch (error) {
      return res.status(500).json({ msg: 'Erro ao listar imóveis.', erro: error.message });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const imovel = await Imovel.findByPk(req.params.id, {
        include: {
          model: Proprietario,
          as: 'proprietario',
          attributes: ['id', 'nome', 'telefone', 'email'],
        },
      });

      if (!imovel) {
        return res.status(404).json({ msg: 'Imóvel não encontrado.' });
      }

      return res.json(imovel);
    } catch (error) {
      return res.status(500).json({ msg: 'Erro ao buscar imóvel.', erro: error.message });
    }
  }

  static async atualizar(req, res) {
    try {
      const imovel = await Imovel.findByPk(req.params.id);
      if (!imovel) {
        return res.status(404).json({ msg: 'Imóvel não encontrado.' });
      }

      const { proprietarioId } = req.body;
      
      if (proprietarioId) {
        const proprietario = await Proprietario.findByPk(proprietarioId);
        if (!proprietario) {
          return res.status(404).json({ msg: 'Proprietário não encontrado.' });
        }
      }

      await imovel.update(req.body);

      return res.json({ msg: 'Imóvel atualizado com sucesso.', imovel });
    } catch (error) {
      return res.status(500).json({ msg: 'Erro ao atualizar imóvel.', erro: error.message });
    }
  }

  static async deletar(req, res) {
    try {
      const imovel = await Imovel.findByPk(req.params.id);
      if (!imovel) {
        return res.status(404).json({ msg: 'Imóvel não encontrado.' });
      }

      await imovel.destroy();

      return res.json({ msg: 'Imóvel removido com sucesso.' });
    } catch (error) {
      return res.status(500).json({ msg: 'Erro ao remover imóvel.', erro: error.message });
    }
  }
}

module.exports = ImovelController;
