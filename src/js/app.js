 var area1;
  $(document).on('click','.edit-button',function(e){
    var areaDiv=$(e.target).parent().siblings('.edit-div').attr('id');
    if(!area1) {
            area1 = new nicEditor({fullPanel : true}).panelInstance(areaDiv,{hasPanel : true});
        } else {
            area1.removeInstance(areaDiv);
            area1 = null;
        }
  });



//var app = angular.module("weeklyReports", []);

/*app.controller("reportsCtrl", function($scope,$http) {
    $scope.printOption=function(){
        window.print();
    }

    $http({ method: 'GET', url: '../mock-data/tableData.json' }).success(function (data) {
            $scope.tableData = data; // response data 
        }).
        error(function (data) {
            console.log("error");
    });
});*/
/*var app = angular.module("trendsReport", []);
app.controller("trendsCtrl", function($scope,$http) {
    $scope.printOption=function(){
        window.print();
    }

    $http({ method: 'GET', url: '../mock-data/trendsData.json' }).success(function (data) {
            $scope.trendsData = data; // response data 
        }).
        error(function (data) {
            console.log("error");
    });
});*/

/***directive to create table***/
/*app.directive('tableDir', function($http) {
  return {
   
    restrict: 'AE',
    transclude: true,
    scope: {
      dataFromTable:'=dataparam',

    },
    link: function(scope, element, attrs) {

    scope.$watch('dataFromTable', function() {
        dataFromTable=scope.dataFromTable;
    });
    },
    templateUrl: function(tElement, tAttrs) {
        if(tElement[0].id!==""){
            return tElement[0].id + '.html';
        }
    }
  };
});
*/
   

