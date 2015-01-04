<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User_message extends CI_Controller {

	public function index()
	{
	}
	//根据uid获取基本用户信息
	public function get_basic(){
		$uid = $this->input->get('uid');
		$result = TRUE;
		if($uid){
			$this->load->model('user/message');
			$user_message_array = $this->message->get_basic($uid);
		}else{
			
		}
	}
	//根据uid和token来获取全部用户信息 
	public function get_all(){
	}
}