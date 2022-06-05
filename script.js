'use strict';

let myLibrary = [];

class Book {
    constructor(
        title = 'Unknown',
        author = 'Unknown',
        totalPages = 0,
        pagesRead = 0,
        hasRead = false,
    ) { 
        this.title = title;
        this.author = author;
        this.totalPages = totalPages;
        this.pagesRead = pagesRead;
        this.hasRead = hasRead;

        this.addBookToLibrary();
    }
    
    addBookToLibrary() {
        myLibrary.push(this);
    }

}


function displayBooks(myLibrary) {
    for (let book of myLibrary) {
        console.log(book);
    }
}

let a = new Book();
displayBooks(myLibrary);