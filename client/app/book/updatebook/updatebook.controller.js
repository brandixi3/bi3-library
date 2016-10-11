'use strict';

angular.module('Bi3DigLib')
    .controller('UpdateBookCtrl', function($scope, Book, $location, $window,$mdDialog,$mdMedia) {
        $scope.books = {};
        $scope.errors = {};
        $scope.status = '  ';
        $scope.customFullscreen = false;
        $scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');

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
        
        $scope.updateBook = function(isbn) {
            $location.path("/update/"+isbn);
        }
       
       

  $scope.showConfirm = function(ev,isbn) {
    // Appending dialog to document.body to cover sidenav in docs app
    var confirm = $mdDialog.confirm()
          .title('Would you like to delete this book?')
          .targetEvent(ev)
          .ok('Yes')
          .cancel('Cancel');
    $mdDialog.show(confirm).then(function() {
      //$scope.status = 'You decided to get rid of your debt.';
      Book.destroyBook(isbn)
                .then(function() { 
                    $window.location.reload();
                   // $location.path('/bookadmin');
                })
                .catch(function(err) {
                    $scope.errors.other = err.message;
                });
    }, function() {
      $scope.status = 'You decided to keep your debt.';
    });
  };
        

    });