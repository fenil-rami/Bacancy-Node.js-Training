/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable no-useless-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');
const { adminMiddleware } = require('./middlewares/task_2_admin_middleware');
const { jwtMiddleware } = require('./middlewares/task_3_jwt_middleware');
const { Router } = require('./routes/router');

const app = express();
const PORT = 3030;

app.use(bodyParser.json());

// Middlewares

// task 2 admin middleware
// app.use(adminMiddleware);

// task 3 jwt middleware
app.use(jwtMiddleware);

// Router
app.use(Router);

app.get('/', (req, res) => {
  res.send('Welcome to the express server!');
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
