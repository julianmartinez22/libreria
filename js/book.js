

export class Book {

    addBook(book) {
        console.log("llego el libro a add book:")
        console.log(book);

        let booksList = [];
        const booksString = localStorage.getItem("books");
        
        if (!booksString) {
            booksList.push(book);
            localStorage.setItem("books", JSON.stringify(booksList) );
            return;
        }

        booksList = JSON.parse(booksString);
        booksList.push(book);
        localStorage.setItem("books", JSON.stringify(booksList) );
    }

    removeBook(id) {
        const personasString = localStorage.getItem('book');

        // 2. Convertimos la cadena de texto de nuevo a un arreglo de objetos
        const personasRecuperadas = JSON.parse(personasString);

    }

    showBooks() {
        console.log('lista de libros');
    }

    existsAnyBook() {
        const books = localStorage.getItem("books");
        if( books) {
            return true;
        }
        return false;
    }

    booksLastId() {
        const booksString = localStorage.getItem("books");
        const books = JSON.parse(booksString);
        return books[books.length - 1].id;
    }
}