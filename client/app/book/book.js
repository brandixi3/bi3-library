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
      })
      .state('lendbook', {
        url: '/lendbook/:isbn',
        templateUrl: 'app/book/lendbook/lendbook.html',
        controller: 'LendBookCtrl'
      })
      .state('updatebook', {
        url: '/updatebook',
        templateUrl: 'app/book/updatebook/updatebook.html',
        controller: 'UpdateBookCtrl'
      })  
      .state('update', {
        url: '/update/:isbn',
        templateUrl: 'app/book/addbook/update/update.html',
        controller: 'UpdateCtrl'
      });    
  });