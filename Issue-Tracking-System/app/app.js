'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTracker', [
  'ngRoute',
  'issueTracker.common',
  'issueTracker.common.footer',
  'issueTracker.common.validation',
  'issueTracker.common.datepicker',
  'issueTracker.home',
  'issueTracker.projects',
  'issueTracker.projectsDetails',
  'issueTracker.issueDetails',
  'issueTracker.users.identity'
])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
