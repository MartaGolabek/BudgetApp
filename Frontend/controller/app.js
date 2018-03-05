(function() {
'use strict';

var app = angular.module('budgetApp', ['ngRoute']);

app.config(function($routeProvider){
  return $routeProvider
    .when('/targets', {
      templateUrl: 'templates/targets.html'
    })
    .when('/expenses', {
      templateUrl: 'templates/expenses.html'
    })
    .when('/analysis', {
      templateUrl: 'templates/analysis.html'
    })
    .otherwise({ redirectTo: '/' });
});

app.controller("budgetController", ['$scope', '$http', function($scope, $http) {
    var API_HOST = 'http://127.0.0.1:8080/';
    $scope.saveShow = false;
    $scope.budgetSaveShow = false;

    /****************************************************** GET *************************************************/

    $http.get(API_HOST + "expenses")
    .then(function(response) {
        $scope.expenses = response.data;
        console.log($scope.expenses)
    });

    $http.get(API_HOST + "targets")
    .then(function(response) {
        $scope.budgetDetails = response.data;
        $scope.budgetDetails.forEach(function (b) {
            b.YEAR = b.YEAR.toString();
        });
        console.log($scope.budgetDetails)
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

        // $scope.budgetDetails = [
        // {
        //     'YEAR': '2018',
        //     'MONTH': 'April',
        //     'BUD_VALUE': 800
        // },
        // {
        //     'YEAR': '2018',
        //     'MONTH':'June',
        //     'BUD_VALUE': 850
        // },
        // {
        //     'YEAR': '2018',
        //     'MONTH': 'April',
        //     'BUD_VALUE': 600
        // }];

        var getDate = function() {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();

            if(dd<10) {
                dd = '0'+dd;
            } 

            if(mm<10) {
                mm = '0'+mm;
            } 

            today = yyyy + '-' + mm + '-' + dd;

            return today
        }

        /************************************************ POST *****************************************************/
    
        $scope.addNew = function(productDetail){
            // $scope.expenses.push({
            //     'PRODUCT_NAME': "", 
            //     'PRODUCT_CAT': $scope.productCategories[0].cat,
            //     'PRICE': "",
            //     'DATE': getDate()
            // });

            console.log('Add new');

            $http.post(API_HOST + 'expenses', {"product_name": "Type your product", "product_cat": $scope.productCategories[0].cat, "price": "0", "date": getDate() })
            .then(function(response) {
                console.log('POST');
                console.log(response);
            });
        }

        $scope.addNewBudget = function(productDetail){
            console.log('Add new budget!');

            $http.post(API_HOST + 'targets', {"year": $scope.budgetEntity.year, "month": $scope.budgetEntity.month, "budget": $scope.budgetEntity.budgetValue })
            .then(function(response) {
                console.log('POST');
                console.log(response);
            });
        }

        /**************************************************** PUT ************************************************88*/

        $scope.changedIDs = new Set();
    
        $scope.saveChanges = function() {
            $scope.changedIDs.forEach(function(e) {
                    var found = $scope.expenses.find(function(element) {
                      return element.ID == e;
                    });

                    $http.put(API_HOST + 'expenses/' + e, {"product_name": found.PRODUCT_NAME, "product_cat": found.PRODUCT_CAT, 
                        "price": found.PRICE, "date": found.DATE}).then(function(response) {
                    console.log('PUT');
                    console.log(response);
                });      
            });

            $scope.saveShow = false;
            $scope.changedIDs = new Set();
        }

        $scope.adjustShowBtn = function(id) {
            console.log('Changed id:')
            console.log(id);
            $scope.changedIDs.add(id);

            $scope.saveShow = true;
        }


        $scope.budgetChangedIDs = new Set();
    
        $scope.budgetSaveChanges = function() {
            $scope.budgetChangedIDs.forEach(function(e) {
                    var found = $scope.budgetDetails.find(function(element) {
                      return element.ID == e;
                    });

                    $http.put(API_HOST + 'targets/' + e, {"year": found.YEAR, "month": found.MONTH, 
                        "bud_value": found.BUD_VALUE}).then(function(response) {
                    console.log('PUT');
                    console.log(response);
                });      
            });

            $scope.budgetSaveShow = false;
            $scope.budgetChangedIDs = new Set();
        }

        $scope.adjustShowBudgetBtn = function(id) {
            console.log('Changed id:')
            console.log(id);
            $scope.budgetChangedIDs.add(id);

            $scope.budgetSaveShow = true;
        }

        /***************************************************** DELETE **************************************************************/

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

        $scope.removeBudget = function(){
            var newDataList=[];
            $scope.selectedAllBudgets = false;
            angular.forEach($scope.budgetDetails, function(selected){
                if(!selected.selected){
                    newDataList.push(selected);                
                } else {
                    $http.delete(API_HOST + 'targets/' + selected.ID, {params: {ID: selected.ID}}).then(function(response) {
                        console.log('DELETE');
                        console.log(response);
                    });
                }
            }); 
            $scope.budgetDetails = newDataList;
        };

        /******************************************************* SELECT *************************************************************8*/
    
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
        $scope.selectedAllBudgets = false;

        $scope.checkAll = function () {
            angular.forEach($scope.expenses, function(expense) {
                expense.selected = $scope.selectedAll;
            });
        }

        $scope.checkAllBudgets = function () {
            angular.forEach($scope.budgetDetails, function(budget) {
                budget.selected = $scope.selectedAllBudgets;
            });
        }

}]);

})();