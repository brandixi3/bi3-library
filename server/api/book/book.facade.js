'use strict';

var _ = require('lodash');
var async = require('async');

//var TenantModel = require('./book.model');
var BookModel = require('./book.model');
var LendModel = require('./lendbook.model');

// Get list of book
exports.findAll = function(cb) {
    BookModel.find({archieve: {$ne: true}},cb);
};

// Get a single book
exports.findById = function(id, cb) {
    BookModel.findById(id, cb);
};

// Get a single book by isbn
exports.findByIsbn = function(isbn, cb) {
    BookModel.find({$and :[{isbn:isbn} , {archieve: {$ne: true}}]}, cb);
};

// Get book orders by userId
exports.findMyOrdersByUserId = function(userId, cb) {
    LendModel.find({$and:[{userId:userId} , {returned: {$ne: true}}]}, cb);
};

// Get book ordered books by userId
exports.findMyOrderedBookByUserId = function(userId,isbn, cb) {
    LendModel.find({$and:[{userId:userId} ,{bookIsbn:isbn}, {returned: {$ne: true}}]}, cb);
};

// Get book orders by userId
exports.findOrdersHistoryByUserId = function(userId, cb) {
    LendModel.find({$and:[{userId:userId} , {returned: true}]}, cb);
};

// Get book orders by userId
exports.findPendingReturnBooks = function(cb) {
    LendModel.find({$and:[{archieve: {$ne: true}} , {returned: {$ne: true}}]}, cb);
};

// Get book orders by userId
exports.findReturnBooksHistory = function(cb) {
    LendModel.find({returned: true}, cb);
};

//Get pendingReturnBooks by isbn
exports.findPendingReturnBooksByIsbn = function(isbn,cb) {
    LendModel.find({$and:[{bookIsbn:isbn},{returned:{$ne: true}},{archieve:{$ne: true}}]})
        .limit(1)
        .exec(function(err, book){                                                                                  
            if(book.length===0){
                cb(err,book);
            }
            else{
                cb(err,book);
            }

        });
        
};

// Creates a new book in the DB.    
exports.create = function(item, cb) {
    async.waterfall([
        function find(cb){
            BookModel.findOne({isbn:item.isbn}, function(err, book){
                cb(err,book);
            });
        },
        function create(book, cb){
            if(book===null){
                 BookModel.create(item, cb);
            }
            else if(book.archieve){
                item.archieve=false;
                
                        if(item.publisher===undefined){
                            item.publisher=null;
                        }
                        if(item.detail===undefined){
                            item.detail=null;
                        }
                    
                        if(item.yearOfPublication===undefined){
                            item.yearOfPublication=null;
                        }                    

                var updated = _.merge(book, item);

                updated.save(function(err) {
                    cb(err, book);
                });
            }
            else {
                cb('ISBN is expected to be unique.');               
            }
        }         
        
    ],function (err, book) {
        cb(err, book);
      });
};


// Creates a new lend in the DB.
exports.lend = function(item, cb) {
    async.waterfall([ 
        function bookCount(cb){
            LendModel.count({$and:[{userId:item.userId} ,{returned: {$ne: true}}]}, function(err,count){
                if (count >=2) {
                    cb('You have already lend two book.');
                } else {
                    cb(err);
                }                
            });
        },

        function findBorrowedBooks(cb){
            LendModel.findOne({$and:[{userId:item.userId} ,{bookIsbn:item.bookIsbn}, {returned: {$ne: true}}]}, function(err, book){
                if (book != null) {
                    cb('You have already lend this book.');
                } else {
                    cb(err,book);
                }                
            });
        },
    

        function createLend(book,cb) {
            LendModel.create(item, function (err) {
                cb(err,book);
            });
       
        },
        function updateRemainingCopies(book,cb) {
            BookModel.findOne({isbn:item.bookIsbn}, function(err, book) {
                if(book.remainingCopies>0){   
                    book.remainingCopies--;
                }
                else{
                    book.remainingCopies=0;
                }
                    book.save(function(err) {
                        cb(err, book);
                    });
            }); 
           
        }
    ],function (err,book) {
            cb(err,book);
      });
};

// Updates an existing book in the DB.
exports.update = function(isbn, item, cb) {   
    async.waterfall([
        function updateBook(cb) { 
            if (item._id) { delete item._id; }      
            BookModel.findOne({$and :[{isbn:isbn} , {archieve: {$ne: true}}] }, function(err, book) {
                var updated = _.merge(book, item);
                updated.save(function(err) {
                    cb(err, book);
                });
            });
        },
        function updateLend(book, cb) {
                if(item.publisher===undefined){
                    bookPublisher:null;
                }
                else{
                    bookPublisher : item.publisher;
                }

                if(item.yearOfPublication===undefined){
                    bookYearOfPublication:null;
                }
                else{
                    bookYearOfPublication :item.yearOfPublication;
                }
            LendModel.update({bookIsbn:item.isbn},         
                {bookTitle : item.title,
                bookAuthor : item.author,
                bookCategory : item.catagory},
                {multi:true}, 
                function(err, book){
                    if (err) return handleError(err);            
                    cb(err,book);   
                });
        }
    ],  function(err,book) { 
            cb(err,book);
        }
    );
};


exports.destroyBook = function(isbn, cb) {    
    async.waterfall([
        function fromBook(cb) {
             BookModel.update({isbn:isbn},{$set:{archieve:true}}, function(err, book) {  
                     cb(err, book); 
             });
        },
        function fromLend(book,cb) {
             LendModel.update({bookIsbn:isbn},         
                {archieve:true},
                {multi:true}, 
                function(err, book){
                    if (err) return handleError(err);            
                    cb(err,book);   
                });
        }
    ],  function (err, book) {
            cb(err, book);
        });
};


exports.returnBook = function(item, cb) {
    if (item._id) { 
        var itemId = item._id;
        delete item._id; 
    }
    async.waterfall([
        function createLend(cb) { 
            BookModel.findOne({isbn:item.bookIsbn}, function(err, book) {
                var updated = _.merge(book, item);
                updated.remainingCopies++;
                updated.save(function(err) {
                    cb(err, book);
                });
            });
         },
        
        function updateLendDetails(book,cb) {               
            LendModel.findOne({_id: itemId}, function(err, book) {
                var updated = _.merge(book, item);
                updated.returned = true;
                updated.save(function(err) {
                    cb(err, book);
                });
            });
        }
        
    ],function (err, book) {
        cb(err, book);
    });
};

exports.newlyAddedBooks = function(cb) {
    BookModel.find({archieve: {$ne: true}})
        .sort({'dateAdded': -1})
        .limit(4)
        .exec(function(err, books) {
            if (err) return handleError(err);            
            cb(err,books);
        });
};

exports.findUserOrdersByReturnDate = function(userId, cb) {
    LendModel.find({$and:[{userId:userId} , {returned: {$ne: true}}]})
        .sort({'bookReturnDate': 1})
        .limit(4)
        .exec(function(err, books) {
            if (err) return handleError(err);            
            cb(err,books);
        });
};



