(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService)

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var tobuy = this;
  tobuy.items = ShoppingListCheckOffService.getToBuyItems();
  tobuy.moveTobought = function (itemIndex) {
    ShoppingListCheckOffService.moveTobought(itemIndex);
  };
  tobuy.toBuyItemsCount = ShoppingListCheckOffService.getToBuyItemsLength();
}


AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought = this;
  bought.items = ShoppingListCheckOffService.getBoughtItems();
  bought.boughtItemsCount = ShoppingListCheckOffService.getBoughtItemsLength();
}

function ShoppingListCheckOffService() {
   var service = this;
   var tobuy = [
     {
       name: "Cookies",
       quantity: "10"
     },
     {
       name: "Milk",
       quantity: "2 bottles"
     },
     {
       name: "Chips",
       quantity: "5 bags"
     }
   ];

   var bought = [];

   service.moveTobought = function (itemIndex) {
     var itemRemoved = tobuy.splice(itemIndex, 1);
     if(itemRemoved[0] !== 'undefined') {
       bought.push(itemRemoved[0]);
     }
   };

   service.getToBuyItems = function () {
     return tobuy;
   }
   service.getBoughtItems = function () {
     return bought;
   }
   service.getToBuyItemsLength = function () {
     return tobuy.length;
   }
   service.getBoughtItemsLength = function () {
     return bought.length;
   }
}

})();
