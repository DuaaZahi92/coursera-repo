(function () {
  'use strict';
  angular.module('MenuApp')
  .component('catDetails', {
    templateUrl: 'src/templates/cat-details.template.html',
    bindings: {
      catDetailsList: '<'
    }
  })
})();
