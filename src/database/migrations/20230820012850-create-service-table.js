"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("services", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      customer_id: {
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
        references: {
          model: "customers",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      device_model: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      device_serial: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      device_imei: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      service_description: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      technical_description: {
        allowNull: true,
        type: Sequelize.DataTypes.STRING,
      },
      deadline: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      service_status: {
        allowNull: false,
        type: Sequelize.DataTypes.STRING,
      },
      start_time: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
      },
      pause_time: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
      },
      end_time: {
        allowNull: true,
        type: Sequelize.DataTypes.DATE,
      },
      total_time: {
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      total_cost: {
        allowNull: true,
        type: Sequelize.DataTypes.INTEGER,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DataTypes.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("services");
  },
};
