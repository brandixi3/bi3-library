'use strict';

var _ = require('lodash');
var async = require('async');
var TenantModel = require('./book.model');
var LendModel = require('./lendbook.model');

// Get list of book
exports.findAll = function(cb) {
    TenantModel.find({archieve: {$ne: true}},cb);
};

// Get a single tenant
exports.findById = function(id, cb) {
    TenantModel.findById(id, cb);
};

// Get a single tenant by isbn
exports.findByIsbn = function(isbn, cb) {
    TenantModel.find({$and :[{isbn:isbn} , {archieve: {$ne: true}}]}, cb);
};

// Get book orders by userId
exports.findMyOrdersByUserId = function(userId, cb) {
    LendModel.find({ userId: userId }, cb);
};

// Creates a new tenant in the DB.
exports.create = function(item, cb) {
    TenantModel.create(item, cb);
};

// Creates a new lend in the DB.
exports.lend = function(item, cb) {
    async.waterfall([
        function createLend(cb) { 
            LendModel.create(item, function (err) {
                cb(err);
            });
        },
        function updateRemainingCopies(cb) {          
            TenantModel.findOne({isbn:item.bookIsbn}, function(err, book) {
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

// Updates an existing tenant in the DB.
exports.update = function(isbn, item, cb) {
    if (item._id) { delete item._id; }
    TenantModel.findOne({$and :[{isbn:isbn} , {archieve: {$ne: true}}] }, function(err, tenant) {
        var updated = _.merge(tenant, item);
        updated.save(function(err) {
            cb(err, tenant);
        });
    });
};

exports.destroyBook = function(isbn, cb) {
    TenantModel.findOne({$and:[{isbn:isbn} , {archieve: {$ne: true}}]}, function(err, book) {
        book.archieve = true;
        book.save(function(err) {
            cb(err, book);
        });
    });
};

