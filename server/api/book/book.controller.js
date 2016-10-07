'use strict';

var _ = require('lodash');
var BookFacade = require('./book.facade');

exports.index = function(req, res) {
    BookFacade.findAll(function(err, books) {
        if (err) {
            return handleError(res, err); }
        return res.json(200, books);
    });
};

exports.show = function(req, res) {
    BookFacade.findById(req.params.id, function(err, book) {
        if (err) {
            return handleError(res, err); }
        if (!book) {
            return res.send(404); }
        return res.json(book);
    });
};

exports.showByIsbn = function(req, res) {
    BookFacade.findByIsbn(req.params.isbn, function(err, book) {
        if (err) {
            return handleError(res, err); }
        if (!book) {
            return res.send(404); }
        return res.json(book);
    });
};

exports.showMyOrdersByUserId = function(req, res) {
    BookFacade.findMyOrdersByUserId(req.params.userId, function(err, book) {
        if (err) {
            return handleError(res, err); }
        if (!book) {
            return res.send(404); }
        return res.json(book);
    });
};

exports.showOrdersHistoryByUserId = function(req, res) {
    BookFacade.findOrdersHistoryByUserId(req.params.userId, function(err, book) {
        if (err) {
            return handleError(res, err); }
        if (!book) {
            return res.send(404); }
        return res.json(book);
    });
};

exports.showPendingReturnBooks = function(req, res) {
    BookFacade.findPendingReturnBooks(function(err, book) {
        if (err) {
            return handleError(res, err); }
        if (!book) {
            return res.send(404); }
        return res.json(book);
    });
};

exports.save = function(req, res) {
    BookFacade.create(req.body, function(err, book) {
        if (err) {
            return handleError(res, err); }
        return res.json(201, book);
    });
};

exports.lend = function(req, res) {
    BookFacade.lend(req.body, function(err, lend) {
        if (err) {
            return handleError(res, err); }
        return res.json(201, lend);
    });
};

exports.update = function(req, res) {
    if (req.body._id) { delete req.body._id; }
    BookFacade.update(req.params.isbn, req.body, function(err, book) {
        if (err) {
            return handleError(res, err); }
        return res.json(200, book);
    });
};

exports.destroyBook = function(req, res) {
    BookFacade.destroyBook(req.params.isbn, function(err, book) {
        if (err) {
            return handleError(res, err); }
        return res.json(201, book);
    });
};

exports.returnBook = function(req, res) {
    BookFacade.returnBook(req.body, function(err, book) {
        if (err) {
            return handleError(res, err); }
        return res.json(201, book);
    });
};

function handleError(res, err) {
    return res.send(500, err);
}
