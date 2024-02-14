/* eslint-disable import/extensions */
const fs = require('fs/promises');
const { internalServerError, validBookIdError, validBookObjectError } = require('../handler/errors.js');

const booksPath = `${__dirname}../../../../week3/books.json`;

exports.getAllBooks = async (req, res) => {
  try {
    const books = await fs.readFile(booksPath, 'utf-8');
    return res.status(200).json({
      code: 200,
      message: 'all books has been fetched successfully.',
      data: JSON.parse(books),
    });
  } catch (error) {
    return internalServerError(res, error);
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return validBookIdError(res);

    const books = await fs.readFile(booksPath, 'utf-8');
    const book = JSON.parse(books).filter((b) => b.id.toString() === id);

    if (!book || book.length === 0) return validBookIdError(res);

    return res.status(200).json({
      code: 200,
      message: 'book has been fetched successfully.',
      data: book,
    });
  } catch (error) {
    return internalServerError(res, error);
  }
};

exports.createBook = async (req, res) => {
  try {
    const { body } = req;
    if (!body || (typeof body !== 'object') || !body.name || !body.id || !body.description || !body.price) return validBookObjectError(res);

    let books = await fs.readFile(booksPath, 'utf-8');
    books = JSON.parse(books);
    books.push(body);

    await fs.writeFile(booksPath, JSON.stringify(books));
    return res.status(201).json({
      code: 201,
      message: 'Book has been created successfully!',
      book: body,
    });
  } catch (error) {
    return internalServerError(res, error);
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { body } = req;
    if (!body || (typeof body !== 'object') || !body.name || !body.id || !body.description || !body.price) return validBookObjectError(res);

    let books = await fs.readFile(booksPath, 'utf-8');

    books = JSON.parse(books);
    books = books.map((book) => {
      if (book.id === body.id) book = body;
      return book;
    });

    await fs.writeFile(booksPath, JSON.stringify(books));

    return res.status(200).json({
      code: 200,
      message: 'Book has been updated succesfully!',
    });
  } catch (error) {
    return internalServerError(res, error);
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return validBookIdError(res);

    let books = await fs.readFile(booksPath, 'utf-8');

    books = JSON.parse(books).filter((book) => book.id !== Number(id));

    await fs.writeFile(booksPath, JSON.stringify(books));

    return res.status(200).json({
      code: 200,
      message: 'Book has been deleted successfully!',
    });
  } catch (error) {
    return internalServerError(res, error);
  }
};
