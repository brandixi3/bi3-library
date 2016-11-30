'use strict';

angular.module('Bi3DigLib')
    .controller('ReturnHistoryCtrl', function($scope, Book, $location, $window, NgTableParams) {
        $scope.returnhistory = {};
        $scope.errors = {};             
        
        Book.getReturnHistoryList()
            .then(function(res) {
                 var data = res.data;
                $scope.tableParams = new NgTableParams({ count: 5 }, {counts: [5, 10, 20],
                dataset: data
                });
            })
            .catch(function(err) {
                $scope.errors.other = err.message;
            });

         $scope.calculateDate = function(returnDate) {
            $scope.returnDate = new Date(returnDate);
                $scope.newReturnDate = new Date(
                $scope.returnDate.getFullYear(),
                $scope.returnDate.getMonth(),
                $scope.returnDate.getDate() );
                       
              
            return $scope.newReturnDate;
              
            }

        
    });