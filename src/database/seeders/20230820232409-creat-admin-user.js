const bcrypt = require("bcrypt");

("use strict");

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash("123456", 10);

    await queryInterface.bulkInsert("users", [
      {
        first_name: "Admin",
        last_name: "User",
        phone: "0123456789",
        birth: "2000-01-01",
        email: "admin@admin.com",
        password: hashedPassword,
        role: "admin",
        language: "pt-BR",
        subscription_status: "active",
        subscription_plan: "premium",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {
      where: {
        email: "admin@admin.com",
      },
    });
  },
};
