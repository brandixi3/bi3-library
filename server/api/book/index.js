'use strict';

var express = require('express');
var controller = require('./book.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.isAuthenticated(), controller.index);
router.get('/returnbooklist/', auth.hasRole('admin'), controller.showPendingReturnBooks);
router.get('/returnhistorylist/', auth.hasRole('admin'), controller.showReturnBooksHistory);
router.post('/returnbook/', auth.hasRole('admin'), controller.returnBook);
router.get('/:id', controller.show);
router.get('/isbn/:isbn', controller.showByIsbn);
router.get('/myorders/:userId', auth.isAuthenticated(), controller.showMyOrdersByUserId);
router.get('/myordershistory/:userId', auth.isAuthenticated(), controller.showOrdersHistoryByUserId);
router.post('/', auth.hasRole('admin'), controller.save);
router.post('/lend/', controller.lend);
router.post('/destroyBook/:isbn', controller.destroyBook);
router.post('/update/:isbn', auth.hasRole('admin'), controller.update);

module.exports = router;