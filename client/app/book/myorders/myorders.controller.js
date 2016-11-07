'use strict';

angular.module('Bi3DigLib')
    .controller('MyOrdersCtrl', function($scope, Book, Auth, $location, $window) {
        $scope.orders = {};
        $scope.ordershistory = {};
        $scope.errors = {};

        Book.getMyOrders(Auth.getCurrentUser()._id)
            .then(function(res) {
                $scope.orders = res.data;
                
            })
            .catch(function(err) {
                $scope.errors.other = err.message;
            });

        Book.getOrdersHistory(Auth.getCurrentUser()._id)
            .then(function(res) {
                $scope.ordershistory = res.data;
            })
            .catch(function(err) {
                $scope.errors.other = err.message;
            });

       
    });