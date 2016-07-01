<?php


/*  Registerd path : /shinyApi

When path http://origin/shinyApi  is requested, no further path components are in the request, and no additional arguments are passed to the callback function (so $arg1 and $arg2 would take the default values as defined in the function signature). When http://origin/shinyApi/123/foo' is requested, $arg1 will be '123' and $arg2 will be 'foo'. Note that this automatic passing of optional path arguments applies only to page and theme callback functions

*/
function shiny_api_handler($arg1 = '', $arg2 = ''){

    //Categirize and delegate to appropriate handler
    //http://php.net/manual/en/reserved.variables.server.php
    switch ($_SERVER['REQUEST_METHOD']) {
        case 'POST':
            # code...
            break;
        case 'PUT':
        // code ...
            break;
        case 'HEAD':
        // code ...
            break;
        
        default: //'GET'
            # code...
            break;
    }

    $data = file_get_contents("php://input");
    $data = json_decode($data, TRUE);
    // drupal_json_output($data);
    // http://php.net/manual/en/function.header.php
    // header('HTTP/1.1 201 Created');
    // header('HTTP/1.1 204 Incorrect Data');
    // echo t('agr1 = %a1 : arg2 = %a2', array('%a1'=>$arg1, '%a2'=>$arg2));
    if($arg1 ==)


    // drupal_exit(); //REMEMBER TO close connection
}

// Shiny API gatetway  
function shiny_register_new_block(){
    $data = file_get_contents("php://input");
    $data = json_decode($data, TRUE);

    $table = 'shiny';
    $record = new stdClass();
    $record -> nid = $data['nid'];
    $record -> datablock_type  = $data['datablock_type'];
    $record -> datablock_name = $data['datablock_name'];
    $record -> configs = 0;
    drupal_write_record($table,$record);

    drupal_json_output($data);

    drupal_exit();

    // Validate the request is a post and return proper response code on failure.
    // if ($_SERVER['REQUEST_METHOD'] != 'POST'){
    //    header('HTTP/1.1 405 Not Post');
    // }
    // // Authenticate the user, or key and return proper response code on failure.
    // elseif ($_SERVER['PHP_AUTH_USER'] != 'trusted user') {
    //  header('HTTP/1.1 401 Not Authorized');
    // }
     
    // // When data type and field validation fails return a 204.
    // elseif ($validation == FALSE) {
    //  header('HTTP/1.1 204 Incorrect Data');
    // }
    // // Set header to indicate the item was saved.
    // return header('HTTP/1.1 201 Created');

}

