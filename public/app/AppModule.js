
//var employeeModule = angular.module("employeeModule", []);
(function () {
    'use strict';

    angular.module("AppModule",['ngFileUpload']);
    
  /*      var initInjector = angular.injector(["ng"]);

  var $http = initInjector.get("$http");

    return 
    $http({
                method: 'get',
                url: 'http://localhost:5000/getAllStages'
            })
        .then(function(data) {
            app.constant("myData", data.stages);
        })
        .then(function bootstrapApplication() {
            angular.element(document).ready(function() {
                angular.bootstrap(document, ["A"]);
            });
        });*/
})();

  angular.module('AppModule').constant('appName', 'My App');
    angular.module("AppModule",[]).value('appConfig',{
            apiUrl: '/api',
            settings: null,
            AccountTypesArr:null
    })
    .run(['$http', '$rootScope','appConfig', function($http, $rootScope,appConfig) {

          console.log(appConfig);
        appConfig.settings = 'we can change it';
            var arr=[];
            $http({
                method: 'get',
                url: 'http://localhost:5000/getAllStages'
            })
        .success(function(data) {
            //app.constant("myData", data.stages);
      
           appConfig. AccountTypesArr=data .stages;
          //arr=data .stages;
        });
           appConfig. AccountTypesArr=arr;

        console.log(appConfig);

}]);

   angular.module('AppModule').directive('ngConfirmClick', [
        function(){
            return {
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure?";
                    var clickAction = attr.confirmedClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
    }])
   /* angular.module('AppModule').directive('datePicker', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelCtrl) {
            $(function () {
                element.css('width', '85%');
                element.datepicker({
                    showOn: "button",
                    buttonImage: "/sites/MCYCDVar/_catalogs/masterpage/Images/calender_icon.png",
                    buttonImageOnly: true,
                    changeMonth: true,
                    changeYear: true,
                    pickDate: true,
                    todayHighlight: true,
                    yearRange: "-100:+20",
                    dateFormat: 'dd/mm/yy',
                    onSelect: function (date) {
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(date);
                        });
                    }
                });
                //element.focusin(function () { element.siblings()[0].click() });
                if (attrs.minDate) element.datepicker("option", "minDate", attrs.minDate);
                if (attrs.maxDate) element.datepicker("option", "maxDate", attrs.maxDate);
                var regional = lcid == 1033 ? 'en' : 'ar';
                element.datepicker("option", $.datepicker.regional[regional]);
            });
        }
    }
});*/