'use strict';

angular.module('sforceApp')
  .config(function($routeProvider) {
    $routeProvider.when('/sforder/:id/', {
      template: '<sforder></sforder>'
    });
   
  });