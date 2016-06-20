<?php

define('DRUPAL_ROOT', getcwd());
include_once DRUPAL_ROOT . '/includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_DATABASE);

$query = db_select('role', 'r');

$query 
->condition('rid', 2)
->fields('r', array('name'));

$result = $query->execute();

foreach($result as $row){
    echo $row->name."<br/>";
}


// $query = db_select('node', 'n');

// $query
// ->condition('node', 'type')
// ->fields('n', array('type'))
// ->range(0, 100);

// $result = $query->execute();

// foreach($result as $row){
//     echo $row->type."<br/>";
// }

// $result = db_query('SELECT type FROM {node}');
// foreach($result as $type){
//     echo $type->type."<br/>";
// }


$query = db_select('node', 'n');

$query
->condition('type', 'oa_space')
->condition('nid', 2, '>=')
->fields('n', array('type', 'nid', 'title'))
->range(0, 100);

$result = $query->execute();

foreach($result as $row){
    echo $row->nid .$row->type. " ".$row->title."<br/>";
}
?>