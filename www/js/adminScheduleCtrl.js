angular.module('timePunch').controller('adminScheduleCtrl', function($ionicPopup, $rootScope, $timeout, $scope, $state, myService){

  $scope.backToCalendar = true;

  $scope.offhidden = true;

  $scope.menu = function(){
    $state.go('admin')
  }




  $scope.back = function(){
    myService.employeeSectionShowing = false;

    myService.backButtonsAndLogoutButtonSectionHidden = false;

    $state.go('employees');

  }

  $scope.getCurrentEmployeeSchedule = function(){
    myService.getEmployeeScheduleForAdmin($scope.employeeSelected._id).then(function(response){
      $scope.scheduledSunday = " ";
      $scope.scheduledMonday = " ";
      $scope.scheduledTuesday = " ";
      $scope.scheduledWednesday = " ";
      $scope.scheduledThursday = " ";
      $scope.scheduledFriday = " ";
      $scope.scheduledSaturday = " ";
      for(var i = 0; i < response.data.length; i++){

        if((new Date($scope.sunday._d)).toDateString() === (new Date(response.data[i].day)).toDateString()){
          $scope.scheduledSunday = response.data[i];
        }
        else if((new Date($scope.monday._d)).toDateString() === (new Date(response.data[i].day)).toDateString()){
          $scope.scheduledMonday = response.data[i];
        }
        else if((new Date($scope.tuesday._d)).toDateString() === (new Date(response.data[i].day)).toDateString()){
          $scope.scheduledTuesday = response.data[i];
        }
        else if((new Date($scope.wednesday._d)).toDateString() === (new Date(response.data[i].day)).toDateString()){
          $scope.scheduledWednesday = response.data[i];
        }
        else if((new Date($scope.thursday._d)).toDateString() === (new Date(response.data[i].day)).toDateString()){
          $scope.scheduledThursday = response.data[i];
        }
        else if((new Date($scope.friday._d)).toDateString() === (new Date(response.data[i].day)).toDateString()){
          $scope.scheduledFriday = response.data[i];
        }
        else if((new Date($scope.saturday._d)).toDateString() === (new Date(response.data[i].day)).toDateString()){
          $scope.scheduledSaturday = response.data[i];
        }

      }





    })
  }
  $scope.getCurrentEmployeeSchedule();

  $scope.submitShift = function(){
    var theShift = {
      day: $scope.day.replace(/"/g, ''),
      start: $scope.theShiftStart,
      lunch: $scope.theShiftLunch,
      end: $scope.theShiftEnd,
      user: $scope.employeeSelected._id
    }
    myService.submitShift(theShift).then(function(response){

      $scope.scheduleSelectedDayHidden = true;
      $scope.entireScheduleView = false;

      $scope.getCurrentEmployeeSchedule();
      $scope.justBack = false;
      $scope.backToCalendar = true;
    })
  }
  $scope.scheduleSelectedDayHidden = true;
  $scope.entireScheduleView = false;
  $scope.scheduleForThisDay = function(){
    $scope.scheduleViewClass.splice(0);
    $scope.scheduleSelectedDayHidden = false;
    $scope.entireScheduleView = true;
    $scope.justBack = true;
    $scope.backToCalendar = false;
    $scope.scheduleTimeInput = false;
    $scope.cancelButtonHidden = true;
    $scope.offhidden = true;
    $timeout(function(){
      $scope.theDateToEdit = $scope.day.replace(/"/g, '');
    }, 1);



  }
  $scope.scheduleTimeInput = false;
  $scope.cancelButtonHidden = true;
  $scope.off = function(){
    $scope.theShiftStart = "OFF";
    $scope.theShiftEnd = "";
    $scope.theShiftLunch = "";
    $scope.submitShift();
    $scope.theShiftStart = "";
    $scope.scheduleTimeInput = true;
    $scope.justBack = false;
    $scope.backToCalendar = true;
  }

  $scope.backOne = function(){
    $scope.scheduleSelectedDayHidden = true;
    $scope.entireScheduleView = false;
    $scope.justBack = false;
    $scope.backToCalendar = true;

  }

  $scope.scheduleViewClass = [];
  $scope.scheduleViewClass.push('animated fadeInLeft');


  $scope.weekButton = false;
  $scope.monthButton = true;
  $scope.weekHidden = false;
  $scope.monthHidden = true;
  $scope.monthBoxHidden = true;

  $scope.getUserSchedule = function(){
    myService.getUserSchedule().then(function(response){
      $scope.shifts = response.data;
    })
  };

  // $scope.toggleItWeek = function(){
  //   $scope.weekButton = true;
  //   $scope.monthButton = false;
  //   $scope.weekHidden = true;
  //   $scope.monthHidden = false;
  //   $scope.monthBoxHidden = false;
  //   $scope.theMonth = new Date();
  //   var d = new Date();
  //   if(d.getMonth() === 0 || d.getMonth() === 2 || d.getMonth() === 4 || d.getMonth() === 6 || d.getMonth() === 7 || d.getMonth() === 9 || d.getMonth() === 11){
  //     $scope.twentyNine = false;
  //     $scope.thirty = false;
  //     $scope.thirtyOne = false;
  //   }
  //   else if(d.getMonth() === 3 || d.getMonth() === 5 || d.getMonth() === 8 || d.getMonth() === 7 || d.getMonth() === 10) {
  //     $scope.twentyNine = false;
  //     $scope.thirty = false;
  //     $scope.thirtyOne = true;
  //   }
  //   else if(d.getMonth() === 1) {
  //
  //     $scope.twentyNine = false;
  //     $scope.thirty = true;
  //     $scope.thirtyOne = true;
  //   }
  // }
  // $scope.toggleItMonth = function(){
  //   $scope.weekButton = false;
  //   $scope.monthButton = true;
  //   $scope.weekHidden = false;
  //   $scope.monthHidden = true;
  //   $scope.monthBoxHidden = true;
  // }



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
    $scope.getCurrentEmployeeSchedule();
    if(theDay === 0){
      if (!thisSunday) thisSunday = moment().date(d.getDate() + 0);
      else thisSunday = thisSunday.day(0-7);
      $scope.sunday = thisSunday;
      if (!thisMonday) thisMonday = moment().date(d.getDate() + 1);
      else thisMonday = thisMonday.day(1-7);
      $scope.monday = thisMonday;
      if (!thisTuesday) thisTuesday = moment().date(d.getDate() + 2);
      else thisTuesday = thisTuesday.day(2-7);
      $scope.tuesday = thisTuesday;
      if (!thisWednesday) thisWednesday = moment().date(d.getDate() + 3);
      else thisWednesday = thisWednesday.day(3-7);
      $scope.wednesday = thisWednesday;
      if (!thisThursday) thisThursday = moment().date(d.getDate() + 4);
      else thisThursday = thisThursday.day(4-7);
      $scope.thursday = thisThursday;
      if (!thisFriday) thisFriday = moment().date(d.getDate() + 5);
      else thisFriday = thisFriday.day(5-7);
      $scope.friday = thisFriday;
      if (!thisSaturday) thisSaturday = moment().date(d.getDate() + 6);
      else thisSaturday = thisSaturday.day(6-7);
      $scope.saturday = thisSaturday;
    }
    else if(theDay === 1){
      if (!thisSunday) thisSunday = moment().date(d.getDate() - 1);
      else thisSunday = thisSunday.day(0-7);
      $scope.sunday = thisSunday;
      if (!thisMonday) thisMonday = moment().date(d.getDate() + 0);
      else thisMonday = thisMonday.day(1-7);
      $scope.monday = thisMonday;
      if (!thisTuesday) thisTuesday = moment().date(d.getDate() + 1);
      else thisTuesday = thisTuesday.day(2-7);
      $scope.tuesday = thisTuesday;
      if (!thisWednesday) thisWednesday = moment().date(d.getDate() + 2);
      else thisWednesday = thisWednesday.day(3-7);
      $scope.wednesday = thisWednesday;
      if (!thisThursday) thisThursday = moment().date(d.getDate() + 3);
      else thisThursday = thisThursday.day(4-7);
      $scope.thursday = thisThursday;
      if (!thisFriday) thisFriday = moment().date(d.getDate() + 4);
      else thisFriday = thisFriday.day(5-7);
      $scope.friday = thisFriday;
      if (!thisSaturday) thisSaturday = moment().date(d.getDate() + 5);
      else thisSaturday = thisSaturday.day(6-7);
      $scope.saturday = thisSaturday;
    }
    else if(theDay === 2){
      if (!thisSunday) thisSunday = moment().date(d.getDate() - 2);
      else thisSunday = thisSunday.day(0-7);
      $scope.sunday = thisSunday;
      if (!thisMonday) thisMonday = moment().date(d.getDate() - 1);
      else thisMonday = thisMonday.day(1-7);
      $scope.monday = thisMonday;
      if (!thisTuesday) thisTuesday = moment().date(d.getDate() + 0);
      else thisTuesday = thisTuesday.day(2-7);
      $scope.tuesday = thisTuesday;
      if (!thisWednesday) thisWednesday = moment().date(d.getDate() + 1);
      else thisWednesday = thisWednesday.day(3-7);
      $scope.wednesday = thisWednesday;
      if (!thisThursday) thisThursday = moment().date(d.getDate() + 2);
      else thisThursday = thisThursday.day(4-7);
      $scope.thursday = thisThursday;
      if (!thisFriday) thisFriday = moment().date(d.getDate() + 3);
      else thisFriday = thisFriday.day(5-7);
      $scope.friday = thisFriday;
      if (!thisSaturday) thisSaturday = moment().date(d.getDate() + 4);
      else thisSaturday = thisSaturday.day(6-7);
      $scope.saturday = thisSaturday;
    }
    else if(theDay === 3){
      if (!thisSunday) thisSunday = moment().date(d.getDate() - 3);
      else thisSunday = thisSunday.day(0-7);
      $scope.sunday = thisSunday;
      if (!thisMonday) thisMonday = moment().date(d.getDate() - 2);
      else thisMonday = thisMonday.day(1-7);
      $scope.monday = thisMonday;
      if (!thisTuesday) thisTuesday = moment().date(d.getDate() - 1);
      else thisTuesday = thisTuesday.day(2-7);
      $scope.tuesday = thisTuesday;
      if (!thisWednesday) thisWednesday = moment().date(d.getDate() + 0);
      else thisWednesday = thisWednesday.day(3-7);
      $scope.wednesday = thisWednesday;
      if (!thisThursday) thisThursday = moment().date(d.getDate() + 1);
      else thisThursday = thisThursday.day(4-7);
      $scope.thursday = thisThursday;
      if (!thisFriday) thisFriday = moment().date(d.getDate() + 2);
      else thisFriday = thisFriday.day(5-7);
      $scope.friday = thisFriday;
      if (!thisSaturday) thisSaturday = moment().date(d.getDate() + 3);
      else thisSaturday = thisSaturday.day(6-7);
      $scope.saturday = thisSaturday;
    }
    else if(theDay === 4){
      if (!thisSunday) thisSunday = moment().date(d.getDate() - 4);
      else thisSunday = thisSunday.day(0-7);
      $scope.sunday = thisSunday;
      if (!thisMonday) thisMonday = moment().date(d.getDate() - 3);
      else thisMonday = thisMonday.day(1-7);
      $scope.monday = thisMonday;
      if (!thisTuesday) thisTuesday = moment().date(d.getDate() - 2);
      else thisTuesday = thisTuesday.day(2-7);
      $scope.tuesday = thisTuesday;
      if (!thisWednesday) thisWednesday = moment().date(d.getDate() - 1);
      else thisWednesday = thisWednesday.day(3-7);
      $scope.wednesday = thisWednesday;
      if (!thisThursday) thisThursday = moment().date(d.getDate() + 0);
      else thisThursday = thisThursday.day(4-7);
      $scope.thursday = thisThursday;
      if (!thisFriday) thisFriday = moment().date(d.getDate() + 1);
      else thisFriday = thisFriday.day(5-7);
      $scope.friday = thisFriday;
      if (!thisSaturday) thisSaturday = moment().date(d.getDate() + 2);
      else thisSaturday = thisSaturday.day(6-7);
      $scope.saturday = thisSaturday;

    }
    else if(theDay === 5){
      if (!thisSunday) thisSunday = moment().date(d.getDate() - 5);
      else thisSunday = thisSunday.day(0-7);
      $scope.sunday = thisSunday;
      if (!thisMonday) thisMonday = moment().date(d.getDate() - 4);
      else thisMonday = thisMonday.day(1-7);
      $scope.monday = thisMonday;
      if (!thisTuesday) thisTuesday = moment().date(d.getDate() - 3);
      else thisTuesday = thisTuesday.day(2-7);
      $scope.tuesday = thisTuesday;
      if (!thisWednesday) thisWednesday = moment().date(d.getDate() - 2);
      else thisWednesday = thisWednesday.day(3-7);
      $scope.wednesday = thisWednesday;
      if (!thisThursday) thisThursday = moment().date(d.getDate() - 1);
      else thisThursday = thisThursday.day(4-7);
      $scope.thursday = thisThursday;
      if (!thisFriday) thisFriday = moment().date(d.getDate() + 0);
      else thisFriday = thisFriday.day(5-7);
      $scope.friday = thisFriday;
      if (!thisSaturday) thisSaturday = moment().date(d.getDate() + 1);
      else thisSaturday = thisSaturday.day(6-7);
      $scope.saturday = thisSaturday;
    }
    else if(theDay === 6){
      if (!thisSunday) thisSunday = moment().date(d.getDate() - 6);
      else thisSunday = thisSunday.day(0-7);
      $scope.sunday = thisSunday;
      if (!thisMonday) thisMonday = moment().date(d.getDate() - 5);
      else thisMonday = thisMonday.day(1-7);
      $scope.monday = thisMonday;
      if (!thisTuesday) thisTuesday = moment().date(d.getDate() - 4);
      else thisTuesday = thisTuesday.day(2-7);
      $scope.tuesday = thisTuesday;
      if (!thisWednesday) thisWednesday = moment().date(d.getDate() - 3);
      else thisWednesday = thisWednesday.day(3-7);
      $scope.wednesday = thisWednesday;
      if (!thisThursday) thisThursday = moment().date(d.getDate() - 2);
      else thisThursday = thisThursday.day(4-7);
      $scope.thursday = thisThursday;
      if (!thisFriday) thisFriday = moment().date(d.getDate() - 1);
      else thisFriday = thisFriday.day(5-7);
      $scope.friday = thisFriday;
      if (!thisSaturday) thisSaturday = moment().date(d.getDate() + 0);
      else thisSaturday = thisSaturday.day(6-7);
      $scope.saturday = thisSaturday;
    }
  }

  $scope.nextWeek = function(){
    $scope.getCurrentEmployeeSchedule();
    if(theDay === 0){
      if (!thisSunday) thisSunday = moment().date(d.getDate() + 0);
      else thisSunday = thisSunday.day(0+7);
      $scope.sunday = thisSunday;
      if (!thisMonday) thisMonday = moment().date(d.getDate() + 1);
      else thisMonday = thisMonday.day(1+7);
      $scope.monday = thisMonday;
      if (!thisTuesday) thisTuesday = moment().date(d.getDate() + 2);
      else thisTuesday = thisTuesday.day(2+7);
      $scope.tuesday = thisTuesday;
      if (!thisWednesday) thisWednesday = moment().date(d.getDate() + 3);
      else thisWednesday = thisWednesday.day(3+7);
      $scope.wednesday = thisWednesday;
      if (!thisThursday) thisThursday = moment().date(d.getDate() + 4);
      else thisThursday = thisThursday.day(4+7);
      $scope.thursday = thisThursday;
      if (!thisFriday) thisFriday = moment().date(d.getDate() + 5);
      else thisFriday = thisFriday.day(5+7);
      $scope.friday = thisFriday;
      if (!thisSaturday) thisSaturday = moment().date(d.getDate() + 6);
      else thisSaturday = thisSaturday.day(6+7);
      $scope.saturday = thisSaturday;
    }
    else if(theDay === 1){
      if (!thisSunday) thisSunday = moment().date(d.getDate() - 1);
      else thisSunday = thisSunday.day(0+7);
      $scope.sunday = thisSunday;
      if (!thisMonday) thisMonday = moment().date(d.getDate() + 0);
      else thisMonday = thisMonday.day(1+7);
      $scope.monday = thisMonday;
      if (!thisTuesday) thisTuesday = moment().date(d.getDate() + 1);
      else thisTuesday = thisTuesday.day(2+7);
      $scope.tuesday = thisTuesday;
      if (!thisWednesday) thisWednesday = moment().date(d.getDate() + 2);
      else thisWednesday = thisWednesday.day(3+7);
      $scope.wednesday = thisWednesday;
      if (!thisThursday) thisThursday = moment().date(d.getDate() + 3);
      else thisThursday = thisThursday.day(4+7);
      $scope.thursday = thisThursday;
      if (!thisFriday) thisFriday = moment().date(d.getDate() + 4);
      else thisFriday = thisFriday.day(5+7);
      $scope.friday = thisFriday;
      if (!thisSaturday) thisSaturday = moment().date(d.getDate() + 5);
      else thisSaturday = thisSaturday.day(6+7);
      $scope.saturday = thisSaturday;
    }
    else if(theDay === 2){
      if (!thisSunday) thisSunday = moment().date(d.getDate() - 2);
      else thisSunday = thisSunday.day(0+7);
      $scope.sunday = thisSunday;
      if (!thisMonday) thisMonday = moment().date(d.getDate() - 1);
      else thisMonday = thisMonday.day(1+7);
      $scope.monday = thisMonday;
      if (!thisTuesday) thisTuesday = moment().date(d.getDate() + 0);
      else thisTuesday = thisTuesday.day(2+7);
      $scope.tuesday = thisTuesday;
      if (!thisWednesday) thisWednesday = moment().date(d.getDate() + 1);
      else thisWednesday = thisWednesday.day(3+7);
      $scope.wednesday = thisWednesday;
      if (!thisThursday) thisThursday = moment().date(d.getDate() + 2);
      else thisThursday = thisThursday.day(4+7);
      $scope.thursday = thisThursday;
      if (!thisFriday) thisFriday = moment().date(d.getDate() + 3);
      else thisFriday = thisFriday.day(5+7);
      $scope.friday = thisFriday;
      if (!thisSaturday) thisSaturday = moment().date(d.getDate() + 4);
      else thisSaturday = thisSaturday.day(6+7);
      $scope.saturday = thisSaturday;
    }
    else if(theDay === 3){
      if (!thisSunday) thisSunday = moment().date(d.getDate() - 3);
      else thisSunday = thisSunday.day(0+7);
      $scope.sunday = thisSunday;
      if (!thisMonday) thisMonday = moment().date(d.getDate() - 2);
      else thisMonday = thisMonday.day(1+7);
      $scope.monday = thisMonday;
      if (!thisTuesday) thisTuesday = moment().date(d.getDate() - 1);
      else thisTuesday = thisTuesday.day(2+7);
      $scope.tuesday = thisTuesday;
      if (!thisWednesday) thisWednesday = moment().date(d.getDate() + 0);
      else thisWednesday = thisWednesday.day(3+7);
      $scope.wednesday = thisWednesday;
      if (!thisThursday) thisThursday = moment().date(d.getDate() + 1);
      else thisThursday = thisThursday.day(4+7);
      $scope.thursday = thisThursday;
      if (!thisFriday) thisFriday = moment().date(d.getDate() + 2);
      else thisFriday = thisFriday.day(5+7);
      $scope.friday = thisFriday;
      if (!thisSaturday) thisSaturday = moment().date(d.getDate() + 3);
      else thisSaturday = thisSaturday.day(6+7);
      $scope.saturday = thisSaturday;
    }
    else if(theDay === 4){
      if (!thisSunday) thisSunday = moment().date(d.getDate() - 4);
      else thisSunday = thisSunday.day(0+7);
      $scope.sunday = thisSunday;
      if (!thisMonday) thisMonday = moment().date(d.getDate() - 3);
      else thisMonday = thisMonday.day(1+7);
      $scope.monday = thisMonday;
      if (!thisTuesday) thisTuesday = moment().date(d.getDate() - 2);
      else thisTuesday = thisTuesday.day(2+7);
      $scope.tuesday = thisTuesday;
      if (!thisWednesday) thisWednesday = moment().date(d.getDate() - 1);
      else thisWednesday = thisWednesday.day(3+7);
      $scope.wednesday = thisWednesday;
      if (!thisThursday) thisThursday = moment().date(d.getDate() + 0);
      else thisThursday = thisThursday.day(4+7);
      $scope.thursday = thisThursday;
      if (!thisFriday) thisFriday = moment().date(d.getDate() + 1);
      else thisFriday = thisFriday.day(5+7);
      $scope.friday = thisFriday;
      if (!thisSaturday) thisSaturday = moment().date(d.getDate() + 2);
      else thisSaturday = thisSaturday.day(6+7);
      $scope.saturday = thisSaturday;


    }
    else if(theDay === 5){
      if (!thisSunday) thisSunday = moment().date(d.getDate() - 5);
      else thisSunday = thisSunday.day(0+7);
      $scope.sunday = thisSunday;
      if (!thisMonday) thisMonday = moment().date(d.getDate() - 4);
      else thisMonday = thisMonday.day(1+7);
      $scope.monday = thisMonday;
      if (!thisTuesday) thisTuesday = moment().date(d.getDate() - 3);
      else thisTuesday = thisTuesday.day(2+7);
      $scope.tuesday = thisTuesday;
      if (!thisWednesday) thisWednesday = moment().date(d.getDate() - 2);
      else thisWednesday = thisWednesday.day(3+7);
      $scope.wednesday = thisWednesday;
      if (!thisThursday) thisThursday = moment().date(d.getDate() - 1);
      else thisThursday = thisThursday.day(4+7);
      $scope.thursday = thisThursday;
      if (!thisFriday) thisFriday = moment().date(d.getDate() + 0);
      else thisFriday = thisFriday.day(5+7);
      $scope.friday = thisFriday;
      if (!thisSaturday) thisSaturday = moment().date(d.getDate() + 1);
      else thisSaturday = thisSaturday.day(6+7);
      $scope.saturday = thisSaturday;
    }
    else if(theDay === 6){
      if (!thisSunday) thisSunday = moment().date(d.getDate() - 6);
      else thisSunday = thisSunday.day(0+7);
      $scope.sunday = thisSunday;
      if (!thisMonday) thisMonday = moment().date(d.getDate() - 5);
      else thisMonday = thisMonday.day(1+7);
      $scope.monday = thisMonday;
      if (!thisTuesday) thisTuesday = moment().date(d.getDate() - 4);
      else thisTuesday = thisTuesday.day(2+7);
      $scope.tuesday = thisTuesday;
      if (!thisWednesday) thisWednesday = moment().date(d.getDate() - 3);
      else thisWednesday = thisWednesday.day(3+7);
      $scope.wednesday = thisWednesday;
      if (!thisThursday) thisThursday = moment().date(d.getDate() - 2);
      else thisThursday = thisThursday.day(4+7);
      $scope.thursday = thisThursday;
      if (!thisFriday) thisFriday = moment().date(d.getDate() - 1);
      else thisFriday = thisFriday.day(5+7);
      $scope.friday = thisFriday;
      if (!thisSaturday) thisSaturday = moment().date(d.getDate() + 0);
      else thisSaturday = thisSaturday.day(6+7);
      $scope.saturday = thisSaturday;
    }

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
