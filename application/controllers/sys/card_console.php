<?php
if (!defined('BASEPATH'))
	exit('No direct script access allowed');

class Card_console extends CI_Controller {

	private $upModelName = 'saber_obj';

	private $cards_path_config = array();

	private $model_map = array();

    function __construct()
    {
        parent::__construct();
		
		$this->load->helper('url');
		
		$this->model_map = include MODEL_MAP;
		
		
    }
	public function all_card() {
		$this->load->view('sys/allCardsDisplay.html');
	}
	public function create_card(){
		$this->load->library('upload');
		$this->load->helper('form');
		$this->load->view('sys/createCard.html');
	}
	//删除一个卡
	public function remove(){
		
	}
	//接收多个上传文件和相关参数,用于生成新卡
	//如果带有id，则更新
	public function upload(){
		echo '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">';
		$this->load->model($this->model_map[$this->upModelName]);
		
		$card_index = $this->input->post('card_index');
		$card_index = intval($card_index);
		
		if($card_index){
			$result = $this->saber_obj->update($card_index);
		}else{
			$result = $this->saber_obj->create();
		}
		var_dump($result);
	}
}