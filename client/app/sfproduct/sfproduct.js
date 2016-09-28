'use strict';

angular.module('sforceApp')
  .config(function($routeProvider) {
    $routeProvider.when('/sfproduct/:OrderId/:PriceBookId', {
      template: '<sfproduct></sfproduct>'
    });
  
  });