(function () {
  "use strict";

  angular.module('common')
  .controller('SignUpController', SignUpController);

  SignUpController.$inject = ['CommonService','MenuService'];
  function SignUpController( CommonService, MenuService ) {
    var signUpCtrl = this;
    signUpCtrl.favDishAval = false;
    signUpCtrl.done = false;
    if( signUpCtrl.userInfo ) {
      console.log(signUpCtrl.userInfo);
    }
    signUpCtrl.saveUserInfo = function (){
      CommonService.saveUserInfo(signUpCtrl.userInfo);
      signUpCtrl.done = true;
      signUpCtrl.favdishValidator();
      console.log("UserInfo saved: " + CommonService.userInfo.toString());
    };

    signUpCtrl.favdishValidator = function () {
      if( signUpCtrl.userInfo.favdishSN ){
        var promise = MenuService.getMenuItemByShortName(signUpCtrl.userInfo.favdishSN);
        promise.then(function (response) {
          console.log("Favorite Dish Short Name exists");
          signUpCtrl.favDishAval = true;
        }).catch(function (error) {
          console.log("error validating the favorit dish: " + error );
          signUpCtrl.favDishAval = false;
        });
      }
    }
  }
})();
