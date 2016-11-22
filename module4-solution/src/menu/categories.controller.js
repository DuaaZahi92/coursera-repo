(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);


CategoriesController.$inject = [ 'catList']
function CategoriesController(catList) {
  console.log("CategoriesController");
  var catCtrl = this;
  catCtrl.catList = catList.data;
}
})();
