import { TaskStatus } from '@/modules/task/task-entity';
import { Migration } from 'sequelize-cli';

export default {
  async down(queryInterface) {
    await queryInterface.dropTable('tasks');
  },

  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('tasks', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      text: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM,
        defaultValue: TaskStatus.todo,
        values: [TaskStatus.todo, TaskStatus.inProgress, TaskStatus.done],
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

    await queryInterface.addConstraint('tasks', {
      name: 'userTasks',
      fields: ['userId'],
      type: 'foreign key',
      references: {
        table: 'users',
        field: 'id',
      },
      onDelete: 'cascade',
      onUpdate: 'cascade',
    });
  },
} as Migration;
