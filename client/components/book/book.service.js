'use strict';

angular.module('Bi3DigLib')
  .factory('Book', function Book($location, $rootScope, $http, $cookieStore, $q) {

      function findOne(id) {
          return $http.get('/api/books/'+id);
      }
      function findByIsbn(isbn) {
          return $http.get('/api/books/isbn/'+isbn);
      }
      function find() { 
          return $http.get('/api/books/'); 
      }
      function save(bookObj) { 
          return $http.post('/api/books/', bookObj);
      }
      function update(bookObj) { 
          return $http.post('/api/books/update/'+bookObj.isbn ,bookObj);
      }
      function destroyBook(isbn) {        
          return $http.post('/api/books/destroyBook/'+isbn);
      }
      function lendBook(lendBookObj) { 
          return $http.post('/api/books/lend/', lendBookObj);
      }
      function collect(loanbookObj) {
          return $http.post('/api/books/collect/', loanbookObj);
      }
      function getMyOrders(userId) {
          return $http.get('/api/books/myorders/'+userId);
      }
      function getMyOrderedBook(userId,isbn) {
          return $http.get('/api/books/myorderedBook/'+userId+'/'+isbn);
      }
      function getOrdersHistory(userId) {
          return $http.get('/api/books/myordershistory/'+userId);
      }
      function getReturnBookList() {
          return $http.get('/api/books/returnbooklist/');
      }
      function returnBook(loanbookObj) {
          return $http.post('/api/books/returnbook/', loanbookObj);
      }
      function getReturnHistoryList() {
          return $http.get('/api/books/returnhistorylist/');
      }
      function findPendingReturnBookByIsbn(isbn) {
          return $http.get('/api/books/returnbookbyisbn/'+isbn);
      }
      function getNewlyAddedBooks() {
          return $http.get('/api/books/newlyaddedbooks/');
      }
      function getUserOrdersByReturnDate(userId) {
          return $http.get('/api/books/myordersbyreturndate/'+userId);
      }

      return {
        findOne:findOne,
        findByIsbn:findByIsbn,
        find:find,
        save:save,
        lendBook:lendBook,
        collect:collect,
        update:update,
        destroyBook:destroyBook,
        getMyOrders:getMyOrders,
        getMyOrderedBook:getMyOrderedBook,
        getReturnBookList:getReturnBookList,
        getOrdersHistory:getOrdersHistory,
        returnBook:returnBook,
        getReturnHistoryList:getReturnHistoryList,
        findPendingReturnBookByIsbn,
        getNewlyAddedBooks:getNewlyAddedBooks,
        getUserOrdersByReturnDate:getUserOrdersByReturnDate
      };
});