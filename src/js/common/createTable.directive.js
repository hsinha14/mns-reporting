app.directive('tableDir', function($http) {
  return {
   
    restrict: 'AE',
    transclude: true,
    scope: {
      dataFromTable:'=dataparam',
      incidentDataJson:'='
    },
    link: function(scope, element, attrs) {
    /*scope.$watch('dataFromTable', function() {
        dataFromTable=scope.dataFromTable;
    });
    scope.$watch('incidentDataJson',function(){
        incidentDataJson=scope.incidentDataJson;
    })*/
    },
    templateUrl: function(tElement, tAttrs) {
        if(tElement[0].id!==""){
            return tElement[0].id + '.html';
        }
    }
  };
});