var admintcControllers = angular.module('admintc.controllers', []);

admintcControllers.controller('adminAuthCtrl', ['$scope', '$routeParams', '$location', 'FIREBASE_URL', function($scope, $routeParams, $location, FIREBASE_URL){
        
        $location.path('/home');
}]);


admintcControllers.controller('adminHomeCtrl', ['$scope', '$location', '$http', '$firebaseArray', '$firebaseObject', 'jobsService', 'adminSidebarService', 'FIREBASE_URL', function($scope, $location, $http, $firebaseArray, $firebaseObject, jobsService, adminSidebarService, FIREBASE_URL) {
    	$scope.config = {};
        $scope.config.loading = true;
        $scope.mainContentShow = false;
        adminSidebarService.adminSidebar($scope);
        jobsService.completedProfiles($scope);
             
        $scope.createJob = function() {
            $location.path('/postjob');
        }
        $scope.viewJobDetails = function(id) {
            $location.path('/jobdetails/'+id);
        }
        $scope.editJobDetails = function(id) {
            $location.path('/postjob/'+id);
        }
        
        $scope.deleteJobDetails = function(id) {
        var confirmDelete;
        if (confirm("Are you sure you want to delete this job?") == true) {
		var myDataRef = new Firebase(FIREBASE_URL+"/jobs/"+id);
            	var onComplete = function(error) { 
                    var scope = angular.element($("#admin_home_scope_section")).scope();
                    if (error) {
                        scope.$apply(function(){
                            scope.notification = {};
                            scope.notification.modalTitle = "Post Delete Unsuccessful!"
                            scope.notification.modalBody = 'Due to some technical issue we are unable to process your request now. Please try later.';
                        });
                        $("#jobPostModal").modal();
                    } else { 
                        
                        scope.$apply(function(){
                            scope.notification = {};
                            scope.notification.modalTitle = "Post Delete Successful!"
                            scope.notification.modalBody = 'You have successfully deleted an existing job.';
                            adminSidebarService.adminSidebar($scope);
                        });
                        $("#jobPostModal").modal();
                        
                    }
                };
	        myDataRef.remove(onComplete);
    	} else {
        	return false;
    	}
            
        }
}]);


admintcControllers.controller('adminPostJobCtrl', ['$scope', '$location', '$routeParams', '$http', '$firebaseArray', '$firebaseObject', 'jobsService', 'FIREBASE_URL', function($scope, $location, $routeParams, $http, $firebaseArray, $firebaseObject, jobsService, FIREBASE_URL) {
    $scope.jobs = {};
        $scope.config = {};
        $scope.editjobid = '';
        $scope.config.loading = true;
        $scope.state_list = jobsService.state_list;
        $scope.city_list_show = false;
        var loc = $location;
        $scope.stateSelected = function() {
           if($scope.jobs.state === undefined) {
               $scope.city_list_show = false;
           } else {
                var allcities= jobsService.city_list;
               angular.forEach(allcities, function(cities, statekey) {
                   if(cities.hasOwnProperty($scope.jobs.state)) {
                       $scope.city_list = cities[$scope.jobs.state];
                   }
               });
               $scope.city_list_show = true;
           }
        }
        jobsService.getAllJobs().then(function(data){
                    $scope.jobsResults_count  = data.length;
              }, function(error){
                  $scope.jobsResults_count = 0;
              });
        var ejid = $routeParams.jid; 
        if(ejid) {
            $scope.editjobid = ejid;
            jobsService.getJobById(ejid).then(function(data){
                $scope.config.loading = false;
                    if(data.$value !== null) {
                        $scope.jobs.title = data.title;
                        $scope.jobs.company = data.company;
                        $scope.jobs.city = data.city;
                        $scope.jobs.state = data.state;
                        $scope.jobs.descriptions = data.descriptions;
                        $scope.jobs.responsibilities = data.responsibilities;
                        $scope.jobs.education = data.educations;
                        $scope.jobs.skills = data.skills;
                    } else {
                        $scope.config.error = true;
                    }
            }, function(error){
                $scope.config.error = true;
            });
        } else {
            $scope.config.loading = false;
        }
        $scope.postJob = function(jobsForm, ejid) {
            if(ejid != '') {
                if(jobsForm.$valid) {
                var d = new Date();
                var created_on = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
                var postdata = {
                    title: $scope.jobs.title,
                    company: $scope.jobs.company,
                    state: $scope.jobs.state,
                    city: $scope.jobs.city,
                    descriptions: $scope.jobs.descriptions,
                    responsibilities: $scope.jobs.responsibilities,
                    educations: $scope.jobs.education,
                    skills: $scope.jobs.skills,
                    status: "active",
                    created_on: created_on
                };
                
                jobsService.updateJobById(ejid, postdata).then(function(res) {
                            /*$scope.notification = {};
                            $scope.notification.status = 'success';
                            $scope.notification.modalTitle = "Post Update Successfull!"
                            $scope.notification.modalBody = 'You have successfully updated an existing job.';
                            $scope.jobs = {};
                            $("#jobPostModal").modal();*/
                            $location.path('/home');
                        
                        
                    }, function(error){
                            $scope.notification = {};
                            $scope.notification.status = 'error';
                            $scope.notification.modalTitle = "Post Update Unsuccessfull!"
                            $scope.notification.modalBody = 'Due to some technical issue we are unable to process your request now. Please try later.';
                            $("#jobPostModal").modal();
                    });
                
            } else { 
                 
                 $scope.formValidation = 'Please fill in all the fields.';
                 angular.element("#scrollTarget")[0].scrollTop=0;
            }
            } else {
                if(jobsForm.$valid) {
               $scope.config.loading = true;
                var myDataRef = new Firebase(FIREBASE_URL+"/jobs/");
                //var jobsRef = myDataRef.child("jobs");
                //var jobsPush = jobsRef.push();
                
                var d = new Date();
                var created_on = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
                $firebaseArray(myDataRef).$add({
                    title: $scope.jobs.title,
                    company: $scope.jobs.company,
                    state: $scope.jobs.state,
                    city: $scope.jobs.city,
                    descriptions: $scope.jobs.descriptions,
                    responsibilities: $scope.jobs.responsibilities,
                    educations: $scope.jobs.education,
                    skills: $scope.jobs.skills,
                    status: "active",
                    created_on: created_on
                }).then(function(ref){
                    var id = ref.key(); 
                    $scope.config.loading = false;
                    
                    if(id === '') {
                   // scope.$apply(function(){
                        $scope.notification = {};
                        $scope.notification.status = 'error';
                        $scope.notification.modalTitle = "Post Unsuccessful!"
                        $scope.notification.modalBody = 'Due to some technical issue we are unable to process your request now. Please try later.';
                       // });
                       $("#jobPostModal").modal();
                    } else {
                    	
                       /* $scope.notification = {};
                        $scope.notification.status = 'success';
                        $scope.notification.modalTitle = "Post Successful!"
                        $scope.notification.modalBody = 'You have successfully added a new job posting.';
                        $scope.city_list_show = false;
                        $scope.jobs = {};
                        */

                      
                      
                      $location.path('/home');
                    }


                });

                
            } else { 
                 
                 $scope.formValidation = 'Please fill in all the fields.';
                 angular.element("#scrollTarget")[0].scrollTop=0;
            }
            }
            
        }
        
        $scope.showList = function() {
            location.href="#/home"
        }


}]);

admintcControllers.controller('adminJobDetailsCtrl', ['$scope','$location', '$routeParams', '$http', '$firebaseArray', '$firebaseObject', 'jobsService', 'FIREBASE_URL', function($scope, $location, $routeParams, $http, $firebaseArray, $firebaseObject, jobsService, FIREBASE_URL) {
    jobsService.getAllJobs().then(function(data){
                    $scope.jobsResults_count  = data.length;
              }, function(error){
                  $scope.jobsResults_count = 0;
              });
    
    var jid = $routeParams.jid;
    
    $scope.config = {};
    $scope.config.loading = true;
    $scope.config.error = false;
    if(jid){
         jobsService.getJobById(jid).then(function(data){
             $scope.config.loading = false;
                if(data.$value !== null) {
                    $scope.jobsResult = data;
                } else {
                    $scope.config.error = true;
                }
         }, function(error){
             $scope.config.error = true;
         });
                        
     } else {
         $scope.config.error = true;
     } 
     $scope.viewJobApplicants = function(id) {
         $location.path('/jobdetailsapplicants/'+id);
     }
 
 }]);


admintcControllers.controller('adminJobDetailsApplicantsCtrl', ['$scope','$location', '$routeParams', '$http', '$firebaseArray', '$firebaseObject', 'jobsService', 'FIREBASE_URL', function($scope, $location, $routeParams, $http, $firebaseArray, $firebaseObject, jobsService, FIREBASE_URL) {
     jobsService.getAllJobs().then(function(data){
                    $scope.jobsResults_count  = data.length;
              }, function(error){
                  $scope.jobsResults_count = 0;
              });
        var jid = $routeParams.jid;
    
        $scope.config = {};
        $scope.config.loading = true;
        $scope.config.error = false;
        if(jid) {
            jobsService.getJobById(jid).then(function(data){
                $scope.config.loading = false;
                    if(data.$value !== null) {
                        $scope.jobsResult = data;
                    } else {
                        $scope.config.error = true;
                    }
            }, function(error){
                $scope.config.error = true;
            });

        } else {
            $scope.config.error = true;
        } 
 
}]);
