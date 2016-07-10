angular.module('timePunch').controller('timeCtrl', function($ionicModal, $timeout, $scope, $state, myService){



  $scope.menu = function(){
    $state.go('admin')
  }




  $scope.back = function(){
    myService.employeeSectionShowing = false;

    myService.backButtonsAndLogoutButtonSectionHidden = false;

    $state.go('employees');

  }






  $scope.cancelAndSubmitButtonsHidden = true;
  $scope.doneButtonHidden = false;

  $scope.sundayTimeSelected = -1;
  $scope.sundayEdit = function(index){
  $scope.theIndex = index;
  $scope.sundayTimeSelected = index;
  $scope.cancelAndSubmitButtonsHidden = false;
  $scope.doneButtonHidden = true;
  }
  $scope.tempChangeSunday = function(newTime){
  $scope.sundayTimeSelected = -1;
  $scope.timesSunday[$scope.theIndex].timeStamp = newTime;
  $scope.getTotalWorkWeek();
  }
  $scope.xPressedSunday = function(){
  $scope.sundayTimeSelected = -1;
  }



  $scope.mondayTimeSelected = -1;
$scope.mondayEdit = function(index){
  $scope.theIndex = index;
  $scope.mondayTimeSelected = index;
  $scope.cancelAndSubmitButtonsHidden = false;
  $scope.doneButtonHidden = true;
}
$scope.tempChangeMonday = function(newTime){
  $scope.mondayTimeSelected = -1;
  $scope.timesMonday[$scope.theIndex].timeStamp = newTime;
  $scope.getTotalWorkWeek();
}
$scope.xPressedMonday = function(){
  $scope.mondayTimeSelected = -1;
}



$scope.tuesdayTimeSelected = -1;
$scope.tuesdayEdit = function(index){
  $scope.theIndex = index;
  $scope.tuesdayTimeSelected = index;
  $scope.cancelAndSubmitButtonsHidden = false;
  $scope.doneButtonHidden = true;
}
$scope.tempChangeTuesday = function(newTime){
$scope.tuesdayTimeSelected = -1;
$scope.timesTuesday[$scope.theIndex].timeStamp = newTime;
$scope.getTotalWorkWeek();
}
$scope.xPressedTuesday = function(){
$scope.tuesdayTimeSelected = -1;
}



$scope.wednesdayTimeSelected = -1;
$scope.wednesdayEdit = function(index){
  $scope.theIndex = index;
  $scope.wednesdayTimeSelected = index;
  $scope.cancelAndSubmitButtonsHidden = false;
  $scope.doneButtonHidden = true;
}
$scope.tempChangeWednesday = function(newTime){
$scope.wednesdayTimeSelected = -1;
$scope.timesWednesday[$scope.theIndex].timeStamp = newTime;
$scope.getTotalWorkWeek();
}
$scope.xPressedWednesday = function(){
$scope.wednesdayTimeSelected = -1;
}



$scope.thursdayTimeSelected = -1;
$scope.thursdayEdit = function(index){
  $scope.theIndex = index;
  $scope.thursdayTimeSelected = index;
  $scope.cancelAndSubmitButtonsHidden = false;
  $scope.doneButtonHidden = true;
}
$scope.tempChangeThursday = function(newTime){
$scope.thursdayTimeSelected = -1;
$scope.timesThursday[$scope.theIndex].timeStamp = newTime;
$scope.getTotalWorkWeek();
}
$scope.xPressedThursday = function(){
$scope.thursdayTimeSelected = -1;
}



$scope.fridayTimeSelected = -1;
$scope.fridayEdit = function(index){
  $scope.theIndex = index;
  $scope.fridayTimeSelected = index;
  $scope.cancelAndSubmitButtonsHidden = false;
  $scope.doneButtonHidden = true;
}
$scope.tempChangeFriday = function(newTime){
$scope.fridayTimeSelected = -1;
$scope.timesFriday[$scope.theIndex].timeStamp = newTime;
$scope.getTotalWorkWeek();
}
$scope.xPressedFriday = function(){
$scope.fridayTimeSelected = -1;
}



$scope.saturdayTimeSelected = -1;
$scope.saturdayEdit = function(index){
  $scope.theIndex = index;
  $scope.saturdayTimeSelected = index;
  $scope.cancelAndSubmitButtonsHidden = false;
  $scope.doneButtonHidden = true;
}
$scope.tempChangeSaturday = function(newTime){
$scope.saturdayTimeSelected = -1;
$scope.timesSaturday[$scope.theIndex].timeStamp = newTime;
$scope.getTotalWorkWeek();
}
$scope.xPressedSaturday = function(){
$scope.saturdayTimeSelected = -1;
}



  $scope.theSundayChosen = true;
  $scope.theMondayChosen = true;
  $scope.theTuesdayChosen = true;
  $scope.theWednesdayChosen = true;
  $scope.theThursdayChosen = true;
  $scope.theFridayChosen = true;
  $scope.theSaturdayChosen = true;
  $scope.entireScheduleView = false;

  $scope.showThisSunday = function(){
    $scope.timeViewClass.splice(0);
    $scope.entireScheduleView = true;
    $scope.theSundayChosen = false;
    $scope.buttonsBottomHidden = true;
    $scope.cancelAndSubmitButtonsHidden = true;
    $scope.doneButtonHidden = false;
    $scope.xPressedSunday();
  }
  $scope.sundayDone = function(){
    $scope.timeViewClass.push('animated fadeInLeft');
    $scope.entireScheduleView = false;
    $scope.theSundayChosen = true;
    $scope.buttonsBottomHidden = false;
    $scope.getCurrentEmployeeTimes();

  }
  $scope.showThisMonday = function(){
    $scope.timeViewClass.splice(0);
    $scope.entireScheduleView = true;
    $scope.theMondayChosen = false;
    $scope.buttonsBottomHidden = true;
    $scope.cancelAndSubmitButtonsHidden = true;
    $scope.doneButtonHidden = false;
    $scope.xPressedMonday();
  }
  $scope.mondayDone = function(){
    $scope.timeViewClass.push('animated fadeInLeft');
    $scope.entireScheduleView = false;
    $scope.theMondayChosen = true;
    $scope.buttonsBottomHidden = false;
    $scope.getCurrentEmployeeTimes();

  }
  $scope.showThisTuesday = function(){
    $scope.timeViewClass.splice(0);
    $scope.entireScheduleView = true;
    $scope.theTuesdayChosen = false;
    $scope.buttonsBottomHidden = true;
    $scope.cancelAndSubmitButtonsHidden = true;
    $scope.doneButtonHidden = false;
    $scope.xPressedTuesday();
  }
  $scope.tuesdayDone = function(){
    $scope.timeViewClass.push('animated fadeInLeft');
    $scope.entireScheduleView = false;
    $scope.theTuesdayChosen = true;
    $scope.buttonsBottomHidden = false;
    $scope.getCurrentEmployeeTimes();
  }
  $scope.showThisWednesday = function(){
    $scope.timeViewClass.splice(0);
    $scope.entireScheduleView = true;
    $scope.theWednesdayChosen = false;
    $scope.buttonsBottomHidden = true;
    $scope.cancelAndSubmitButtonsHidden = true;
    $scope.doneButtonHidden = false;
    $scope.xPressedWednesday();
  }
  $scope.wednesdayDone = function(){
    $scope.timeViewClass.push('animated fadeInLeft');
    $scope.entireScheduleView = false;
    $scope.theWednesdayChosen = true;
    $scope.buttonsBottomHidden = false;
    $scope.getCurrentEmployeeTimes();
  }
  $scope.showThisThursday = function(){
    $scope.timeViewClass.splice(0);
    $scope.entireScheduleView = true;
    $scope.theThursdayChosen = false;
    $scope.buttonsBottomHidden = true;
    $scope.cancelAndSubmitButtonsHidden = true;
    $scope.doneButtonHidden = false;
    $scope.xPressedThursday();
  }
  $scope.thursdayDone = function(){
    $scope.timeViewClass.push('animated fadeInLeft');
    $scope.entireScheduleView = false;
    $scope.theThursdayChosen = true;
    $scope.buttonsBottomHidden = false;
    $scope.getCurrentEmployeeTimes();
  }
  $scope.showThisFriday = function(){
    $scope.timeViewClass.splice(0);
    $scope.entireScheduleView = true;
    $scope.theFridayChosen = false;
    $scope.buttonsBottomHidden = true;
    $scope.cancelAndSubmitButtonsHidden = true;
    $scope.doneButtonHidden = false;
    $scope.xPressedFriday();
  }
  $scope.fridayDone = function(){
    $scope.timeViewClass.push('animated fadeInLeft');
    $scope.entireScheduleView = false;
    $scope.theFridayChosen = true;
    $scope.buttonsBottomHidden = false;
    $scope.getCurrentEmployeeTimes();
  }
  $scope.showThisSaturday = function(){
    $scope.timeViewClass.splice(0);
    $scope.entireScheduleView = true;
    $scope.theSaturdayChosen = false;
    $scope.buttonsBottomHidden = true;
    $scope.cancelAndSubmitButtonsHidden = true;
    $scope.doneButtonHidden = false;
    $scope.xPressedSaturday();
  }
  $scope.saturdayDone = function(){
    $scope.timeViewClass.push('animated fadeInLeft');
    $scope.entireScheduleView = false;
    $scope.theSaturdayChosen = true;
    $scope.buttonsBottomHidden = false;
    $scope.getCurrentEmployeeTimes();
  }








  $scope.getCurrentEmployeeTimes = function(){
    myService.getEmployeeTimeStampsAdmin($scope.employeeSelected._id).then(function(response){
      var sundayTimes = [];
      var mondayTimes = [];
      var tuesdayTimes = [];
      var wednesdayTimes = [];
      var thursdayTimes = [];
      var fridayTimes = [];
      var saturdayTimes = [];
      $scope.timesSunday = 0;
      $scope.timesMonday = 0;
      $scope.timesTuesday = 0;
      $scope.timesWednesday = 0;
      $scope.timesThursday = 0;
      $scope.timesFriday = 0;
      $scope.timesSaturday = 0;


      for(var i = 0; i < response.data.length; i++){

        if((new Date($scope.sunday._d)).toDateString() === response.data[i].day){
          sundayTimes.push(response.data[i]);
          $scope.timesSunday = sundayTimes;

        }
        else if((new Date($scope.monday._d)).toDateString() === response.data[i].day){
          mondayTimes.push(response.data[i]);
          $scope.timesMonday = mondayTimes;
        }
        else if((new Date($scope.tuesday._d)).toDateString() === response.data[i].day){
          tuesdayTimes.push(response.data[i]);
          $scope.timesTuesday = tuesdayTimes;
        }
        else if((new Date($scope.wednesday._d)).toDateString() === response.data[i].day){
          wednesdayTimes.push(response.data[i]);
          $scope.timesWednesday = wednesdayTimes;
        }
        else if((new Date($scope.thursday._d)).toDateString() === response.data[i].day){
          thursdayTimes.push(response.data[i]);
          $scope.timesThursday = thursdayTimes;
        }
        else if((new Date($scope.friday._d)).toDateString() === response.data[i].day){
          fridayTimes.push(response.data[i]);
          $scope.timesFriday = fridayTimes;
        }
        else if((new Date($scope.saturday._d)).toDateString() === response.data[i].day){
          saturdayTimes.push(response.data[i]);
          $scope.timesSaturday = saturdayTimes;
        }




      }
      $scope.getTotalWorkWeek = function(){
      $timeout(function(){
        var totalInTimeSeconds = 0;
        var totalOutTimeSeconds = 0;
        $scope.sundayHours = 0;
        $scope.sundayMinutes = 0;
        $scope.sundaySeconds = 0;
        for(var j = 0; j < $scope.timesSunday.length; j++){
          if($scope.timesSunday[j].inOrOut === "IN"){
            totalInTimeSeconds += (Date.parse($scope.timesSunday[j].timeStamp))/1000;
          }
          else if($scope.timesSunday[j].inOrOut === "OUT")
            totalOutTimeSeconds += (Date.parse($scope.timesSunday[j].timeStamp))/1000;
        }
        $scope.timeWorkedSunday = Math.floor(totalOutTimeSeconds - totalInTimeSeconds);
        $scope.sundayHours = Math.floor(($scope.timeWorkedSunday/60)/60);
        $scope.sundayMinutes = Math.floor(($scope.timeWorkedSunday-($scope.sundayHours*3600))/60);
        $scope.sundaySeconds = Math.floor($scope.timeWorkedSunday-(($scope.sundayHours*3600)+($scope.sundayMinutes*60)));
      }, 1);
      $timeout(function(){
        var totalInTimeSeconds = 0;
        var totalOutTimeSeconds = 0;
        $scope.mondayHours = 0;
        $scope.mondayMinutes = 0;
        $scope.mondaySeconds = 0;
        for(var j = 0; j < $scope.timesMonday.length; j++){
          if($scope.timesMonday[j].inOrOut === "IN"){
            totalInTimeSeconds += (Date.parse($scope.timesMonday[j].timeStamp))/1000;
          }
          else if($scope.timesMonday[j].inOrOut === "OUT")
            totalOutTimeSeconds += (Date.parse($scope.timesMonday[j].timeStamp))/1000;
        }
        $scope.timeWorkedMonday = Math.floor(totalOutTimeSeconds - totalInTimeSeconds);
        $scope.mondayHours = Math.floor(($scope.timeWorkedMonday/60)/60);
        $scope.mondayMinutes = Math.floor(($scope.timeWorkedMonday-($scope.mondayHours*3600))/60);
        $scope.mondaySeconds = Math.floor($scope.timeWorkedMonday-(($scope.mondayHours*3600)+($scope.mondayMinutes*60)));
      }, 2);
      $timeout(function(){
        var totalInTimeSeconds = 0;
        var totalOutTimeSeconds = 0;
        $scope.tuesdayHours = 0;
        $scope.tuesdayMinutes = 0;
        $scope.tuesdaySeconds = 0;
        for(var j = 0; j < $scope.timesTuesday.length; j++){
          if($scope.timesTuesday[j].inOrOut === "IN"){
            totalInTimeSeconds += (Date.parse($scope.timesTuesday[j].timeStamp))/1000;
          }
          else if($scope.timesTuesday[j].inOrOut === "OUT")
            totalOutTimeSeconds += (Date.parse($scope.timesTuesday[j].timeStamp))/1000;
        }
        $scope.timeWorkedTuesday = Math.floor(totalOutTimeSeconds - totalInTimeSeconds);
        $scope.tuesdayHours = Math.floor(($scope.timeWorkedTuesday/60)/60);
        $scope.tuesdayMinutes = Math.floor(($scope.timeWorkedTuesday-($scope.tuesdayHours*3600))/60);
        $scope.tuesdaySeconds = Math.floor($scope.timeWorkedTuesday-(($scope.tuesdayHours*3600)+($scope.tuesdayMinutes*60)));
      }, 3);
      $timeout(function(){
        var totalInTimeSeconds = 0;
        var totalOutTimeSeconds = 0;
        $scope.wednesdayHours = 0;
        $scope.wednesdayMinutes = 0;
        $scope.wednesdaySeconds = 0;
        for(var j = 0; j < $scope.timesWednesday.length; j++){
          if($scope.timesWednesday[j].inOrOut === "IN"){
            totalInTimeSeconds += (Date.parse($scope.timesWednesday[j].timeStamp))/1000;
          }
          else if($scope.timesWednesday[j].inOrOut === "OUT")
            totalOutTimeSeconds += (Date.parse($scope.timesWednesday[j].timeStamp))/1000;
        }
        $scope.timeWorkedWednesday = Math.floor(totalOutTimeSeconds - totalInTimeSeconds);
        $scope.wednesdayHours = Math.floor(($scope.timeWorkedWednesday/60)/60);
        $scope.wednesdayMinutes = Math.floor(($scope.timeWorkedWednesday-($scope.wednesdayHours*3600))/60);
        $scope.wednesdaySeconds = Math.floor($scope.timeWorkedWednesday-(($scope.wednesdayHours*3600)+($scope.wednesdayMinutes*60)));
      }, 4);
      $timeout(function(){
        var totalInTimeSeconds = 0;
        var totalOutTimeSeconds = 0;
        $scope.thursdayHours = 0;
        $scope.thursdayMinutes = 0;
        $scope.thursdaySeconds = 0;
        for(var j = 0; j < $scope.timesThursday.length; j++){
          if($scope.timesThursday[j].inOrOut === "IN"){
            totalInTimeSeconds += (Date.parse($scope.timesThursday[j].timeStamp))/1000;
          }
          else if($scope.timesThursday[j].inOrOut === "OUT")
            totalOutTimeSeconds += (Date.parse($scope.timesThursday[j].timeStamp))/1000;
        }
        $scope.timeWorkedThursday = Math.floor(totalOutTimeSeconds - totalInTimeSeconds);
        $scope.thursdayHours = Math.floor(($scope.timeWorkedThursday/60)/60);
        $scope.thursdayMinutes = Math.floor(($scope.timeWorkedThursday-($scope.thursdayHours*3600))/60);
        $scope.thursdaySeconds = Math.floor($scope.timeWorkedThursday-(($scope.thursdayHours*3600)+($scope.thursdayMinutes*60)));
      }, 5);
      $timeout(function(){
        var totalInTimeSeconds = 0;
        var totalOutTimeSeconds = 0;
        $scope.fridayHours = 0;
        $scope.fridayMinutes = 0;
        $scope.fridaySeconds = 0;
        for(var j = 0; j < $scope.timesFriday.length; j++){
          if($scope.timesFriday[j].inOrOut === "IN"){
            totalInTimeSeconds += (Date.parse($scope.timesFriday[j].timeStamp))/1000;
          }
          else if($scope.timesFriday[j].inOrOut === "OUT")
            totalOutTimeSeconds += (Date.parse($scope.timesFriday[j].timeStamp))/1000;
        }
        $scope.timeWorkedFriday = Math.floor(totalOutTimeSeconds - totalInTimeSeconds);
        $scope.fridayHours = Math.floor(($scope.timeWorkedFriday/60)/60);
        $scope.fridayMinutes = Math.floor(($scope.timeWorkedFriday-($scope.fridayHours*3600))/60);
        $scope.fridaySeconds = Math.floor($scope.timeWorkedFriday-(($scope.fridayHours*3600)+($scope.fridayMinutes*60)));
      }, 6);
      $timeout(function(){
        var totalInTimeSeconds = 0;
        var totalOutTimeSeconds = 0;
        $scope.saturdayHours = 0;
        $scope.saturdayMinutes = 0;
        $scope.saturdaySeconds = 0;
        for(var j = 0; j < $scope.timesSaturday.length; j++){
          if($scope.timesSaturday[j].inOrOut === "IN"){
            totalInTimeSeconds += (Date.parse($scope.timesSaturday[j].timeStamp))/1000;
          }
          else if($scope.timesSaturday[j].inOrOut === "OUT")
            totalOutTimeSeconds += (Date.parse($scope.timesSaturday[j].timeStamp))/1000;
        }
        $scope.timeWorkedSaturday = Math.floor(totalOutTimeSeconds - totalInTimeSeconds);
        $scope.saturdayHours = Math.floor(($scope.timeWorkedSaturday/60)/60);
        $scope.saturdayMinutes = Math.floor(($scope.timeWorkedSaturday-($scope.saturdayHours*3600))/60);
        $scope.saturdaySeconds = Math.floor($scope.timeWorkedSaturday-(($scope.saturdayHours*3600)+($scope.saturdayMinutes*60)));
      }, 7);
      $timeout(function(){
        var totalWeek = 0;
        totalWeek = ($scope.timeWorkedSunday + $scope.timeWorkedMonday + $scope.timeWorkedTuesday + $scope.timeWorkedWednesday + $scope.timeWorkedThursday + $scope.timeWorkedFriday + $scope.timeWorkedSaturday)
        $scope.totalWeekHours = Math.floor((totalWeek/60)/60);
        $scope.totalWeekMinutes = Math.floor((totalWeek-($scope.totalWeekHours*3600))/60);
        $scope.totalWeekSeconds = Math.floor(totalWeek-(($scope.totalWeekHours*3600)+($scope.totalWeekMinutes*60)));

      }, 8)
    }
    $scope.getTotalWorkWeek();

    })
  }
  $scope.getCurrentEmployeeTimes();



  $scope.timeViewClass = [];
  $scope.timeViewClass.push('animated fadeInLeft');
  // $timeout(function(){
  //   $scope.timeViewClass.splice(0);
  // }, 1000);

  $scope.weekButton = false;
  $scope.monthButton = true;
  $scope.weekHidden = false;
  $scope.monthHidden = true;
  $scope.monthBoxHidden = true;





  var d = new Date();
  var theDay = d.getDay();
  var thisSunday;
  var thisMonday;
  var thisTuesday;
  var thisWednesday;
  var thisThursday;
  var thisFriday;
  var thisSaturday;
  $scope.previousWeek = function(){
    thisSunday = thisSunday.day(0-7);
    $scope.sunday = thisSunday;
    thisMonday = thisMonday.day(1-7);
    $scope.monday = thisMonday;
    thisTuesday = thisTuesday.day(2-7);
    $scope.tuesday = thisTuesday;
    thisWednesday = thisWednesday.day(3-7);
    $scope.wednesday = thisWednesday;
    thisThursday = thisThursday.day(4-7);
    $scope.thursday = thisThursday;
    thisFriday = thisFriday.day(5-7);
    $scope.friday = thisFriday;
    thisSaturday = thisSaturday.day(6-7);
    $scope.saturday = thisSaturday;
    $scope.getCurrentEmployeeTimes();
  }

  $scope.nextWeek = function(){
    thisSunday = thisSunday.day(0+7);
    $scope.sunday = thisSunday;
    thisMonday = thisMonday.day(1+7);
    $scope.monday = thisMonday;
    thisTuesday = thisTuesday.day(2+7);
    $scope.tuesday = thisTuesday;
    thisWednesday = thisWednesday.day(3+7);
    $scope.wednesday = thisWednesday;
    thisThursday = thisThursday.day(4+7);
    $scope.thursday = thisThursday;
    thisFriday = thisFriday.day(5+7);
    $scope.friday = thisFriday;
    thisSaturday = thisSaturday.day(6+7);
    $scope.saturday = thisSaturday;
    $scope.getCurrentEmployeeTimes();
  }


  if(theDay === 0){
    $scope.sunday = moment().date(d.getDate() + 0);
    thisSunday = $scope.sunday;
    $scope.monday = moment().date(d.getDate() + 1);
    thisMonday = $scope.monday;
    $scope.tuesday = moment().date(d.getDate() + 2);
    thisTuesday = $scope.tuesday;
    $scope.wednesday = moment().date(d.getDate() + 3);
    thisWednesday = $scope.wednesday;
    $scope.thursday = moment().date(d.getDate() + 4);
    thisThursday = $scope.thursday;
    $scope.friday = moment().date(d.getDate() + 5);
    thisFriday = $scope.friday;
    $scope.saturday = moment().date(d.getDate() + 6);
    thisSaturday = $scope.saturday;
  }
  else if(theDay === 1){
    $scope.sunday = moment().date(d.getDate() - 1);
    thisSunday = $scope.sunday;
    $scope.monday = moment().date(d.getDate() + 0);
    thisMonday = $scope.monday;
    $scope.tuesday = moment().date(d.getDate() + 1);
    thisTuesday = $scope.tuesday;
    $scope.wednesday = moment().date(d.getDate() + 2);
    thisWednesday = $scope.wednesday;
    $scope.thursday = moment().date(d.getDate() + 3);
    thisThursday = $scope.thursday;
    $scope.friday = moment().date(d.getDate() + 4);
    thisFriday = $scope.friday;
    $scope.saturday = moment().date(d.getDate() + 5);
    thisSaturday = $scope.saturday;
  }
  else if(theDay === 2){
    $scope.sunday = moment().date(d.getDate() - 2);
    thisSunday = $scope.sunday;
    $scope.monday = moment().date(d.getDate() - 1);
    thisMonday = $scope.monday;
    $scope.tuesday = moment().date(d.getDate() + 0);
    thisTuesday = $scope.tuesday;
    $scope.wednesday = moment().date(d.getDate() + 1);
    thisWednesday = $scope.wednesday;
    $scope.thursday = moment().date(d.getDate() + 2);
    thisThursday = $scope.thursday;
    $scope.friday = moment().date(d.getDate() + 3);
    thisFriday = $scope.friday;
    $scope.saturday = moment().date(d.getDate() + 4);
    thisSaturday = $scope.saturday;
  }
  else if(theDay === 3){
    $scope.sunday = moment().date(d.getDate() - 3);
    thisSunday = $scope.sunday;
    $scope.monday = moment().date(d.getDate() - 2);
    thisMonday = $scope.monday;
    $scope.tuesday = moment().date(d.getDate() - 1);
    thisTuesday = $scope.tuesday;
    $scope.wednesday = moment().date(d.getDate() + 0);
    thisWednesday = $scope.wednesday;
    $scope.thursday = moment().date(d.getDate() + 1);
    thisThursday = $scope.thursday;
    $scope.friday = moment().date(d.getDate() + 2);
    thisFriday = $scope.friday;
    $scope.saturday = moment().date(d.getDate() + 3);
    thisSaturday = $scope.saturday;
  }
  else if(theDay === 4){
    $scope.sunday = moment().date(d.getDate() - 4);
    thisSunday = $scope.sunday;
    $scope.monday = moment().date(d.getDate() - 3);
    thisMonday = $scope.monday;
    $scope.tuesday = moment().date(d.getDate() - 2);
    thisTuesday = $scope.tuesday;
    $scope.wednesday = moment().date(d.getDate() - 1);
    thisWednesday = $scope.wednesday;
    $scope.thursday = moment().date(d.getDate() + 0);
    thisThursday = $scope.thursday;
    $scope.friday = moment().date(d.getDate() + 1);
    thisFriday = $scope.friday;
    $scope.saturday = moment().date(d.getDate() + 2);
    thisSaturday = $scope.saturday;
  }
  else if(theDay === 5){
    $scope.sunday = moment().date(d.getDate() - 5);
    thisSunday = $scope.sunday;
    $scope.monday = moment().date(d.getDate() - 4);
    thisMonday = $scope.monday;
    $scope.tuesday = moment().date(d.getDate() - 3);
    thisTuesday = $scope.tuesday;
    $scope.wednesday = moment().date(d.getDate() - 2);
    thisWednesday = $scope.wednesday;
    $scope.thursday = moment().date(d.getDate() - 1);
    thisThursday = $scope.thursday;
    $scope.friday = moment().date(d.getDate() + 0);
    thisFriday = $scope.friday;
    $scope.saturday = moment().date(d.getDate() + 1);
    thisSaturday = $scope.saturday;
  }
  else if(theDay === 6){
    $scope.sunday = moment().date(d.getDate() - 6);
    thisSunday = $scope.sunday;
    $scope.monday = moment().date(d.getDate() - 5);
    thisMonday = $scope.monday;
    $scope.tuesday = moment().date(d.getDate() - 4);
    thisTuesday = $scope.tuesday;
    $scope.wednesday = moment().date(d.getDate() - 3);
    thisWednesday = $scope.wednesday;
    $scope.thursday = moment().date(d.getDate() - 2);
    thisThursday = $scope.thursday;
    $scope.friday = moment().date(d.getDate() - 1);
    thisFriday = $scope.friday;
    $scope.saturday = moment().date(d.getDate() + 0);
    thisSaturday = $scope.saturday;
  }

})
