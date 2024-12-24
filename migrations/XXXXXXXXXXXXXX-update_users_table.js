'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Add any missing columns
    const tableInfo = await queryInterface.describeTable('Users');
    
    if (!tableInfo.email) {
      await queryInterface.addColumn('Users', 'email', {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      });
    }
    
    if (!tableInfo.deletedAt) {
      await queryInterface.addColumn('Users', 'deletedAt', {
        type: Sequelize.DATE,
        allowNull: true
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Users', 'email');
    await queryInterface.removeColumn('Users', 'deletedAt');
  }
}; 