'use strict';

angular.module('Bi3DigLib')
/*.filter('customUserDateFilter', function($filter) {
    return function(values, dateString) {
     var filtered = [];
  
      if(typeof values != 'undefined' && typeof dateString != 'undefined') {
        angular.forEach(values, function(value) {
            if($filter('date')(value.Date).indexOf(dateString) >= 0) {
              filtered.push(value);
            }
          });
      }
      
      return filtered;
    }
})*/
    .controller('MyOrdersCtrl', function($scope, Book, Auth, $location, $window, NgTableParams, $filter) {
        $scope.orders = {};
        $scope.books = {};
        $scope.ordershistory = {};
        $scope.errors = {};

         

        /*$scope.tableParams = new NgTableParams({
        page: 1,            // show first page
        count: 10,          // count per page
    }, {
         
        getData: function($defer, params) {
            // use build-in angular filter
            var filters = params.filter();
            var tempDateFilter;
            
            var orderedData = params.sorting() ?
                            $filter('orderBy')(data, params.orderBy()) :
                            data;

            if(filters) {
              if(filters.Date) {
                orderedData = $filter('customUserDateFilter')(orderedData, filters.Date);
                tempDateFilter = filters.Date;
                delete filters.Date;
              }
              orderedData = $filter('filter')(orderedData, filters); 
              filters.Date = tempDateFilter;
            }

            $scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

            params.total(orderedData.length); // set total for recalc pagination
            $defer.resolve($scope.users);
        }
    });
 
*/
        Book.getMyOrders(Auth.getCurrentUser()._id)
            .then(function(res) {
                $scope.books=res.data;
                console.log($scope.books);
                var data = res.data;
                $scope.tableParams = new NgTableParams({ count: 5 }, {counts: [5, 10, 20],
                dataset: data

                
            });
                console.log($scope.books.bookReturnDate);
                    })
            .catch(function(err) {
                $scope.errors.other = err.message;
            });

        Book.getOrdersHistory(Auth.getCurrentUser()._id)
            .then(function(res) {
                var ordershistory = res.data;
                $scope.table = new NgTableParams({ count: 5 }, {counts: [5, 10, 20],
                dataset: ordershistory
            });
            })
            .catch(function(err) {
                $scope.errors.other = err.message;
            });

         $scope.calBorrowedDate = function(borrowedDate) {
            console.log(borrowedDate);
            $scope.borrowedDate = new Date(borrowedDate);                       
        
            return $scope.borrowedDate;
              
            }

        $scope.calculateDate = function(returnDate) {
            $scope.returnDate = new Date(returnDate);
                $scope.newReturnDate = new Date(
                $scope.returnDate.getFullYear(),
                $scope.returnDate.getMonth(),
                $scope.returnDate.getDate() );
                       
              
            return $scope.newReturnDate;
              
            }
       
    });