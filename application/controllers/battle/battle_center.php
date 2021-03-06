<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
 * fn = 3002
 */
class Battle_center extends CI_Controller {
	
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
		//用户id
		$uid = $this->input->get('uid');
		//来自客户端的秘钥
		$token = $this->input->get('token');

		session_start();
		
		$uidAndToken = null;
		
		if($uid && $token){
			$uidAndToken = TRUE;
			$this->load->model('user/login');
			
			$tokenCheck  = $this->login->check_token($token);
			$loginResult = $this->login->check_login($uid);
			
			if ($uid && $loginResult) {

				$uid = $loginResult['uid'];
				$sessionToken = $loginResult['sessionToken'];

			} else {
				show_error('not exist', 404, 'forbidden');
			}
		}else{
		}
		
		if ($uid && $sessionToken) {
			
			$this->load->model('user/message');
			$this->load->model('chess/chess_user');

			$chess_result_array = $this->chess_user->set_param(array(
				'type'=>'get',
				'uid' => $uid
			));
			$user_message_array = $this->message->get_basic($uid);
			
			$result = array(
				'uid'      	   => $uid,
				'username'     => $user_message_array['data']['username'],
				'character'    => $user_message_array['data']['character'],
				'win' 		   => intval($user_message_array['data']['win']),
				'lose'    	   => intval($user_message_array['data']['lose']),
				'chesses'      => json_encode($chess_result_array['data']),
				'sessionToken' => $sessionToken
			);
			
		}
		if($uidAndToken){
			//控制台
			$this->load->helper('url');
			$this->load->helper('cookie');
			delete_cookie('ci_session');
			$this->load->view('battle/initial.html', $result);
			//$this->load->view('sys/console.html');

		}else{
			$this->load->helper('url');
			$this->load->helper('cookie');
			$this->load->view('login/index.html');
		}
	}
}