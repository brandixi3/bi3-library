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
  bookBorrowedDate: Date,
  bookReturnDate: Date,
  // fine: Number,
  archieve:Boolean,
  actualReturnDate: Date,
  collected:Boolean,
  returned:Boolean,
  returnedDetail:String
});

module.exports = mongoose.model('lendbook', lendbookSchema);