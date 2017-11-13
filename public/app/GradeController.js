(function () {
    'use strict';

angular.module('AppModule').controller("GradeController", function ($scope,$http) {

    $scope.GridN="x";

   $scope.LoadGradeGrid = function (currentPage) {
     var url='http://localhost:5000/getGradesPaged?page='+currentPage;
         $http({
                method: 'get',
                url: url,
            }).
              success(function (data) {
                    $scope.GradeRecords=data.grades;
                    $scope.pageSize= data.pageSize;
                    $scope.pageCount= data.pageCount;
                    $scope.activePage= data.currentPage;
                    $scope.itemsCount = data.totalRecords;
                    $scope.Pages = _.range(1, $scope.pageCount + 1);
              });
   }

   $scope.NextGradePage= function (page) {
        var nextPage = page + 1;
        if (nextPage <= $scope.pageCount) {
         
                $scope.LoadGradeGrid(nextPage);

        }
    };
    $scope.PrevGradePage= function (page) {
        var prevPage = page - 1;
        if (prevPage > 0) {
          
                $scope.LoadGradeGrid(prevPage);

        }
    };
    
   $scope.Prev=function (page) {
HomeService.PrevPage(page,"Grade");
  LoadGradeGrid(prevPage);
   }

   $scope.Next=function (page) {
HomeService.NextPage(page,$scope.pageCount,"Grade");
  LoadGradeGrid(nextPage);
   }
   $scope.LoadGradeUpdateForm = function (GradeID,statusArray) {
      $scope.statusArray=statusArray;
        $scope.grade=null;
      //update
      if(GradeID!=null)
      {
      $http({
                method: 'get',
                url: 'http://localhost:5000/UpdateGrade/'+GradeID
            }).
              success(function (data) {
          $scope.grade=data.grade;
          $scope.stages=data.stages;
              
              });
            }
            //add
            else
            { $http({
                method: 'get',
                url: 'http://localhost:5000/createGrade'
            }).
              success(function (data) {
                //stages
              $scope.stages=data.stages;
              });}
}
 
   $scope.SubmitGradeForm = function () {
console.log($scope.grade);
if($scope.grade.id!=null)
{
      $http({
                method: 'post',
                url: 'http://localhost:5000/UpdateGrade/'+$scope.grade.id,
                data:$scope.grade
            }).
              success(function (data) {
                 $scope.LoadGradeGrid($scope.activePage);
              });
}
else{

  $http({
                method: 'post',
                url: 'http://localhost:5000/createGrade',
                data:$scope.grade
            }).
              success(function (data) {
                 $scope.LoadGradeGrid($scope.activePage);
              }); 
}
}
   $scope.deleteGrade = function (GradeID) {
                console.log(GradeID);
                  $http({
                method: 'get',
                url: 'http://localhost:5000/deleteGrade/'+GradeID
            }).
              success(function (data) {
                 $scope.LoadGradeGrid($scope.activePage);
              });
                
            }
     
         
        })
})();
