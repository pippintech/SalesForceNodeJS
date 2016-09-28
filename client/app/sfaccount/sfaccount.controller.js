'use strict';

(function() {

  class SfAccountController {

    constructor($http, $scope, socket, $location) {
      this.$http = $http;
      this.socket = socket;
      this.sfAccounts = [];
      this.$location = $location;

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('accounts');
      });
    }

    $onInit() {
      this.$http.get('/api/sfaccounts')
        .then(response => {
          console.log(response.data);
          this.sfAccounts = response.data.records;
          this.socket.syncUpdates('accounts', this.sfAccounts);
        });
    }

    getAccountOrders(sfaccount){
      console.log("getAccountOrders");
      var idRoute = 'sforder/' + sfaccount.Id ; 
      this.$location.path(idRoute);

    }

  }

  angular.module('sforceApp')
    .component('sfaccount', {
      templateUrl: 'app/sfaccount/sfaccount.html',
      controller: SfAccountController,
      controllerAs: 'sfaccountList'
    });
})();

