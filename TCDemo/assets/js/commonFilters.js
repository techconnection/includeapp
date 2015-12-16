var commonFilters = angular.module('common.filters', []);


commonFilters.filter('pagination', function()
{
    return function(input, start)
    {
    start = +start;
    if(input !== undefined)
    return input.slice(start);
    };
});