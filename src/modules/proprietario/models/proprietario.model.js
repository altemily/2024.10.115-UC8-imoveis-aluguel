const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/configDB');

const Proprietario = sequelize.define('Proprietario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Nome não pode ser vazio.' },
      len: { args: [3, 100], msg: 'Nome deve ter entre 3 e 100 caracteres.' }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { msg: 'E-mail já cadastrado.' },
    validate: {
      notEmpty: { msg: 'E-mail não pode ser vazio.' },
      isEmail: { msg: 'E-mail inválido.' }
    }
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Telefone não pode ser vazio.' },
      len: { args: [8, 20], msg: 'Telefone inválido.' }
    }
  }
}, {
  tableName: 'Proprietarios',
  createdAt: 'criado_em',
  updatedAt: 'atualizado_em',
});


module.exports = Proprietario;