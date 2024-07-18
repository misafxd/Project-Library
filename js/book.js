const books = document.querySelector(".books");
const showAddBookForm = document.querySelector(".newBook");
const form = document.querySelector(".form");

const myLibrary = [];

class Book {
    constructor(title, author, pages){
        this._title = title;
        this._author = author;
        this._pages = pages;
        this._read = "not read yet";
        this._id = myLibrary.length;
    }

    changeReadStatus() {
        if (this._read === "not read yet"){
            this._read = "Already read";
        } else {
            this._read = "not read yet";
        }
    }

    id(){
        return this._id
    }

    info() {
        return `${this._title} by ${this._author}, ${this._pages} pages, ${this._read}`
    }

}

function addBookToLibrary(title,author, pages){
    let book = new Book(title, author, pages);
    myLibrary.push(book);
}

function addButton(type, id){
    const button = document.createElement("button");
    button.classList.add(type);
    button.innerText = type;

    if(type =="delete"){
        button.addEventListener("click", () =>{
            deleteBook(id);
        })
    }

    if(type == "mark-read"){
        button.addEventListener("click", () =>{
            markRead(id);
        })
    }

    return button;
}

function deleteBook(id) {
    const bookIndex = myLibrary.findIndex(book => book.id() === id);
    if (bookIndex !== -1) {
      const child = document.querySelector(`.book-${id}`);
      books.removeChild(child);
      myLibrary.splice(bookIndex, 1);
    }
  }

function markRead(id){
    const bookIndex = myLibrary.findIndex(book => book.id() === id);
    myLibrary[bookIndex].changeReadStatus()
    showLibrary()
}

function showLibrary(){
    while (books.firstChild){
        books.removeChild(books.firstChild);
    }
    myLibrary.forEach(book =>{
        let bookDescription = document.createElement("div");
        bookDescription.classList.add("book", `book-${book.id()}`);
        let newBook = document.createElement("p");
        newBook.textContent = book.info();
        bookDescription.appendChild(newBook);
        bookDescription.appendChild(addButton("delete", book.id()));
        bookDescription.appendChild(addButton("mark-read", book.id()));
        books.appendChild(bookDescription); 
    })
    
}

function toggleDisplay(){
    showAddBookForm.classList.toggle('toggle-display');
    form.classList.toggle("toggle-display");
}

showAddBookForm.addEventListener("click", ()=>{
    toggleDisplay();
});

form.addEventListener("submit",(event) => {
    event.preventDefault();

    var title = document.getElementById('title').value;
    var author = document.getElementById('author').value;
    var pages = document.getElementById('pages').value;

    addBookToLibrary(title, author, pages);
    showLibrary();
    toggleDisplay();
});


addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295);
addBookToLibrary("Ender's Game", "Orson Scott Card", 352);

showLibrary();


