'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
  isbn: String,
  title: String,
  author: String,
  publisher: String,
  catagory: String,
  yearOfPublication: String,
  totalCopies: String,
  remainingCopies: String

});

module.exports = mongoose.model('Book', BookSchema);