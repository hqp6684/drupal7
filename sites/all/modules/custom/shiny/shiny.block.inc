<?php


/*

Shiny block content generation logics
*/


function shiny_block_content_generate(){


    //path to modules libs folder
    //TODO: \ for linux based OS ? 
    $libs_path = drupal_get_path('module', 'shiny') . '/libs/';


    $block['subject'] = t('Shiny Main Content');
    /*
        Customize the block content   
    */
    $block['content'] = array(

        '#attached' => array (

            'js' => array(
                //for local only
                //pku already have them
                // $libs_path.'js/jquery.min.js',
                $libs_path.'js/bootstrap.min.js',

                //angularjs
                $libs_path.'js/angular.js',
                //shiny angular app
                $libs_path.'app/app.module.js',
                //v1.3
                $libs_path.'app/cShiny/cShiny.js',
                $libs_path.'app/cShiny/services.js',
                $libs_path.'app/cShiny/newComponent.js',

            ),// end js array

            'css' => array(
                $libs_path.'css/bootstrap.min.css',
                $libs_path.'css/iframe.css'
            )
        ), //attached 
        '#markup' => generate_block_content($libs_path)
    );

    return $block;
            
}


/*

*/
function generate_block_content(){


    //get node info
    //menu_get_object() return the current node by default
    $node = menu_get_object();
    $node_ua = drupal_get_path_alias();

    //Check if this block is new 
    //query Shiny table
    $sid = db_query("SELECT sid FROM {shiny} WHERE nid = :nid", array(
        ':nid' => $node->nid)
    )->fetchField();
    //fetchField() to retrieve single value from query


    $html_content = '';

    if (empty($sid)){
        $html_content = t('

            <div ng-app="devApp"> <newblock-component> </newblock-component> </div>
        ');
    }else{
        $html_content = t('
            <p> This is the main content of shiny block</p>
            <p> Node ID : @nid </br>
                Node type: @type</br>
                Node title : @title </br>
                Node url alias: @alias</br>
            </p>

            <div ng-app="devApp"> <main-component> </main-component> </div>
                ', array(
                        '@nid' => $node->nid,
                        '@type' => $node->type,
                        '@title' => $node->title,
                        '@alias' => $node_ua,
                    ));
    };



    // Add settings ('setting'): Adds settings to Drupal's 
    // global storage of JavaScript settings. Per-page settings
    // are required by some modules to function properly. 
    // All settings will be accessible at Drupal.settings.
    drupal_add_js(array('NodeInfo' => array(
            'nid' => $node->nid,
            'type' => $node->type,
            'title' => $node->title,
            'alias' => $node_ua
        )), 'setting');


    return $html_content;
}

