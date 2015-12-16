<?php

header('Access-Control-Allow-Origin: http://tccareerblazers.com');

?><!DOCTYPE html>
<html ng-app="candidateApp">
<head>
    <title>Candidate</title>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
    <meta name="description" content="Candidate Dashboard, Candidate View">
    <script src="assets/js/jquery-1.11.3.min.js"></script>
    <script src="assets/js/angular.min.js"></script>
    <script src="assets/js/ui-bootstrap-tpls-0.14.3.min.js"></script>
    <script src='assets/js/firebase.js'></script>
    <script src="assets/js/angularfire.min.js"></script>
    <script src="assets/js/angular-route.js"></script>
    <script src="assets/js/angular-cookies.js"></script>
    <script src="assets/js/app.js"></script>
    <script src="assets/js/ctrl.js"></script>
    <script src="assets/js/goalsTable.js"></script>
    <script src="assets/js/upload.js"></script>
    <script src="assets/js/commonService.js"></script>
    <script src="assets/js/commonDirectives.js"></script>
    <script src="assets/js/commonFilters.js"></script>
    <script src="assets/js/bootstrap.min.js"></script>
    <link href="assets/css/bootstrap.min.css" rel="stylesheet"/>
    <link rel="stylesheet" href="assets/css/style.css"/>
</head>
<body class="ng-cloak" >
    <div class="fluid-container">
        <div ng-view></div>
        
    </div>
</body>
</html>
