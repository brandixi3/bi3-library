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
  totalCopies: Number,
  remainingCopies: Number,
  detail:String,
  archieve:Boolean,
  dateAdded:Date,
  dateUpdated:Date,
  cover:Buffer
});

module.exports = mongoose.model('Book', BookSchema);