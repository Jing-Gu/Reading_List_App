// let book = document.querySelector("#book-list li:nth-child(2) .name");
// console.log(book);

let books = document.querySelectorAll("#book-list li .name");
console.log(books);

// transform a variable to an array, in order to use the array function forEach(),
// append a string called book title after each textContent
Array.from(books).forEach(book => (book.textContent += " (book title)"));

//change DOM, manipulate html elements by .innerHTML
let bookList = document.querySelector("#book-list");
// bookList.innerHTML = "<h2>Books and more books...</h2>";
// bookList.innerHTML += "<p>Append something...</p>";

console.log("book-list next sibling is:", bookList.nextElementSibling);
console.log("book-list previous sibling is:", bookList.previousElementSibling);

//bookList.previousElementSibling will return its sibling <header>,
//possible to narrow down selection just in this <header> part
bookList.previousElementSibling.querySelector("p").innerHTML +=
  "<br/> Too cool for everyone!";

//How to create the delete function to DELETE BOOKS
//1.store the <ul> in the variable list
//2.add event listener to the list, if the target (event trigger)
//has "delete" class name, which means it's a button, do the following function
//3. store the target parent in the variable book, remove the child of list

const list = document.querySelector("#book-list ul");
list.addEventListener("click", function(e) {
  if (e.target.className == "delete") {
    const book = e.target.parentElement;
    list.removeChild(book);
  }
});

//How to add a new book
const addBook = document.forms["add-book"];
addBook.addEventListener("submit", function(e) {
  e.preventDefault();
  const newBook = addBook.querySelector('input[type="text"]').value;
  //console.log(newBook); (to check if it works)

  //create elements
  const li = document.createElement("li");
  const bookName = document.createElement("span");
  const deleteBtn = document.createElement("span");

  //add content
  bookName.textContent = newBook;
  deleteBtn.textContent = "delete";

  //add classes
  bookName.classList.add("name");
  deleteBtn.classList.add("delete");

  //construct the elements and append to DOM, make the same layout
  li.appendChild(bookName);
  li.appendChild(deleteBtn);
  list.appendChild(li);
});

//How to hide books (checkbox & change events)
const hideBox = document.querySelector("#hide");
hideBox.addEventListener("change", function(e) {
  if (hideBox.checked) {
    list.style.display = "none";
    document.querySelector("#changeStatus").textContent = "Show all books";
  } else {
    list.style.display = "initial";
    document.querySelector("#changeStatus").textContent = "Hide all books";
  }
});

//How to filter books (custom search)
//grab the form in the document, with its id in []
const searchBar = document.forms["search-books"].querySelector("input");
searchBar.addEventListener("keyup", function(e) {
  const term = e.target.value.toLowerCase(); //store the customer input
  const books = list.getElementsByTagName("li"); //get all books from <li> tag
  Array.from(books).forEach(book => {
    const title = book.firstElementChild.textContent; //the 1st element is the <span> with class "name"
    if (title.toLowerCase().indexOf(term) != -1) {
      book.style.display = "block";
    } else {
      book.style.display = "none";
    }
  });
});

//Explain the comparison using indexOf()
//get the index (position) of this term within the title string
//if the term doesn't appear in the sting, the index will be -1
//so if the index is NOT equal to -1, the book exist, display block
