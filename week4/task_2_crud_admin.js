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
const fs = require('fs');

const PORT = 3030;
const app = express();

const booksPath = `${__dirname}/../week3/books.json`;

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
  return res.status(403).json({
    error: 'Access denied',
  });
};

// using middleware to check the admin condition for every API
const adminMiddleware = function (req, res, next) {
  if (req.headers.hasOwnProperty('role') && req.headers.role === 'admin') next();
  else return accessRestrictedError(res);
};

app.use(bodyParser.json());
app.use(adminMiddleware);

// const booksData = JSON.parse(fs.readFileSync(`${__dirname}/../week3/books.json`, 'utf-8', (err) => {
//   if (err) {
//     console.log('Error occurred while fetching books data from books.json! ', err);
//     process.exit();
//   }
// }));

app.get('/', (req, res) => {
  res.send('Welcome to the express server!');
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
