//This contains/defines the main module declaration

	//By passing shiny inside the dependencies array 
	//when defining the devApp module, Angular will 
	//make all entities registered on shiny available on devApp as well.

angular.module('devApp', [

		'shiny'
	]);