import { Sequelize } from "sequelize";

export const database = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  database: "serviceease_development",
  username: "serviceease",
  password: "serviceease",
  define: {
    underscored: true,
  },
});
