(function(){
  'use strict';

  angular
    .module('socialbook')
    .factory('httpRequester', httpRequester);

    /** @ngInject */
    function httpRequester($http, $q){
      var httpRequester = this;

      httpRequester.get = function (url) {
        var deferred = $q.defer();

        $http.get(url)
          .then(function (res) {
            deferred.resolve(res)
          }, function (err) {
            deferred.reject(err);
          });

        return deferred.promise;
      };
      httpRequester.delete = function (url) {
        var deferred = $q.defer();

        $http.delete(url)
          .then(function (res) {
            deferred.resolve(res)
          }, function (err) {
            deferred.reject(err);
          });

        return deferred.promise;
      };
      httpRequester.post = function (url, data) {
        var deferred = $q.defer();

        $http.post(url, data)
          .then(function (res) {
            deferred.resolve(res)
          }, function (err) {
            deferred.reject(err);
          });

        return deferred.promise;
      };
      httpRequester.put = function (url, data) {
        var deferred = $q.defer();

        $http.put(url, data)
          .then(function (res) {
            deferred.resolve(res)
          }, function (err) {
            deferred.reject(err);
          });

        return deferred.promise;
      };

      return httpRequester;
    }

})();
