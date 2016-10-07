'use strict';

angular.module('Bi3DigLib')
    .controller('ReturnHistoryCtrl', function($scope, Book, $location, $window) {
        $scope.returnhistory = {};
        $scope.errors = {};             
        
        Book.getReturnHistoryList()
            .then(function(res) {
                $scope.returnhistory = res.data;
            })
            .catch(function(err) {
                $scope.errors.other = err.message;
            });

    });