
/**
* cShinyServices Module
*
* Description
*/

angular.module('cShiny').factory('Api', ['$http', function($http){

    return {
        test : function (argument) {
             // body... 
             console.log('hello world');

             var request = $http({

                method: 'post',
                url : 'http://localhost/drupal7/sites/all/modules/custom/shiny/dataBase.php',
                data : {username:'test1', pass:'test2'},
                headers : {'content-type': 'application/x-www-form-urlencoded'}
            });

            // request.success(function(data){
            //     console.log(data);
            // });
            request.then( function success(res){
                console.log(res);
            }, function fail(res){
                console.log(res);
            });
        },
    };
}])


