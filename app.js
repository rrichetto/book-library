// Cache the DOM
const titleInputEl = document.querySelector('.book-input__title'),
      authorInputEl = document.querySelector('.book-input__author'),
      ratingInputEl = document.querySelector('.book-input__rating'),
      submitEl = document.querySelector('.book-input__submit'),
      searchEl = document.querySelector('.search'),
      tableEl = document.querySelector('.table__body');


// Event Listeners
document.addEventListener('DOMContentLoaded', getBooksFromLocalStorage);
submitEl.addEventListener('click', addBook);
tableEl.addEventListener('click', removeBook);
searchEl.addEventListener('keyup', searchBooks);


// Get Books from Local Storage
function getBooksFromLocalStorage() {
  let books;

  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'))
  }

  books.forEach(function(book) {
    // Create New Elements
    const row = document.createElement('tr');
    const rowTitle = document.createElement('td');
    const rowAuthor = document.createElement('td');
    const rowRating = document.createElement('td');
    const rowRemove = document.createElement('td');

    // Add Classes to Elements
    row.classList.add('table__row')
    rowTitle.classList.add('table__row--title')
    rowAuthor.classList.add('table__row--author')
    rowRating.classList.add('table__row--rating')
    rowRemove.classList.add('table__row--remove')

    // Add Text Content to Elements
    rowTitle.appendChild(document.createTextNode(book.title));
    rowAuthor.appendChild(document.createTextNode(book.author));
    rowRating.appendChild(document.createTextNode(book.rating));

    rowRemove.innerHTML = `<i class="far fa-times-circle remove"></i>`;

    // Append Child Elements to Row Element
    row.appendChild(rowTitle);
    row.appendChild(rowAuthor);
    row.appendChild(rowRating);
    row.appendChild(rowRemove);

    // Append Entire Book Row to UI
    tableEl.appendChild(row);
  })
}


// Add Book
function addBook(e) {

  // Cache DOM
  const title = titleInputEl.value,
        author = authorInputEl.value,
        rating = ratingInputEl.value;

  // If title field is empty, throw and error and do not submit
  if (title === '') {
    // Throw error message
    errorMessage();

    // Remve error message after 2 seconds
    setTimeout(removeErrorMessage, 3000);

    // Use 'return' to stop the addBook() function from executing
    return;
  }

  // Book Constructor
  function Book(title, author, rating) {
    this.title = title;
    this.author = author;
    this.rating = rating;
  }

  // Instantiate a new book
  const book = new Book(title, author, rating);

  // Create New Elements
  const row = document.createElement('tr');
  const rowTitle = document.createElement('td');
  const rowAuthor = document.createElement('td');
  const rowRating = document.createElement('td');
  const rowRemove = document.createElement('td');

  // Add Classes to Elements
  row.classList.add('table__row')
  rowTitle.classList.add('table__row--title')
  rowAuthor.classList.add('table__row--author')
  rowRating.classList.add('table__row--rating')
  rowRemove.classList.add('table__row--remove')

  // Add Text Content to Elements
  rowTitle.appendChild(document.createTextNode(book.title));
  rowAuthor.appendChild(document.createTextNode(book.author));
  rowRating.appendChild(document.createTextNode(book.rating));

  rowRemove.innerHTML = `<i class="far fa-times-circle remove"></i>`;

  // Append Child Elements to Row Element
  row.appendChild(rowTitle);
  row.appendChild(rowAuthor);
  row.appendChild(rowRating);
  row.appendChild(rowRemove);

  // Append Entire Book Row to UI
  tableEl.appendChild(row);

  // Add Book to Local Storage
  addToLocalStorage(title, author, rating);

  // Clear Input Fields
  titleInputEl.value = '';
  authorInputEl.value = '';
  ratingInputEl.value = '';

  // Prevent Form's Default Behavior
  e.preventDefault();
}

// Remove Book
function removeBook(e) {
  console.log(e.target.classList);
  // Remove from UI
  if (e.target.classList.contains('remove')) {
    console.log(e.target.parentElement.parentElement)
    e.target.parentElement.parentElement.remove();
    console.log('triggered');

    // Remove from Local Storage
    const book = e.target.parentElement.parentElement.firstElementChild.textContent;
    removeFromLocalStorage(book);
  }
}

// Search Books
function searchBooks() {
  const bookEls = document.querySelectorAll('.table__row');
  const searchTerm = searchEl.value.toLowerCase();

  for (let book of bookEls) {
    const title = book.firstElementChild.textContent.toLowerCase();

    if (title.includes(searchTerm)) {
      book.style.display = 'table-row';
    } else {
      book.style.display = 'none';
    }
  }

  // If a search term is entered, turn border red
  if (searchEl.value !== '') {
    searchEl.style.borderColor = 'red';
  } else {
    searchEl.style.borderColor = '#bbb';
  }
}

// Error Message
function errorMessage() {
  titleInputEl.placeholder = "please enter a title";
  titleInputEl.classList.add('placeholder-style');
}

// Remove Error Message
function removeErrorMessage() {
  titleInputEl.placeholder = "Book Title";
  titleInputEl.classList.remove('placeholder-style');
}

// Add to Local Storage
function addToLocalStorage(title, author, rating) {
  let books;

  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'));
  }

  const book = {
    title: title,
    author: author,
    rating: rating
  }

  books.push(book);

  localStorage.setItem('books', JSON.stringify(books))
}

// Remove from Local Storage
function removeFromLocalStorage(bookToRemove) {
  let books;

  if (localStorage.getItem('books') === null) {
    books = [];
  } else {
    books = JSON.parse(localStorage.getItem('books'))
  }

  books.forEach(function(book, index) {
    if (bookToRemove === book.title) {
      books.splice(index, 1)
    }
  })

  localStorage.setItem('books', JSON.stringify(books));
}
