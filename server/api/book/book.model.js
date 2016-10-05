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
  remainingCopies: String,
  detail:String,
  archieve:Boolean,
  image: { type: String,
    default: 'http://www.usborne.com/images/catalogue/custom-pages/write-your-own/write-your-own-story-book.jpg'
}

});

module.exports = mongoose.model('Book', BookSchema);