(function () {
'use strict';

angular.module('NarrowItDown', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.controller('foundItemsController', FoundItemsController)
.directive('foundItems', FoundItems)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com");


function FoundItems () {
  var ddo = {
    templateUrl: 'items.html',
    controller: 'foundItemsController as dirCtrl',
    bindToController: true,
    scope: {
      list: '<',
      removeThisItem: '&'
    }
  };
  return ddo;
}

function FoundItemsController () {
    var dirCtrl = this;

}



NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService) {
  var narrow = this;
  narrow.err = { value: false };
  narrow.found = [];

  narrow.narrowItDown = function () {
    narrow.err = { value: false };
    narrow.found = [];

    if(narrow.searchText == undefined ||
      narrow.searchText == null ||
      narrow.searchText == "") {
        narrow.err = {
          value : true,
          msg: "Nothing Found!"
        };
        return;
    }
    var promise = MenuSearchService.getMatchedMenuItems(narrow.searchText);

    promise.then(function(response) {
      narrow.found = response;
      if(narrow.found.length == 0) {
        narrow.err = {
          value : true,
          msg: "Nothing Found!"
        }
      }
    }).catch(function(err) {
        narrow.err = {
          value : true,
          msg: "Nothing Found!"
        }
    });
  };

  narrow.removeItem = function(removeItemIndex) {
      if ( removeItemIndex >= 0) {
         narrow.found.splice(removeItemIndex,1);
       }
 };
};


MenuSearchService.$inject = ['$http', 'ApiBasePath', '$q']
function MenuSearchService($http, ApiBasePath , $q) {
  var service = this;
  service.getMatchedMenuItems = function(searchTerm) {
    var deferred = $q.defer();
    var response = $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function (result) {
      // process result and only keep items that match
      var foundItems = [];

      var items = result.data.menu_items;
      for (var i = 0; i < items.length; i++) {
        var item = items[i];
          if (item.description.indexOf(searchTerm) !== -1) {
            foundItems.push(item);
          }
      }
      // return processed items
      deferred.resolve(foundItems);
    }).catch(function(err) {
      deferred.reject("");
    });
    return deferred.promise;
  };
}
})();
