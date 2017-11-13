(function () {
   'use strict';
   angular.module('AppModule').controller("ChildController", function ($rootScope,$http,$scope,$window) {
$scope.LoadUserProfile = function () {
  $http({
    method: 'get',  url: 'http://localhost:5000/UpdateUser'}).
    success(function (data) {
      $scope.user=data.user;
      $scope.Usercities=data.cities;
      $scope.Useraccount_types=data.account_types;
      $scope. LoadChildGrid($scope.user.id,1);
     });
}    

        /*$scope.x=appConfig.apiUrl;
        $scope.y=appConfig.;*/
        $scope.AccountTypesArr;
        LoadAccountTypesArr();
        function  LoadAccountTypesArr(){
        $http({
                method: 'GET',
                url: 'http://localhost:5000/getAllAccountTypes'
            }).
            success(function (data) {
            $scope.AccountTypesArr = data.account_types;
              });
        }
//load all childern
$scope. LoadChildGrid=function (ParentId,currentPage){
 
    $scope.ParentId=ParentId;
   $http({    

                method: 'GET',
                url: 'http://localhost:5000/getChildren/'+$scope.ParentId+'?page='+currentPage,
               
            }).success(function (data) {
                console.log(data.Children);
               $scope.childern = data.Children;
               $scope.pageSize= data.pageSize;
               $scope.pageCount= data.pageCount;
               $scope.activePage= data.currentPage;
               $scope.itemsCount = data.totalRecords;
               $scope.Pages = _.range(1, $scope.pageCount + 1);
                        });
              
            }
    $scope.Next = function (page) {
        var nextPage = page + 1;
        if (nextPage <= $scope.pageCount) {
            $scope.LoadChildGrid($scope.ParentId,nextPage);
        }
    };
    $scope.Prev = function (page) {
        var prevPage = page - 1;
        if (prevPage > 0) {
            $scope.LoadChildGrid($scope.ParentId,prevPage);
        }
    };
$scope.LoadUpdateChildForm = function (UserID,ParentId,statusArray) {
  $scope.  Child=null;
  $scope.ParentId=ParentId;
  $scope.grades = [];
   $scope.getAllStages();

  //update
  if(UserID!=null)
   {
   $http({method: 'get',url: 'http://localhost:5000/GetUser/'+UserID}).
    success(function (data) {
     $scope.Child=data.user;
  $scope.getGradesByStageID($scope.Child.grade.stage_id); 
  $scope.Child.password=null;        

    });
   }
}
 
$scope.LoadChildForm = function (ParentId) {
  $scope.  Child=null;
  $scope.ParentId=ParentId;
  $scope.grades = [];
  $scope.getAllStages();
  }
           //Check Password
$scope.CheckPassword=function(OldPassword)
{
 //Call service check pass
 //check if pass matches return true 
}
//Loading DropDown list
$scope.getAllStages = function () {
 $http({method: 'GET',url: 'http://localhost:5000/getAllStages'}).
  success(function (data) {
    $scope.stages = data.stages;
    });
}
$scope.getGradesByStageID = function (StageId) {
  $http({ method: 'GET', url: 'http://localhost:5000/getGradesByStageID/'+StageId}).
  success(function (data) {
    console.log(data);
    $scope.grades = data.grades;
  });
}

function CheckEmail(Email)
{
  $http({ method: 'GET', url: 'http://localhost:5000/getUserByEmail/' + Email }).
  success(function (data) {
    console.log("data"+data.user);
    if(data .user !=null)
    {
     $window.alert("البريد الالكترونى موجود من قبل");          
     return true ;
    }
    else{
     return false;
    }
    });
}
$scope.cancelAdding=function(){
  //Empty all fields
  $scope.  Child=null;
  $scope. grades=[];
}
$scope.SubmitForm = function () {
//  $scope.user.photo_name=$scope.photo_name;
 $http({
     method: 'post',
     url: 'http://localhost:5000/UpdateUser',
     data:$scope.user
            }).
             success(function (data) {
               console.log(data);
            });
        }
$scope.AddFamilyChild = function () {
if ($scope.Child.id ==null){//add
  var IsExist=CheckEmail($scope.Child.email);
  if(! IsExist){
   console.log("not exist");
   $http({
      method: 'post',
      url: 'http://localhost:5000/AddChild/'+$scope.ParentId,
      data:$scope.Child}).
    success(function (data) {
   //$scope.SelectedUsers = data.users;
      console.log(data);
      $window.alert("تم الاضافه");
      $scope. LoadChildGrid($scope.ParentId,$scope.activePage);
      $('#product_view').click();
      });
  }            
  else{
   console.log(" موجود من قبل");
  }
  }
else//update
{
 $http({
  method: 'post',
  url: 'http://localhost:5000/UpdateChild/'+$scope.Child.id,
  data:$scope.Child}).
  success(function (data) {
      $scope. LoadChildGrid($scope.ParentId,$scope.activePage);
      $('#product_view').click();
  });
}
}
$scope.deleteUser = function(ChildId){
   $http({
  method: 'get',
  url: 'http://localhost:5000/deleteChild/'+ChildId,
  data:$scope.Child}).
  success(function (data) {
      $scope. LoadChildGrid($scope.ParentId,$scope.activePage);
      $('#product_view').click();
  });
  }     
    /*   ///Upload Profile photo
          $scope.submit = function(){
          console.log($scope.file); //function to call on form submit
        if ($scope.file) { //check if from is valid
           $scope. upload($scope.file); //call upload function
        }
    }
  
    $scope.upload = function (file) {
        Upload.upload({
            url: 'http://localhost:5000/upload', //webAPI exposed to upload the file
            data:{file:file} //pass file as data, should be user ng-model
        }).then(function (resp) { //upload function returns a promise
            if(resp.data.error_code === 0){ //validate success
  //            $scope.photo_name=resp.config.data.file.name;
                $scope.user.photo_name=resp.config.data.file.name;
                $window.alert('Success ' + resp.config.data.file.name + 'uploaded. Response: ');
            } else {
                $window.alert('an error occured');
            }
        }, function (resp) { //catch error
            console.log('Error status: ' + resp.status);
            $window.alert('Error status: ' + resp.status);
        }, function (evt) { 
            console.log(evt);
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            progress = 'progress: ' + progressPercentage + '% '; // capture upload progress
        });
    }*/
})
  })
  ();