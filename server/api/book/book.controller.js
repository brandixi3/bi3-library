'use strict';

var _ = require('lodash');
var TenantFacade = require('./book.facade');

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

exports.showByIsbn = function(req, res) {
    TenantFacade.findByIsbn(req.params.isbn, function(err, tenant) {
        if (err) {
            return handleError(res, err); }
        if (!tenant) {
            return res.send(404); }
        return res.json(tenant);
    });
};

exports.showMyOrdersByUserId = function(req, res) {
    TenantFacade.findMyOrdersByUserId(req.params.userId, function(err, tenant) {
        if (err) {
            return handleError(res, err); }
        if (!tenant) {
            return res.send(404); }
        return res.json(tenant);
    });
};

exports.save = function(req, res) {
    TenantFacade.create(req.body, function(err, tenant) {
        if (err) {
            return handleError(res, err); }
        return res.json(201, tenant);
    });
};

exports.lend = function(req, res) {
    TenantFacade.lend(req.body, function(err, lend) {
        if (err) {
            return handleError(res, err); }
        return res.json(201, lend);
    });
};

exports.update = function(req, res) {
    if (req.body._id) { delete req.body._id; }
    TenantFacade.update(req.params.isbn, req.body, function(err, tenant) {
        if (err) {
            return handleError(res, err); }
        return res.json(200, tenant);
    });
};

exports.destroyBook = function(req, res) {
    TenantFacade.destroyBook(req.params.isbn, function(err, book) {
        if (err) {
            return handleError(res, err); }
        return res.json(201, book);
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
