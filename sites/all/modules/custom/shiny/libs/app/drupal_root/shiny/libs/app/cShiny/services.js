
/**
* cShinyServices Module
*
* Description
*/

angular.module('cShiny').
    factory('Api', ['$http', '$q', function($http, $q){

        //Get space parents of the current node
        //@return array of Node objects
        //[0] is the top parent
        function GetSpaceParent(){
            var deferred = $q.defer();

            var spaceParents = [];
            angular.forEach(
                //Drupal.settings space_parents is json string

                JSON.parse(Drupal.settings.Api.space_parents), 
                function (value, key) {
                    this.push(new Node(key,value)); 
                },
                spaceParents
            );
            deferred.resolve(spaceParents);

            return deferred.promise;        
        };

        return {

            getSpaceParents : GetSpaceParent,

        };

    }]);//angular


var Node = function (nid, title) {
    this.nid = nid;
    this.title = title; 
}