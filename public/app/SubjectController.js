(function () {
    'use strict';
   angular.module('AppModule').controller("SubjectController", function ($scope,$window,$http, $sce) {

   

   $scope.LoadSubjectGrid = function (currentPage) {
     var url='http://localhost:5000/getSubjectsPaged?page='+currentPage;
         $http({
                method: 'get',
                url: url
            }).
              success(function (data) {
                    $scope.SubjectRecords=data.subjects;
                    $scope.pageSize= data.pageSize;
                    $scope.pageCount= data.pageCount;
                    $scope.activePage= data.currentPage;
                    $scope.itemsCount = data.totalRecords;
                    $scope.Pages = _.range(1, $scope.pageCount + 1);
              });
   }
   $scope.NextSubjectPage = function (page) {
        var nextPage = page + 1;
        if (nextPage <= $scope.pageCount) {
            $scope.LoadSubjectGrid(nextPage);
        }
    };
    $scope.Next = function (page) {
        var nextPage = page + 1;
        if (nextPage <= $scope.pageCount) {
            $scope.LoadSubjectGrid(nextPage);
        }
    };
    
    $scope.PrevSubjectPage = function (page) {
        var prevPage = page - 1;
        if (prevPage > 0) {
            $scope.LoadSubjectGrid(prevPage);
        }
    };
     $scope.Prev = function (page) {
        var prevPage = page - 1;
        if (prevPage > 0) {
            $scope.LoadSubjectGrid(prevPage);
        }
    };
    
   $scope.LoadUpdateForm = function (SubjectID,statusArray) {
      $scope.statusArray=statusArray;
        $scope.subject=null;
      //update
      if(SubjectID!=null)
      {
      $http({
                method: 'get',
                url: 'http://localhost:5000/UpdateSubject/'+SubjectID
            }).
              success(function (data) {
                //stages
              $scope.stages=data.stages;
              $scope.subject=data.subject;
              $scope.getGradesByStageID($scope.subject.grade.stage_id);
              });
            }
            //add
            else
            { $http({
                method: 'get',
                url: 'http://localhost:5000/createSubject'
            }).
              success(function (data) {
                //stages
              $scope.stages=data.stages;
              });}
}
  $scope.getGradesByStageID = function (StageId) {
                   $scope.grades=[];
                 console.log(StageId);
                 $http({
                method: 'GET',
                url: 'http://localhost:5000/getGradesByStageID/'+StageId
            }).
                        success(function (data) {
                           console.log(data);
                            $scope.grades = data.grades;
                        });
                
            }

   $scope.SubmitForm = function () {
console.log($scope.subject);
if($scope.subject.id!=null)
{
      $http({
                method: 'post',
                url: 'http://localhost:5000/UpdateSubject/'+$scope.subject.id,
                data:$scope.subject
            }).
              success(function (data) {
                 $scope.LoadSubjectGrid($scope.activePage);
              });
}
else{

  $http({
                method: 'post',
                url: 'http://localhost:5000/createSubject',
                data:$scope.subject
            }).
              success(function (data) {
                 $scope.LoadSubjectGrid($scope.activePage);
              }); 
}
}
   $scope.deleteSubject = function (SubjectID) {
                console.log(SubjectID);
                  $http({
                method: 'get',
                url: 'http://localhost:5000/deleteSubject/'+SubjectID
            }).
              success(function (data) {
                 $scope.LoadSubjectGrid($scope.activePage);
              });
                
            }
     
         
        })
})();