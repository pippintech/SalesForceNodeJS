'use strict';

angular.module('sforceApp')
  .config(function($routeProvider) {
    $routeProvider
    .when('/sfaccount', {
      template: '<sfaccount></sfaccount>'
    })
    .when('/newsfaccount', {
       
       template: '<newsfaccount></newsfaccount>'
    });
  });