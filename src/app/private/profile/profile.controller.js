(function () {
  'use strict';

  angular
    .module('socialbook')
    .controller('ProfileController', function ($stateParams, CONSTANTS, httpRequester, webStoragesService) {
      var vm = this,
        profileEndpoint = CONSTANTS.BASE + CONSTANTS.USERS,
        requestEndpoint = CONSTANTS.BASE + CONSTANTS.ME + CONSTANTS.REQUESTS,
        userWallEndpoint = CONSTANTS.BASE  + CONSTANTS.USERS,
        userWallPageSize = '/wall?StartPostId=&PageSize=5';

      var user = $stateParams.username;

      vm.currentUsername = webStoragesService.getItemFromStorages('userName');

      vm.dataLoaded = false;
      function getUser() {
        if (user != "") {
          httpRequester.get(profileEndpoint + user)
            .then(function (res) {
              console.log(res.data);
              vm.userData = res.data;
              if (res.data.gender == 1) {
                vm.userData.gender = 'Female';
              } else if (res.data.gender == 2) {
                vm.userData.gender = 'Male';
              } else {
                vm.userData.gender = 'Other';
              }
              vm.dataLoaded = true;
              getUserWall();
            }, function (err) {
              console.log(err);
            });
        }
      }
      getUser();

      vm.addFriendClicked = false;
      vm.addFriend = function () {
        vm.addFriendClicked = true;

        httpRequester.post(requestEndpoint + user)
          .then(function (res) {
            console.log(res.data);
            vm.addFriendClicked = false;
            getUser();
          }, function (err) {
            console.log(err);
          });
      };

      vm.postsLoaded = false;
      function getUserWall() {
        if (vm.userData.isFriend || vm.userData.username == vm.currentUsername) {
          httpRequester.get(userWallEndpoint + user + userWallPageSize)
            .then(function (res) {
              console.log(res.data);
              vm.posts = res.data;
              vm.postsLoaded = true;
            }, function (err) {
              console.log(err);
            });
        }
      }


    });

})();
