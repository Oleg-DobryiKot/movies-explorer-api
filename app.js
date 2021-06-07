const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const { PORT = 3003 } = process.env;

const router = require('./src/routes');
const errorHandler = require('./src/middlewares/error-handler');
const { requestLogger, errorLogger } = require('./src/middlewares/logger');

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

const app = express();

app.use(cors({
  // origin: 'https://matveev-oleg.nomoredomains.club',
  origin: true,
  credentials: true,
  exposedHeaders: '*',
}));

app.use(express.json());

app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {});
