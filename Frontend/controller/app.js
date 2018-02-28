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

app.controller("budgetController", ['$scope', '$http', function($scope, $http) {
    var API_HOST = 'http://127.0.0.1:8080/'

    $http.get(API_HOST + "expenses")
    .then(function(response) {
        $scope.expenses = response.data;
        console.log($scope.expenses)
    });

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
		$scope.productCategories = [
			{id: 1, cat: 'Household'},
			{id: 2, cat: 'Bakery'},
			{id: 3, cat: 'Dairy & Eggs'},
			{id: 4, cat: 'Drinks'},
			{id: 5, cat: 'Fruits & Vegetables'},
			{id: 6, cat: 'Meat & Fish'},
			{id: 7, cat: 'Other food'},
			{id: 8, cat: 'Health & Beauty'},
			{id: 9, cat: 'Sport'},
			{id: 10, cat: 'Education'},
			{id: 11, cat: 'Hobby'},
			{id: 12, cat: 'Paper stationery'},
			{id: 13, cat: 'Baby'},
			{id: 14, cat: 'Music & Movies'},
			{id: 15, cat: 'Press & Books'},
			{id: 16, cat: 'Others'},
		];

		$scope.productDetails = [
        {
            'product':'Milk',
            'category':'Dairy & Eggs',
            'price':'0.80'
        },
        {
            'product':'Rolls',
            'category':'Bakery',
            'price':'1.60'
        },
        {
            'product':'Pen',
            'category':'Paper stationery',
            'price':'1.50'
        }];
    
        $scope.addNew = function(productDetail){
            $scope.expenses.push({
                'product': "", 
                'category': $scope.productCategories[0].cat,
                'price': "",
            });


        };
    
        $scope.remove = function(){
            var newDataList=[];
            $scope.selectedAll = false;
            angular.forEach($scope.expenses, function(selected){
                if(!selected.selected){
                    newDataList.push(selected);                
                } else {
                    $http.delete(API_HOST + 'expenses/' + selected.ID, {params: {ID: selected.ID}}).then(function(response) {
                        console.log('DELETE');
                        console.log(response);
                    });
                }
            }); 
            $scope.expenses = newDataList;
        };
    
    // TODO: check how checkAll works
    // $scope.checkAll = function () {
    //     console.log('checkAll start');
    //     console.log($scope.selectedAll);

    //     if (!$scope.selectedAll) {
    //         $scope.selectedAll = true;
    //         console.log('false -> true');
    //         console.log($scope.selectedAll);
    //     } else {
    //         $scope.selectedAll = false;
    //         console.log('true -> false');
    //         console.log($scope.selectedAll);
    //     }

    //     angular.forEach($scope.expenses, function(expense) {
    //         expense.selected = $scope.selectedAll;
    //         console.log(expense.selected);
    //     });
    // };

    $scope.selectedAll = false;

    $scope.checkAll = function () {
        angular.forEach($scope.expenses, function(expense) {
            expense.selected = $scope.selectedAll;
        });
    }

}]);

})();