/* eslint-disable eqeqeq */
const fs = require('fs/promises');

const booksPath = `${__dirname}../../../books.json`;

exports.getAllBooks = async (req, res) => {
  try {
    const data = await fs.readFile(booksPath, 'utf-8');
    return res.end(data);
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    return res.end('Something went wrong!');
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { url } = req;
    const id = url.split('/')[4];
    const data = await fs.readFile(booksPath, 'utf-8');
    const book = JSON.parse(data).filter((b) => b.id.toString() === id);
    return res.end(JSON.stringify(book[0]));
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    return res.end('Something went wrong!');
  }
};

exports.createBook = async (req, res) => {
  try {
    let data = '';

    await req.on('data', (chunk) => {
      data += chunk;
    });

    if (data === '') {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      return res.end('Please provide valid book details');
    }

    await req.on('end', async () => {
      const requestData = JSON.parse(data);

      if (!requestData || requestData === undefined || requestData == {}) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        return res.end('Please provide book details!');
      }

      let books = await fs.readFile(booksPath, 'utf-8');
      books = JSON.parse(books);

      const sz = books.length;
      const idx = books[sz - 1].id;
      const newBookData = { ...requestData, id: idx + 1 };
      books.push(newBookData);

      await fs.writeFile(booksPath, JSON.stringify(books));
      return res.end('Book has been created successfully.');
    });
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    return res.end('Something went wrong!');
  }
};

exports.updateBook = async (req, res) => {
  try {
    let data = '';

    await req.on('data', (chunk) => {
      data += chunk;
    });

    if (data === '') {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      return res.end('Please provide valid book details');
    }

    await req.on('end', async () => {
      const requestData = JSON.parse(data);

      if (!requestData || requestData === undefined || requestData == {}) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        return res.end('Please provide book details!');
      }

      let books = await fs.readFile(booksPath, 'utf-8');
      books = JSON.parse(books);

      books = books.map((book) => {
        if (book.id == requestData.id) {
          book = requestData;
        }
        return book;
      });

      await fs.writeFile(booksPath, JSON.stringify(books));
      return res.end('Book has been updated successfully!');
    });
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    return res.end('Something went wrong!');
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { url } = req;
    const id = url.split('/')[4];

    if (id === undefined || !id || id === '') {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      return res.end('Please provide a valid book id');
    }

    let books = await fs.readFile(booksPath, 'utf-8');
    books = JSON.parse(books).filter((book) => book.id.toString() !== id);

    await fs.writeFile(booksPath, JSON.stringify(books));
    res.end('Book has been deleted succesfully!');
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    return res.end('Something went wrong!');
  }
};
