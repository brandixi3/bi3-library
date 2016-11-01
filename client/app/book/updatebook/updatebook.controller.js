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
            Book.findPendingReturnBookByIsbn (isbn)
            .then(function(res) {
                console.log(res.data);
                if(res.data.length===0){
                    var confirm = $mdDialog.confirm()
                      .title('Would you like to delete this book?')
                      .targetEvent(ev)
                      .ok('Yes')
                      .cancel('Cancel');
                    $mdDialog.show(confirm).then(function() {
                        Book.destroyBook(isbn)
                            .then(function() { 
                                $window.location.reload();
                            })
                            .catch(function(err) {
                                $scope.errors.other = err.message;
                            });
                        }, function() {
                            $scope.status = 'You decided to keep your debt.';
                        });

                    }

                else{
                   $mdDialog.show(
                      $mdDialog.alert()
                        .parent(angular.element(document.querySelector('#popupContainer')))
                        .clickOutsideToClose(true)
                        .title('This book is alredy lend.')
                        // .textContent('This book is alredy lend.')
                        .ariaLabel('Alert Dialog Demo')
                        .ok('ok')
                        .targetEvent(ev)
                      );
                    }

                });
                        
            
            /*.catch(function(err) {
                $scope.errors.other = err.message;
                 });*/
                   
        }

    });
        