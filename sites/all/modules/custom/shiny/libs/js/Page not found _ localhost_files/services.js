
/**
* cShinyServices Module
*
* Description
*/

angular.module('cShiny').factory('Api', ['$http', '$log', '$q', function($http, $log, $q){

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


        getSiteMap : function (){
            var request = $http({
                method: 'get',
                // url : 'http://localhost/drupal7/sites/all/modules/custom/shiny/drupal_root_map.json',
                url : 'http://localhost/drupal_root/restAPI.php/abc/123'
            });

            return request;

            
        },

        getSpaceParents : function(){
            // var spaceParents = Drupal.settings.Api.space_parents;
            var deferred = $q.defer();

            var request = $http({
                method : 'get',
                url : 'http://localhost/drupal_root/restAPI.php/node/123',
            });

            request.then(function (res) {
                
                var log = [];

                angular.forEach(res.data, function (value, key) {
                        this.push(new Node(key,value)); 
                    },
                    log
                );
                deferred.resolve(log);
                

            });

            return deferred.promise;
        },

        postDatablock : function(datablock){

            var deferred = $q.defer();

            $http({
                method : 'POST',
                url : (window.location.origin +'/shiny/register/block'),

            }).then(function(err,res){

            });

            deferred.resolve('resCode = 200'+ datablock.type);



            return deferred.promise;
        },



    };
}])


