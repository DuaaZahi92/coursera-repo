(function () {
'use strict';

angular.module('MenuApp')
.controller('CatDetailsController', CatDetailsController);


CatDetailsController.$inject = [ 'catDetailsList' ]
function CatDetailsController(catDetailsList) {
  console.log("CatDetailsController");
  var catDetailsCtrl = this;
  catDetailsCtrl.catDetailsList = catDetailsList.data.menu_items;
  catDetailsCtrl.category = catDetailsList.data.category;
}
})();
