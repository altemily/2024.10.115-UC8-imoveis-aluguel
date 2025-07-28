const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/configDB');
const Proprietario = require('../../proprietario/models/proprietario.model');

const Imovel = sequelize.define('Imovel', {
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Endereço não pode ser vazio.' },
      notNull: { msg: 'Endereço é obrigatório.' },
    },
  },
  tipo: {
    type: DataTypes.ENUM('apartamento', 'casa', 'sala comercial'),
    allowNull: false,
    validate: {
      isIn: {
        args: [['apartamento', 'casa', 'sala comercial']],
        msg: 'Tipo inválido.',
      },
      notNull: { msg: 'Tipo é obrigatório.' },
    },
  },
  valor_aluguel: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: {
        args: [0],
        msg: 'Valor do aluguel deve ser positivo.',
      },
      notNull: { msg: 'Valor do aluguel é obrigatório.' },
    },
  },
  disponivel: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  fotos: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
  proprietarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Proprietario,
      key: 'id',
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
    validate: {
      notNull: { msg: 'Proprietário é obrigatório.' },
      isInt: { msg: 'proprietarioId deve ser um número inteiro.' },
    },
  },
}, {
  tableName: 'imovel',
  createdAt: 'criado_em',
  updatedAt: 'atualizado_em',
});

Imovel.belongsTo(Proprietario, { foreignKey: 'proprietarioId', as: 'proprietario' });

module.exports = Imovel;
