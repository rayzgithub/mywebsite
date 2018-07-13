<?php
/*  
 * RB 	Disable Comments
 * Version:           1.0.6 - 78233
 * Author:            RBS
 * Date:              Thu, 24 Aug 2017 12:11:29 GMT
 */

if( !defined('WPINC') || !defined("ABSPATH") ){
	die();
}

$types = get_post_types( array( 'public' => true ), 'objects' );
foreach( array_keys( $types ) as $type ) {
	if( ! in_array( $type, $this->modified_types ) && ! post_type_supports( $type, 'comments' ) )
		unset( $types[$type] );
}

if ( isset( $_POST['submit'] ) ) {
	check_admin_referer( 'disable-comments-rb-options' );
	$this->options['remove_everywhere'] = ( $_POST['mode'] == 'remove_everywhere' );

	if( $this->options['remove_everywhere'] )
		$disabled_post_types = array_keys( $types );
	else
		$disabled_post_types =  array() ;

	
	$disabled_post_types = array_intersect( $disabled_post_types, array_keys( $types ) );


	$this->options['disabled_post_types'] = $disabled_post_types;

	$this->save_options();
}
?>
<style> .indent {padding-left: 2em} </style>
<div class="wrap">
	<h1><?php _e( 'Disable Comments RB', 'disable-comments-rb'); ?></h1>
	<p>
		Here you can configure your disabled comments tools. Section with all configuration settings of this tool.
	</p>
	<form action="" method="post" id="disable-comments">
		<ul>
			<li>
				<label for="remove_everywhere">
					<input type="radio" id="remove_everywhere" name="mode" value="remove_everywhere" <?php checked( isset($this->options['remove_everywhere']) && $this->options['remove_everywhere'] );?> /> 
					<strong>
						<?php _e( 'Disable all comments'); ?>
					</strong>
				</label>			
			</li>
			<li>
				<label for="rb_disable_comments_off">
					<input type="radio" id="rb_disable_comments_off" name="mode" value="rb_disable_comments_off" <?php checked(  !isset($this->options['remove_everywhere']) ||  !$this->options['remove_everywhere'] );?> /> 
					<strong>
						<?php _e( 'Enable'); ?>
					</strong>
				</label>
			</li>
		</ul>
		<?php wp_nonce_field( 'disable-comments-rb-options' ); ?>
		<p class="submit">
			<input class="button-primary" type="submit" name="submit" value="<?php _e( 'Save Changes') ?>">
		</p>
	</form>
</div>
