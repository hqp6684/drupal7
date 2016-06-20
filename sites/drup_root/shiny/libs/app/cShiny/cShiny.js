/**
* cShiny Module
*
* Description
*/

// = means that we’re using a two-way data binding. This means that if you update that variable in your component scope, the change will be reflected on the parent scope;
// < is for one-way bindings when we just want to read a value from a parent scope and not update it;
// @ is for string parameters;
// & is for callbacks in case your component needs to output something to its parent scope.
angular.module('cShiny', [])
    .component('mainComponent', {

                //define
        //module path
        //sites/all/modules/custom/shiny/libs/
        //template path
        //TODO find an alternative way to fix this hard coded url
    
        // templateUrl : 'app/cShiny/templates/mainComponent.html',
        templateUrl : 'http://development.pku.pdms.jnj.com/sites/all/modules/custom/shiny/libs/app/cShiny/templates/mainComponent.html',
        bindings: {},
        //transclude : true,
        controller : MainComponentController,

    })

    .component('childComponent', {
        // templateUrl : 'app/cShiny/templates/childComponent.html',
        templateUrl : function(){
            var hostName = document.location.href.slice(0,35);
            var modulePath = '/sites/all/modules/custom/shiny/libs/'
            return hostName + modulePath + 'app/cShiny/templates/childComponent.html';
        },        
        require : { parentC : '^mainComponent'},
        //transclude : true,
        controller : ChildCC,
        //
        //api is used to communicate with the main component
        bindings : {api : '='}

    });


function MainComponentController (){
    var ctrl = this;

    // TODO : Data Block model
    ctrl.dataBlock = {
        compound : '',
        dataBlock : ''
    };

    //Pass data block to child component for shiny initialization
    ctrl.updateData = function(){
        //childComponent is initialized in the template file
        //It is used to communicate with child component
        ctrl.childComponent.update(ctrl.dataBlock);
    }
}// Main component controller


function ChildCC () {
    var ctrl = this;
    //True = show, false = hidden
    ctrl.state = false;

    ctrl.$onInit = function () {
        //Init iframe
        iframeInit();
        //init api <- to communicate with main component
        ctrl.api = {};
        //api = mainComopnent.controller.childComponent
        ctrl.api.update = updateIframe;

    }

    //Iframe model
    ctrl.frame = {
        wrapper : document.getElementById("shinyIframeContainer"),
        iFrame  : document.createElement('iframe')
    };

    function iframeInit (){    
        ctrl.frame.iFrame.width = '60%';
        ctrl.frame.iFrame.height = '500';
        ctrl.frame.wrapper.appendChild(ctrl.frame.iFrame);
    }

    //Datablock is passed from main component
    function updateIframe (dataBlock) {
        var baseUrl = 'https://huypham.shinyapps.io/exApp/?';

        var data = extractDataBlock(dataBlock);

        url = baseUrl + data;
        //set <iframe src="">
        ctrl.frame.iFrame.src = url ;
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

}




