/* eslint-disable no-console */
const book = {
  title: 'Atomic Habits',
  author: 'James Clear',
  pages: 285,
  displayInfo() {
    console.log(`The book '${this.title}' is written by ${this.author} and has total ${this.pages} pages.`);
  },
};

book.displayInfo();
