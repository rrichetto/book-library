// Cache the DOM
const titleInputEl = document.querySelector('.book-input__title'),
      authorInputEl = document.querySelector('.book-input__author'),
      ratingInputEl = document.querySelector('.book-input__rating'),
      submitEl = document.querySelector('.book-input__submit'),
      searchEl = document.querySelector('.search'),
      tableEl = document.querySelector('.table__body');


// Event Listeners
submitEl.addEventListener('click', addBook);
tableEl.addEventListener('click', removeBook);
searchEl.addEventListener('keyup', searchBooks);


// Add Book
function addBook(e) {

  // Cache DOM
  const title = titleInputEl.value,
        author = authorInputEl.value,
        rating = ratingInputEl.value;

  // If title field is empty, throw and error and do not submit
  if (title === '') {
    errorMessage('Please enter the book title');
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

  rowRemove.innerHTML = `<i class="far fa-times-circle"></i>`;

  // Append Child Elements to Row Element
  row.appendChild(rowTitle);
  row.appendChild(rowAuthor);
  row.appendChild(rowRating);
  row.appendChild(rowRemove);

  // Append Entire Book Row to UI
  tableEl.appendChild(row);

  // Clear Input Fields
  titleInputEl.value = '';
  authorInputEl.value = '';
  ratingInputEl.value = '';

  // Prevent Form's Default Behavior
  e.preventDefault();
}

// Remove Book
function removeBook() {
  console.log('triggered');
}

// Search Books
function searchBooks() {
  const bookEls = document.querySelectorAll('.table__row');
  const searchTerm = searchEl.value.toLowerCase();

  for (let book of bookEls) {
    const title = book.firstElementChild.textContent.toLowerCase();

    if (title.indexOf(searchTerm) === -1) { // -1 if there is no match
      book.style.display = 'none';
    } else {
      book.style.display = 'table-row'; // this is displayed as a 'table-row', not as 'block'
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
function errorMessage(text) {

}