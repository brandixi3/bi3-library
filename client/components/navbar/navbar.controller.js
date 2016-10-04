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
    $scope.SignUp = function() {
      $location.path('/signup');
    };
    $scope.login= function() {
      $location.path('/login');
    };
    $scope.view = function() {
      $location.path('/books');
    };
    $scope.adminView = function() {
      $location.path('/updatebook');
    };
    $scope.addbook = function() {
      $location.path('/addbook');
    };
    $scope.returnbook = function() {
      $location.path('/returnbook');
    };
    $scope.isInclude = function(route) {
      return $location.path().indexOf(route) >= 0;
    };
    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });