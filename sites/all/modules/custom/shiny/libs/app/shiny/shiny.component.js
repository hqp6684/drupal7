
//Shiny component

angular.module('shiny').  //Register shiny component on shiny module
    component('shiny', { 

        //define
        //module path
        //sites/all/modules/custom/shiny/libs/
        //template path
        //TODO find an alternative way to fix this hard coded url
        templateUrl : 'http://localhost/drupal7/sites/all/modules/custom/shiny/libs/app/shiny/shiny.template.html',

        //controller 
/*
**For minifacation
controller : [$service, function C()]
in-line annotation where, instead of just providing the function, 
you provide an array. This array contains a list of the service 
names, followed by the function itself as the last item of the array.
 */
        
        controller : [ 'getNameList', function shinyController(getNameList){
        //declare component data members here 
            //this bound to component, not controller
            this.nameList = [];
            var that = this;
            getNameList.nameList().then(function (response){
                that.nameList = response.data;
            });

            //data block
            this.compound = 'Gainer';
            this.dataBlock = 'Clinical';


            this.orderProp = 'first';


            this.dataBlock = {
                compound : "compound",
                dataBlock : "data block"
            };

            this.updateData = function(){
                console.log(that.dataBlock);
            };

        }]//controller 

    }//component body
);


