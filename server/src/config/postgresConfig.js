require('dotenv/config');

module.exports ={
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: 'postgres',
    operatorsAliases: 'Op',
    migrationStorage: 'json',
    seederStorage: 'json',
  },
  test: {
    username: 'postgres',
    password: 'admin',
    database: 'new-squadhelp-test',
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: 'Op',
    migrationStorage: 'json',
    seederStorage: 'json',
  },
  production: {
    username: 'postgres',
    password: 'admin',
    database: 'new-squadhelp-prod',
    host: 'localhost',
    dialect: 'postgres',
    operatorsAliases: 'Op',
    migrationStorage: 'json',
    seederStorage: 'json',
  },
};
