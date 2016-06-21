<?php
echo getcwd();
define('DRUPAL_ROOT', 'C:\xampp/htdocs/drupal7/');

include_once(DRUPAL_ROOT . 'includes/bootstrap.inc');

drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);

//https://www.leaseweb.com/labs/2015/10/creating-a-simple-rest-api-in-php/

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

@$username = $request->email;
@$pass = $request->pass;
echo $pass;


?>