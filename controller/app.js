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

	


}]);

})();