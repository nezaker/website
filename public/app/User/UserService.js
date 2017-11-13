
(function () {
    'use strict';

    angular
        .module('AppModule')
        .service('UserService', UserService);

    UserService.$inject = ['$http'];

    function UserService($http) {
        this.getAllUsers = getAllUsers;
        this.createUser = createUser;
        this.getUserByID = function (id) {
            return $http({
                method: 'GET',
                url: 'http://localhost:5000/getUserByID/' + id

            });
        }
          this.AddChild=   function (id,user) {
             return $http({
                method: 'post',
                url: 'http://localhost:5000/AddChild/'+id,
                data:user
            });
        }
        function getAllUsers() {
            return $http({
                method: 'GET',
                url: 'http://localhost:5000/getAllUsers'
            });
        }
        function createUser(user) {
            return $http({
                method: 'POST',
                url: 'http://localhost:5000/Register',
                data: user

            }

            );
        }
        this.Login = function (user) {
            console.log("ser");
            return $http({
                method: 'POST',
                url: 'http://localhost:5000/Login',
                data: user

            });
        }
        this.updateUser = function (user) {
            return $http({
                method: 'post',
                url: 'http://localhost:5000/UpdateUser',
                data: user

            }
            );
        }
    }
})();

//employeeModule.factory("employeeService", employeeService);

//employeeService.$inject = ['$http'];

//function employeeService($http) {
//    return {
//        createEmployee: function (Employee) {
//            return $http.post('/createEmployee',
//                {
//                    name=Employee.name,
//                    id=Employee.id
//                }
//            );
//        },
//        getAllEmployee: function () {
//            return $http.get('/getAllEmployee');
//        }
//    };
//}