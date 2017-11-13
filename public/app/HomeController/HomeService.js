
(function () {
    'use strict';

    angular
        .module('AppModule')
        .service('HomeService', HomeService);

   HomeService.$inject = ['$http','$window'];

    function HomeService($http,$window) {
        this.x="xyyx";
        this.getUserByID = function (id) {
           
        }
      this.NextPage= function (page,pageCount,GridName) {
        var nextPage = page + 1;
        if (nextPage <= pageCount) {
            switch (GridName)
            {
              case"Grade":
          //  LoadGradeGrid(nextPage);
$window.alert('dfgh');
              break;
            
            }
        }
    };
    this.PrevPage = function (page,GridName) {
        var prevPage = page - 1;
        if (prevPage > 0) {
             switch (GridName)
            {
              case"Grade":
              // LoadGradeGrid(prevPage);
             $window.alert('dfgh');

              break;
            
            }
        }
    };
   
    }
})();
