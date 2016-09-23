'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ThingSchema = new Schema({
  name: String,
  isbn: String,
  title: String,
  author: String,
  publisher: String,
  catagory: String
});

module.exports = mongoose.model('Thing', ThingSchema);