'use strict';

var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when(
    	'/',
    	{
    	    templateUrl: 'app/main/main.html',
    	    controller: 'MainController'
    	});
    $routeProvider.when(
    	'/view2',
    	{
    	    templateUrl: 'partials/partial2.html',
    	    controller: 'MyCtrl2'
    	});
    $routeProvider.otherwise(
        {
            redirectTo: '/view1'
        });
}]);