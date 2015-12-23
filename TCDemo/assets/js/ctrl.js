var tcControllers = angular.module('tc.controllers', []);

tcControllers.controller('authCtrl', ['$scope', '$http', '$firebaseArray', 'jobsService', '$cookies', 'setService', '$location', function($scope, $http, $firebaseArray, jobsService, $cookies, setService, $location) {
     $scope.config = {};
     $scope.config.loading = true;
     $scope.edit_candidate_info_mode = false;
     $scope.sidebar_mode = false;
     var uProfile = setService.get('uProfile');
     var ctokenid = $cookies.get('usertoken');
     
     if(ctokenid != undefined)
         {
             jobsService.tokenCheck(uProfile.email, ctokenid).then(function(){
                 return true;
             }, function(){
                 $location.path('/login');
             });
            
         } else {
             $location.path('/login');
         }
     
}]);

tcControllers.controller('loginCtrl', ['$scope', '$http', '$firebaseArray', 'jobsService', 'setService', '$cookies', '$location', function($scope, $http, $firebaseArray, jobsService, setService, $cookies, $location) {
        $scope.config = {};
        $scope.config.loading = false;
        $scope.notification = {};
        $scope.sidebar_mode = false;
        
        $scope.login = function() {
            $scope.config.loading = true;
            function generatecookieid()
                {
                    var text = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                    for( var i=0; i < 31; i++ )
                        text += possible.charAt(Math.floor(Math.random() * possible.length));
                    return text;
                }   
            jobsService.credentialsCheck($scope.login.email, $scope.login.password).then( function(ckey) {
                
                if (ckey) {
                    var tokenID = generatecookieid();
                    
                    jobsService.updateCandidateById(ckey, {tokenid: tokenID, logincount: null}).then(function(res){
                        $scope.config.loading = false;
                        $cookies.put('tokenid', tokenID);
                        var data = setService.get('uProfile');
                       
                        setService.set('uProfile', data);
                        $scope.config.loading = false;
                        $scope.logincount = data.logincount;
                        if($scope.logincount == 1) {
                            $location.path('/welcome');
                        } else {
                            $location.path('/tutorial');
                        }
                        
                    }, function(error){
                        $scope.config.loading = false;
                        console.log("error");
                    });
                    
                    
                } else {
                    $scope.config.loading = false; 
                    $scope.notification.modalTitle = "Your credentials are invalid";
                    $scope.notification.modalBody = 'Sorry, Your credentials are invalid. Please login with correct credentails.';
                    $("#jobPostModal").modal();
                }
            }, function() {
                console.log('error');
            });
        }
        $scope.reset = function() {
            $scope.login = {};
        }
}]);

tcControllers.controller('signupCtrl', ['$scope', '$http', '$firebaseArray', 'jobsService', function($scope, $http, $firebaseArray, jobsService) {
    $scope.config = {};
    $scope.config.loading = false;
    $scope.sidebar_mode = false;
    $scope.salary_list =  jobsService.salary_list; 
    $scope.state_list =   jobsService.state_list;
    $scope.notification = {};
    
    
    
    $scope.save = function (signupForm) {
        if( signupForm.email.$error.required || 
            signupForm.password.$error.required || 
            signupForm.cpassword.$error.required
            ) {
            $scope.notification.modalTitle = "Required Fields Errors";
            $scope.notification.modalBody = "Please fill the all the required fileds.";
            $("#jobPostModal").modal();
            
        } else if (($scope.signup.password.length != $scope.signup.cpassword.length) ||
                    ($scope.signup.password != $scope.signup.cpassword) ){
            $scope.notification.modalTitle = "Password Mismatch";
            $scope.notification.modalBody = "Please check both password and confirm password entry.";
            $("#jobPostModal").modal();
        } else {
            
       $scope.config.loading = true;
        jobsService.emailAlreadyExists($scope.signup.email).then(function(exists){
            if (exists) {
                $scope.config.loading = false; 
                $scope.notification.modalTitle = "Email ID already exists";
                $scope.notification.modalBody = 'Sorry, The email id you mentioned is already used. Please use differnt email id.';
                $("#jobPostModal").modal();
            } else {
                var postdata = {            
                                    candidate: 'yes', 
                                    needjob: 'yes',
                                    tokenid: '',
                                    profilecompleted: 0,
                                    logincount: 0,
                                    profilesaved: 'no',
                                    discover: false,
                                    learn:false,
                                    plan:false,
                                    apply:false,
                                    password: $scope.signup.password,
                                    position: $scope.signup.position,
                                    githuburl: $scope.signup.githuburl,
                                    resume: $scope.signup.resume,
                                    city: $scope.signup.city,
                                    state: $scope.signup.state,
                                    salary: $scope.signup.salary,
                                    email: $scope.signup.email, 
                                    fname: $scope.signup.fname, 
                                    lname: $scope.signup.lname
                              };
            jobsService.addUsers(postdata).then(function(response){ 
            $scope.config.loading = false; 
            $scope.signup = {};
            $scope.notification.modalTitle = "Registration is successful!";
            $scope.notification.modalBody = 'You have successfully registered with us. Please login to go forward.';
            
            $("#jobPostModal").modal();
            }, function(error){
                $scope.config.loading = false; 
                $scope.signup = {};
                $scope.notification.modalTitle = "Registration is unsuccessful!";
                $scope.notification.modalBody = 'Sorry We are unable to register you right now. Please try later.';

                $("#jobPostModal").modal();

            }); 
            }
            
        }, function(error) {
            console.log('error');
        }); 
        
        }
        
    }
    
    $scope.reset = function(){
        $scope.singup = {};
    }
        
}]);
tcControllers.controller('welcomeCtrl', ['$scope', '$http', '$firebaseArray', 'jobsService', 'setService', 'sidebarService', '$cookies', '$location', function($scope, $http, $firebaseArray, jobsService, setService, sidebarService, $cookies, $location) {
       sidebarService.sidebar($scope);
       $scope.goTo = function(personalize) {
           var postdata = {personalize: personalize};
           jobsService.updateCandidateById($scope.cid, postdata).then(function(data){
					 angular.forEach(data, function(v,k) {
						 $scope[k] = v;
					 });
					 
					$location.path('/tutorial');
					console.log(data);
				}, function(){
					alert("not updated");
				});
            
        }
}]);

tcControllers.controller('tutorialCtrl', ['$scope', '$http', '$firebaseArray', 'jobsService', 'setService', 'sidebarService', '$cookies', '$location', function($scope, $http, $firebaseArray, jobsService, setService, sidebarService, $cookies, $location) {
        sidebarService.sidebar($scope);
        $scope.goTo = function() {
            $location.path('/discover');
        }
}]);

tcControllers.controller('jobsCtrl', ['$scope', '$http', '$firebaseArray', 'jobsService', 'setService', 'sidebarService', '$cookies', function($scope, $http, $firebaseArray, jobsService, setService, sidebarService, $cookies) {
        
        $scope.config = {};
        $scope.config.loading = true; 
        $scope.mainContentShow = false;
        
        $scope.salary_list =  sidebarService.salary_list; 
        $scope.state_list =   sidebarService.state_list;
        sidebarService.sidebar($scope);
         
       
        jobsService.getAllJobs().then(function(data){
                  $scope.config.loading = false;
                  $scope.jobsResults = data;
                    $scope.jobsResults_count  = data.length;
                    if($scope.jobsResults_count > 50) {
                        $scope.pageSize = 10;
                    } else {
                        $scope.pageSize = 5;
                    }
                    $scope.curPage = 1;

                    $scope.maxSize = Math.ceil($scope.jobsResults_count / $scope.pageSize);


                    $scope.$watch('curPage', function(n, o) {
                            var begin = (($scope.curPage - 1) * $scope.pageSize)
                                ,end = (begin + $scope.pageSize) > $scope.jobsResults_count? $scope.jobsResults_count: (begin + $scope.pageSize);

                            $scope.jobsResults = data.slice(begin, end);
                    });
                    $scope.mainContentShow = true;
              
              }, function(error){
                  $scope.config.error = true;
                  $scope.jobsResults_count = 0;
              });
        
        $scope.viewJobDetails = function(id) {
            location.href= '/#/jobs/'+id;
        }
}]);


tcControllers.controller('jobDetailsCtrl', ['$scope', '$routeParams', '$http', '$firebaseArray', 'jobsService', 'setService', 'sidebarService', '$cookies', function($scope, $routeParams, $http, $firebaseArray, jobsService, setService, sidebarService, $cookies) {
        
        $scope.config = {};
        $scope.config.loading = true; 
        $scope.mainContentShow = false;
        
        $scope.salary_list =  sidebarService.salary_list; 
        $scope.state_list =   sidebarService.state_list;
        sidebarService.sidebar($scope);
        
        if($routeParams.jid != undefined) {
            jobsService.getJobById($routeParams.jid).then(function(data){
                  $scope.config.loading = false;
                  $scope.jobsResult = data;
                  $scope.mainContentShow = true;
              
              }, function(error){
                  $scope.config.error = true;
                  $scope.jobsResults_count = 0;
              });
        } else {
            $scope.config.loading = false;
            $scope.mainContentShow = true;
        }
        
        
        $scope.apply = function(id) {
            location.href= '/#/apply/'+id;
        }
}]);

tcControllers.controller('logoutCtrl', ['$scope', '$http', '$cookies', '$location', 'setService', function($scope, $http, $cookies, $location, setService) {
     $cookies.remove('tokenid');   
     setService.set('uProfile', '');  
     $location.path('/login');
    
}]);


tcControllers.controller('discoverCtrl', ['$scope', '$http', '$firebaseArray', 'jobsService', 'setService', 'sidebarService', '$cookies', function($scope, $http, $firebaseArray, jobsService, setService, sidebarService, $cookies) {
     $scope.config = {};
        $scope.config.loading = false;
        $scope.salary_list =  sidebarService.salary_list; 
        $scope.state_list =   sidebarService.state_list;
        sidebarService.sidebar($scope);
        $scope.testCode = function(tcode, cid) {
           
            if($scope.test_code.length === 0) {
                 var testCode = [tcode];
                var postdata = {
                profilecompleted: $scope.profilecompleted + 25,
                test_code: testCode
                
                };
            } else {
                var testCode = $scope.test_code;
                testCode.push(tcode);
                var postdata = {
                test_code : testCode
                
            };
            }
            
            jobsService.updateCandidateById($scope.cid, postdata).then(function(data) {
                        angular.forEach(data, function(v,k) {
                        $scope[k] = v;
                        });
                    alert("Successfully updated");
                    console.log(data);
            }, function(){
                    alert("not updated");
            });
        }
        
        $scope.fileUpload = function(cid) {
            sidebarService.fileUpload(cid, $scope);
        }
        
        
    /*    if(!$scope.discover) {
            var postdata = { profilecompleted : parseInt($scope.profilecompleted) + 25, discover:true };

                jobsService.updateCandidateById($scope.cid, postdata).then(function(){
                    var uProfile = setService.get('uProfile');
                                    $scope.candidate_fname = uProfile.fname;
                                    $scope.candidate_lname = uProfile.lname;
                                    $scope.candidate_position  = uProfile.position;
                                    $scope.candidate_city  = uProfile.city;
                                    $scope.candidate_state  = uProfile.state;
                                    $scope.candidate_salary = uProfile.salary;
                                    $scope.candidate_email  = uProfile.email;
                                    $scope.candidate_githuburl  = uProfile.githuburl;  
                                    $scope.cid = uProfile.$id;
                                    $scope.profilecompleted = uProfile.profilecompleted;
                                    $scope.discover = uProfile.discover;
                                    $scope.learn = uProfile.learn;
                                    $scope.plan = uProfile.plan;
                                    $scope.apply = uProfile.apply;

                }, function(){
                    alert("not updated");
                });
        } */
        
        
}]);



tcControllers.controller('learnCtrl', ['$sce', '$scope', '$http', '$firebaseArray', 'jobsService', 'setService', 'sidebarService', '$cookies', function($sce, $scope, $http, $firebaseArray, jobsService, setService, sidebarService, $cookies) {
     $scope.config = {};
        $scope.config.loading = false; 
        $scope.mainContentShow = false;
        $scope.salary_list =  sidebarService.salary_list; 
        $scope.state_list =   sidebarService.state_list;
        sidebarService.sidebar($scope);
        $scope.learnPageMainContent = true;
        
        $scope.fileUpload = function(cid) {
            sidebarService.fileUpload(cid, $scope);
        }
        
        $scope.testSkills = function(skill) {
            if(skill == 'C' || skill == 'C++' || skill == 'C#' || skill == 'Java' || skill == 'Python' || skill == 'PHP') {
               
             $scope.learnPageMainContent = false;
             //$scope.cordilityAPILink = 'https://codility.com/dashboards/campaigns/candidates/55160/';
             $scope.cordilityAPILink = $sce.trustAsResourceUrl('https://codility.com/dashboards/campaigns/candidates/55160/');
            if($scope.test_skill.length === 0) {
                 var testSkill = [skill];
                var postdata = {
                test_skill: testSkill
                };
            } else {
                var testSkill = $scope.test_skill;
                testSkill.push(skill);
                var postdata = {
                test_skill : testSkill
                
            };
            }
            console.log($scope.cid);
            jobsService.updateCandidateById($scope.cid, postdata).then(function(data){
                        angular.forEach(data, function(v,k) {
                        $scope[k] = v;
                        });
                    alert("successfully updated");
                    console.log(data);
            }, function(){
                    alert("not updated");
            });    
                        
            } 
        }
       
        /*if(!$scope.learn) {
        var postdata = { profilecompleted : parseInt($scope.profilecompleted) + 25, learn:true };
            
            jobsService.updateCandidateById($scope.cid, postdata).then(function(){
                var uProfile = setService.get('uProfile');
                                $scope.candidate_fname = uProfile.fname;
                                $scope.candidate_lname = uProfile.lname;
                                $scope.candidate_position  = uProfile.position;
                                $scope.candidate_city  = uProfile.city;
                                $scope.candidate_state  = uProfile.state;
                                $scope.candidate_salary = uProfile.salary;
                                $scope.candidate_email  = uProfile.email;
                                $scope.candidate_githuburl  = uProfile.githuburl;  
                                $scope.cid = uProfile.$id;
                                $scope.profilecompleted = uProfile.profilecompleted;
                                $scope.discover = uProfile.discover;
                                $scope.learn = uProfile.learn;
                                $scope.plan = uProfile.plan;
                                $scope.apply = uProfile.apply;
                
            }, function(){
                 alert("not updated");
            });
            
        } */
}]);


tcControllers.controller('planCtrl', ['$scope', '$http', '$firebaseArray', 'jobsService', 'setService', 'sidebarService', '$cookies', '$compile', function($scope, $http, $firebaseArray, jobsService, setService, sidebarService, $cookies, $compile) {
    $scope.config = {};
    $scope.editVisionModel = {};
    $scope.config.loading = false; 
    $scope.mainContentShow = false;
    sidebarService.sidebar($scope);
    $scope.salary_list =  sidebarService.salary_list; 
    $scope.state_list =   sidebarService.state_list;
    $scope.vision_notification = {};
    $scope.fileUpload = function(cid) {
            sidebarService.fileUpload(cid, $scope);
        }
        
    $scope.generateModelName = function (c1,c2) {
        console.log(c1+c2);
        return c1+c2;
    }
    $scope.timeframelist = jobsService.timeframelist;
        function generatecookieid()
                {
                    var text = "";
                    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
                    for( var i=0; i < 31; i++ )
                        text += possible.charAt(Math.floor(Math.random() * possible.length));
                    return text;
                }  
        
        $scope.state_list =   sidebarService.state_list;
        
        $scope.addVision = function(cid) {
            var existedVisions = angular.element('tbody#vision_table');
            var existedVisionsLen = angular.element('tbody#vision_table tr').length;
            var visionTimeFrame = 'visionTimeFrame'+ (existedVisionsLen + 0);
            $scope[visionTimeFrame] = $scope.timeframelist[0];
            //existedVisions.append('<tr><td><span class="glyphicon glyphicon-remove icon-red" ng-click="deleteVision('+cid+')"></span><span ng-click="editVision('+cid+')" class="glyphicon glyphicon-pencil"></span><input type="text" name="" ng-model="" /></td><td><input type="text" name="" ng-model="" /></td><td></td></tr>');
             var visionCount = existedVisionsLen + 0;
            
             existedVisions.append($compile(
                '<tr><td><span class="glyphicon glyphicon-floppy-disk" ng-click="saveVision(cid, 0 ,'+visionCount+', $event)"></span>\n\
                 &nbsp;<span class="glyphicon glyphicon-remove icon-red" ng-click="deleteVision(cid, 0 , $event)"></span>&nbsp;\n\
                 <span ng-click="editVision(cid, 0 , $event)" class="glyphicon glyphicon-pencil" ng-hide="true"></span>&nbsp;<input type="text" \n\
                 class="visionTextBox" name="visionGoal'+visionCount+'" ng-keyup="visionGoalCheck($event, '+visionCount+')" \n\
                 ng-model="visionGoal'+visionCount+'" /><br/><span class="icon-red" ng-show="visionGoalErrMsg'+visionCount+'">\n\
                 Please enter goals.</span></td><td><input type="text" class="visionTextBox" name="visionAction'+visionCount+'" \n\
                 ng-keyup="visionActionCheck($event, '+visionCount+')" ng-model="visionAction'+visionCount+'" /><br/>\n\
                 <span class="icon-red" ng-show="visionActionErrMsg'+visionCount+'">Please enter actions.</span></td><td>\n\
                 <select style="width:140px;" ng-model="visionTimeFrame'+visionCount+'"><option ng-repeat="tf in timeframelist" value="{{ tf.value }}" >{{ tf.label }}</option>\n\
                 </select><br/><span class="icon-red" ng-show="timeframeErrMsg'+visionCount+'">Select timeframe.</span></td></tr>'
             )($scope));
             
        }
        
        $scope.saveVision = function(cid, vid, index, event) {
            console.log(cid, vid, index, event);
            var mindex = index;
            if (vid === 0) {
                console.log("tt1");
            
            var visionGoal = 'visionGoal'+mindex;
            var visionAction = 'visionAction'+mindex;
            var visionTimeFrame = 'visionTimeFrame'+mindex;
            var visionGoalErrMsg = 'visionGoalErrMsg'+mindex;
            var visionActionErrMsg = 'visionActionErrMsg'+mindex;
            var timeframeErrMsg = 'timeframeErrMsg'+mindex;
            
            if($scope[visionGoal] == '' || $scope[visionGoal] === undefined) { console.log("error 1");
                $scope[visionGoalErrMsg] = true;
            } else if($scope[visionAction] == '' || $scope[visionAction] === undefined) { console.log("error 2");
                $scope[visionActionErrMsg] = true;
            }
            else if( typeof $scope[visionTimeFrame] == 'object' || $scope[visionTimeFrame] === undefined) { console.log("error 3");
                $scope[timeframeErrMsg] = true;
            } else {
                $scope.config.loading = true;
                var visionid = generatecookieid();
                if($scope.visions.length === 0) {
                 var vision = [{vid: visionid, goal: $scope[visionGoal], action: $scope[visionAction], timeframe: $scope[visionTimeFrame]}];
                var postdata = {
                visions: vision
                };
            } else {
                var visions = $scope.visions;
                visions.push({vid: visionid, goal: $scope[visionGoal], action: $scope[visionAction], timeframe: $scope[visionTimeFrame]});
                var postdata = {
                visions : visions
                
            };
            }
            
            jobsService.updateCandidateById(cid, postdata).then(function(data){
                        angular.forEach(data, function(v,k) {
                        $scope[k] = v;
                        
                        });
                        angular.element(event.target).parent().parent().remove();
                    //alert("successfully updated");
                    
                    var visionGoal = 'visionGoal'+mindex;
                    var visionAction = 'visionAction'+mindex;
                    var visionTimeFrame = 'visionTimeFrame'+mindex;
                    var visionGoalErrMsg = 'visionGoalErrMsg'+mindex;
                    var visionActionErrMsg = 'visionActionErrMsg'+mindex;
                    var timeframeErrMsg = 'timeframeErrMsg'+mindex;
            
                    delete $scope[visionGoal];delete $scope[visionAction];
                    delete $scope[visionTimeFrame];delete $scope[visionGoalErrMsg];
                    delete $scope[visionActionErrMsg];delete $scope[timeframeErrMsg];
                    
                    $scope.config.loading = false;
                    $scope.vision_notification.status = 'visionNotification_success';
                    $scope.vision_notification.msg = "A vision successfully added.";
                    
            }, function(){
                   $scope.config.loading = false;
                   $scope.vision_notification.status = 'visionNotification_alert';
                   $scope.vision_notification.msg = "A vision is unsuccessfull while adding.";
            }); 
                
            }
        } else {
            
            console.log("edit and save again");
                var visionGoal = 'visionGoal'+mindex;
            var visionAction = 'visionAction'+mindex;
            var visionTimeFrame = 'visionTimeFrame'+mindex;
            var visionGoalErrMsg = 'visionGoalErrMsg'+mindex;
            var visionActionErrMsg = 'visionActionErrMsg'+mindex;
            var timeframeErrMsg = 'timeframeErrMsg'+mindex;
            console.log(mindex);
            if($scope.editVisionModel[visionGoal] == '' || $scope.editVisionModel[visionGoal] === undefined) { console.log("error 1");
                $scope.editVisionModel.visionGoalErrMsg = true;
            } else if($scope.editVisionModel[visionAction] == '' || $scope.editVisionModel[visionAction] === undefined) { console.log("error 2");
                $scope.editVisionModel.visionActionErrMsg = true;
            }
            else if( typeof $scope.editVisionModel[visionTimeFrame] == 'object' || $scope.editVisionModel[visionTimeFrame] === undefined) { console.log("error 3");
                $scope.editVisionModel.timeframeErrMsg = true;
            } else { console.log("cool");
                $scope.config.loading = true;
               
                var visions = $scope.visions;
                var mod_visions = [];
                angular.forEach(visions, function(v,k) { 
                    if(v.vid === vid) {
                        mod_visions.push({vid: vid, goal: $scope.editVisionModel[visionGoal], action: $scope.editVisionModel[visionAction], timeframe: $scope.editVisionModel[visionTimeFrame]});
                    } else {
                        mod_visions.push(v);
                    }
                    
                    
                });
                var postdata = {visions : mod_visions};
            
            
            jobsService.updateCandidateById(cid, postdata).then(function(data){
                        angular.forEach(data, function(v,k) {
                        $scope[k] = v;
                        
                        });
                        angular.element(event.target).parent().parent().remove();
                    //alert("successfully updated");
                    
                    var visionGoal = 'visionGoal'+mindex;
                    var visionAction = 'visionAction'+mindex;
                    var visionTimeFrame = 'visionTimeFrame'+mindex;
                    var visionGoalErrMsg = 'visionGoalErrMsg'+mindex;
                    var visionActionErrMsg = 'visionActionErrMsg'+mindex;
                    var timeframeErrMsg = 'timeframeErrMsg'+mindex;
            
                    delete $scope.editVisionModel[visionGoal];delete $scope.editVisionModel[visionAction];
                    delete $scope.editVisionModel[visionTimeFrame];delete $scope.editVisionModel[visionGoalErrMsg];
                    delete $scope.editVisionModel[visionActionErrMsg];delete $scope.editVisionModel[timeframeErrMsg];
                    
                    $scope.config.loading = false;
                    $scope.vision_notification.status = 'visionNotification_success';
                    $scope.vision_notification.msg = "A vision successfully updated.";
                    
            }, function(){
                   $scope.config.loading = false;
                   $scope.vision_notification.status = 'visionNotification_alert';
                   $scope.vision_notification.msg = "A vision is unsuccessfull while updating.";
            }); 
                
            }
        }
        }
        
        $scope.visionGoalCheck = function(event, index) {
            var visionGoalErrMsg = 'visionGoalErrMsg'+index;
            
            if(event.target.value == '')
              $scope[visionGoalErrMsg] = true; 
            else
              $scope[visionGoalErrMsg] = false;   
            
        }
        
        $scope.visionActionCheck = function(event, index) {
            var visionActionErrMsg = 'visionActionErrMsg'+index;
            if(event.target.value == '')
              $scope[visionActionErrMsg] = true; 
            else
              $scope[visionActionErrMsg] = false;     
        }
        
        $scope.editVision = function(cid, vision, event, index) {
            //angular.element(event.target).parent().parent().remove();
            angular.element(event.currentTarget).parent().parent().find('.spanDisplay').addClass('hide');
            angular.element(event.currentTarget).parent().parent().find('.spanEdit').removeClass('hide');
            var visionGoal = 'visionGoal'+index;
            var visionAction = 'visionAction'+index;
            var visionTimeFrame = 'visionTimeFrame'+index;
            var visionGoalErrMsg = 'visionGoalErrMsg'+index;
            var visionActionErrMsg = 'visionActionErrMsg'+index;
            var timeframeErrMsg = 'timeframeErrMsg'+index;
            
            $scope.editVisionModel[visionGoal] = vision.goal;
            $scope.editVisionModel[visionAction] = vision.action;
            $scope.editVisionModel[visionTimeFrame] = vision.timeframe;
            
            $scope.editVisionModel[visionGoalErrMsg] = false;
            $scope.editVisionModel[visionActionErrMsg] = false;
            $scope.editVisionModel[timeframeErrMsg] = false;
            
            
        }
        
        $scope.deleteVision = function(cid, vid, event) {
            $scope.config.loading = true; 
                var visions = $scope.visions;
                angular.forEach(visions, function(v, k) {
                    if(v.vid == vid) {
                        delete visions[k];
                    }
                    
                });
                visions = visions.filter(function(){return true;});
                
                if(visions.length === 0) {
                   $scope['visions'] = [];
                var postdata = { visions : []};
                 
                } else {
                     var postdata = { visions : visions};
                }
               
            jobsService.updateCandidateById(cid, postdata).then(function(data){
                        angular.forEach(data, function(v,k) {
                        $scope[k] = v;
                        
                        });
                        $scope.config.loading = false; 
                        angular.element(event.target).parent().parent().remove();
                        $scope.vision_notification.status = 'visionNotification_success';
                        $scope.vision_notification.msg = "A vision is successfully deleted.";
                    
            }, function(){
                    $scope.config.loading = false; 
                    $scope.vision_notification.status = 'visionNotification_alert';
                    $scope.vision_notification.msg = "A vision is unsuccessfull while deleting.";
            });
            
        }
        /* if(!$scope.plan) {
        var postdata = { profilecompleted : parseInt($scope.profilecompleted) + 25, plan:true };
            
            jobsService.updateCandidateById($scope.cid, postdata).then(function(){
                var uProfile = setService.get('uProfile');
                                $scope.candidate_fname = uProfile.fname;
                                $scope.candidate_lname = uProfile.lname;
                                $scope.candidate_position  = uProfile.position;
                                $scope.candidate_city  = uProfile.city;
                                $scope.candidate_state  = uProfile.state;
                                $scope.candidate_salary = uProfile.salary;
                                $scope.candidate_email  = uProfile.email;
                                $scope.candidate_githuburl  = uProfile.githuburl;  
                                $scope.cid = uProfile.$id;
                                $scope.profilecompleted = uProfile.profilecompleted;
                                $scope.discover = uProfile.discover;
                                $scope.learn = uProfile.learn;
                                $scope.plan = uProfile.plan;
                                $scope.apply = uProfile.apply;
                
            }, function(){
                 //alert("not updated");
            });
       } */
}]);


tcControllers.controller('applyCtrl', ['$scope', '$http', '$firebaseArray', 'jobsService', 'setService', 'sidebarService', '$cookies', function($scope, $http, $firebaseArray, jobsService, setService, sidebarService, $cookies) {
     $scope.config = {};
        $scope.config.loading = false; 
        $scope.mainContentShow = false;
        $scope.salary_list =  sidebarService.salary_list; 
        $scope.state_list =   sidebarService.state_list;
        sidebarService.sidebar($scope);
        $scope.fileUpload = function(cid) {
            sidebarService.fileUpload(cid, $scope);
        }
        
        
        /* if(!$scope.apply) {
        var postdata = { profilecompleted : parseInt($scope.profilecompleted) + 25, apply:true };
            
            jobsService.updateCandidateById($scope.cid, postdata).then(function(){
                var uProfile = setService.get('uProfile');
                                $scope.candidate_fname = uProfile.fname;
                                $scope.candidate_lname = uProfile.lname;
                                $scope.candidate_position  = uProfile.position;
                                $scope.candidate_city  = uProfile.city;
                                $scope.candidate_state  = uProfile.state;
                                $scope.candidate_salary = uProfile.salary;
                                $scope.candidate_email  = uProfile.email;
                                $scope.candidate_githuburl  = uProfile.githuburl;  
                                $scope.cid = uProfile.$id;
                                $scope.profilecompleted = uProfile.profilecompleted;
                                $scope.discover = uProfile.discover;
                                $scope.learn = uProfile.learn;
                                $scope.plan = uProfile.plan;
                                $scope.apply = uProfile.apply;
                
            }, function(){
                 //alert("not updated");
            });
       } */
}]);