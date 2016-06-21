
//NOTE: 
//Have to define controller's scope by using ng-controller : ie <div ng-controller="MainCom.."> </div>
// Because scope is defined using ng-controller, data-binding doesn't need $ctrl

// angular.module('cShiny').controller('MainComponentController', ['$scope', 'Api', function($scope, Api){
//     var ctrl = $scope;
//     // ctrl.childComponent = {};
//     // TODO : Data Block model
//     ctrl.dataBlock = {
//         compound : 'asdf',
//         dataBlock : 'sdf'
//     };

//     //Pass data block to child component for shiny initialization
//     ctrl.updateData = function(){
//         //childComponent is initialized in the template file
//         //It is used to communicate with child component
//         ctrl.childComponent.update(ctrl.dataBlock);
//     }   
// }]);




// angular.module('cShiny').controller('ChildCC', ['$scope', function ($scope) {
//     var ctrl = $scope;
//     //True = show, false = hidden
//     ctrl.state = false;

//     ctrl.$onInit = function () {
//         //Init iframe
//         iframeInit();
//         //init api <- to communicate with main component
//         ctrl.api = {};
//         //api = mainComopnent.controller.childComponent
//         ctrl.api.update = updateIframe;

//     }

//     //Iframe model
//     ctrl.frame = {
//         wrapper : document.getElementById("shinyIframeContainer"),
//         iFrame  : document.createElement('iframe')
//     };

//     function iframeInit (){    
//         ctrl.frame.iFrame.width = '60%';
//         ctrl.frame.iFrame.height = '500';
//         ctrl.frame.wrapper.appendChild(ctrl.frame.iFrame);
//     }

//     //Datablock is passed from main component
//     function updateIframe (dataBlock) {
//         var baseUrl = 'https://huypham.shinyapps.io/exApp/?';

//         var data = extractDataBlock(dataBlock);

//         url = baseUrl + data;
//         //set <iframe src="">
//         ctrl.frame.iFrame.src = url ;
//         //show the frame 
//         //TODO catch if the connection failed 
//         ctrl.state = true;  
//     }

//     //Helper function to generate url for iframe
//     function extractDataBlock(argument){
//         var data = '';

//         angular.forEach( argument, function(key, value) {
//             data += key + '=' + value + '&';
//         });
//         //slice off the trailing comma
//         data = data.slice(0,-1);

//         return data;
//     }


// }]);
