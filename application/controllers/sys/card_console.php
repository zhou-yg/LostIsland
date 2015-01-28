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
	//接收多个上传文件和相关参数,用于生成新卡
	public function upload(){
		
		$saber_msg = array();
			
		$card_name = $this->input->post('card_name');
		$atk = $this->input->post('atk');
		$hp  = $this->input->post('hp');
		
		$saber_msg['card_name'] = $card_name;
		$saber_msg['atk'] = $atk;
		$saber_msg['hp'] = $hp;
		
		$up_config = array();
		for($i=0,$len=count($this->img_field_arr);$i<$len;$i++){
			array_push($up_config,array(
				'field'       => $this->img_field_arr[$i],
				'upload_path' => $this->cards_path_arr[$i]
			));
		}
		$this->load->library('upload',$up_config);

		if(!$this->upload->upload_handle(true)){
			$this->upload->display_errors();
		}
		$all_updata = $this->upload->all_data();
		$tmp_arr = $all_updata[0];
		$saber_msg['normalAvatar'] = $tmp_arr['file_name'];
		$tmp_arr = $all_updata[1];
		$saber_msg['select_list'] = $tmp_arr['file_name'];
		$tmp_arr = $all_updata[2];
		$saber_msg['character_main'] = $tmp_arr['file_name'];
		$tmp_arr = $all_updata[3];
		$saber_msg['battleAvatar'] = $tmp_arr['file_name'];
				
		$this->load->model('cards/saber_obj');
		$this->saber_obj->create($saber_msg);
	}
}