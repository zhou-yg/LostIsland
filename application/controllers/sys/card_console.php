<?php
if (!defined('BASEPATH'))
	exit('No direct script access allowed');

class Card_console extends CI_Controller {

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
		$this->load->view('sys/createCard.php');
	}
	public function upload(){
		$config['upload_path'] = 'Public/images/';
		$config['allowed_types'] = '*';
		/*
		$config['file_name'] = 'custom file name';
		*/
		$this->load->library('upload',$config);
		
		if($this->upload->do_upload()){
			var_dump($this->upload->data());
		}else{
			var_dump($this->upload->display_errors());
		}
	}
}