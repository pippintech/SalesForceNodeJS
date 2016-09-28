'use strict';

(function() {

  class SFProductController {

    constructor($http, $scope, socket, $location, $routeParams) {
      this.$http = $http;
      this.socket = socket;
      this.sfproducts = [];
       //this.sforder = {};
      this.$location = $location;
      this.$routeParams = $routeParams;

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('sfproducts');
      });
    }

    $onInit() {

     console.log(this.$routeParams.PriceBookId); 
     console.log(this.$routeParams.OrderId); 
      this.$http.get('/api/sfproducts')
        .then(response => {
          console.log("product: ", response.data);
          
          this.sfproducts = response.data.records;
         this.socket.syncUpdates('sfproducts', this.sfproducts);
        });
  
    }

    AddProduct(sfproduct){

      var myRecord = {};
   
      myRecord.PricebookEntryId = sfproduct.Id;
      //myRecord.PricebookEntryId = '01u280000049uP4';
      myRecord.quantity = 239;
      myRecord.UnitPrice = 16.78;
      myRecord.OrderId = this.$routeParams.OrderId;

    this.$http.put('/api/sforders/' + this.$routeParams.PriceBookId, myRecord)
     
        .then(response => {
          console.log( response.data);
     
        });
    }
  }

  angular.module('sforceApp')
    .component('sfproduct', {
      templateUrl: 'app/sfproduct/sfproduct.html',
      controller: SFProductController,
      controllerAs: 'sfproductList'
    });
})();
