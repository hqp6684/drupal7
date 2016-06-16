/**
* shinyService Module
*
* Description
    Use http calls to get data
*/
angular.module('shinyService', []).
factory('getNameList', ['$http', function($http){

    var refresh = function(aList){ 
        return $http.get('http://localhost/drupal7/sites/all/modules/custom/shiny/libs/app/data.json');
        // .then(function(response) {
        //     //console.log(response.data);
        //     //emptyArray = response.data
        //     aList = response.data;
        //     //console.log(this.nameList +"name list");

        // }); 
    };


//Have to return some kind of data
    return {
        nameList : refresh,
    };

}]);