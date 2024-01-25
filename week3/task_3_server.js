/* eslint-disable eqeqeq */
/* eslint-disable no-console */
const fs = require('fs');
const http = require('http');

const HOST = 'localhost';
const PORT = 9090;

const server = http.createServer((req, res) => {
  const { url } = req;
  const { method } = req;

  switch (method) {
  case 'GET':
    if (url === '/api/books/getallbooks') {
      fs.readFile('./books.json', 'utf-8', (err, books) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Something went wrong!');
        } else res.end(books);
      });
    } else if (url.startsWith('/api/books/get/')) {
      const id = url.split('/')[4];
      fs.readFile('./books.json', 'utf-8', (err, books) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Something went wrong!');
        } else {
          const book = JSON.parse(books).filter((b) => b.id.toString() === id);
          res.end(JSON.stringify(book[0]));
        }
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Route not found');
    }
    break;
  case 'POST':
    if (url === '/api/books/create') {
      let data = '';

      req.on('data', (chunk) => {
        data += chunk;
      });

      if (data === '') {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Please provide valid book details');
        return;
      }

      req.on('end', () => {
        const requestData = JSON.parse(data);
        if (!requestData || requestData === undefined || requestData == {}) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Please provide book details!');
        }
        fs.readFile('./books.json', 'utf-8', (err, books) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Something went wrong!');
          } else {
            books = JSON.parse(books);
            const sz = books.length;
            const idx = books[sz - 1].id;
            const newBookData = { ...requestData, id: idx + 1 };
            books.push(newBookData);
            fs.writeFile('./books.json', JSON.stringify(books), (error) => {
              if (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Something went wrong!');
              } else res.end('Book has been created successfully!');
            });
          }
        });
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Route not found');
    }
    break;
  case 'PUT':
    if (url === '/api/books/update') {
      let data = '';

      req.on('data', (chunk) => {
        data += chunk;
      });

      if (data === '') {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Please provide valid book details');
        return;
      }

      req.on('end', () => {
        const requestData = JSON.parse(data);
        if (!requestData || requestData === undefined || requestData == {}) {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Please provide book details!');
        }
        fs.readFile('./books.json', 'utf-8', (err, books) => {
          if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Something went wrong!');
          } else {
            books = JSON.parse(books);
            books = books.map((book) => {
              if (book.id == requestData.id) {
                book = requestData;
              }
              return book;
            });
            fs.writeFile('./books.json', JSON.stringify(books), (error) => {
              if (error) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Something went wrong!');
              } else res.end('Book has been updated successfully!');
            });
          }
        });
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Route not found');
    }
    break;
  case 'DELETE':
    if (url.startsWith('/api/books/delete/')) {
      const id = url.split('/')[4];
      if (id === undefined || !id || id === '') {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Please provide a valid book id');
        return;
      }
      fs.readFile('./books.json', 'utf-8', (err, books) => {
        if (err) {
          res.writeHead(500, { 'Content-Type': 'text/plain' });
          res.end('Something went wrong!');
        } else {
          books = JSON.parse(books).filter((book) => book.id.toString() !== id);
          fs.writeFile('./books.json', JSON.stringify(books), (error) => {
            if (error) {
              res.writeHead(500, { 'Content-Type': 'text/plain' });
              res.end('Something went wrong!');
            } else res.end('Book has been deleted succesfully!');
          });
        }
      });
    } else {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Route not found');
    }
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
