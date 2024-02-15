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

// Middlewares
const { adminMiddleware } = require('./middlewares/task_2_admin_middleware');
const { jwtMiddleware } = require('./middlewares/task_3_jwt_middleware');
const { globalErrorHandler } = require('./middlewares/task_5_global_error_handler_middleware');
const { helmetMiddleware } = require('./middlewares/task_6_helmet_middleware');

// Router
const { Router } = require('./routes/router');

const app = express();
const PORT = 3030;

app.use(bodyParser.json());

// task 5 global error handler middleware
app.use(globalErrorHandler);

// task 6 helmet middleware for secure server
app.use(helmetMiddleware());

// task 2 admin middleware
app.use(adminMiddleware);

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
