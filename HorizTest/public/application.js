var mainApplicationModuleName = "mean";

var mainApplicationModule = angular.module(mainApplicationModuleName,
  ['ngResource', 'ngRoute', 'users', 'example', 'articles', 'chat']);

mainApplicationModule.config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);

//solve's facebooks OAuth bug (not that we're using Facebooks OAuth)
if (window.location.hash === '#_=_') {
  window.location.hash = '#!';
}

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainApplicationModuleName]);
});
