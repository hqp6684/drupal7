<?php
/**
*   @file
*   Administration page callbacks for shiny module
*/

/**
*   Form builder
*/

function shiny_admin_settings(){
    //Get an array of node types with internal names as keys and 
    //"friendly names" as values
    //array('page' => 'basic page',)
    $types = node_type_get_types();
    foreach ($types as $node_type) {
        $options[$node_type->type] = $node_type->name;
    }

    $form['shiny_node_types'] = array(
        '#type' => 'checkboxes',
        '#title' => t('User can add shiny-frame to these content types'),
        '#options' => $options,
        '#default_value' => variable_get('shiny_node_types', array('page')),
        '#description' => t('Create a gateway to shiny application')
    );
    $form['#submit'][] = 'shiny_admin_settings_submit';
    return system_settings_form($form);
}


/* Process shiny settings submission */

function shiny_admin_settings_submit($form, $form_state){

    /*
        Loop through each of the content type checkboxes 
        shown on the form.
    */
    foreach ($form_state['values']['shiny_node_types'] as $key => $value) {
//If the check box for a content type is unchecked, look to see whether 
//this content type has the shiny field attached to it using the
//field_info_instance(). If it does then we have to remove the 
//shiny field as the administrator has unchecked the box
//  field_info_instance($entity_type, $field_name, $bundle_name)
// Returns an array of instance data for a specific field and bundle.

        if(!$value){
            $instance = field_info_instance('node', 'shiny', $key);
            if(!empty($instance)){
                field_delete_instance($instance);
                //watchdog($type, $message, $variables = array(), $severity = WATCHDOG_NOTICE, $link = NULL) Logs a system message.
                watchdog('Shiny', 'Deleted shiny field from content type %key', array('%key' => $key));
            }
        }
        else 
        {
        // If the check box for a content type is checked, look to see
        // whether the field is associated with that content type.
        // if not then add the shiny field to the content type
            $instance = field_info_instance('node', 'shiny', $key);
            if(empty($instance)){
                $instance = array(
                    'field_name' => 'shiny',
                    'entity_type' => 'node',
                    'bundle' => $key,
                    'label' => t('Shiny'),
                    'widget_type' => 'text_textarea_with_summary',
                    'settings' => array ('display_summary' => TRUE),
                    'display' => array(
                        'default'=> array(
                            'type' => 'text_default',
                        ), //default  
                    ),//dipslay
                );
                $instance = field_create_instance($instance);
                watchdog('Shiny', 'Added shiny field to content type: %key', array('%key' => $key) );

            }

        }//else

    }//for each loop
}