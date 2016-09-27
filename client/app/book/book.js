'use strict';

angular.module('Bi3DigLib')
  .config(function ($stateProvider) {
    $stateProvider
      .state('addbook', {
        url: '/addbook',
        templateUrl: 'app/book/addbook/addbook.html',
        controller: 'AddBookCtrl'
      })
      .state('books', {
        url: '/books',
        templateUrl: 'app/book/books/books.html',
        controller: 'BooksCtrl'
      })
      .state('book', {
        url: '/book/:isbn',
        templateUrl: 'app/book/book/book.html',
        controller: 'BookCtrl'
      });
      
  });