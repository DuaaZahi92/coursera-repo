(function() {
"use strict";

angular.module('common', [])
.constant('ApiPath', 'https://duaazahi92-resturant-server.herokuapp.com')
.config(config);

config.$inject = ['$httpProvider'];
function config($httpProvider) {
  $httpProvider.interceptors.push('loadingHttpInterceptor');
}

})();
