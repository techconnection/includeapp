/*var adminhomeapp = angular.module('adminHomeApp', ['ui.bootstrap', 'common.services', 'firebase', 'common.directives']);
var adminnewpost = angular.module('adminNewPostApp', ['ui.bootstrap', 'common.services', 'firebase', 'common.directives']);
var adminsoftwaredevdetailsapp = angular.module('adminSoftwareDevDetailsApp',  ['ui.bootstrap', 'common.services', 'firebase', 'common.directives']);
var adminsoftwaredevdetailsapplicantsapp = angular.module('adminSoftwareDevDetailsApplicantsApp', ['ui.bootstrap', 'common.services', 'firebase', 'common.directives']);
var admincandidateviewhiddenapp = angular.module('adminCandidateViewHiddenApp', ['ui.bootstrap', 'common.services', 'firebase', 'common.directives']);
var admincandidateview2app = angular.module('adminCandidateView2App', ['ui.bootstrap', 'common.services', 'firebase', 'common.directives']); */



var admintcapp = angular.module('adminTCapp', 
['ngRoute',
 'ui.bootstrap',
 'ngCookies',
 'admintc.controllers', 
 'common.services', 
 'common.filters',
 'firebase', 
 'common.directives']);

admintcapp.constant('FIREBASE_URL', 'https://tech-connection-dev.firebaseio.com/');

admintcapp.config(['$routeProvider',  function($routeProvider) {
        
        $routeProvider.
            when('/', {
                template: '<loading path="../"></loading>',
                controller: 'adminAuthCtrl'
            }).
            when('/home', {
                templateUrl: '../templates/admin/admin_home.html',
                controller: 'adminHomeCtrl'
            }).
            when('/postjob', {
                templateUrl: '../templates/admin/admin_postjob.html',
                controller: 'adminPostJobCtrl'
            }).
            when('/postjob/:jid', {
                templateUrl: '../templates/admin/admin_postjob.html',
                controller: 'adminPostJobCtrl'
            }).
             when('/jobdetails/:jid', {
                templateUrl: '../templates/admin/admin_jobdetails.html',
                controller: 'adminJobDetailsCtrl'
            }).
             when('/jobdetailsapplicants/:jid', {
                templateUrl: '../templates/admin/admin_jobdetails_applicants.html',
                controller: 'adminJobDetailsApplicantsCtrl'
            }).
              otherwise({
                    redirectTo: '/'
                });
}]);