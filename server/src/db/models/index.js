
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const configPath = require(path.resolve('.sequelizerc')).config;
const config = require(configPath)[env];
const db = {};

// const sequelize = new Sequelize(
//   config.database,
//   config.username,
//   config.password,
//   config);

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config,
  );
}

fs
  .readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// db['Contests'].belongsTo(db['Users'], {
//   foreignKey: 'userId',
//   sourceKey: 'id',
// });
// db['Contests'].hasMany(db['Offers'], {
//   foreignKey: 'contestId',
//   targetKey: 'id',
// });

// db['Users'].hasMany(db['Offers'], { foreignKey: 'userId', targetKey: 'id' });
// db['Users'].hasMany(db['Contests'], { foreignKey: 'userId', targetKey: 'id' });
// db['Users'].hasMany(db['Ratings'], { foreignKey: 'userId', targetKey: 'id' });

// db['Offers'].belongsTo(db['Users'], { foreignKey: 'userId', sourceKey: 'id' });
// db['Offers'].belongsTo(db['Contests'], {
//   foreignKey: 'contestId',
//   sourceKey: 'id',
// });
// db['Offers'].hasOne(db['Ratings'], { foreignKey: 'offerId', targetKey: 'id' });

// db['Ratings'].belongsTo(db['Users'], { foreignKey: 'userId', targetKey: 'id' });
// db['Ratings'].belongsTo(db['Offers'], {
//   foreignKey: 'offerId',
//   targetKey: 'id',
// });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
