angular.module('articles').controller('ArticlesController', ['$scope', '$routeParams', '$location', 'Authentication', 'Articles',
  function($scope, $routeParams, $location, Authentication, Articles) {
    $scope.authentication = Authentication;
    /**
    * Create
    **/
    $scope.create = function() {
      var article = new Articles({
        title : this.title,
        content : this.content
      });

      article.$save(function(response) {
        $location.path('articles/' + response._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    /**
    * Read
    **/
    $scope.find = function() {
      $scope.articles = Articles.query();
    };

    $scope.findOne = function() {
      $scope.article = Articles.get({
        articleId : $routeParams.articleId
      });
    };

    /**
    * Update
    **/
    $scope.update = function() {
      $scope.article.$update(function() {
        $location.path('articles/' + $scope.article._id);
      }, function(errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };

    /**
    * Delete
    **/
    $scope.delete = function(article) {
      if (article) {
        article.$remove(function() {
          //if the article is in the collection of articles - remove it
          for (var i in $scope.articles) {
            if ($scope.articles[i] === article) {
              $scope.articles.splice(i, 1);
            }
          }
        });
      }
      else {
        $scope.article.$remove(function() {
          $location.path('articles');
        });
      }
    };
  }
]);
