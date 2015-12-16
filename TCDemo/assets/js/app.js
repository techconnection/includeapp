var candidateapp = angular.module('candidateApp',
     [   'ui.bootstrap',
         'ngRoute',
         'ngCookies',
         'tc.controllers',
         'common.services', 
         'firebase', 
         'common.directives' ]);

 candidateapp.constant('FIREBASE_URL', 'https://tech-connection-dev.firebaseio.com');   
 candidateapp
  .config(function($httpProvider){
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
});
 console.log(location.hostname);
 candidateapp.config(['$routeProvider',   function($routeProvider) {
            $routeProvider.
                when('/index.html',{
                     template: '<loading path="./"></loading>',
                     controller: 'authCtrl'
                }).
                when('/login',{
                     templateUrl: 'templates/login.html',
                     controller: 'loginCtrl'
                }).
                when('/logout',{
                     template: '<loading path="./"></loading>',
                     controller: 'logoutCtrl'
                }).
                when('/signup',{
                     templateUrl: 'templates/signup.html',
                     controller: 'signupCtrl'
                }).
                when('/welcome',{
                     templateUrl: 'templates/candidate_welcome.html',
                     controller: 'welcomeCtrl'
                }).
                when('/tutorial',{
                     templateUrl: 'templates/candidate_tutorial.html',
                     controller: 'tutorialCtrl'
                }).
                when('/jobs',{
                     templateUrl: 'templates/jobs.html',
                     controller: 'jobsCtrl'
                }).
                when('/discover',{
                     templateUrl: 'templates/candidate_dashboard_discover.html',
                     controller: 'discoverCtrl'
                }).
                when('/learn',{
                     templateUrl: 'templates/candidate_dashboard_learn.html',
                     controller: 'learnCtrl'
                }).
                when('/plan',{
                     templateUrl: 'templates/candidate_dashboard_plan.html',
                     controller: 'planCtrl'
                }).
                when('/apply',{
                     templateUrl: 'templates/candidate_dashboard_apply.html',
                     controller: 'applyCtrl'
                }).
                when('/jobs/:jid',{
                     templateUrl: 'templates/candidate_dashboard_job_details.html',
                     controller: 'jobDetailsCtrl'
                }).
              otherwise({
                    redirectTo: '/index.html'
                });
    }]).run(['$rootScope', '$route', '$location', 'jobsService', 'setService', '$timeout', '$cookies', function($rootScope, $route, $location, jobsService, setService, $timeout, $cookies){
        $rootScope.$on('$routeChangeStart', function (event, next, current) {
            if($location.path() == '/login')
                {
                    $rootScope.headerHide = true;
                    $rootScope.headerLinks = [
                                            {label: 'Login', url: '#/login'},
                                            {label: 'Signup', url: '#/signup'}
                                            ];
                     return true;
                } else if($location.path() == '/logout') {
                    $rootScope.headerHide = true;
                    $rootScope.headerLinks = [
                                            {label: 'Login', url: '#/login'},
                                            {label: 'Signup', url: '#/signup'}
                                            ];
                     return true;
                } else if($location.path() == '/signup') {
                     $rootScope.headerHide = true;
                     return true;
                } else {
                    var uProfile = setService.get('uProfile');
                    console.log(uProfile);
                    var ctokenid = $cookies.get('tokenid');
                    if(ctokenid != undefined)
                    {
                        jobsService.tokenCheck(uProfile.email, ctokenid).then(function(){
                               $rootScope.headerHide = false;
                               
                               $rootScope.headerLinks = [
                                   {label: 'Complete Profile', url: '#/discover'},
                                   {label: 'Logout', url: '#/logout'},
                                   {label: 'Signup', url: '#/signup'}
                               ];
                                return true;
                            }, function(){
                                $location.path('/login');
                            });
                        
                        
                    } else {
                        $location.path('/login');
                    }
                }
            
       });
    }]);