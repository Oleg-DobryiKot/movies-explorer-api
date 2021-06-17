const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const helmet = require('helmet');

dotenv.config();

const { PORT = 3003, MONGODB_PATH = 'mongodb://localhost:27017/bitfilmsdb' } = process.env;

const conectionParam = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

const router = require('./src/routes');
const errorHandler = require('./src/middlewares/error-handler');
const { requestLogger, errorLogger } = require('./src/middlewares/logger');
const limiter = require('./src/middlewares/limiter');

mongoose.connect(MONGODB_PATH, conectionParam);

const app = express();

app.use(cors({
  // origin: 'https://matveev-oleg.nomoredomains.club',
  origin: true,
  credentials: true,
  exposedHeaders: '*',
}));

app.use(limiter);
app.use(helmet());
app.use(express.json());

app.use(requestLogger);
app.use(router);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {});
