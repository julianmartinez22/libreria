
import { Book } from "./book.js";
import { Validate } from "./validations.js";

const book = new Book();

const editBookForm = document.getElementById("editBookForm");
const bookForm = document.getElementById("bookForm");
const validator = new Validate(); 


document.addEventListener("DOMContentLoaded", function() {
    book.showBooks();
})

bookForm.addEventListener('submit', function(event) {

    let bookObject = {};
    let id = 0;

    event.preventDefault();

     // Obtenemos los valores ingresados en el formulario
     const title = document.getElementById('title').value;
     const author = document.getElementById('author').value;
     const pages = document.getElementById('pages').value;
     const image = document.getElementById('image').value;
     const description = document.getElementById('description').value;

    // Validamos los campos
    if (!validator.validateRequired(title)) {
        alert('El título es obligatorio');
        return;
    }

    if (!validator.validateRequired(author)) {
        alert('El autor es obligatorio');
        return;
    }

    if (!validator.validatePages(pages)) {
        alert('El número de páginas debe ser mayor que 0');
        return;
    }

    if (!validator.validateURL(image)) {
        alert('La URL de la imagen no es válida');
        return;
    }

    if (!validator.validateDescription(description)) {
        alert('La descripción es demasiado larga (máximo 500 caracteres)');
        return;
    }

    if(!book.existsAnyBook()) {
        id = 1;
    } else {
        id = book.booksLastId() + 1;
    }

    bookObject = {
        id,  
        image,
        title,
        author,
        pages,
        description,
        
    }
    
   book.addBook(bookObject);

    // Si necesitas limpiar el formulario después de agregar el libro (opcional)
    bookForm.reset();

});


editBookForm.addEventListener("submit", function (event) {
    event.preventDefault();
    book.saveBookChanges();
});


window.removeBook = function(id) {
    book.removeBook(id);
};

window.editBook = function(id) {
    book.editBook(id);
};

