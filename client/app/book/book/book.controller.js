'use strict';

angular.module('Bi3DigLib')
    .controller('BookCtrl', function($scope, Book, $stateParams) {

        $scope.book = {};


       $scope.BorrowedDate = new Date();
       $scope.minDate = new Date(
      $scope.BorrowedDate.getFullYear(),
      $scope.BorrowedDate.getMonth(),
      $scope.BorrowedDate.getDate());

  $scope.maxDate = new Date(
      $scope.BorrowedDate.getFullYear(),
      $scope.BorrowedDate.getMonth(),
      $scope.BorrowedDate.getDate() + 7 );

        Book.findByIsbn($stateParams.isbn)
            .then(function(res) {
                $scope.book = res.data[0];
            })
            .catch(function(err) {
                $scope.errors.other = err.message;
            });

    });