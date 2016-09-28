'use strict';

(function() {

  class NewSfAccountController {

    constructor($http, $scope, socket, $location) {
      this.$http = $http;
      this.socket = socket;
      this.$location = $location;
      this.newAccount = {};

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });
    }

    postSFAccount() {
      console.log(this.newAccount);
      this.$http.post('/api/sfaccounts', this.newAccount)
        .then(response => {
          console.log(response.data);
          $location.path('/sfaccount');

        });
    }

  }

  angular.module('sforceApp')
    .component('newsfaccount', {
      templateUrl: 'app/sfaccount/newsfaccount.html',
      controller: NewSfAccountController,
      controllerAs: 'sfaccount'
    });
})();

