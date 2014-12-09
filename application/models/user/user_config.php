<?php
class User_config extends CI_Model {
	
	private $default_character_img = '/Public/images/character/card_1_2.png';
	private $init_cards = array(1,1,1,1,1,1,1,1,1,1); //len = 10
	
    function __construct()
    {
        parent::__construct();
    }
	public function get_defualt_character_img(){
		return $this->default_character_img;
	}
	public function get_init_card_ids(){
		return $this->init_cards;
	}
}
?>