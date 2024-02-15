/* eslint-disable func-names */
/* eslint-disable object-shorthand */
/* eslint-disable indent */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const express = require('express');

const app = express();
const PORT = 3030;

const { Router } = require('./routes/router');

app.use(Router);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
