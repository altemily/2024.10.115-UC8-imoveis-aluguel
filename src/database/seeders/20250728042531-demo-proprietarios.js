'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Proprietarios', [
      {
        id: 1,
        nome: 'Tony Stark',
        email: 'tony.stark@starkindustries.com',
        telefone: '(11) 90000-0001',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        nome: 'Steve Rogers',
        email: 'steve.rogers@avengers.com',
        telefone: '(11) 90000-0002',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 3,
        nome: 'Natasha Romanoff',
        email: 'natasha.romanoff@shield.org',
        telefone: '(11) 90000-0003',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 4,
        nome: 'Bruce Banner',
        email: 'bruce.banner@avengers.com',
        telefone: '(11) 90000-0004',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 5,
        nome: 'Thor Odinson',
        email: 'thor.odinson@asgard.gov',
        telefone: '(11) 90000-0005',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 6,
        nome: 'Clint Barton',
        email: 'clint.barton@shield.org',
        telefone: '(11) 90000-0006',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Proprietarios', null, {});
  }
};
