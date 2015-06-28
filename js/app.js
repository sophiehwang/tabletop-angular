var app = angular.module('tableApp', ['times.tabletop']);

app.config(function(TabletopProvider){
  TabletopProvider.setTabletopOptions({
    key: 'https://docs.google.com/spreadsheets/d/13G0e47dV4AVriU7vS0FTyAlljPUH01m8ethS8TmYdHo/pubhtml?gid=0&single=true',
    simpleSheet: true
  });
});



app.controller("tableCtrl", ['$scope', '$http', 'Tabletop', function ($scope, $http, Tabletop) {


        /* test json
        $http.get('data/output.json').success(function(data) {
           $scope.spots = data;
        }).error(function(data) {
            console("unable to load");
        });
        */

        // Tabletop.then(function(ttdata){
        //       var data = ttdata[0];
        //       console.log(data);
        // });
        Tabletop.then(function(tabletopData) {
               $scope.data = tabletopData[0];
              //  console.log(tabletopData);
        });

        $scope.loadMap = function(long, lat){
            $scope.long = long;
            $scope.lat = lat;

        };


}]);

app.filter('trustAsHtml', ['$sce', function($sce){
	return function(text) {
		return $sce.trustAsHtml(text);
	};
}]);
