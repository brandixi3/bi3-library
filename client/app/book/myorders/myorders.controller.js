'use strict';

angular.module('Bi3DigLib')
    .controller('MyOrdersCtrl', function($scope, Book, Auth, $location, $window) {
        $scope.books = {};
        $scope.errors = {};

        Book.getMyOrders(Auth.getCurrentUser()._id)
            .then(function(res) {
                console.log(res.data);
                $scope.books = res.data;
            })
            .catch(function(err) {
                $scope.errors.other = err.message;
            });

        $scope.calculateFine = function(returnDate) {
            var dayDiff = Math.floor((new Date() - new Date(returnDate)) / (1000 * 60 * 60 * 24));
            var fine = parseFloat((dayDiff + 1)*50).toFixed(2);
              
            return fine > 0 ? fine : ("-");
              
        }
    });