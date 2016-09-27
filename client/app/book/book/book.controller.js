'use strict';

angular.module('Bi3DigLib')
    .controller('BookCtrl', function($scope, Book, $stateParams) {

        $scope.book = {};

        Book.findByIsbn($stateParams.isbn)
            .then(function(res) {
                $scope.book = res.data[0];
            })
            .catch(function(err) {
                $scope.errors.other = err.message;
            });

    });