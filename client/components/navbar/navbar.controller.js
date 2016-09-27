'use strict';

angular.module('Bi3DigLib')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isInclude = function(route) {
      return $location.path().indexOf(route) >= 0;
    };
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });