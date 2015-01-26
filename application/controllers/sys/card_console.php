<?php
if (!defined('BASEPATH'))
	exit('No direct script access allowed');

class Card_console extends CI_Controller {

	private $img_field_arr = array(
		'battle',
		'character',
		'normal',
		'select',
	);
	private $cards_path_arr = array(
		'Public/images/cards/battleAvatar/',
		'Public/images/cards/character_main/',
		'Public/images/cards/normalAvatar/',
		'Public/images/cards/select_list',
	);
	private $cards_path_config = array();

    function __construct()
    {
        parent::__construct();
		$this->load->helper('url');
    }
	public function all_card() {
		$this->load->view('sys/allCardsDisplay.html');
	}
	public function create_card(){
		$this->load->library('upload');
		$this->load->helper('form');
		$this->load->view('sys/createCard.html');
	}
	//接收多个上传文件
	public function upload(){
			
		$card_name = $this->input->get('card_name');
		$atk = $this->input->get('atk');
		$hp  = $this->input->get('hp');
		
		$config = array();
		for($i=0,$len=count($this->img_field_arr);$i<$len;$i++){
			array_push($config,array(
				'field'       => $this->img_field_arr[$i],
				'upload_path' => $this->cards_path_arr[$i]
			));
		}
		$this->load->library('upload',$config);

		if($this->upload->upload_handle(true)){
			var_dump($this->upload->data());
		}else{
			var_dump($this->upload->display_errors());
		}
	}
}