(function () {
    'use strict';
    angular.module('AppModule').controller("HomeController", function ($scope,$window,$http, $sce) {

    $scope.location = $window.location.search
                    .split(/[&||?]/)
                    .filter(function (x) { return x.indexOf("=") > -1; })
                    .map(function (x) { return x.split(/=/); })
                    .map(function (x) {
                        x[1] = x[1].replace(/\+/g, " ");
                        return x;
                    })
                    .reduce(function (acc, current) {
                        acc[current[0].toLowerCase()] = current[1];
                        return acc;
                    }, {});
$scope.SetContentID=function(Content){
console.log(Content);
$scope.Content=Content;
      $scope.ContentUrl = $sce.trustAsResourceUrl("//www.youtube.com/embed/"+Content.youtube_video_id);
$scope.createdAt=Content.created_at;
    $scope.ContentID=Content.id;
}
$scope.getLastContents=function(){
$http({
                method: 'get',
                url: 'http://localhost:5000/getLastContents'
            }).
              success(function (data) {              
                $scope.LastContents=data.LastContents;
              });
          }      
        });
})();
