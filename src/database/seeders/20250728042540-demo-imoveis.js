'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Imoveis', [
      {
        endereco: 'Torre Stark, Manhattan',
        tipo: 'apartamento',
        valor_aluguel: 15000.00,
        disponivel: true,
        fotos: ['stark1.jpg', 'stark2.jpg'],
        proprietarioId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        endereco: 'Brooklyn, 1940 - Casa Histórica',
        tipo: 'casa',
        valor_aluguel: 4500.00,
        disponivel: true,
        fotos: ['rogers1.jpg'],
        proprietarioId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        endereco: 'Red Room Safehouse',
        tipo: 'apartamento',
        valor_aluguel: 3000.00,
        disponivel: false,
        fotos: ['romanoff1.jpg'],
        proprietarioId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        endereco: 'Laboratório Gamma, Ohio',
        tipo: 'casa',
        valor_aluguel: 2500.00,
        disponivel: true,
        fotos: ['banner1.jpg'],
        proprietarioId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        endereco: 'Asgard Residencial, Nova Valhalla',
        tipo: 'casa',
        valor_aluguel: 9999.99,
        disponivel: true,
        fotos: ['thor1.jpg', 'thor2.jpg'],
        proprietarioId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        endereco: 'Fazenda Barton, Missouri',
        tipo: 'casa',
        valor_aluguel: 3800.00,
        disponivel: true,
        fotos: ['barton1.jpg'],
        proprietarioId: 6,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Imoveis', null, {});
  }
};