'use strict';

(function() {

  class PriceBookController {

    constructor($http, $scope, socket, $routeParams, $location) {
      this.$http = $http;
      this.socket = socket;
      this.$routeParams =$routeParams;
      this.$location = $location;
      this.sfpricebook = [];
      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('pricebook');
      });
    }

    $onInit() {
      var orderId  = this.$routeParams.id;
      
      console.log("orderId : " + orderId);
      this.$http.get('/api/pricebooks')
          .then(response => {
            console.log(response.data);
           // console.log(response.data.records.Id);
            this.sfpricebook = response.data.records;
            this.socket.syncUpdates('pricebook', this.sforder);
          });

    }


    addPriceBookToOrder(sfpricebook){
      console.log("addPriceBookToOrder");
       var orderId  = this.$routeParams.id;
       var priceBookId = sfpricebook.Id;
       var priceBooknName = sfpricebook.Name;

       console.log("Order Id:" +this.$routeParams.id);
       console.log("Pridebook Id:" +sfpricebook.Id)

        this.$http.patch('/api/sforders/' + this.$routeParams.id, sfpricebook)
          .then(response => {   
            console.log(response.data);
            
          this.$location.path('sfproduct/' + response.data.id + '/' + sfpricebook.Id);
        
          });

    }




  }

  angular.module('sforceApp')
    .component('pricebook', {
       templateUrl: 'app/pricebook/pricebook.html',
      controller: PriceBookController,
     controllerAs: 'pricebooklist'
    });
    
})();

