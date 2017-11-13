(function () {
    'use strict';

angular.module('AppModule').controller("StageController", function ($scope,$http) {

    

   $scope.LoadStageGrid = function (currentPage) {
     var url='http://localhost:5000/getStagesPaged?page='+currentPage;
         $http({
                method: 'get',
                url: url,
            }).
              success(function (data) {
                    $scope.StageRecords=data.stages;
                    $scope.pageSize= data.pageSize;
                    $scope.pageCount= data.pageCount;
                    $scope.activePage= data.currentPage;
                    $scope.itemsCount = data.totalRecords;
                    $scope.Pages = _.range(1, $scope.pageCount + 1);
              });
   }
   $scope.NextStagePage = function (page) {
        var nextPage = page + 1;
        if (nextPage <= $scope.pageCount) {
            $scope.LoadStageGrid(nextPage);
        }
    };
    $scope.PrevStagePage = function (page) {
        var prevPage = page - 1;
        if (prevPage > 0) {
            $scope.LoadStageGrid(prevPage);
        }
    };
       $scope.Next = function (page) {
        var nextPage = page + 1;
        if (nextPage <= $scope.pageCount) {
            $scope.LoadStageGrid(nextPage);
        }
    };
    $scope.Prev = function (page) {
        var prevPage = page - 1;
        if (prevPage > 0) {
            $scope.LoadStageGrid(prevPage);
        }
    };
    
   $scope.LoadUpdateForm = function (StageID,statusArray) {
      $scope.statusArray=statusArray;
      $scope.stage=null;
      //update
      if(StageID!=null)
      {
      $http({
                method: 'get',
                url: 'http://localhost:5000/UpdateStage/'+StageID
            }).
              success(function (data) {
          $scope.stage=data.stage;              
              });
            }
            //add
           /* else
            { $http({
                method: 'get',
                url: 'http://localhost:5000/createStage'
            }).
              success(function (data) {
                });}*/
}
 
   $scope.SubmitForm = function () {
console.log($scope.stage);
if($scope.stage.id!=null)
{
      $http({
                method: 'post',
                url: 'http://localhost:5000/UpdateStage/'+$scope.stage.id,
                data:$scope.stage
            }).
              success(function (data) {
                 $scope.LoadStageGrid($scope.activePage);
              });
}
else{

  $http({
                method: 'post',
                url: 'http://localhost:5000/createStage',
                data:$scope.stage
            }).
              success(function (data) {
                 $scope.LoadStageGrid($scope.activePage);
              }); 
}
}
   $scope.deleteStage = function (StageID) {
                console.log(StageID);
                  $http({
                method: 'get',
                url: 'http://localhost:5000/deleteStage/'+StageID
            }).
              success(function (data) {
                 $scope.LoadStageGrid($scope.activePage);
              });
                
            }
     
         
        })
})();
