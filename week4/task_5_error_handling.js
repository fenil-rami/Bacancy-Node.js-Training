/* eslint-disable no-prototype-builtins */
/* eslint-disable no-unused-vars */
/* eslint-disable array-callback-return */
/* eslint-disable no-undef */
/* eslint-disable func-names */
/* eslint-disable no-useless-return */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
const bodyParser = require('body-parser');
const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');

const PORT = 3030;
const JWT_SECRET = '9ff6125c982248baa6bd21162929b7c0';
const app = express();

const booksPath = `${__dirname}/../week3/books.json`;
const usersPath = `${__dirname}/users.json`;

const internalServerError = function (res, err) {
  if (!res || !err) return;
  return res.status(500).json({
    message: 'Internal server error',
    error: err,
  });
};

const validBookIdError = function (res) {
  if (!res) return;
  return res.status(400).json({
    error: 'Please provide a valid book id',
  });
};

const validBookObjectError = function (res) {
  if (!res) return;
  return res.status(400).json({
    error: 'Please provide valid book details',
  });
};

const accessRestrictedError = function (res) {
  if (!res) return;
  return res.json({
    message: 'Access Denied! Unauthorized User',
  });
};

const verifyToken = (req, res, next) => {
  const excludedPaths = ['/api/auth/signup', '/api/auth/signin'];

  // skip the token verification for auth apis
  if (excludedPaths.includes(req.path)) {
    next();
    return;
  }

  let token = req.get('authorization');
  if (token) {
    token = token.slice(7);
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return accessRestrictedError(res);
      req.decoded = decoded;
      next();
    });
  } else return accessRestrictedError(res);
};

// Global error handler
function globalErrorHandler(err, req, res, next) {
  console.log(err);
  return internalServerError(res, err);
}

app.use(bodyParser.json());
app.use(verifyToken);
app.use(globalErrorHandler);

app.get('/', (req, res) => {
  res.send('Welcome to the express server!');
});

// Sign up
app.post('/api/auth/signup', (req, res) => {
  const { body } = req;

  if (!body || (typeof body !== 'object') || !body.name || !body.email || !body.password) {
    return res.status(400).json({
      error: 'please provide all fields',
    });
  }

  fs.readFile(usersPath, 'utf-8', (err, users) => {
    if (err) return internalServerError(res, err);
    users = JSON.parse(users);

    const alreadyExists = users.filter((user) => user.email === body.email);

    if (alreadyExists && alreadyExists.length > 0) {
      return res.status(409).json({
        error: 'an account with this email already exists!',
      });
    }

    users.push(body);

    fs.writeFile(usersPath, JSON.stringify(users), (error) => {
      if (error) return internalServerError(res, error);
      res.status(200).json({
        message: 'user successfully registered!',
        user: body,
      });
    });
  });
});

// Sign in
app.post('/api/auth/signin', (req, res) => {
  const { body } = req;

  if (!body || (typeof body !== 'object') || !body.email || !body.password) {
    return res.status(400).json({
      error: 'please provide all fields',
    });
  }

  fs.readFile(usersPath, 'utf-8', (err, users) => {
    if (err) return internalServerError(res, err);

    users = JSON.parse(users);

    const alreadyExists = users.filter((user) => user.email === body.email);

    if (!alreadyExists || alreadyExists === undefined || alreadyExists.length === 0) {
      return res.status(401).json({
        error: 'account does not exists!',
      });
    }

    if (alreadyExists[0].password !== body.password) {
      return res.status(401).json({
        errror: 'invalid password!',
      });
    }

    const token = jwt.sign(body, JWT_SECRET, {
      expiresIn: '28d',
    });

    res.status(200).json({
      message: 'authentication sucessfull!',
      token,
    });
  });
});

// Get all books
app.get('/api/book/getallbooks', (req, res) => {
  fs.readFile(booksPath, 'utf-8', (err, books) => {
    if (err) return internalServerError(res, err);
    res.status(200).json(JSON.parse(books));
  });
});

// Get book by id
app.get('/api/book/:id', (req, res) => {
  const { id } = req.params;

  if (!id) return validBookIdError(res);

  fs.readFile(booksPath, 'utf-8', (err, books) => {
    if (err) return internalServerError(res, err);
    const book = JSON.parse(books).filter((b) => b.id.toString() === id);
    if (!book || book.length === 0) return validBookIdError(res);
    res.status(200).json(book[0]);
  });
});

// Create a new book
app.post('/api/book/create', (req, res) => {
  const { body } = req;
  if (!body || (typeof body !== 'object') || !body.name || !body.id || !body.description || !body.price) return validBookObjectError(res);

  fs.readFile(booksPath, 'utf-8', (err, books) => {
    if (err) return internalServerError(res, err);
    books = JSON.parse(books);
    books.push(body);
    fs.writeFile(booksPath, JSON.stringify(books), (error) => {
      if (error) return internalServerError(res, error);
      res.status(200).json({
        message: 'Book has been created successfully!',
        book: body,
      });
    });
  });
});

// Update a book
app.put('/api/book/update', (req, res) => {
  const { body } = req;
  if (!body || (typeof body !== 'object') || !body.name || !body.id || !body.description || !body.price) return validBookObjectError(res);

  fs.readFile(booksPath, 'utf-8', (err, books) => {
    if (err) return internalServerError(res, err);
    books = JSON.parse(books);
    books = books.map((book) => {
      if (book.id === body.id) book = body;
      return book;
    });
    fs.writeFile(booksPath, JSON.stringify(books), (error) => {
      if (error) return internalServerError(res, error);
      res.status(200).json({
        message: 'Book has been updated succesfully!',
      });
    });
  });
});

// Delete a book
app.delete('/api/book/delete/:id', (req, res) => {
  const { id } = req.params;

  if (!id) return validBookIdError(res);

  fs.readFile(booksPath, 'utf-8', (err, books) => {
    if (err) return internalServerError(res, err);
    books = JSON.parse(books).filter((book) => book.id !== Number(id));
    fs.writeFile(booksPath, JSON.stringify(books), (error) => {
      if (error) return internalServerError(res, error);
      res.status(200).json({
        message: 'Book has been deleted successfully!',
      });
    });
  });
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
