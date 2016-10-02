(function () {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = [ '$scope'];
  function LunchCheckController($scope) {

    $scope.lunchCheckerBtn = function () {
        var lunch = $scope.lunchMenu,
            items, i, count = 0;
        if(lunch != null && lunch !== "") {
          items = lunch.split(',')
          for (i in items ) {
            var item = items[i].trim();
              if(item !== "") {
                 count++;
              }
          }
       }
        if ( count > 3 ) {
          $scope.msg = "Too much!";
        } else if ( count <= 3 && count > 0){
          $scope.msg = "Enjoy!";
        } else if ( count <= 0) {
          $scope.msg = "Please enter data first";
        }
    };
  }
})();
