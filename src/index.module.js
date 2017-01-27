(function () {
  'use strict';

  angular
    .module('socialbook', ['ui.router', 'ngMaterial', 'ngMessages'])
    .config(function ($mdThemingProvider) {
      $mdThemingProvider.theme('default')
        .primaryPalette('cyan')
        .accentPalette('deep-orange')
        .warnPalette('pink');

      $mdThemingProvider.alwaysWatchTheme(true)
    })
    .config(function ($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');
    })
    .constant({
      CONSTANTS: {
        BASE: 'http://77.70.58.169:8080/',
        LOGIN: 'api/users/login',
        LOGOUT: 'api/users/logout',
        REGISTER: 'api/users/register',
        ME: 'api/me',
        CHANGE_PASS: '/changePassword',
        POSTS: 'api/posts',
        SEARCH: 'api/users/search?searchTerm=',
        USERS: 'api/users/',
        PREVIEW: '/preview',
        REQUESTS: '/requests/',
        FEED_START_POST: '/feed?StartPostId=',
        FEED_PAGE_SIZE: '&PageSize=3'
      }
    })
    .directive('compareTo', compareTo);

  function compareTo() {
    return {
      require: "ngModel",
      scope: {
        otherModelValue: "=compareTo"
      },
      link: function (scope, element, attributes, ngModel) {

        ngModel.$validators.compareTo = function (modelValue) {
          return modelValue == scope.otherModelValue;
        };

        scope.$watch("otherModelValue", function () {
          ngModel.$validate();
        });
      }
    };
  }

})();
