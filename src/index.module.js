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
