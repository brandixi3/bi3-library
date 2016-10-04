'use strict';

var express = require('express');
var controller = require('./book.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', controller.show);
router.get('/isbn/:isbn', controller.showByIsbn);
router.post('/', auth.hasRole('admin'), controller.save);
router.post('/lend/', controller.lend);


module.exports = router;