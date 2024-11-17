export class Book {
  addBook(book) {
    console.log("llego el libro a add book:");
    console.log(book);

    let booksList = [];
    const booksString = localStorage.getItem("books");

    if (!booksString) {
      // Si no hay libros, inicializa la lista
      book.id = 1; // Primer ID
      booksList.push(book);
      localStorage.setItem("books", JSON.stringify(booksList));
      return;
    }

    if (!booksString) {
      booksList.push(book);
      localStorage.setItem("books", JSON.stringify(booksList));
      return;
    }

    booksList = JSON.parse(booksString);
    book.id = this.findNextAvailableId();
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

    document.getElementById("editBookId").value = book.id;
    document.getElementById("editTitle").value = book.title;
    document.getElementById("editAuthor").value = book.author;
    document.getElementById("editPages").value = book.pages;
    document.getElementById("editImage").value = book.image;
    document.getElementById("editDescription").value = book.description;

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

    booksList = booksList.map((book) => {
      if (book.id === id) {
        return { id, image, title, author, pages, description };
      }
      return book;
    });

    localStorage.setItem("books", JSON.stringify(booksList));
    this.showBooks();

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
      for (let key in book) {
        const cell = document.createElement("td");
        if (key === "image") {
          const img = document.createElement("img");
          img.className = 'img-fluid book-img';
          img.src = book[key];
          img.alt = `Portada de ${book.title}`;
          img.style.width = "50px";
          img.style.height = "auto";
          cell.appendChild(img);
        } else {
          cell.textContent = book[key];
        }
        row.appendChild(cell);
      }

      const cellActions = document.createElement("td");
      const buttonDelete = `<button class="btn btn-danger" onClick="removeBook(${id})">Eliminar</button>`;
      const buttonEdit = `<button class="btn btn-primary mt-1 btn-sizing" onClick="editBook(${id})" data-bs-toggle="modal">Editar</button>`;
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

  updateBookList(filteredBooks) {
    const booksListTBody = document.getElementById("book-list");
    
    while (booksListTBody.firstChild) {
      booksListTBody.removeChild(booksListTBody.firstChild);
    }

    filteredBooks.forEach((book) => {
      const row = document.createElement("tr");
      const id = book.id;
      for (let key in book) {
        const cell = document.createElement("td");
        if (key === "image") {
          const img = document.createElement("img");
          img.className = 'img-fluid book-img';
          img.src = book[key];
          img.alt = `Portada de ${book.title}`;
          img.style.width = "50px";
          img.style.height = "auto";
          cell.appendChild(img);
        } else {
          cell.textContent = book[key];
        }
        row.appendChild(cell);
      }
  
      const cellActions = document.createElement("td");
      const buttonDelete = `<button class="btn btn-danger" onClick="removeBook(${id})">Eliminar</button>`;
      const buttonEdit = `<button class="btn btn-primary mt-1 btn-sizing" onClick="editBook(${id})" data-bs-toggle="modal">Editar</button>`;
      const actionsButtons = buttonDelete + buttonEdit;
      cellActions.innerHTML += actionsButtons;
  
      row.appendChild(cellActions);
      booksListTBody.appendChild(row);
    });
  }
  
  initializeSearchListener() {
    let timeout;
    const searchBar = document.getElementById("searchBar");
    const booksTable = document.getElementById("book-list");
  
    if (!searchBar) {
      console.error("El elemento con ID 'searchBar' no existe.");
      return;
    }
  
    searchBar.addEventListener("input", (e) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        const query = e.target.value.toLowerCase();
        const filteredBooks = this.getBooks().filter((book) =>
          book.title.toLowerCase().includes(query) || 
          (book.category && book.category.toLowerCase().includes(query))
        );
        this.updateBookList(filteredBooks);
        if (filteredBooks.length > 0) {
          booksTable.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    });
  }

  constructor() {
    this.initializeSearchListener();
  }

  findNextAvailableId() {
    const books = this.getBooks();
    if (books.length === 0) {
      return 1; // Si no hay libros, empieza desde 1
    }
  
    // Crear un array con todos los IDs existentes
    const ids = books.map((book) => book.id);
  
    // Buscar el primer número entero positivo que no esté en la lista de IDs
    let nextId = 1;
    while (ids.includes(nextId)) {
      nextId++;
    }
  
    return nextId;
  }
}
