import { Migration } from 'sequelize-cli';

export default {
  async down(queryInterface) {
    await queryInterface.dropTable('auths');
    await queryInterface.dropTable('users');
  },

  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      passwordHash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });

    await queryInterface.createTable('auths', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      refresh: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });

    await queryInterface.bulkInsert('users', [
      {
        id: 1,
        login: 'admin',
        passwordHash: '$2b$10$hFzKvq0I9R4ipJhSSjqRlud/DugXMVWRkOIxMPluK1pwFNqu7O8cO',
        updatedAt: Sequelize.fn('datetime', 'now'),
        createdAt: Sequelize.fn('datetime', 'now'),
      },
    ]);
  },
} as Migration;
