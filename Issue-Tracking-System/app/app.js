'use strict';

// Declare app level module which depends on views, and components
angular.module('issueTracker', [
  'ngRoute',
  'issueTracker.common',
  'issueTracker.common.footer',
  'issueTracker.common.datepicker',
  'issueTracker.home',
  'issueTracker.dashboard',
  'issueTracker.projects',
  'issueTracker.projectsDetails',
  'issueTracker.addProject',
  'issueTracker.editProject',
  'issueTracker.issueDetails',
  'issueTracker.addIssue',
  'issueTracker.editIssue',
  'issueTracker.users.identity'
])
    .config(['$routeProvider', function($routeProvider) {
      $routeProvider.otherwise({redirectTo: '/'});
    }])
    .constant('BASE_URL', 'http://softuni-issue-tracker.azurewebsites.net/');
