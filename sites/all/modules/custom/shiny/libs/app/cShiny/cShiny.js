/**
* cShiny Module
*
* Description
*/

angular.module('cShiny', [])
    .component('mainComponent', {

                //define
        //module path
        //sites/all/modules/custom/shiny/libs/
        //template path
        //TODO find an alternative way to fix this hard coded url
    
        // templateUrl : 'app/cShiny/templates/mainComponent.html',
        templateUrl : function(){
            var hostName = document.location.href.slice(0,24);
            var modulePath = '/sites/all/modules/custom/shiny/libs/'
            return hostName + modulePath + 'app/cShiny/templates/mainComponent.html';
        },
        bindings: {},
        // transclude : true,
        controller : ['Api', function MainComponentController (Api) {
            var ctrl = this;
            // ctrl.childComponent = {};
            // TODO : Data Block model
            ctrl.dataBlock = {
                compound : 'asdf',
                dataBlock : 'sdf'
            };


            //Pass data block to child component for shiny initialization
            ctrl.updateData = function(){
                //childComponent is initialized in the template file
                //It is used to communicate with child component
                ctrl.childComponent.update(ctrl.dataBlock);
            };

            //Get site map
            ctrl.getSiteMap = function(){
                    Api.getSiteMap().then(
                    function success(res){ console.log(res.data); }, 
                    function failed(res){ console.log('no data');}
                );
            };

            

             
            ctrl.getSpaceParents = function (){

                Api.getSpaceParents().then(
                    function(res){
                        ctrl.spaceParents = res.resData;
                    }
                );
            };
        }],

    })

    .component('childComponent', {
        // templateUrl : 'app/cShiny/templates/childComponent.html',
        templateUrl : function(){
            var hostName = document.location.href.slice(0,24);
            var modulePath = '/sites/all/modules/custom/shiny/libs/'
            return hostName + modulePath + 'app/cShiny/templates/childComponent.html';
        },        
        require : { parentC : '^mainComponent'},
        // transclude : true,
        controller : ChildCC,

        // = means that we’re using a two-way data binding. This means that if you update that variable in your component scope, the change will be reflected on the parent scope;
        // < is for one-way bindings when we just want to read a value from a parent scope and not update it;
        // @ is for string parameters;
        // & is for callbacks in case your component needs to output something to its parent scope.
                //api is used to communicate with the main component
        bindings : {api : '='}
     })

    .component('newblockComponent', {
        templateUrl : function(){
            var hostName = document.location.href.slice(0,24);
            var modulePath = '/sites/all/modules/custom/shiny/libs/'
            return hostName + modulePath + 'app/cShiny/templates/newBlockComponent.html';
        },
        controller : ['Api', function (Api){
            var ctrl = this;

            ctrl.datablock = {
                nid : 0,
                datablock_type : '',
                datablock_name : '',
            };

            ctrl.$onInit = function(){
                Api.getSpaceParents().then(
                    function(res){
                        console.log(res);
                        ctrl.spaceParents = res;
                    }
                );
            };

            ctrl.submit = function(){
                Api.postDatablock(ctrl.datablock).then(function(res){
                    console.log(res);
                });
            };
        }],

        //  
    });



function ChildCC () {
    var ctrl = this;
    //True = show, false = hidden
    ctrl.state = false;

    ctrl.$onInit = function () {
        //init api <- to communicate with main component
        ctrl.api = {};
        //api = mainComopnent.controller.childComponent
        ctrl.api.update = updateIframe;

    }


    ctrl.fullscreen = function(){

    };


    //Datablock is passed from main component
    function updateIframe (dataBlock) {
        var iframe = document.getElementById("shinyIframe")
        var baseUrl = 'https://huypham.shinyapps.io/exApp/?';

        var data = extractDataBlock(dataBlock);

        url = baseUrl + data;
        //set <iframe src="">
        iframe.src = url ;
        //show the frame 
        //TODO catch if the connection failed 
        ctrl.state = true;  
    }

    //Helper function to generate url for iframe
    function extractDataBlock(argument){
        var data = '';

        angular.forEach( argument, function(key, value) {
            data += key + '=' + value + '&';
        });
        //slice off the trailing comma
        data = data.slice(0,-1);

        return data;
    }


 };

// var Node = function (id, title, url, parents) {
//      this.nid = id;
//      this.title = title;
//      this.url = url;
//      this.spaceParents = parents
// }

var SpaceParents = function (parents) {
     this.parents = [];

}


var Node = function (nid, title) {
                     this.nid = nid;
                     this.title = title; 
                }