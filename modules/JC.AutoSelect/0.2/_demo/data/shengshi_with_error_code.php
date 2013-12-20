<?php
    $jsonstr = file_get_contents( 'SHENGSHI.js' );
    $jsonstr = preg_replace( '/^.*?\=/', '', $jsonstr );
    $jsonstr = preg_replace( '/\;[\s]*$/', '', $jsonstr );

    $id = isset( $_REQUEST['id'] ) ? $_REQUEST['id'] : '0';
    $json = json_decode( $jsonstr );
    $r = array();

    for( $i = 0, $j = count( $json ); $i < $j; $i++ ){
        if( $json[$i][2] == $id ){
            array_push( $r, $json[$i] );
        }
    }

    $result = array( 'errorno' => 0, 'data' => $r );

    if( isset( $_REQUEST['errorno'] ) ){
        $r['errorno'] = (int)$_REQUEST['errorno'];
    }

    echo json_encode( $result );
?>
