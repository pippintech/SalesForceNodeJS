'use strict';

(function() {

  class SfOrderController {

    constructor($http, $scope, socket, $routeParams, $location) {
      this.$http = $http;
      this.socket = socket;
      this.sfOrders = [];
      this.sfaccount = {};
      this.sforder = [];
      this.$routeParams =$routeParams;
      this.$location = $location;

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('account');
      });
    }

    $onInit() {

      console.log(this.$routeParams.id);
      
      this.getAccountDetails(this.$routeParams.id);
 
      this.getOrderDetails(this.$routeParams.id);

       
    }

    getAccountDetails(accountId){
    console.log("getAccountDetails :accountId - " + accountId);
      this.$http.get('/api/sfaccounts/' + accountId)
        .then(response => {
          console.log(response.data);
           this.sfaccount = response.data;
          this.socket.syncUpdates('account', this.sfOrders);
        });

    }

    getOrderDetails(accountId){
    console.log("getOrderDetails : accountId - " + accountId);
      this.$http.get('/api/sfaccounts/orders/'  + accountId)
            .then(response => {
              console.log(response.data);
              this.sforder = response.data;
              this.socket.syncUpdates('order', this.sfOrders);
            });
       }

       createNewOrder(){     
         var newOrder = {};
         newOrder.accountId = this.$routeParams.id;
         newOrder.EffectiveDate = new Date();
         newOrder.Status = "Draft";
         this.$http.post('/api/sforders', newOrder)
          .then(response => {
          console.log(response.data);
     
         console.log("response.data.Id :" +response.data.id);

          console.log("createNewOrder");
          var idRoute = 'sforderproduct/' + response.data.id ; 
          this.$location.path(idRoute);


                                                                      
          }); 
       }
  }

  angular.module('sforceApp')
    .component('sforder', {
       templateUrl: 'app/sforder/sforder.html',
      controller: SfOrderController,
     controllerAs: 'sforderlist'
    });
    
})();

