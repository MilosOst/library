'use strict';


class Book {
    constructor(
        title = 'Unknown',
        author = 'Unknown',
        totalPages = 0,
        pagesRead = 0,
    ) { 
        this.title = title;
        this.author = author;
        this.totalPages = totalPages;
        this.pagesRead = pagesRead;
        this.hasRead = (totalPages === pagesRead);
        myLibrary.addBookToLibrary(this);
    }
}


class Library {
    constructor() {
        this.books = [];
    }

    addBookToLibrary(book) {
        this.books.push(book)
    }
}


function displayBooks(myLibrary) {
    const gridContainer = document.querySelector('.collection-grid');
    for (let book of myLibrary.books) {
        const bookElement = createBookElement(book);
        gridContainer.appendChild(bookElement);
    }
}

function createBook() {
    const formData = document.querySelector('#add-form').elements;
    const title = formData[0].value;
    const author = formData[1].value;
    const pageCount = formData[2].value;
    const pagesRead = formData[3].value;

    return new Book(title, author, pageCount, pagesRead);
}


function createBookElement(book) {
    const newBook = document.createElement('div');
    newBook.classList = 'book-card';
    
    const title = document.createElement('p');
    const author = document.createElement('p');
    const pageTotal = document.createElement('p');
    const pagesRead = document.createElement('p');

    title.classList = 'title';
    author.classList = 'author';
    pagesRead.classList = 'read-total';
    
    title.textContent = book.title;
    author.textContent = book.author;
    pageTotal.textContent = `${book.totalPages} Pages`;
    pagesRead.textContent = `Read: ${book.pagesRead} | ${book.totalPages}`;

    const buttonSection = document.createElement('div');
    buttonSection.classList = 'buttons';

    buttonSection.append(createEditBtn(), createDelBtn());
    newBook.append(title, author, pageTotal, pagesRead, buttonSection);

    return newBook;
}


function createEditBtn() {
    const editBtn = document.createElement('button');
    editBtn.classList = 'edit';
    const editImg = document.createElement('img');
    editImg.src = './imgs/edit.svg';
    editImg.alt = 'Edit Button Icon';
    editBtn.appendChild(editImg);

    return editBtn;
}


function createDelBtn() {
    const delBtn = document.createElement('button');
    delBtn.classList = 'delete';
    delBtn.addEventListener('click', removeBook);
    const delImg = document.createElement('img');
    delImg.src = './imgs/delete.svg';
    delImg.alt = 'Delete Button Icon';
    delBtn.appendChild(delImg);

    return delBtn;
}

function removeBook() {
    const bookCardBox = this.parentElement.parentElement;
    bookCardBox.remove();
}


function openAddForm() {
    const addForm = document.querySelector('#add-form');
    addForm.reset();
    modal.showModal();
}


function validatePageNumInput(e) {
    if (e.key === '-' || e.key === '.') e.preventDefault();
}


function validatePageNumbers() {
    const givenPageTotal = parseInt(pageCountInput.value);
    const givenPagesRead = parseInt(pagesReadInput.value);
    const pageError = document.querySelector('#page-num-error');

    if (givenPagesRead > givenPageTotal) {
        pageError.classList = '';
        return false;
    }
    else {
        pageError.classList = 'inactive';
        return true;
    }
}


function validateForm(e) {
    if (!validatePageNumbers()) {
        e.preventDefault();
    }
    else {
        const newBook = createBook();
        console.log(newBook);
        myLibrary.addBookToLibrary(newBook);
        const bookElement = createBookElement(newBook);
        document.querySelector('.collection-grid').appendChild(bookElement);
    }
}




let myLibrary = new Library();

// Define edit and delete button for global use
displayBooks(myLibrary);


const modal = document.querySelector('#modal');
const addBtn = document.querySelector('#add-btn');
const closeBtn = document.querySelector('#close-btn');

addBtn.addEventListener('click', openAddForm);
closeBtn.addEventListener('click', () => modal.close());

const delBookBtns = document.querySelectorAll('.delete');
delBookBtns.forEach((button) => button.addEventListener('click', removeBook));


const pageCountInput = document.querySelector('#page-count');
const pagesReadInput = document.querySelector('#pages-read');

pageCountInput.addEventListener('keydown', validatePageNumInput);
pagesReadInput.addEventListener('keydown', validatePageNumInput);
pageCountInput.addEventListener('input', validatePageNumbers);
pagesReadInput.addEventListener('input', validatePageNumbers);


const submitBtn = document.querySelector('.btn-submit');
const addBookForm = document.querySelector('#add-form');
addBookForm.addEventListener('submit', validateForm);