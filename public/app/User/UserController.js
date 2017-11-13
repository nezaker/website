(function () {
    'use strict';

angular.module('AppModule').controller("UserController", function ($scope,$http) {

  $scope.LoadUserProfile = function () {
         $http({
                method: 'get',
                url: 'http://localhost:5000/UpdateUser'
            }).
              success(function (data) {
                    $scope.user=data.user;
                    $scope.Usercities=data.cities;
                    $scope.Useraccount_types=data.account_types;
                    });
   }    

   $scope.LoadUserGrid = function (currentPage) {
     var url='http://localhost:5000/getUsersPaged?page='+currentPage;
         $http({
                method: 'get',
                url: url,
            }).
              success(function (data) {
                    $scope.UserRecords=data.users;
                    $scope.pageSize= data.pageSize;
                    $scope.pageCount= data.pageCount;
                    $scope.activePage= data.currentPage;
                    $scope.itemsCount = data.totalRecords;
                    $scope.Pages = _.range(1, $scope.pageCount + 1);
              });
   }
   $scope.NextUserPage = function (page) {
        var nextPage = page + 1;
        if (nextPage <= $scope.pageCount) {
            $scope.LoadUserGrid(nextPage);
        }
    };
    $scope.PrevUserPage = function (page) {
        var prevPage = page - 1;
        if (prevPage > 0) {
            $scope.LoadUserGrid(prevPage);
        }
    };
     $scope.Next = function (page) {
        var nextPage = page + 1;
        if (nextPage <= $scope.pageCount) {
            $scope.LoadUserGrid(nextPage);
        }
    };
    $scope.Prev= function (page) {
        var prevPage = page - 1;
        if (prevPage > 0) {
            $scope.LoadUserGrid(prevPage);
        }
    };
   $scope.LoadUpdateForm = function (UserID,statusArray) {
    $scope.user=null;
      $scope.statusArray=statusArray;
      //update
      if(UserID!=null)
      {
      $http({
                method: 'get',
                url: 'http://localhost:5000/UpdateUser/'+UserID
            }).
              success(function (data) {
              $scope.user=data.user;
              $scope.cities=data.cities;
              $scope.AccountTypes=data.account_types;
              });
            }
            //add
            else
            { 
              $scope.getAllCities();
              $scope.getAllAccountTypes();
              }
}
 
 $scope.getAllCities = function  (){
                  $http({
                method: 'get',
                url: 'http://localhost:5000/getAllCities'
            }).
              success(function (data) {
              $scope.cities=data .cities;
              });
                
            }
  $scope.getAllAccountTypes = function () {
                  $http({
                method: 'get',
                url: 'http://localhost:5000/getAllAccountTypes'
            }).
              success(function (data) {
              $scope.AccountTypes=data .account_types;
              });
                
            }
   $scope.SubmitForm = function () {
console.log($scope.user);
if($scope.user.id!=null)
{
      $http({
                method: 'post',
                url: 'http://localhost:5000/UpdateUser/'+$scope.user.id,
                data:$scope.user
            }).
              success(function (data) {
                 $scope.LoadUserGrid($scope.activePage);
              });
        }
    else{

       $http({
                method: 'post',
                url: 'http://localhost:5000/createUser',
                data:$scope.user
            }).
              success(function (data) {
                 $scope.LoadUserGrid($scope.activePage);
              }); 
}
}
   $scope.deleteUser = function (UserID) {
                console.log(UserID);
                  $http({
                method: 'get',
                url: 'http://localhost:5000/deleteUser/'+UserID
            }).
              success(function (data) {
                 $scope.LoadUserGrid($scope.activePage);
              });
                
            }
     
         
        })
})();
