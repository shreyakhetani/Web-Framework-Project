const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const Product = require("./models/Product");

const dbURI =
  "mongodb+srv://" +
  process.env.DBUSERNAME +
  ":" +
  process.env.DBPASSWORD +
  "@" +
  process.env.CLUSTOR +
  ".mongodb.net/" +
  process.env.DB +
  "?retryWrites=true&w=majority&appName=Cluster0";

console.dbURI;

mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("Connected to DB");
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => console.log("Listening on " + PORT));
  })
  .catch((err) => {
    console.log(err);
  });

// const newProduct = new Product({
//   name: "Chair",
//   Price: 100,
// });

// newProduct
//   .save()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// Product.find()
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const getAll = async () => {
//   try {
//     const result = await Product.find();
//     console.log(result);
//   } catch (error) {
//     console.log(error);
//   }
// };

// getAll();

app.get("/products", async (req, res) => {
  try {
    const result = await Product.find();
    res.json(result);
  } catch (error) {
    console.log(error);
  }
});

app.get("/products/:id", async (req, res) => {
  const id = req.params.id;
  const Product = await Product.findById(id);
  res.json(Product);
});
