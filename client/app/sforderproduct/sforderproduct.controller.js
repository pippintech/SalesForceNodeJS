'use strict';

(function() {

  class SForderProductController {

    constructor($http, $scope, socket, $location, $routeParams) {
      this.$http = $http;
      this.socket = socket;
      this.sforder = {};
      this.$location = $location;
      this.$routeParams = $routeParams;

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('sforderlist');
      });
    }

    $onInit() {
       //console.log("this.$routeParams.id" + this.$routeParams.id);
      this.$http.get('/api/sforders/' + this.$routeParams.id)
        .then(response => {
          console.log('Order Product:', response.data);
          this.sforder = response.data;
          this.socket.syncUpdates('sforderlist', this.sforder);
        });
    }

    getPriceBookList(){
    console.log("getPriceBookList");
         var idRoute = 'pricebook/'  + this.sforder.Id; 
          if(this.sforder.Pricebook2Id != null) idRoute = 'sfproduct/'  + this.sforder.Id  + '/' + this.sforder.Pricebook2Id;

          this.$location.path(idRoute);
      
    }

  }

  angular.module('sforceApp')
    .component('sforderproduct', {
      templateUrl: 'app/sforderproduct/sforderproduct.html',
      controller: SForderProductController,
      controllerAs: 'sforderproductList'
    });
})();
