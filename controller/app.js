(function() {
'use strict';

var app = angular.module('budgetApp', ['ngRoute']);

app.config(function($routeProvider){
  return $routeProvider
    .when('/targets', {
      controller: 'budgetController',
      templateUrl: 'templates/targets.html'
    })
    .when('/expenses', {
      controller: 'budgetController',
      templateUrl: 'templates/expenses.html'
    })
    .when('/analysis', {
      controller: 'budgetController',
      templateUrl: 'templates/analysis.html'
    })
    .otherwise({ redirectTo: '/' });
});

app.controller("budgetController", ['$scope', function($scope) {

	// mockup for year select
	// TODO: implement CRUD operations
	$scope.data = {
	    model: '1',
	    years: [
	      {id: '1', year: '2018'},
	      {id: '2', year: '2019'},
	      {id: '3', year: '2020'},
	      {id: '3', year: '2021'}
	    ]
	   };

	   $scope.data2 = {
	    model: '1',
	    months: [
	      {id: '1', month: 'January'},
	      {id: '2', month: 'February'},
	      {id: '3', month: 'March'},
	      {id: '4', month: 'April'},
	      {id: '5', month: 'May'},
	      {id: '6', month: 'June'},
	      {id: '7', month: 'July'},
	      {id: '8', month: 'August'},
	      {id: '9', month: 'September'},
	      {id: '10', month: 'October'},
	      {id: '11', month: 'November'},
	      {id: '12', month: 'December'}
	    ]
	   };

	   $scope.budgetValue = 1000;

		
		$scope.budgetEntity = {
			year: '2018',
			month: 'June',
			budgetValue: 0
		};

		// test
		$scope.personalDetails = [
        {
            'fname':'Muhammed',
            'lname':'Shanid',
            'email':'shanid@shanid.com'
        },
        {
            'fname':'John',
            'lname':'Abraham',
            'email':'john@john.com'
        },
        {
            'fname':'Roy',
            'lname':'Mathew',
            'email':'roy@roy.com'
        }];
    
        $scope.addNew = function(personalDetail){
            $scope.personalDetails.push({ 
                'fname': "", 
                'lname': "",
                'email': "",
            });
        };
    
        $scope.remove = function(){
            var newDataList=[];
            $scope.selectedAll = false;
            angular.forEach($scope.personalDetails, function(selected){
                if(!selected.selected){
                    newDataList.push(selected);
                }
            }); 
            $scope.personalDetails = newDataList;
        };
    
    $scope.checkAll = function () {
        if (!$scope.selectedAll) {
            $scope.selectedAll = true;
        } else {
            $scope.selectedAll = false;
        }
        angular.forEach($scope.personalDetails, function(personalDetail) {
            personalDetail.selected = $scope.selectedAll;
        });
    };    	


}]);

})();