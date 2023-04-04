import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "test",
});

app.use(express.json());
app.use(cors());

app.get("/", function (req, res) {
  res.send("Hello this is the backend");
});

//we are getting our books from backend.
app.get("/books", function (req, res) {
  const q = "SELECT * FROM books";
  db.query(q, (error, data) => {
    if (error) return res.json(error);
    return res.json(data);
  });
});
//we are posting our books to the backend.
app.post("/books", (req, res) => {
  const q = "INSERT INTO books (`title`,`desc`,`price`,`cover`) VALUES (?)";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [values], (error, data) => {
    if (error) return res.json(error);
    //  return res.json(data);
    return res.json("Booked has created Successfully.");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (error, data) => {
    if (error) return res.json(error);
    return res.json("Booked has deleted Successfully.");
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q =
    "UPDATE books SET `title` = ?, `desc` = ?, `price` = ?, `cover` = ? WHERE id = ?";
  const values = [
    req.body.title,
    req.body.desc,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (error, data) => {
    if (error) return res.json(error);
    return res.json("Booked has Updated Successfully.");
  });
});

app.listen(3000, () => {
  console.log("Connected to backend!");
});
