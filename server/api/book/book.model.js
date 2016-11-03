'use strict';

var uniqueValidator = require('mongoose-unique-validator');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var BookSchema = new Schema({
  isbn: {type: String , unique: true},
  title: String,
  author: String,
  publisher: String,
  catagory: String,
  yearOfPublication: String,
  totalCopies: Number,
  remainingCopies: Number,
  detail:String,
  archieve:Boolean,
  donatedBy:String,
  donationDetail:String,
  dateAdded:Date,
  dateUpdated:Date
});

 BookSchema.plugin(uniqueValidator, { message: 'ISBN is expected to be unique.' });

 /*{
    message: 'Validation failed',
    // name: 'ValidationError',
    errors: {
        isbn: {
            message: 'Validator failed for path `username` with value `JohnSmith`',
            name: 'ValidatorError',
            path: 'isbn'
            
        }
    }
}*/
// BookSchema.pre("save",function(next, done) {
//     var self = this;
//     mongoose.models["Book"].findOne({isbn : self.isbn},function(err, results) {
//         if(err) {
//             done(err);
//         } else if(results) { //there was a result found, so the email address exists
//             self.invalidate("email","email must be unique");
//             done(new Error("email must be unique"));
//         } else {
//             done();
//         }
//     });
//     next();
// });

// BookSchema
//   .path('isbn')
//   .validate(function(value, respond) {
//     var self = this;
//     this.constructor.findOne({isbn: value}, function(err, book) {
//       console.log(err);
//       if(err) throw err;
//       if(book) {
//         if(self.id === book.id) return respond(true);
//         return respond(false);
//       }
//       respond(true);
//     });
// }, 'The specified book is already added.');


module.exports = mongoose.model('Book', BookSchema);