const path = require('path');
const fs = require('fs');
//=======================================================
const mongoose = require('mongoose');
//=======================================================
const env = process.env.NODE_ENV || 'development';
const configPath = path.join(__dirname, '..', 'config/mongoConfig.json');
// const config = require('../config/mongoConfig.json') [env];
const config = require(configPath)[ env ];

const dbMongo = {};
const basename = path.basename(__filename);

mongoose
  .connect(`mongodb://${config.host}:${config.port}/${config.database}`)
  .then(() => console.log(`Connection to DB <<< ${config.database.toUpperCase()} >>> is Ok`))
  .catch((err) => console.log(err));

fs.readdirSync(__dirname)
  .filter((fileName) => {
    return (
      fileName.indexOf('.') !== 0 &&
      fileName !== basename &&
      fileName.slice(-3) === '.js'
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file));
    dbMongo[model.modelName] = model;
  });

// mongoose.connect(
//   `mongodb://${ config.host }:${ config.port }/${ config.database }`,
//   { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
//     if (err) {
//       console.log(err);
//       process.exit(1);
//     }
//   });

mongoose.set('debug', env === 'development');

module.exports = mongoose;
