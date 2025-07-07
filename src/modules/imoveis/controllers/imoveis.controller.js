const Imovel = require('../models/imoveis.model');

class ImovelController {
  static async criar(req, res) {
    try {
      const imovel = await Imovel.create(req.body);
      res.status(201).json(imovel);
    } catch (error) {
      res.status(500).json({ msg: 'Erro ao criar imóvel.', erro: error.message });
    }
  }

  static async listar(req, res) {
    try {
      const imoveis = await Imovel.findAll();
      res.status(200).json(imoveis);
    } catch (error) {
      res.status(500).json({ msg: 'Erro ao listar imóveis.', erro: error.message });
    }
  }

  static async buscarPorId(req, res) {
    try {
      const imovel = await Imovel.findByPk(req.params.id);
      if (!imovel) {
        return res.status(404).json({ msg: 'Imóvel não encontrado.' });
      }
      res.json(imovel);
    } catch (error) {
      res.status(500).json({ msg: 'Erro ao buscar imóvel.', erro: error.message });
    }
  }

  static async atualizar(req, res) {
    try {
      const imovel = await Imovel.findByPk(req.params.id);
      if (!imovel) {
        return res.status(404).json({ msg: 'Imóvel não encontrado.' });
      }
      await imovel.update(req.body);
      res.json(imovel);
    } catch (error) {
      res.status(500).json({ msg: 'Erro ao atualizar imóvel.', erro: error.message });
    }
  }

  static async deletar(req, res) {
    try {
      const imovel = await Imovel.findByPk(req.params.id);
      if (!imovel) {
        return res.status(404).json({ msg: 'Imóvel não encontrado.' });
      }
      await imovel.destroy();
      res.json({ msg: 'Imóvel removido com sucesso.' });
    } catch (error) {
      res.status(500).json({ msg: 'Erro ao remover imóvel.', erro: error.message });
    }
  }
}

module.exports = ImovelController;
