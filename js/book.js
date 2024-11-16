export class Book {
  addBook(book) {
    console.log("llego el libro a add book:");
    console.log(book);

    let booksList = [];
    const booksString = localStorage.getItem("books");

    if (!booksString) {
      booksList.push(book);
      localStorage.setItem("books", JSON.stringify(booksList));
      return;
    }

    booksList = JSON.parse(booksString);
    booksList.push(book);
    localStorage.setItem("books", JSON.stringify(booksList));

    this.showBooks();
  }

  removeBook(id) {
    let booksString = localStorage.getItem("books");
    let booksList = [];

    if (booksString) {
      booksList = JSON.parse(booksString);
      booksList = booksList.filter((book) => book.id != id);
      booksString = JSON.stringify(booksList);
      localStorage.setItem("books", JSON.stringify(booksList));
    }

    this.showBooks();
  }

  editBook(id) {
    const booksString = localStorage.getItem("books");
    const booksList = JSON.parse(booksString);
    const book = booksList.find((book) => book.id == id);

    // Llenar los campos del modal con los datos del libro seleccionado
    document.getElementById("editBookId").value = book.id;
    document.getElementById("editTitle").value = book.title;
    document.getElementById("editAuthor").value = book.author;
    document.getElementById("editPages").value = book.pages;
    document.getElementById("editImage").value = book.image;
    document.getElementById("editDescription").value = book.description;

    // Mostrar el modal
    const editModal = bootstrap.Modal.getOrCreateInstance('#editBookModal');
    editModal.show();
  }

  saveBookChanges() {
    const id = parseInt(document.getElementById("editBookId").value);
    const title = document.getElementById("editTitle").value;
    const author = document.getElementById("editAuthor").value;
    const pages = document.getElementById("editPages").value;
    const image = document.getElementById("editImage").value;
    const description = document.getElementById("editDescription").value;

    let booksString = localStorage.getItem("books");
    let booksList = JSON.parse(booksString);

    // Actualizar el libro
    booksList = booksList.map((book) => {
      if (book.id === id) {
        return { id, image, title, author, pages, description };
      }
      return book;
    });

    localStorage.setItem("books", JSON.stringify(booksList));
    this.showBooks();

    // Cerrar el modal
    const editModal = bootstrap.Modal.getOrCreateInstance('#editBookModal');
    editModal.hide();
  }

  showBooks() {
    console.log("excuting");
    const booksListTBody = document.getElementById("book-list");
    while (booksListTBody.firstChild) {
      booksListTBody.removeChild(booksListTBody.firstChild);
    }
    const books = this.getBooks();
    console.log(books);
    books.forEach((book) => {
      const row = document.createElement("tr");
      const id = book.id;
    
      // TODO: aqui se hace lo de la imagen
      for (let key in book) {
        const cell = document.createElement("td");
        cell.textContent = book[key];
        row.appendChild(cell);
      }

      const cellActions = document.createElement("td");
      const buttonDelete = `<button class="btn btn-danger" onClick="removeBook(${id})">Eliminar</button>`;
      const buttonEdit = `<button class="btn btn-info" onClick="editBook(${id})" data-bs-toggle="modal">Editar</button>`;
      const actionsButtons = buttonDelete + buttonEdit;
      cellActions.innerHTML += actionsButtons;

      row.appendChild(cellActions);
      booksListTBody.appendChild(row);
    });
  }

  getBooks() {
    const booksString = localStorage.getItem("books");
    return booksString ? JSON.parse(booksString) : [];
  }

  existsAnyBook() {
    const booksString = localStorage.getItem("books");
    const books = JSON.parse(booksString);

    if (books.length > 0) {
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
