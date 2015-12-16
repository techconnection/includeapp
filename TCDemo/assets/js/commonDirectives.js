var commonDirectives = angular.module('common.directives', []);

commonDirectives.directive('loading', function () {
    
    return {
        restrict: 'AE',
        templateUrl: function(elem, attr) {
            return attr.path+'templates/loading.html';
        },
        link: function (scope, element, attr) { 
            scope.path = attr.path;
            console.log(scope.path);
            scope.$watch('config.loading', function (val) {
                if (val)
                    $(element).show();
                else
                    $(element).hide();
            });
        }
    };
});

commonDirectives.directive('error', function () {
    return {
        restrict: 'AE',
        templateUrl: function(elem, attr) {
            return attr.path+'templates/error.html';
        },
        link: function (scope, element, attr) {
            scope.path = attr.path;
            scope.$watch('config.error', function (val) {
                if (val)
                    $(element).show();
                else
                    $(element).hide();
            });
        }
    };
});

commonDirectives.directive('back', function () {
    return {
        restrict: 'AE',
        template: '<button class="btn btn-primary-blue">  Back </button>',
        link: function(scope, element, attrs) {
            $(element).on('click', function() {
                history.back();
                scope.$apply();
            });
        }
    };
});


