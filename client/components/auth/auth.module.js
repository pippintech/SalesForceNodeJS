'use strict';

angular.module('sforceApp.auth', ['sforceApp.constants', 'sforceApp.util', 'ngCookies', 'ngRoute'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
