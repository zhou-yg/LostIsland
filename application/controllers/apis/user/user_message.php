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
			$data = $this->message->get_basic($uid);
		}else{
			$result = FALSE;		
			$data = 'lose uid';	
		}
		$this->output
			 ->set_content_type('application/json')
			 ->set_output(json_encode(array(
			 	'result'=>$result,
			 	'data' => $data
			 )));
	}
	//根据uid和token来获取全部用户信息 
	public function get_all(){
	}
}