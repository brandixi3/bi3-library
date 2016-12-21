'use strict';

angular.module('Bi3DigLib')
    .controller('BooksCtrl', function($scope, Book, $location, $window,  NgTableParams) {
        $scope.books = {};
        $scope.errors = {};
               
        Book.find()
            .then(function(res) {
                var data = res.data;
                $scope.tableParams = new NgTableParams({ count: 5 }, {counts: [5, 10, 20],
                dataset: data
                });
            })
            .catch(function(err) {
                $scope.errors.other = err.message;
            });

        $scope.viewBook = function(isbn) {
            $location.path("/book/"+isbn);
        }
    });