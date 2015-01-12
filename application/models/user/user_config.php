<?php
class User_config extends CI_Model {
	
	private $default_character_img = '/Public/images/character/card_1_2.png';
	private $init_cards = array(
		'hero' => 'hero1',
		'deck' => array('card1','card1','card1','card1','card1','card1','card1','card1','card1','card1')//len = 10
	); 
	private $init_all_cards = array('card1'); //len = 1
	private $init_all_heroes = array('hero1'); //len = 1
		
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
	public function get_init_all_card_ids(){
		return $this->init_all_cards;
	}
	public function get_init_all_hero_ids(){
		return $this->init_all_heroes;
	}
}
?>