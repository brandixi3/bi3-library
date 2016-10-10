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
        url: '/bookadmin',
        templateUrl: 'app/book/updatebook/updatebook.html',
        controller: 'UpdateBookCtrl'
      })  
      .state('update', {
        url: '/update/:isbn',
        templateUrl: 'app/book/addbook/update/update.html',
        controller: 'UpdateCtrl'
      })
      .state('myorders', {
        url: '/myloans',
        templateUrl: 'app/book/myorders/myorders.html',
        controller: 'MyOrdersCtrl'
      })
      .state('returnbook', {
        url: '/returnbook',
        templateUrl: 'app/book/returnbook/returnbook.html',
        controller: 'ReturnBookCtrl'
      })
      .state('returnhistory', {
        url: '/returnhistory',
        templateUrl: 'app/book/returnhistory/returnhistory.html',
        controller: 'ReturnHistoryCtrl'
      });    
  });