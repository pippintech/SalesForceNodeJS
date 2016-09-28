'use strict';

angular.module('sforceApp')
  .config(function($routeProvider) {
    $routeProvider.when('/pricebook/:id', {
      template: '<pricebook></pricebook>'
    });
 
  });