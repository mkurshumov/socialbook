(function(){
  'use strict';

  angular
    .module('socialbook')
    .factory('httpRequester', httpRequester);

    /** @ngInject */
    function httpRequester($http, $q){
      var httpRequester = this;
      var deferred = $q.defer();

      function resolve(res) {
        return deferred.resolve(res);
      }
      function reject(err) {
        return deferred.reject(err);
      }

      httpRequester.get = function (url) {
        $http.get(url)
          .then(function (res) {
            resolve(res);
          }, function (err) {
            reject(err);
          });

        return deferred.promise;
      };
      httpRequester.delete = function (url) {
        $http.delete(url)
          .then(function (res) {
            resolve(res);
          }, function (err) {
            reject(err);
          });

        return deferred.promise;
      };
      httpRequester.post = function (url, data) {
        $http.post(url, data)
          .then(function (res) {
            resolve(res);
          }, function (err) {
            reject(err);
          });

        return deferred.promise;
      };
      httpRequester.put = function (url, data) {
        $http.put(url, data)
          .then(function (res) {
            resolve(res);
          }, function (err) {
            reject(err);
          });

        return deferred.promise;
      };

      return httpRequester;
    }

})();
