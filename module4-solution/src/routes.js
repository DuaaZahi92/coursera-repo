(function() {
  'use strict';

angular.module('MenuApp')
.config(RouteConfig);

RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RouteConfig($stateProvider, $urlRouterProvider) {

  //Default
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home' ,{
    url: '/',
    templateUrl: 'src/templates/menu.template.html'
  })
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/templates/categories.template.html',
    controller: 'CategoriesController as catCtrl',
    resolve: {
      catList: ['MenuDataService', function (MenuDataService) {
          var promise = MenuDataService.getAllCategories();
          promise.then(function (response) {
            console.log("Categories Successully retrieved");
            //console.log(response.data);
          }).catch(function (error) {
            console.log(error);
          });
          return promise;
      }]
    }
  })
  .state('catDetails', {
    url:  '/cat-details/{catId}',
    templateUrl: 'src/templates/cat-details.template.html',
    controller: 'CatDetailsController as catDetailsCtrl',
    resolve: {
      catDetailsList: ['MenuDataService','$stateParams',
                      function (MenuDataService,$stateParams) {
                          var promise = MenuDataService.getItemsForCategory($stateParams.catId);
                          promise.then(function (response) {
                            console.log("Category "+$stateParams.catId+" details Successully retrieved");
                            console.log(response);
                          }).catch(function (error) {
                            console.log(error);
                          });
                          return promise;
                      }]
    }
  });
};
})();
