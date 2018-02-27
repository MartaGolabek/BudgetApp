(function() {
'use strict';

angular.module('budgetApp', [])
.controller("budgetController", ['$scope', function($scope) {

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


}]);

})();