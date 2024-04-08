const express = require("express");
const exphbs = require("express-handlebars");

const app = express();

// Now we can get json data from the client
app.use(express.json());

// data from url param
app.use(express.urlencoded({ extended: false }));

//Array of JavaScript objects
const books = [
  {
    id: 1,
    title: "Inception",
    genre: "Science Fiction",
    releaseYear: 2010,
    price: 4.99,
    isAvailable: true,
  },
  {
    id: 2,
    title: "The Shawshank Redemption",
    genre: "Drama",
    releaseYear: 1994,
    price: 3.99,
    isAvailable: true,
  },
  {
    id: 3,
    title: "The Dark Knight",
    genre: "Action",
    releaseYear: 2008,
    price: 5.99,
    isAvailable: false,
  },
  {
    id: 4,
    title: "Forrest Gump",
    genre: "Drama",
    releaseYear: 1994,
    price: 3.49,
    isAvailable: true,
  },
  {
    id: 5,
    title: "The Lord of the Rings: The Fellowship of the Ring",
    genre: "Fantasy",
    releaseYear: 2001,
    price: 6.99,
    isAvailable: false,
  },
];

//Api
// Get all Books
app.get("/api/books", (req, res) => {
  res.json(books);
});

//Get one Book

app.get("/api/books/:id", (req, res) => {
  const booksId = Number(req.params.id);
  const book = books.find((book) => book.id === booksId);
  if (book) {
    res.status(200).json(book);
  } else {
    res.status(404).json({
      msg: "Not found",
    });
  }
});

//Create a book
app.post("/api/books", (req, res) => {
  const lastId = books[books.length - 1].id;
  const newId = lastId + 1;

  newBook = {
    id: newId,
    title: req.body.title,
    genre: req.body.genre,
    releaseYear: req.body.releaseYear,
    price: req.body.price,
  };

  books.push(newBook);
  res.location("http://localhost:3000/api/books/" + newId);
  res.status(201).json(newBook);
});

// Delete a book based on id
app.delete("/api/books/:id", (req, res) => {
  const booksId = Number(req.params.id);

  // Find the index of the book with the given ID
  const index = books.findIndex((book) => book.id === booksId);

  if (index !== -1) {
    // Remove the book from the array using splice
    books.splice(index, 1);

    res.status(200).json({
      id: booksId,
    });
  } else {
    res.status(404).json({
      msg: "Could not delete the book",
    });
  }
});

//Update the book

app.patch("/api/books/:id", (req, res) => {
  const idToUpdate = Number(req.params.id);
  const newTitle = req.body.title;
  const newGenre = req.body.genre;
  const newReleaseYear = req.body.releaseYear;
  const newPrice = req.body.price;

  books.forEach((book) => {
    if (book.id == idToUpdate) {
      book.title = newTitle;
      book.genre = newGenre;
      book.releaseYear = newReleaseYear;
      book.price = newPrice;
    }

    if (book) {
      res.status(200).json(book);
    } else {
      res.status(404).json({
        msg: "Could not update the book",
      });
    }
  });
});

// Handlebars
// Get all Books using handlebars
app.get("/books", (req, res) => {
  res.render("books", {
    title: "Books",
    books: books,
  });
});

//Get one book using Id
app.get("/books/:id", (req, res) => {
  const bookId = Number(req.params.id);
  const book = books.find((book) => book.id === bookId);
  if (book) {
    res.render("one-book", {
      title: "Books",
      books: book,
    });
  } else {
    res.render("one-book", {
      title: "Books",
      books: null,
    });
  }
});

// Create a book

app.get("/create", (req, res) => {
  res.render("create");
});

app.post("/create", (req, res) => {
  const lastId = books[books.length - 1].id;
  const newId = lastId + 1;

  const isAvailable = req.body.isAvailable === "true";
  newBook = {
    id: newId,
    title: req.body.title,
    genre: req.body.genre,
    releaseYear: req.body.releaseYear,
    price: req.body.price,
    isAvailable: isAvailable,
  };

  books.push(newBook);
  res.render("create", {
    title: "Create Books",
    books: newBook,
  });
  res.redirect("/books");
});

// Update a book

app.get("/update", (req, res) => {
  res.render("update");
});

app.post("/update", (req, res) => {
  const idToUpdate = Number(req.body.id);
  const newTitle = req.body.title;
  const newGenre = req.body.genre;
  const newReleaseYear = req.body.releaseYear;
  const newPrice = req.body.price;
  const newIsAvailable = req.body.isAvailable === "true";

  books.forEach((book) => {
    if (book.id === idToUpdate) {
      book.title = newTitle;
      book.genre = newGenre;
      book.releaseYear = newReleaseYear;
      book.price = newPrice;
      book.isAvailable = newIsAvailable;
    }
  });

  const book = books.find((book) => book.id === idToUpdate);
  if (book) {
    res.render("update", {
      title: " Updated Books",
      books: book,
    });
    res.redirect("/books");
  }
});

//Delete a book base on id
app.get("/delete", (req, res) => {
  res.render("delete");
});

app.post("/delete", (req, res) => {
  const bookIdToDelete = Number(req.body.id);
  const indexToDelete = books.findIndex((book) => book.id === bookIdToDelete);
  if (indexToDelete !== -1) {
    // Check if book exists
    books.splice(indexToDelete, 1); // Remove book from array
    res.redirect("/books"); // Redirect to books
  } else {
    res.render("delete", {
      title: "Delete Book",
      message: "Book not found",
    });
  }
});

// Default handlebars
app.engine(
  "handlebars",
  exphbs.engine({
    defaultLayout: "main",
  })
);
app.set("view engine", "handlebars");

//Folder for static files like css, jpg
app.use(express.static("public"));

app.use((req, res, next) => {
  res.status(404).send("Sorry could not find the content");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
