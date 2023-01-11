class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('booklist') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('booklist'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);

    localStorage.setItem('booklist', JSON.stringify(books));
  }

  static deleteBook(title) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('booklist', JSON.stringify(books));
  }
}

class UI {
  static displayBooks() {
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

  static addBookToList(book) {
    const list = document.querySelector('.displayed-books');
    const row = document.createElement('div');

    row.innerHTML = `
        <p>${book.title}</p>
        <p>${book.author}</p>
        <button type="button" class="delete">remove</button>
    `;

    list.appendChild(row);
  }

  static deleteBook(el) {
    if (el.classList.contains('delete')) {
      el.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#book-name').value = '';
    document.querySelector('#book-author').value = '';
  }
}

document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('.add-form').addEventListener('submit', (e) => {
  e.preventDefault();

  const title = document.querySelector('#book-name').value;
  const author = document.querySelector('#book-author').value;

  const book = new Book(title, author);

  UI.addBookToList(book);
  Store.addBook(book);

  UI.clearFields();
});

document.querySelector('.displayed-books').addEventListener('click', (e) => {
  UI.deleteBook(e.target);
  const bookToRemove = e.target.previousElementSibling.previousElementSibling.textContent;

  Store.deleteBook(bookToRemove);
});
