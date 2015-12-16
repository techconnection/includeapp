var commonServices = angular.module('common.services', []);


commonServices.factory('jobsService', ['$q', '$http', '$firebaseAuth', '$firebaseArray', '$firebaseObject', 'setService', 'FIREBASE_URL', function($q, $http, $firebaseAuth, $firebaseArray, $firebaseObject, setService, FIREBASE_URL){
        
        return {
            "salary_list" : [{"label": "$65 to $75k - Entry Level", "value": "$65 to $75k"},
            		    {"label": "$75 to $85k - Entry Level", "value": "$75 to $85k"},
                            {"label": "$85 to $100k - Mid Level", "value": "$85 to $100k"},
                            {"label": "$100 to $120k - Mid Level", "value": "$100 to $120k"},
                            {"label": "$120 to $150k - Senior Level", "value": "$120 to $150k"},
                            {"label": "$150k+  - Senior Level", "value": "$150k+"}],
            "timeframelist": [{"label": "1 year", "value": "1 year"},{"label": "1 month", "value": "1 month"}],
                  
            "state_list"  : [{"label": "AK", "value": "AK"},
                            {"label": "AL", "value": "AL"}, 
                            {"label": "AR", "value": "AR"},
                            {"label": "AZ", "value": "AZ"},
                            {"label": "CA", "value": "CA"}, 
                            {"label": "CO", "value": "CO"},
                            {"label": "CT", "value": "CT"},
                            {"label": "DC", "value": "DC"}, 
                            {"label": "DE", "value": "DE"},
                            {"label": "FL", "value": "FL"},
                            {"label": "GA", "value": "GA"}, 
                            {"label": "HI", "value": "HI"},
                            {"label": "IA", "value": "IA"},
                            {"label": "ID", "value": "ID"}, 
                            {"label": "IL", "value": "IL"},
                            {"label": "IN", "value": "IN"},
                            {"label": "KS", "value": "KS"}, 
                            {"label": "KY", "value": "KY"},
                            {"label": "LA", "value": "LA"},
                            {"label": "MA", "value": "MA"}, 
                            {"label": "MD", "value": "MD"},
                            {"label": "ME", "value": "ME"},
                            {"label": "MI", "value": "MI"}, 
                            {"label": "MN", "value": "MN"},
                            {"label": "MO", "value": "MO"},
                            {"label": "MS", "value": "MS"},
                            {"label": "MT", "value": "MT"},
                            {"label": "NC", "value": "NC"},
                            {"label": "ND", "value": "ND"},
                            {"label": "NE", "value": "NE"},
                            {"label": "NH", "value": "NH"},
                            {"label": "NJ", "value": "NJ"},
                            {"label": "NM", "value": "NM"},
                            {"label": "NV", "value": "NV"},
                            {"label": "NY", "value": "NY"},
                            {"label": "OH", "value": "OH"},
                            {"label": "OK", "value": "OK"},
                            {"label": "OR", "value": "OR"},
                            {"label": "PA", "value": "PA"},
                            {"label": "RI", "value": "RI"},
                            {"label": "SC", "value": "SC"},
                            {"label": "SD", "value": "SD"},
                            {"label": "TN", "value": "TN"},
                            {"label": "TX", "value": "TX"},
                            {"label": "UT", "value": "UT"},
                            {"label": "VA", "value": "VA"},
                            {"label": "VT", "value": "VT"},
                            {"label": "WA", "value": "WA"},
                            {"label": "WI", "value": "WI"},
                            {"label": "WV", "value": "WV"},
                            {"label": "WY", "value": "WY"}
                            ],
            "city_list" : [
                          { "AK" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "AL" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "AR" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "AZ" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "CA" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "CO" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "CT" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "DC" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "DE" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "FL" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "GA" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "HI" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "IA" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "ID" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "IL" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "IN" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "KS" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "KY" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "LA" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "MA" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "MD" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "ME" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "MI" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "MN" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "MO" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "MS" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "MT" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "NC" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "ND" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "NE" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "NH" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "NJ" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "NM" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "NV" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "NY" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "OH" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "OK" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "OR" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "PA" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "RI" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "SC" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "SD" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "TN" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "TX" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "UT" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "VA" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "VT" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "WA" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "WI" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "WV" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          },
                          { "WY" : [
                                     {"label": "City 1", "value": "City1"},
                                     {"label": "City 2", "value": "City2"}, 
                                     {"label": "City 3", "value": "City3"}
                                   ]
                          }
                          
                          ],
                 "authenticate": function(data) {
                     var deferred = $q.defer();
                        var myDataRef = new Firebase(FIREBASE_URL);
                          return $firebaseAuth(myDataRef).$authWithPassword(data).then(function(ref) {
                                deferred.resolve(ref.key());
                                return deferred.promise;

                            }).catch(function(err) {
                                deferred.reject(err);
                                return deferred.promise;
                            });
                 },
                 "emailAlreadyExists" : function(emailid) {
                     var deferred = $q.defer();
                        var myDataRef = new Firebase(FIREBASE_URL+"/users/candidate/");
                            return $firebaseArray(myDataRef).$loaded().then(function(data) { 
                                var found = false;
                                angular.forEach(data, function(v,k) {
                                    if (v.hasOwnProperty('email')) {
                                        if(v.email == emailid) {
                                            found = true;
                                        }
                                    }
                                });
                                deferred.resolve(found);
                                return deferred.promise;
                            }).catch(function(err) {
                                deferred.reject(err);
                                return deferred.promise;
                            });
                 },
                 "tokenCheck" : function(emailid, tokenid) {
                     var deferred = $q.defer();
                        var myDataRef = new Firebase(FIREBASE_URL+"/users/candidate/");
                          return $firebaseArray(myDataRef).$loaded().then(function(data) { 
                                var found = false;
                                angular.forEach(data, function(v,k) {
                                    if(v.hasOwnProperty('email') && v.hasOwnProperty('tokenid')) {
                                        if(v.email == emailid && v.tokenid == tokenid) {
                                            found = true;
                                            setService.set('uProfile', data[0]);
                                        }
                                    }
                                });
                                deferred.resolve(found);
                                return deferred.promise;
                            }).catch(function(err) {
                                deferred.reject(err);
                                return deferred.promise;
                            });
                 },
                 "credentialsCheck" : function(emailid, password) {
                     var deferred = $q.defer();
                        var myDataRef = new Firebase(FIREBASE_URL+"/users/candidate/");
                          return $firebaseArray(myDataRef).$loaded().then(function(data) { 
                                var ckey = false;
                                angular.forEach(data, function(v,k) {
                                    if(v.hasOwnProperty('email') && v.hasOwnProperty('password')) {
                                        if(v.email == emailid && v.password == password) {
                                            ckey = v.$id;
                                            //updateCandidateById(ckey, {logincount:null});
                                            setService.set('uProfile', data[0]);
                                        }
                                    }
                                });
                                deferred.resolve(ckey);
                                return deferred.promise;
                            }).catch(function(err) {
                                deferred.reject(err);
                                return deferred.promise;
                            });
                 },
                 "addUsers" : function(postdata) {
                     var deferred = $q.defer();
                        var myDataRef = new Firebase(FIREBASE_URL+"/users/candidate/");
                          return $firebaseArray(myDataRef).$add(postdata).then(function(ref) { 
                         
                                deferred.resolve(ref.key());
                                return deferred.promise;


                            }).catch(function(err) {
                                deferred.reject(err);
                                return deferred.promise;
                            });
                 },
                 
                 "getAllJobs" : function() {
                     if(setService.get('getAllJobs')) {  
                         return setService.get('getAllJobs');
                     } else {
                        var deferred = $q.defer();
                        var myDataRef = new Firebase(FIREBASE_URL+"/jobs");
                        var results = $firebaseArray(myDataRef);
                        // this waits for the data to load and then logs the output. Therefore,
                        // data from the server will now appear in the logged output. Use this with care!
                            // auto update
                            
                            return results.$loaded().then(function(data) { 
                                //setService.set('getAllJobs', data.reverse());
                                 
                                deferred.resolve(data.reverse());
                                return deferred.promise;


                            }).catch(function(err) {
                                deferred.reject(err);
                                return deferred.promise;
                            });
                     }
                     
                        
                 },
                 "getJobById" : function(id) {
                     if(setService.get(id)) {
                         return setService.get(id);
                     } else {
                        var deferred = $q.defer();
                        var myDataRef = new Firebase(FIREBASE_URL+"/jobs/"+id);
                        var result = $firebaseObject(myDataRef);
                        // this waits for the data to load and then logs the output. Therefore,
                        // data from the server will now appear in the logged output. Use this with care!
                        return result.$loaded().then(function(data) { 
                            //setService.set(id, data);
                            deferred.resolve(data);
                            return deferred.promise;

                        }).catch(function(err) {
                            deferred.reject(err);
                            return deferred.promise;
                        });
                     }
                 },
                 "updateJobById" : function(jid, postdata) {
                        var deferred = $q.defer();
                        var myDataRef = new Firebase(FIREBASE_URL+"/jobs/"+jid);
                        var job = $firebaseObject(myDataRef);
                        
                        return job.$loaded().then(function(data) {  
                            angular.forEach(postdata, function(v, k) { 
                                    data[k] = v;
                            });
                            //data.tokenid = '90';
                            return data.$save().then(function(ref) {
                                deferred.resolve(data);
                                return deferred.promise;
                            }, function(error) {
                                deferred.reject(error);
                                return deferred.promise;
                            });
                        }).catch(function(err) { 
                            deferred.reject(err);
                            return deferred.promise;
                        }); 
                            
                     },
                 "updateCandidateById" : function(cid, postdata) {
                        var deferred = $q.defer();
                        var myDataRef = new Firebase(FIREBASE_URL+"/users/candidate/"+cid);
                        var candidate = $firebaseObject(myDataRef);
                        
                        return candidate.$loaded().then(function(data){  
                            angular.forEach(postdata, function(v, k) { 
                                if(k == 'logincount'){
                                    data[k] = data[k] + 1;
                                } else {
                                    data[k] = v;
                                }
                                 
                            });
                            //data.tokenid = '90';
                            return data.$save().then(function(ref) {
                                setService.set('uProfile', data); 
                               
                                deferred.resolve(data);
                                return deferred.promise;
                            }, function(error) {
                                deferred.reject(error);
                                return deferred.promise;
                            });
                        }).catch(function(err) { 
                            deferred.reject(err);
                            return deferred.promise;
                        }); 
                            
                     },
                 "completedProfiles" : function($scope) {
                        var deferred = $q.defer();
                        var myDataRef = new Firebase(FIREBASE_URL+"/users/candidate/");
                        var candidate = $firebaseArray(myDataRef.orderByChild('profilecompleted').equalTo(100));
                        return candidate.$loaded().then(function(data){
                           $scope.completedProfiles = data;
                           $scope.completedProfiles_count = data.length;
                           deferred.resolve(data);
                           return deferred.promise;
                        }).catch(function(err) { 
                            deferred.reject(err);
                            return deferred.promise;
                        });
                        /*return myDataRef.orderByChild('profilecompleted').equalTo(100).on('value', function(data){
                            //console.log(snapshot.val());
                            $scope.completedProfiles_count = data.val().length;
                            console.log(data.val());
                            deferred.resolve(data);
                            return deferred.promise;
                        });*/
                        
                        /*return candidate.$loaded().then(function(data){  
                           $scope.completedProfiles_count = data.length;
                                deferred.resolve(data);
                                return deferred.promise;
                        }).catch(function(err) { 
                            deferred.reject(err);
                            return deferred.promise;
                        }); */
                     }
        };
}]);

commonServices.factory('adminSidebarService', ['$q', 'jobsService', 'setService', '$cookies', function($q, jobsService, setService, $cookies){
     return {
         adminSidebar: function($scope) {
             jobsService.getAllJobs().then(function(data) {
                $scope.config.loading = false;
                $scope.jobsResults = data;
                $scope.jobsResults_original = data;
                
                $scope.jobsResults_count  = data.length;
                $scope.jobsResults_totalcount = data.length;
                 if($scope.jobsResults_count > 50) {
                    $scope.pageSize = 10;
                } else {
                    $scope.pageSize = 5;
                }
                $scope.curPage = 1;
                
                $scope.maxSize = Math.ceil($scope.jobsResults_count / $scope.pageSize); 
                
                $scope.$watch('trending_skills_selected', function(tss, o) { 
                     console.log(tss);
                     if(tss !== undefined) {
                         var filtered_jobs = [];
                         angular.forEach(tss, function(v, k) {
                            if(!tss[k]) {
                                delete tss[k];
                            }
                         });
                         var skillsSelectedLen = Object.keys(tss).length;
                         console.log(skillsSelectedLen);
                         if(skillsSelectedLen === 0) {
                            $scope.jobsResults = $scope.jobsResults_original;
                            $scope.jobsResults_count = $scope.jobsResults_totalcount;
                                if($scope.jobsResults_count > 50) {
                                    $scope.pageSize = 10;
                                } else {
                                    $scope.pageSize = 5;
                                }
                                $scope.curPage = 1;
                                $scope.maxSize = Math.ceil($scope.jobsResults_count / $scope.pageSize);
                            
                        } else {
                            angular.forEach($scope.jobsResults, function(jv, jk) {
                                var skillStr = jv.skills;
                                if(skillStr.indexOf(',') > -1) {
                                        var skillArr =  skillStr.split(',');
                                        angular.forEach(tss, function(sv,sk){
                                            if(sv && skillArr.indexOf(sk) > -1) {
                                                filtered_jobs.push(jv);
                                            }
                                        });
                                    } else {
                                        var skillArr =  skillStr.split(',');
                                        angular.forEach(tss, function(sv,sk){
                                            if(sv && skillArr.indexOf(sk) > -1) {
                                                filtered_jobs.push(jv);
                                            }
                                        });
                                    }
                           });
                            $scope.jobsResults = filtered_jobs;
                            $scope.jobsResults_count = filtered_jobs.length;
                            if($scope.jobsResults_count > 50) {
                                $scope.pageSize = 10;
                            } else {
                                $scope.pageSize = 5;
                            }
                            $scope.curPage = 1;
                            $scope.maxSize = Math.ceil($scope.jobsResults_count / $scope.pageSize);
                            
                        }
                     }
                           
                        
                }, true);
            $scope.mainContentShow = true;
        }, function(error){
            $scope.config.error = true;
            $scope.jobsResults_count = 0;
        });
         }
     };   
}]);      
         
commonServices.factory('sidebarService', ['$q', 'jobsService', 'setService', '$cookies', '$http', function($q, jobsService, setService, $cookies, $http) {
         
	 return {
		 salary_list : jobsService.salary_list,
		 state_list : jobsService.state_list,
		 sidebar: function($scope) {
			 $scope.sidebar_mode = true;
			 $scope.edit_candidate_info_mode = true;
			 var uProfile = setService.get('uProfile');
			 if(!uProfile) {
				 var ctokenid = $cookies.get('tokenid');
				 jobsService.tokenCheck(ctokenid).then(function(){
					var uProfile = setService.get('uProfile');
					$scope.candidate_fname = uProfile.fname;
					$scope.candidate_lname = uProfile.lname;
					$scope.candidate_position  = uProfile.position;
					$scope.candidate_city  = uProfile.city;
					$scope.candidate_state  = uProfile.state;
					$scope.candidate_salary = uProfile.salary;
					$scope.candidate_email  = uProfile.email;
					$scope.candidate_githuburl  = uProfile.githuburl;
                                        $scope.candidate_resumeuploadedfile = (uProfile.resumeuploadedfile)? uProfile.resumeuploadedfile : [];
					$scope.cid = uProfile.$id;
					$scope.profilecompleted = uProfile.profilecompleted;
					$scope.discover = uProfile.discover;
					$scope.learn = uProfile.learn;
					$scope.plan = uProfile.plan;
					$scope.apply = uProfile.apply;
					$scope.logincount = uProfile.logincount;
					$scope.profilesaved = (uProfile.profilesaved)? uProfile.profilesaved : 'no';
                                        $scope.test_code = (uProfile.test_code)? uProfile.test_code : [];
                                        $scope.test_skill = (uProfile.test_skill)? uProfile.test_skill : [];
                                        $scope.personalize = (uProfile.personalize)? uProfile.personalize : '';
                                        $scope.visions = (uProfile.visions)? uProfile.visions : [];
							
					}, function(){
						$location.path('/login');
					});
			} else {
				$scope.candidate_fname = uProfile.fname;
				$scope.candidate_lname = uProfile.lname;
				$scope.candidate_position  = uProfile.position;
				$scope.candidate_city  = uProfile.city;
				$scope.candidate_state  = uProfile.state;
				$scope.candidate_salary = uProfile.salary;
				$scope.candidate_email  = uProfile.email;
				$scope.candidate_githuburl  = uProfile.githuburl; 
                                $scope.candidate_resumeuploadedfile = (uProfile.resumeuploadedfile)? uProfile.resumeuploadedfile : [];
				$scope.cid = uProfile.$id;
				$scope.profilecompleted = uProfile.profilecompleted;
				$scope.discover = uProfile.discover;
				$scope.learn = uProfile.learn;
				$scope.plan = uProfile.plan;
				$scope.apply = uProfile.apply;
				$scope.logincount = uProfile.logincount;
				$scope.profilesaved = (uProfile.profilesaved)? uProfile.profilesaved : 'no';
                                $scope.test_code = (uProfile.test_code)? uProfile.test_code : [];
                                $scope.test_skill = (uProfile.test_skill)? uProfile.test_skill : [];
                                $scope.personalize = (uProfile.personalize)? uProfile.personalize : '';
                                $scope.visions = (uProfile.visions)? uProfile.visions : [];
                                
			}
			
			$scope.edit_candidate_info = function() { 
				$scope.edit_candidate_info_mode = true;
			}
	
			$scope.save_candidate_info = function() {
				if($scope.profilesaved == 'no') {
					var postdata = {
						fname: $scope.candidate_fname,
						lname: $scope.candidate_lname,
						position: $scope.candidate_position,
						city: $scope.candidate_city,
						state: $scope.candidate_state,
						salary: $scope.candidate_salary,
						email: $scope.candidate_email,
						githuburl: $scope.candidate_githuburl,
						profilesaved: 'yes',
						profilecompleted: $scope.profilecompleted + 25

					};
				} else {
					var postdata = {
						fname: $scope.candidate_fname,
						lname: $scope.candidate_lname,
						position: $scope.candidate_position,
						city: $scope.candidate_city,
						state: $scope.candidate_state,
						salary: $scope.candidate_salary,
						email: $scope.candidate_email,
						githuburl: $scope.candidate_githuburl
					};
				}
				jobsService.updateCandidateById($scope.cid, postdata).then(function(data){
					 angular.forEach(data, function(v,k) {
						 $scope[k] = v;
					 });
					 
					alert("successfully updated");
					console.log(data);
				}, function(){
					alert("not updated");
				});
				$scope.edit_candidate_info_mode = false;
			}
			
			$scope.upload_resume = function() { console.log("upload");
				var dataObj = {
					client_id: 'fd419968-6d2f-47d1-bfad-a701512acf87',
					response_type: 'code',
					redirect_uri: '',
					state: ''
				}
                                       
				var res = $http({    method: 'POST',
                                                    url: 'https://auth.bullhornstaffing.com/oauth/authorize',
                                                    data: dataObj,
                                                    dataType: 'jsonp',
                                                    withCredentials: true,
                                                    headers : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' }
                                               });		
				res.success(function(data, status, headers, config) {
					$scope.message = data;
						alert(data);
				});			
			}
		 }
	 };
}]);

commonServices.factory('setService', [ '$q', function($q) {
        var data = [];
        return {
            
            set: function(key, value) {
                data[key] = value;
            },
            
            get: function(key) {
                if(data[key]) {
                    return data[key];
                } else {
                    return false;
                }
            }
        };
        
}]);
