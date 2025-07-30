const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/configDB');

const Usuario = sequelize.define('Usuario', {
  
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Nome não pode ser vazio.' },
      len: { args: [3, 100], msg: 'Nome deve ter entre 3 e 100 caracteres.' }
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: { msg: 'Email já está em uso.' },
    validate: {
      notEmpty: { msg: 'Email não pode ser vazio.' },
      isEmail: { msg: 'Email inválido.' }
    },
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Senha não pode ser vazia.' },
      len: { args: [6], msg: 'Senha deve ter no mínimo 6 caracteres.' },
      is: {
        args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/,
        msg: 'A senha deve conter ao menos uma letra maiúscula, uma minúscula, um número e um caractere especial.'
      }
    },
  },
  role: {
    type: DataTypes.ENUM('cliente', 'corretor', 'admin'),
    allowNull: false,
    defaultValue: 'cliente',
    validate: {
      isIn: {
        args: [['cliente', 'corretor', 'admin']],
        msg: 'Role inválida. Deve ser "cliente", "corretor" ou "admin".'
      }
    },
  },
}, {
  tableName: "Usuarios",
  createdAt: "criado_em",
  updatedAt: "atualizado_em",
});

module.exports = Usuario;