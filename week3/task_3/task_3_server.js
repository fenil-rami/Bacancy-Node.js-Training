/* eslint-disable eqeqeq */
/* eslint-disable no-console */
const http = require('http');

const HOST = 'localhost';
const PORT = 9090;

// controllers
const {
  getAllBooks, getBookById, createBook, updateBook, deleteBook,
} = require('./controllers/books');

const server = http.createServer((req, res) => {
  const { url } = req;
  const { method } = req;

  switch (method) {
  case 'GET':
    if (url === '/api/v1/books/') return getAllBooks(req, res);
    if (url.startsWith('/api/v1/books/')) return getBookById(req, res);
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route not found');
    break;
  case 'POST':
    if (url === '/api/v1/books/') return createBook(req, res);
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route not found');
    break;
  case 'PUT':
    if (url === '/api/v1/books/') return updateBook(req, res);
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route not found');
    break;
  case 'DELETE':
    if (url.startsWith('/api/v1/books/')) return deleteBook(req, res);
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Route not found');
    break;
  default:
    res.writeHead(400, { 'Content-Type': 'text/plain' });
    res.end('Please provide a valid method!');
    break;
  }
});

server.listen(PORT, HOST, () => {
  console.log(`Server has started on port ${PORT}`);
});
