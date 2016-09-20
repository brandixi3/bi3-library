'use strict';

var _ = require('lodash');
var TenantModel = require('./tenants.model');

// Get list of tenants
exports.findAll = function(cb) {
    TenantModel.find(cb);
};

// Get a single tenant
exports.findById = function(id, cb) {
    TenantModel.findById(id, cb);
};

// Creates a new tenant in the DB.
exports.create = function(item, cb) {
    TenantModel.create(item, cb);
};

// Updates an existing tenant in the DB.
exports.update = function(id, item, cb) {
    if (item._id) { delete item._id; }
    TenantModel.findById(id,function(err, tenant) {
        var updated = _.merge(tenant, item);
        updated.save(function(err) {
            cb(err, tenant);
        });
    });
};
