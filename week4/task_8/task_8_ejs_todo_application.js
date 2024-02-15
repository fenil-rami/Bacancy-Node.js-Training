/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const bodyParser = require('body-parser');
const express = require('express');
const { Router } = require('./routes/router');

const app = express();
const PORT = 3030;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(Router);

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
