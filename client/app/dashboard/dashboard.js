'use strict';

angular.module('Bi3DigLib')
  .config(function ($stateProvider) {
    $stateProvider
      .state('dashboard', {
        url: '/',
        templateUrl: 'app/dashboard/dashboard.html',
        controller: 'DashboardCtrl'
      });
  });