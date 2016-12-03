(function () {
  "use strict";

  angular.module('common')
  .service('CommonService', CommonService);

  function CommonService() {
    var service = this;
    
    service.saveUserInfo = function(userInfo) {
      service.userInfo = userInfo;
      console.log("Successfully saved userInfo in CommonService");
    }

    service.getUserInfo = function() {
      return service.userInfo;
    }


  }
})();
