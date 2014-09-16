'use strict';

var app = angular.module('angularTask', []);

app.factory('TimeService', function($http) {
   return {
     getTimestamp: function() {
       return $http.get('/api/current').then(function(result) {
                return result.data;
       });
     }
   }
});

/* First Solution */
app.controller('TimerController',  ['$scope' , '$timeout' , 'TimeService' ,
 function($scope, $timeout, TimeService){

	var timer = function(){
		TimeService.getTimestamp().then(function(data) {
        $scope.currentTimestamp = data;
        $timeout(timer, 1000);
   		});
	}; 

$timeout(timer, 0);

}]);

/* Second Solution */
app.directive('myCurrentTime', ['$interval', '$filter', 'dateFilter', 'TimeService',
   function($interval,  $filter, dateFilter, TimeService) {

    function link(scope, element, attrs) {
      var format,timeoutId;

      function updateTime() {
	  			TimeService.getTimestamp().then(function(data) {
	        	element.text($filter('date')(data, 'yyyy-MM-dd HH:mm:ss'));
	   		});
      };

      timeoutId = $interval(function() {
        updateTime(); 
      }, 1000);

 	updateTime();

    };

    return {
      link: link
    };
  }]);