<?php
if (!defined('BASEPATH'))
	exit('No direct script access allowed');

class Card_console extends CI_Controller {

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
	//接收多个上传文件和相关参数,用于生成新卡
	public function upload(){
		$this->load->model('cards/saber_obj');

		$result = $this->saber_obj->create();
		
		var_dump($result);
	}
}