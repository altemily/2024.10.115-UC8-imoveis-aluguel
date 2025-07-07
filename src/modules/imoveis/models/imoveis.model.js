const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/configDB');

const Imovel = sequelize.define('Imovel', {
  endereco: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo: {
    type: DataTypes.ENUM('apartamento', 'casa', 'sala comercial'),
    allowNull: false,
  },
  valor_aluguel: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  disponivel: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  proprietario_nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fotos: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
}, {
  tableName: 'imovel',
  createdAt: 'criado_em',
  updatedAt: 'atualizado_em',
});

module.exports = Imovel;
