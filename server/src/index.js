const http = require('http');
//=====================================================
require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./dbMongo');
const db = require('./db/models');
const router = require('./router');
const controller = require('./socketInit');
const handlerError = require('./handlerError/handler');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

app.use('/public', express.static('public'));
app.use(router);
app.use(handlerError);

const dbCheck = async () => {
  try {
    await db.sequelize.authenticate();
    console.log(
      `Connection with << ${process.env.DB_NAME.toUpperCase()} >> has been established successfully`,
    );
  } catch (error) {
    console.log(console.error('Unable to connect to DB:', error.message));
  }
};
dbCheck();

const server = http.createServer(app);
server.listen(PORT,
  () => console.log(`Example app listening on port ${ PORT }!`));
controller.createConnection(server);


