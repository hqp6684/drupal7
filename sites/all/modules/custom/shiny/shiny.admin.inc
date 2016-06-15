<?php 


function shiny_admin_settings(){

    // Get an array of nodes types with
    //internal names as keys
    //ie array('page'=>'basic page', 'article' => 'Article')
    $types = node_type_get_types();
    foreach ($types as $node_type) {
        # code...
        $options[$node_type->type] = $node_type->name;
    }
    $form['shiny_node_types'] = array(
        '#type' => 'checkboxes',
        '#title' => t('User may add shiny to these content type'),
        '#options'  => $options,
        '#default value' => variable_get('shiny_node_types', array('page')),
        '#description' => t('Shiny-Drupal intergration')
        );

    $form['#submit'][] = 'shiny_admin_settings_submit';
    return system_settings_form($form);

}