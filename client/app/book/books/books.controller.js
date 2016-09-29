'use strict';

angular.module('Bi3DigLib')
    .controller('BooksCtrl', function($scope, Book, $location, $window) {
        $scope.books = {};
        $scope.errors = {};

        Book.find()
            .then(function(res) {
                $scope.books = res.data;
            })
            .catch(function(err) {
                $scope.errors.other = err.message;
            });

        $scope.viewBook = function(isbn) {
            $location.path("/book/"+isbn);
        }
    });