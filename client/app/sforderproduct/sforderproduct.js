'use strict';

angular.module('sforceApp')
  .config(function($routeProvider) {
    $routeProvider.when('/sforderproduct/:id/', {
      template: '<sforderproduct></sforderproduct>'
    });
  
  });