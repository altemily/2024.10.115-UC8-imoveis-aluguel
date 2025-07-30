'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up (queryInterface, Sequelize) {
    const senhaHash = await bcrypt.hash('Senha@123', 10);

    await queryInterface.bulkInsert('Usuarios', [
      {
        nome: 'Ariane Carvalho',
        email: 'ariane@email.com',
        senha: senhaHash,
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Tony Stark',
        email: 'tony.stark@starkindustries.com',
        senha: senhaHash,
        role: 'cliente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Steve Rogers',
        email: 'steve.rogers@avengers.com',
        senha: senhaHash,
        role: 'cliente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Natasha Romanoff',
        email: 'natasha.romanoff@shield.org',
        senha: senhaHash,
        role: 'cliente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Bruce Banner',
        email: 'bruce.banner@avengers.com',
        senha: senhaHash,
        role: 'cliente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Thor Odinson',
        email: 'thor.odinson@asgard.gov',
        senha: senhaHash,
        role: 'cliente',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nome: 'Clint Barton',
        email: 'clint.barton@shield.org',
        senha: senhaHash,
        role: 'cliente',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
