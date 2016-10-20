'use strict';

angular.module('Bi3DigLib')
    .controller('ReturnBookCtrl', function($scope, Book, $location, $mdDialog, $window,$mdMedia) {
        $scope.returnbooks = {};
        $scope.errors = {};
        $scope.details = '';

        Book.getReturnBookList()
            .then(function(res) {
                $scope.returnbooks = res.data;
            })
            .catch(function(err) {
                $scope.errors.other = err.message;
            });

        $scope.returnHistory = function() {
            $location.path("/returnhistory");
        }



        $scope.returnBook = function(ev,loanbook) {
            // Appending dialog to document.body to cover sidenav in docs app
            $mdDialog.show({
              controller: DialogController,
              templateUrl: 'app/book/returnbook/dialog1.tmpl.html',
              parent: angular.element(document.body),
              clickOutsideToClose:true
              //fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
            })
            .then(function(answer) {
                //alert(answer);
                    var dayDiff = Math.floor((new Date() - new Date(loanbook.bookReturnDate)) / (1000 * 60 * 60 * 24));
                    var fine = parseFloat((dayDiff)*50).toFixed(2);
                    loanbook.fine = fine > 0 ? fine : 0;
                    loanbook.actualReturnDate = new Date();
                    loanbook.returnedDetail = answer;
                    alert(loanbook.returnedDetail);
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

  
       

        $scope.calculateFine = function(returnDate) {
            var dayDiff = Math.floor((new Date() - new Date(returnDate)) / (1000 * 60 * 60 * 24));
            var fine = parseFloat((dayDiff)*50).toFixed(2);
            return fine > 0 ? fine : ("N/A");              
        }  

        function DialogController($scope, $mdDialog) {
            $scope.hide = function() {
                $mdDialog.hide();
             };

            $scope.cancel = function() {
                $mdDialog.cancel();
            };

             $scope.answer = function(answer) {
                 $mdDialog.hide(answer);
                 //alert(answer);
                console.log($scope.lend.book);
                $scope.details = $scope.lend.book;
                console.log($scope.details);
                // Book.getReturnHistoryList
                // Book.lendBook({
                //   returnedDetail:$scope.lend.book
                // })


            };


         }

    });