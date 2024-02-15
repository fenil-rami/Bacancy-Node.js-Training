const express = require('express');
const {
  getAllBooks, getBookById, createBook, updateBook, deleteBook,
} = require('../controllers/books');
const {
  login, signup,
} = require('../controllers/users');

const Router = express.Router();

Router.get('/api/v1/books', getAllBooks);
Router.get('/api/v1/books/:id', getBookById);
Router.post('/api/v1/books', createBook);
Router.put('/api/v1/books', updateBook);
Router.delete('/api/v1/books/:id', deleteBook);

// auth routes for task 3 jwt middleware
Router.post('/api/v1/auth/signup', signup);
Router.post('/api/v1/auth/login', login);

module.exports = { Router };
