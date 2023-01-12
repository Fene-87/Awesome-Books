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
    row.classList.add('display-row')

    row.innerHTML = `
        <div class="all-books">
          <p>${book.title}</p>
          <p>&nbsp;by ${book.author}</p>
        </div>
        <button type="button" class="delete">remove</button>
    `;

    list.appendChild(row);
    const allChildren = document.querySelectorAll('.display-row')
    allChildren.forEach((element, index) => {
      if(index % 2 === 0) {
        element.classList.add('background-color-one')
      } else {
        element.classList.add('background-color-two')
      }
    })
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
  const bookToRemove = e.target.previousElementSibling.firstElementChild.textContent;

  Store.deleteBook(bookToRemove);
  
});

const currentDate = document.querySelector('.current-date');

const updateClock = () => {
  let today = new Date();
  let month = today.getMonth();
  let year = today.getFullYear();
  let date = today.getDate();
  let hours = today.getHours();
  let minutes = today.getMinutes();
  let seconds = today.getSeconds();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  currentDate.innerHTML = `
    <p>${months[month]} ${date}th ${year},  ${hours}:${minutes}:${seconds}</p>
  `;
}

const initClock = () => {
  updateClock();
  window.setInterval('updateClock()', 1);
}

document.addEventListener('DOMContentLoaded', initClock);

const navLinks = document.querySelectorAll('.item');
const firstSection = document.querySelector('.first-section');
const secondSection = document.querySelector('.second-section');
const thirdSection = document.querySelector('.third-section');

navLinks.forEach((link, index) => {
  if(index === 0) {
    link.addEventListener('click', () => {
      link.classList.add('link-color');
      link[1].classList.remove('link-color');
      link[2].classList.remove('link-color');
      firstSection.classList.remove('hide-section');
      secondSection.classList.add('hide-section');
      thirdSection.classList.add('hide-section');
    })
  } else if (index === 1) {
    link.addEventListener('click', () => {
      link.classList.add('link-color');
      navLinks[0].classList.remove('link-color');
      navLinks[2].classList.remove('link-color');
      firstSection.classList.add('hide-section');
      secondSection.classList.remove('hide-section');
      thirdSection.classList.add('hide-section');
    })
  } else {
    link.addEventListener('click', () => {
      link.classList.add('link-color');
      navLinks[0].classList.remove('link-color');
      navLinks[1].classList.remove('link-color');
      firstSection.classList.add('hide-section');
      secondSection.classList.add('hide-section');
      thirdSection.classList.remove('hide-section');
    })
  }
})
