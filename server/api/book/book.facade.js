'use strict';

var _ = require('lodash');
var TenantModel = require('./book.model');
var LendModel = require('./lendbook.model');

// Get list of book
exports.findAll = function(cb) {
    TenantModel.find(cb);
};

// Get a single tenant
exports.findById = function(id, cb) {
    TenantModel.findById(id, cb);
};

// Get a single tenant by isbn
exports.findByIsbn = function(isbn, cb) {
    TenantModel.find({"isbn":isbn}, cb);
};

// Creates a new tenant in the DB.
exports.create = function(item, cb) {
    TenantModel.create(item, cb);
};

// Creates a new lend in the DB.
exports.lend = function(item, cb) {
    LendModel.create(item, cb);
};

// Updates an existing tenant in the DB.
exports.update = function(isbn, item, cb) {
    if (item._id) { delete item._id; }
    TenantModel.findOne({"isbn":isbn}, function(err, tenant) {
    console.log("item="+ JSON.stringify(item));
    
    console.log("tenant="+tenant);
    
        var updated = _.merge(tenant, item);
        updated.save(function(err) {
            cb(err, tenant);
        });
    });
  /*  TenantModel.findByIsbn(isbn,function(err, tenant) {
        console.log("item="+ JSON.stringify(item));
    
    console.log("tenant="+tenant);
        var updated = _.merge(tenant, item);
        updated.save(function(err) {
            cb(err, tenant);
        });
    });*/
};
