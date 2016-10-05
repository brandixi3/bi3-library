'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var lendbookSchema = new Schema({
  userId: Schema.Types.ObjectId,
  userName: String,
  userEmail: String,
  userRole: String,
  userProvider: String,
  bookId: Schema.Types.ObjectId,
  bookIsbn: String,
  bookTitle: String,
  bookAuthor: String,
  bookPublisher: String,
  bookCategory: String,
  bookYearOfPublication: String,
  bookBorrowedDate: String,
  bookReturnDate: String,
  fine: Number
});

module.exports = mongoose.model('lendbook', lendbookSchema);