(function () {
  "use strict";

  angular.module('common')
  .controller('MyInfoController', MyInfoController);

  MyInfoController.$inject = ['favDish', 'CommonService', 'ApiPath'];
  function MyInfoController( favDish , CommonService, ApiPath) {
    var myInfoCtrl = this;
    var userInfo = CommonService.getUserInfo();
    myInfoCtrl.registered = false;
    myInfoCtrl.showFavDish = false;
    myInfoCtrl.basePath = ApiPath;
    if (userInfo != undefined) {
      console.log("userInfo: "+ userInfo);
      myInfoCtrl.userInfo = userInfo;
      if(favDish != undefined && favDish != null) {
        myInfoCtrl.favDish = favDish;
        myInfoCtrl.showFavDish = true;
      }
      myInfoCtrl.registered = true;
    } else {
      myInfoCtrl.registered = false;
    }
  }
})();
