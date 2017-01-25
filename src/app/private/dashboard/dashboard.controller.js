(function(){
  'use strict';

  angular
    .module('socialbook')
    .controller('DashboardController', function (httpRequester, CONSTANTS, webStoragesService) {
      var vm = this,
        postEndpoint = CONSTANTS.BASE + CONSTANTS.POSTS;

      var username = webStoragesService.getItemFromStorages('username');

      vm.selfPost = {
        postContent: vm.postContent,
        username: username
      };

      vm.postBtnClicked = false;
      vm.postOnOwnWall = function () {
        vm.postBtnClicked = true;

        httpRequester.post(postEndpoint, vm.selfPost)
          .then(function (res) {
            console.log(res);
            vm.postBtnClicked = false;
            vm.selfPost.postContent = '';
          }, function (err) {
            console.log(err);
          });
      }




    });

})();
