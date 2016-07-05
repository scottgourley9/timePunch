angular.module('timePunch').controller('clockCtrl', function($timeout, $rootScope, $location, $interval, $scope, $state, myService){


  if($scope.inHidden = true){
    $scope.outHidden = false;

  }


  $scope.myClockSection = [];
  $scope.myClockSection.push('animated fadeInLeft');
  // $timeout(function(){
  //   $scope.myClockSection.splice(0);
  // }, 1000);
  $scope.myDate = (new Date()).toDateString();
  var dater;
  var newDateObj = {
    day: $scope.myDate,
    timeStamp: (new Date()).setHours(0, 0, 0),
    inOrOut: 'OUT'
  }
  $scope.dateFinder = (function(){
    dater = $interval(function(){
      if($scope.myDate !== (new Date()).toDateString() && $scope.inHidden){
        $scope.myDate = new Date().toDateString();
        $scope.clockOut(newDateObj);
        $scope.loadTimes();
      }
      else if($scope.myDate !== (new Date()).toDateString() && $scope.outHidden){
        $scope.myDate = new Date().toDateString();
        $scope.loadTimes();
      }
    }, 1800000)
  })();


  var clockHidden;
  $scope.inHidden = false;
  $scope.outHidden = true;
  $scope.inTimeStampHidden = true;
  $scope.outTimeStampHidden = true;
  $scope.totalTimeHidden = true;
  $scope.theDay = new Date();



  $scope.loadTimes = function(){
    myService.getTimes($scope.myDate).then(function(response){

    $scope.timeStamps = response.data.timeStamps;
    if($scope.timeStamps === []){
      $scope.previousTimeWorked = 0;
    }
    else {
      var inTotalSeconds = 0;
      var outTotalSeconds = 0;
      for(var i = 0; i < $scope.timeStamps.length; i++){

        if($scope.timeStamps[i].inOrOut === "IN" && $scope.timeStamps[i].day === (new Date()).toDateString()){
          inTotalSeconds += (Date.parse($scope.timeStamps[i].timeStamp))/1000;
        }
        else if($scope.timeStamps[i].inOrOut === "OUT" && $scope.timeStamps[i].day === (new Date()).toDateString()){
          outTotalSeconds += (Date.parse($scope.timeStamps[i].timeStamp))/1000;
        }
      }
      $scope.previousTimeWorked = Math.floor(outTotalSeconds - inTotalSeconds);
      $scope.hours = Math.floor(($scope.previousTimeWorked/60)/60);
      $scope.minutes = Math.floor(($scope.previousTimeWorked-($scope.hours*3600))/60);
      $scope.seconds = Math.floor($scope.previousTimeWorked-(($scope.hours*3600)+($scope.minutes*60)));
    }
    var counter = $scope.previousTimeWorked;
    var timer;
    var time = function(){
      timer = $interval(function(){
        counter++;
          $scope.hours = Math.floor((counter/60)/60);
          $scope.minutes = Math.floor((counter-($scope.hours*3600))/60);
          $scope.seconds = Math.floor(counter-(($scope.hours*3600)+($scope.minutes*60)));

      }, 1000)
    }

    var stopTime = function(){
      $interval.cancel(timer);
      timer = undefined;
    }


      $scope.clockIn = function(){
        time();
          myService.stillIn = true;
          $scope.inTimeStamp = new Date();
          $scope.inHidden = true;
          $scope.outHidden = false;
          $scope.inTimeStampHidden = false;
          $scope.outTimeStampHidden = true;
          $scope.totalTimeHidden = true;
            var day = new Date();
            var theDay = day.toDateString();

            var dateObj = {
              day: theDay,
              timeStamp: day,
              inOrOut: 'IN'
            }
              myService.postTimeStamp(dateObj).then(function(postTimeResponse){
                myService.postTimeStampToUser(postTimeResponse);
                myService.getTimes($scope.myDate).then(function(response){

                $scope.timeStamps = response.data.timeStamps;
              })
            })
      }

      $scope.clockOut = function(){
        if(arguments.length !== 0){
          stopTime();
          myService.stillIn = false;
          $scope.inHidden = false;
          $scope.outHidden = true;
          $scope.outTimeStampHidden = false;
          $scope.inTimeStampHidden = true;
          $scope.totalTimeHidden = false;
          $scope.outTimeStamp = newDateObj.timeStamp;
          myService.postTimeStamp(newDateObj).then(function(postTimeResponse){
            myService.postTimeStampToUser(postTimeResponse);
            myService.getTimes($scope.myDate).then(function(response){

            $scope.timeStamps = response.data.timeStamps;
          })
        })
        }
        else {

        stopTime();
        myService.stillIn = false;
          $scope.outTimeStamp = new Date();
          $scope.inHidden = false;
          $scope.outHidden = true;
          $scope.outTimeStampHidden = false;
          $scope.inTimeStampHidden = true;
          $scope.totalTimeHidden = false;
            var day = new Date();
            var theDay = day.toDateString();

            var dateObj = {
              day: theDay,
              timeStamp: day,
              inOrOut: 'OUT'
            }
              myService.postTimeStamp(dateObj).then(function(postTimeResponse){
                myService.postTimeStampToUser(postTimeResponse);
                myService.getTimes($scope.myDate).then(function(response){

                $scope.timeStamps = response.data.timeStamps;
              })
            })
          }
      }

  })

}
$scope.loadTimes();

$rootScope.$on('$stateChangeSuccess', function(){
  if($location.path() === '/clock'){
    $scope.clockHidden = false;
    $scope.myClockSection.splice(0);
    $scope.myClockSection.push('animated fadeInLeft');
  }
  else {
    $scope.clockHidden = true;
    $scope.myClockSection.splice(0);
  }

})



})
