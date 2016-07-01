<?php

define('DRUPAL_ROOT', '/app/drupal_root');
echo DRUPAL_ROOT;
//chdir('/app/drupal_root');
include_once DRUPAL_ROOT . '/includes/bootstrap.inc';
drupal_bootstrap(DRUPAL_BOOTSTRAP_DATABASE);

$query = db_select('node', 'n');

$query
->condition('nid', 28802)
->fields('n', array('type', 'nid', 'title'))
->range(0, 100);

$result = $query->execute();


foreach($result as $row){
      // echo t('id: '.$row->nid .' Type: '.$row->type. " Title: ".$row->title."<br/>";
          echo t('ID : %nid <br> Type: %type <br> Title: %title', array('%nid'=> $row->nid, 
                  '%type'=>$row->type,
                          '%title'=>$row->title));
}

?>

















// $query = db_select('node', 'n');
//
// $query 
// ->condition('type','oa_space');
// ->fields('r', array('name'));
//
// $result = $query->execute();
//
// foreach($result as $row){
//     echo $row->name."<br/>";
// }
  //query = db_select('node', 'n');
  //query
  //>condition('type', 'oa_group')
  //>fields('n', array('title'));
  //result = $query->execute();
  //oreach ($result as $row){
  //cho  $row->title."<br/>";
  //



// $result = db_query("SELECT type FROM {node_type} ");
// foreach ($result as $row){
// echo $row->type. "<br/>";
// }
//


