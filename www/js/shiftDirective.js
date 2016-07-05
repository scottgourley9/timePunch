angular.module('timePunch').directive('shiftDirective', function(myService, $state){
  return {
    restrict: 'A',
    scope: {
      day: '='
    },
    link: function(scope, element, attrs){
      element.on('click', function(){
        scope.day = attrs.daySelected;
        
      })
    }
  }
})
