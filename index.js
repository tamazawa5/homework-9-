const express = require('express');
const app = express();
const pool = require('./config/index');
const MovieRoutes = require('./routers/MovieRoutes');
const UserRoutes = require('./routers/UserRoutes');
require('dotenv').config();
const logger = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(logger('dev'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

pool.connect((err, res) => {
  if (err) {
    console.log(err);
  }
  console.log('Database Connected');
});

app.use('/api/v1/movies', MovieRoutes);
app.use('/api/v1/users', UserRoutes);

app.listen(process.env.PORT_APP, () => {
  console.log(`Application running on port ${process.env.PORT_APP}`);
});