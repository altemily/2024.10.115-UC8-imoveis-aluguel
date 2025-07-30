'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Imoveis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      endereco: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo: {
        type: Sequelize.ENUM('apartamento', 'casa', 'sala comercial'),
        allowNull: false
      },
      valor_aluguel: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      disponivel: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      fotos: {
        type: Sequelize.ARRAY(Sequelize.STRING), // para array de URLs
        allowNull: true
      },
      proprietarioId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Proprietarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('now')
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Imoveis');
  }
};