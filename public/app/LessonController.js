(function () {
    'use strict';

angular.module('AppModule').controller("LessonController", function ($scope,$http) {
   $scope.LoadLessonGrid = function (currentPage) {
     var url='http://localhost:5000/getLessonsPaged?page='+currentPage;
         $http({
                method: 'get',
                url: url,
            }).
              success(function (data) {
                    $scope.LessonRecords=data.lessons;
                    $scope.pageSize= data.pageSize;
                    $scope.pageCount= data.pageCount;
                    $scope.activePage= data.currentPage;
                    $scope.itemsCount = data.totalRecords;
                    $scope.Pages = _.range(1, $scope.pageCount + 1);
              });
   }
   $scope.NextLessonPage = function (page) {
        var nextPage = page + 1;
        if (nextPage <= $scope.pageCount) {
            $scope.LoadLessonGrid(nextPage);
        }
    };
    $scope.PrevLessonPage = function (page) {
        var prevPage = page - 1;
        if (prevPage > 0) {
            $scope.LoadLessonGrid(prevPage);
        }
    };
     $scope.Next= function (page) {
        var nextPage = page + 1;
        if (nextPage <= $scope.pageCount) {
            $scope.LoadLessonGrid(nextPage);
        }
    };
    $scope.Prev = function (page) {
        var prevPage = page - 1;
        if (prevPage > 0) {
            $scope.LoadLessonGrid(prevPage);
        }
    };
    
   $scope.LoadUpdateForm = function (LessonID,statusArray) {
      $scope.statusArray=statusArray;
        $scope.lesson=null;
      //update
      if(LessonID!=null)
      {
      $http({
                method: 'get',
                url: 'http://localhost:5000/UpdateLesson/'+LessonID
            }).
              success(function (data) {
          $scope.lesson=data.lesson;
          $scope.stages=data.stages;
          $scope.getGradesByStageID($scope.lesson.subject.grade.stage_id);
          $scope.getSubjectByGradeID($scope.lesson.subject.grade_id);

              });
            }
            //add
            else
            { $http({
                method: 'get',
                url: 'http://localhost:5000/createLesson'
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

            $scope.getSubjectByGradeID = function (GradeId) {
                            $scope.subjects = [];
                  $http({
                method: 'GET',
                url: 'http://localhost:5000/getSubjectByGradeID/'+GradeId
                
            }).
                        success(function (data) {
                            $scope.subjects = data.subjects;
                        });
                
            }

   $scope.SubmitForm = function () {
console.log($scope.lesson);
if($scope.lesson.id!=null)
{
      $http({
                method: 'post',
                url: 'http://localhost:5000/UpdateLesson/'+$scope.lesson.id,
                data:$scope.lesson
            }).
              success(function (data) {
                 $scope.LoadLessonGrid($scope.activePage);
              });
}
else{

  $http({
                method: 'post',
                url: 'http://localhost:5000/createLesson',
                data:$scope.lesson
            }).
              success(function (data) {
                 $scope.LoadLessonGrid($scope.activePage);
              }); 
}
}
   $scope.deleteLesson = function (LessonID) {
                console.log(LessonID);
                  $http({
                method: 'get',
                url: 'http://localhost:5000/deleteLesson/'+LessonID
            }).
              success(function (data) {
                 $scope.LoadLessonGrid($scope.activePage);
              });
                
            }
     
         
        })
})();
