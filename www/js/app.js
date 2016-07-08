
angular.module('timePunch', ['ionic', 'ngMap'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider){

  $urlRouterProvider.otherwise('/');
  $stateProvider

  .state('home', {
    url: '/',
  })

.state('clock', {
  url: '/clock',
  templateUrl: 'views/clock.html',
  controller: 'clockCtrl'
})
.state('schedule', {
  parent: 'clock',
  url: '/schedule',
  templateUrl: 'views/schedule.html',
  controller: 'scheduleCtrl'
})
.state('myTime', {
  parent: 'clock',
  url: '/myTime',
  templateUrl: 'views/myTime.html',
  controller: 'myTimeCtrl'
})
.state('fixTime', {
  parent: 'clock',
  url: '/fixTime',
  templateUrl: 'views/fixTime.html',
  controller: 'fixTimeCtrl'
})
.state('settings', {
  parent: 'clock',
  url: '/settings',
  templateUrl: 'views/settings.html',
  controller: 'settingsCtrl'
})
.state('help', {
  parent: 'clock',
  url: '/help',
  templateUrl: 'views/help.html',
  controller: 'helpCtrl'
})
.state('forgot', {
  url: '/forgot',
  templateUrl: 'views/forgot.html',
  controller: 'forgotCtrl'
})
.state('admin', {
  url: '/admin',
  templateUrl: 'views/admin.html',
  controller: 'adminCtrl'
})
.state('employees', {
  url: '/employees',
  templateUrl: 'views/employees.html',
  controller: 'employeesCtrl'
})
.state('adminSchedule', {
  parent: 'employees',
  url: '/adminSchedule',
  templateUrl: 'views/adminSchedule.html',
  controller: 'adminScheduleCtrl'
})
.state('adminSettings', {
  url: '/adminSettings',
  templateUrl: 'views/adminSettings.html',
  controller: 'adminSettingsCtrl'
})
.state('time', {
  parent: 'employees',
  url: '/time',
  templateUrl: 'views/time.html',
  controller: 'timeCtrl'
})
.state('exisitingRequests', {
  parent: 'clock',
  url: '/exisitingRequests',
  templateUrl: 'views/exisitingRequests.html',
  controller: 'exisitingRequestsCtrl'
})
.state('adminRequests', {
  parent: 'employees',
  url: '/adminRequests',
  templateUrl: 'views/adminRequests.html',
  controller: 'adminRequestsCtrl'
})
.state('employeeLocation', {
  url: '/employeeLocation',
  templateUrl: 'views/employeeLocation.html',
  controller: 'employeeLocationCtrl'
})
.state('setLocation', {
  url: '/setLocation',
  templateUrl: 'views/setLocation.html',
  controller: 'setLocationCtrl'
})




})
