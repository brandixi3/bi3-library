'use strict';

angular.module('Bi3DigLib')
    .controller('ReturnBookCtrl', function($scope, Book, $location, $mdDialog, $window,$mdMedia, NgTableParams) {
        $scope.returnbooks = {};
        $scope.errors = {};
        $scope.details = '';

        Book.getReturnBookList()
            .then(function(res) {
                var data = res.data;
                $scope.tableParams = new NgTableParams({ count: 5 }, {counts: [5, 10, 20],
                dataset: data
                });
            })
            .catch(function(err) {
                $scope.errors.other = err.message;
            });

        $scope.returnHistory = function() {
            $location.path("/returnhistory");
        }

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
                $scope.returnDate.getDate() - 1);
                       
              
            return $scope.newReturnDate;
              
            }



        $scope.returnBook = function(ev,loanbook) {
            // Appending dialog to document.body to cover sidenav in docs app
            console.log($scope.returnbooks);
            $mdDialog.show({
              controller: DialogController,
              templateUrl: 'app/book/returnbook/dialog1.tmpl.html',
              parent: angular.element(document.body),
              clickOutsideToClose:true
            })
            .then(function(answer) {
                    var dayDiff = Math.floor((new Date() - new Date(loanbook.bookReturnDate)) / (1000 * 60 * 60 * 24));
                    var fine = parseFloat((dayDiff)*50).toFixed(2);
                    loanbook.fine = fine > 0 ? fine : 0;
                    loanbook.actualReturnDate = new Date();
                    loanbook.returnedDetail = answer;
                    Book.returnBook(loanbook)
                        .then(function() { 
                            $window.location.reload();
                        })
                        .catch(function(err) {
                            $scope.errors.other = err.message;
                        });
                    }, function() {
                        $scope.status = 'You decided to keep your debt.';
                    });
                                     
                   };       

       

        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
             };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

             $scope.answer = function(answer) {
                 $mdDialog.hide(answer);
                   $scope.details = $scope.lend.book;
                               
            };


         }

    });