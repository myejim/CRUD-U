const express = require('express');
const app = express();
 
const bookRoute = express.Router();
let Book = require('../model/Book');
 
// Get all Books
bookRoute.route('/').get((req, res) => {
    Book.find().then((response) => {
      res.status(200).json(response);
    })
    .catch((error) => {
      console.error(`Could not get books: ${error}`);
  })
})

// Add a book
bookRoute.route('/add-book').post((req, res) => {
  Book.create(req.body).then(() => {
    console.log('Book added successfully.');
    res.status(200);
  })
  .catch((error) => {
    console.error(`Coud not save book: ${error}`);
  })
})

// Delete a book
bookRoute.route('/delete-book/:id').delete((req, res) => {
  console.log(`Preparing to delete: ${req.params.id}`);
  Book.findByIdAndDelete(req.params.id).then(() => {
    console.log('Book deleted sucessfully.');
    res.status(200);
  })
  .catch((error) => {
    console.error(`Could not delete book: ${error}`);
  })
})

//Update book
bookRoute.route('/update-book').post((req,res) => {
  console.log(`Updating now: ${req.params.id}`);
  Book.findByIdAndUpdate(req.params.id).then(() => {
      console.log('Book successfully updated');
      res.status(200);
  })
  .catch((error) => {
    console.error(`Could not update book: ${error}`);
  })
})

module.exports = bookRoute;