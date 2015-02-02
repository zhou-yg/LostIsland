<?php

$model_map = array(
	//--------------编号---------------
	1000 => 'encry/sec_key', 
	1001 => 'user/init', 
	1002 => 'user/login', 
	1003 => 'user/message', 
	2001 => 'cards/card_config', 
	2002 => 'cards/get_cards',
	//---------------别名---------------
	'sec_key'      => 'encry/sec_key', 
	'user_init'    => 'user/init', 
	'user_login'   => 'user/login', 
	'user_message' => 'user/message', 
	'card_config'  => 'cards/card_config', 
	'card_op'      => 'cards/get_cards',
	'saber_obj'    => 'cards/saber_obj'
);

return $model_map;

?>