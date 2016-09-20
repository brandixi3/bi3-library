'use strict';

var _ = require('lodash');
var TenantFacade = require('./tenants.facade');

exports.index = function(req, res) {
    TenantFacade.findAll(function(err, tenants) {
        if (err) {
            return handleError(res, err); }
        return res.json(200, tenants);
    });
};

exports.show = function(req, res) {
    TenantFacade.findById(req.params.id, function(err, tenant) {
        if (err) {
            return handleError(res, err); }
        if (!tenant) {
            return res.send(404); }
        return res.json(tenant);
    });
};

exports.create = function(req, res) {
    TenantFacade.create(req.body, function(err, tenant) {
        if (err) {
            return handleError(res, err); }
        return res.json(201, tenant);
    });
};

exports.update = function(req, res) {
    if (req.body._id) { delete req.body._id; }
    TenantFacade.update(req.params.id, req.body, function(err, tenant) {
        if (err) {
            return handleError(res, err); }
        return res.json(200, tenant);
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
