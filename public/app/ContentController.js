(function () {
    'use strict';
   angular.module('AppModule') .controller("ContentController", function ($scope,$http,$sce,$window) {

$scope.ViewDashBoard=false;
$scope.ViewAllContent=false;
//all lessons page 
$scope.ViewSubjectDiv=false;
$scope.ViewLessonDiv=false;

$scope.LoadContentGrid = function (currentPage) {
$scope.ViewDashBoard=false;
$scope.ViewAllContent=true;
     var url='http://localhost:5000/getContentsPaged?page='+currentPage;
         $http({
                method: 'get',
                url: url,
            }).
              success(function (data) {
                    $scope.ContentRecords=data.contents;
                    $scope.pageSize= data.pageSize;
                    $scope.pageCount= data.pageCount;
                    $scope.activePage= data.currentPage;
                    $scope.itemsCount = data.totalRecords;
                    $scope.Pages = _.range(1, $scope.pageCount + 1);
              });
   }
   $scope.NextContentPage = function (page) {
        var nextPage = page + 1;
        if (nextPage <= $scope.pageCount) {
            $scope.LoadContentGrid(nextPage);
        }
    };
    $scope.PrevContentPage = function (page) {
        var prevPage = page - 1;
        if (prevPage > 0) {
            $scope.LoadContentGrid(prevPage);
        }
    };
   $scope.Next = function (page) {
        var nextPage = page + 1;
        if (nextPage <= $scope.pageCount) {
            $scope.LoadContentGrid(nextPage);
        }
    };
    $scope.Prev = function (page) {
        var prevPage = page - 1;
        if (prevPage > 0) {
            $scope.LoadContentGrid(prevPage);
        }
    };
    
   $scope.LoadUpdateForm = function (ContentID,statusArray) {
      $scope.statusArray=statusArray;
      //update
      if(ContentID!=null)
      {
      $http({
                method: 'get',
                url: 'http://localhost:5000/updateContent/'+ContentID
            }).
              success(function (data) {
          $scope.content=data.content;
          $scope.stages=data.stages;
          $scope. getGradesByStageID( $scope.content.lesson.subject.grade.stage_id);
          $scope. getSubjectByGradeID( $scope.content.lesson.subject.grade_id);
          $scope. getLessonsBySubjectID( $scope.content.lesson.subject_id);
           
              });
            }
            //add
            else
            { $http({   method: 'get', url: 'http://localhost:5000/getAllStages'}).
              success(function (data) {
                //stages
             $scope.stages=data.stages;
            
              });}
}
 
   $scope.SubmitForm = function () {
        console.log($scope.content.lesson_id);

            console.log($scope.content);
          if($scope.content.id!=null)
            {
              $http({ method: 'post',  url: 'http://localhost:5000/updateContent/'+$scope.content.id,
                data:$scope.content}).
              success(function (data) {
              if($scope.ViewDashBoard)
                {
                  $scope.getDashBoardData();
                }
                else if ($scope.ViewAllContent)
                {
                 $scope.LoadContentGrid($scope.activePage);
                }
              });
            }
            else{
              $http({
                method: 'post', url: 'http://localhost:5000/PostCreateContentPopup',
                data:$scope.content            }).
              success(function (data) {
                 if($scope.ViewDashBoard)
                {
                  $scope.getDashBoardData();
                }
                else if ($scope.ViewAllContent)
                {
                 $scope.LoadContentGrid($scope.activePage);
                }
               }); 
              }
}
            $scope.deleteContent = function (ContentID) {
              console.log(ContentID);
              $http({  method: 'get',url: 'http://localhost:5000/deleteContent/'+ContentID}).
              success(function (data) {
                $scope.LoadContentGrid($scope.activePage);
              });
            }
     
            $scope.getGradesByStageID = function (StageId) {
              $scope.SelectedGrades=[];
              console.log(StageId);
              $http({ method: 'GET',  url: 'http://localhost:5000/getGradesByStageID/'+StageId}).
              success(function (data) {
                console.log(data);
                $scope.SelectedGrades = data.grades;
                });    
            }

            $scope.getSubjectByGradeID = function (GradeId) {
             $scope.SelectedGradeId=GradeId;
             $scope.SelectedSubject = [];
             $scope.ViewSubjectDiv=true;
             $scope.ViewLessonDiv=false;
             $http({  method: 'GET',url: 'http://localhost:5000/getSubjectByGradeID/'+GradeId}).
              success(function (data) {
                $scope.SelectedSubject = data.subjects;
               });  
            }


            $scope.getLessonsBySubjectID = function (SubjectId) {
            $scope .SelectedSubjectID=SubjectId;
            $scope.SelectedContents=[];
            $scope.ViewSubjectDiv=false;
            $scope.ViewLessonDiv=true;
                 $http({
                method: 'GET',
                url: 'http://localhost:5000/getLessonsBySubjectID/'+SubjectId
                
            }).
            success(function (data) {
              $scope.SelectedContents = data.lessons;
             });
            }
          $scope.LoadMenu = function () {
            $http({
                method: 'get',
                url: 'http://localhost:5000/getAllStages'
            }).
              success(function (data) {
                //stages
             $scope.StagesNav=data.stages;
            
              });
              }
             $scope.getAllLessons = function () {
              if(  $scope.SelectedGradeId==null)
              {
                $scope.LoadMenu();
                $scope.SelectedContents=[];
                $scope.ViewSubjectDiv=false;
                $scope.ViewLessonDiv=true;
                $http({method: 'GET', url: 'http://localhost:5000/getAllContents'}).
                success(function (data) {
                 $scope.SelectedContents = data.contents;
                });
            }
          }
            //DashBoard Data
            
$scope.getDashBoardData = function () {
   $scope.LoadChildGrid();
   $scope.ViewDashBoard=true;
   $scope.ViewAllContent=false;
   var url='http://localhost:5000/getDashBoardData';
   $http({  method: 'get',url: url}).
   success(function (data) {
   $scope.PendingContents=data.PendingContents;
   $scope.ConfirmedContents=data.ConfirmedContents;
   });
}
$scope.OpenStagePanel=function(GradeId)
{
   // $window.alert(GradeId);
$scope.getSubjectByGradeID(GradeId);
}

//For view popup

$scope.LoadContentPopup=function(Content){
 $scope.ContentPopup=Content;
 console.log($scope.ContentPopup);
 $scope.ContentUrl = $sce.trustAsResourceUrl("//www.youtube.com/embed/"+Content.youtube_video_id);
}

$scope. LoadChildGrid=function (){

$http({  method: 'GET', url: 'http://localhost:5000/getAllChildren'})
.success(function (data) {
  console.log(data.Children);
  $scope.childern = data.Children;});
}

})
})();