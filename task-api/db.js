const { Sequelize } = require("sequelize");

const DB_URL = process.env.DATABASE_URL || "postgres://localhost:5432/task-api";

// If your Postgres needs a username/password, put them in the URL:
// "postgres://user:password@localhost:5432/task-api"
const db = new Sequelize(DB_URL, {
  logging: false,
});
module.exports = db;
