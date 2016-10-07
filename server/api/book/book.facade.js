'use strict';

var _ = require('lodash');
var async = require('async');
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

// Get book orders by userId
exports.findOrdersHistoryByUserId = function(userId, cb) {
    LendModel.find({$and:[{userId:userId} , {returned: true}]}, cb);
};

// Get book orders by userId
exports.findPendingReturnBooks = function(cb) {
    LendModel.find({returned: {$ne: true}}, cb);
};

// Get book orders by userId
exports.findReturnBooksHistory = function(cb) {
    LendModel.find({returned: true}, cb);
};

// Creates a new book in the DB.
exports.create = function(item, cb) {
    BookModel.create(item, cb);
};

// Creates a new lend in the DB.
exports.lend = function(item, cb) {
    LendModel.create(item, cb);
};

// Updates an existing book in the DB.
exports.update = function(isbn, item, cb) {
    if (item._id) { delete item._id; }
    BookModel.findOne({$and :[{isbn:isbn} , {archieve: {$ne: true}}] }, function(err, book) {
        var updated = _.merge(book, item);
        updated.save(function(err) {
            cb(err, book);
        });
    });
};

exports.destroyBook = function(isbn, cb) {
    BookModel.findOne({$and:[{isbn:isbn} , {archieve: {$ne: true}}]}, function(err, book) {
        book.archieve = true;
        book.save(function(err) {
            cb(err, book);
        });
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
        function updateRemainingCopies(book, cb) { 
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


