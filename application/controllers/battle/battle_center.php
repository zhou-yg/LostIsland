<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * fn = 3002
 */
class Battle_center extends CI_Controller {
	
	private $userModel1 = 'user_login';
	private $userModel2 = array(
			'user/message',
			'chess/chess_user'
	);
	
	public function index()
	{
		$this->output
			 ->set_output(json_encode(array(
			 		'index' => 'Battle_center'
			 	)));
	}
	/*
	 * battle 初始化界面 
	 * 跳转到此 uid,sessionToken
	 * 或登录至此,clientToken,userToken
	 */
	public function initial(){

		$this->api_models = include MODEL_MAP;

//		$uid = $this->input->get('uid');

		$uid = $this->session->userdata('uid');
		$sessionToken = $this->session->userdata('sessionToken');
		
		$result = null;
		
		if($clientToken && $userToken){
			$this->load->model($this->api_models[$this->userModel1]);
			
			$loginResult = $this->login->check_login($clientToken,$userToken);
			if ($loginResult) {

				$uid = $loginResult['uid'];
				$sessionToken = $loginResult['sessionToken'];

			} else {
				show_error('not exist', 404, 'forbidden');
			}
		}
		if ($uid && $sessionToken) {
			
			foreach ($this->userModel2 as $index => $modelName) {
				$this->load->model($modelName);
			}

			$chess_result_array = $this->chess_user->set_param(array(
				'type'=>'get',
				'uid' => $uid
			));
			$user_message_array = $this->message->get_basic($uid);
			
			$result = array(
				'uid'      	   => $uid,
				'nickname'     => $user_message_array['data']['username'],
				'chesses'      => json_encode($chess_result_array['data']),
				'sessionToken' => $sessionToken
			);
			
			$this->session->set_userdata(array(
				'uid' => $uid,
				'sessionToken' => $sessionToken
			));
		}
		if($result){
			//控制台
			$this->load->helper('url');
			$this->load->view('battle/initial.html', $result);
			//$this->load->view('sys/console.html');

		}else{
			show_error('no token no session', 404, 'forbidden');
		}
	}
}