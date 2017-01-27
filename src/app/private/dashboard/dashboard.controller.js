(function () {
  'use strict';

  angular
    .module('socialbook')
    .controller('DashboardController', function (httpRequester, CONSTANTS, webStoragesService) {
      var vm = this,
        postEndpoint = CONSTANTS.BASE + CONSTANTS.POSTS,
        newsFeedStartPost = CONSTANTS.BASE + CONSTANTS.ME + CONSTANTS.FEED_START_POST,
        newsFeedPageSize = CONSTANTS.FEED_PAGE_SIZE,
        userWallEndpoint = CONSTANTS.BASE + CONSTANTS.USERS,
        userWallPageSize = '/wall?StartPostId=&PageSize=10',
        username = webStoragesService.getItemFromStorages('username');

      vm.selfPost = {
        postContent: vm.postContent,
        username: username
      };

      vm.postBtnClicked = false;
      vm.postOnOwnWall = function () {
        vm.postBtnClicked = true;

        httpRequester.post(postEndpoint, vm.selfPost)
          .then(function (res) {
            vm.postsLoaded = false;
            vm.postBtnClicked = false;
            vm.selfPost.postContent = '';
            getNewsFeed();
          }, function (err) {
            console.log(err);
          });
      };

      Array.prototype.inArray = function (comparer) {
        for (var i = 0; i < this.length; i++) {
          if (comparer(this[i])) return true;
        }
        return false;
      };
      Array.prototype.pushIfNotExist = function (element, comparer) {
        if (!this.inArray(comparer)) {
          this.push(element);
        }
      };

      vm.postsLoaded = false;
      function getNewsFeed() {
        var url = newsFeedStartPost + newsFeedPageSize;

        //get all friends activities
        httpRequester.get(url)
          .then(function (res) {
            vm.posts = res.data;
            //get own posts on own wall
            httpRequester.get(userWallEndpoint + username + userWallPageSize)
              .then(function (res) {
                //store all posts in collection
                for (var i = 0; i < res.data.length; i++) {
                  var element = res.data[i];
                  vm.posts.pushIfNotExist(element, function (e) {
                    return e.id === element.id;
                  });
                }
                //sort by date in descending order (from latest to oldest)
                vm.posts.sort(function (a, b) {
                  var dateA = new Date(a.date);
                  var dateB = new Date(b.date);
                  return dateB-dateA;
                });
                vm.postsLoaded = true;
                console.log(vm.posts);
              }, function (err) {
                console.log(err);
              });
          }, function (err) {
            console.log(err);
          });
      }

      getNewsFeed();


    });

})();
