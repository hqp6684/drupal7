<?php
/**
*   @file
*   Administration page callbacks for annotate module
*/

/**
*   Form builder. Configre annotations
*/

function annotate_admin_settings(){
    //Get an array of node types with internal names as keys and 
    //"friendly names" as values
    //array('page' => 'basic page',)
    $types = node_type_get_types();
    foreach ($types as $node_type) {
        $options[$node_type->type] = $node_type->name;
    }

    $form['annotate_node_types'] = array(
        '#type' => 'checkboxes',
        '#title' => t('Users can do these'),
        '#options' => $options,
        // '#default_value' => variable_get('annotate_node_types', array('page')),
        '#description' => t('A text feild will be availae')
    );
    $form['#submit'][] = 'annotate_admin_settings_submit';
    return system_settings_form($form);
}


/* Process annotation settings submission */

function annotate_admin_settings_submit($form, $form_state){

    foreach ($form_state['values']['annotate_node_types'] as $key => $value) {
        if(!$value){
            $instance = field_info_instance('node', 'annotation', $key);
            if(!empty($instance)){
                field_delete_field($instance);
                watchdog('Annotation', 'Deleted annotation field from content type %key', array('%key' => $key));
            }
        }
        else 
        {
            $instance = field_info_instance('node', 'annotation', $key);
            if(empty($instance)){
                $instance = array(
                    'field_name' => 'annotation',
                    'entity_type' => 'node',
                    'bundle' => $key,
                    'label' => t('Annotation'),
                    'widget_type' => 'text_textarea_with_summary',
                    'settings' => array ('display_summary' => TRUE),
                    'display' => array(
                        'default'=> array(
                            'type' => 'text_default',
                        ), //default
                        'teaser' => array(
                            'type'=> 'text_summary_or_trimmed',
                        ), //teaser
                    ),//dipslay
                );
                $instance = field_create_instance($instance);
                watchdog('Annotation', 'Added annotation field to content type: %key', array('%key' => $key) );

            }

        }//else

    }//for each loop
}