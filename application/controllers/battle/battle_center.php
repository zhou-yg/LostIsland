<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Battle_center extends CI_Controller {
	
	private $userModel1 = 'user_login';
	private $userModel2 = array(
			'card_op',
			'user_message'
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

		$clientToken = $this->input->post('clientToken');
		$userToken = $this->input->post('userToken');

		$uid = $this->session->userdata('uid');
		$sessionToken = $this->session->userdata('sessionToken');

		if($clientToken && $userToken){
			$this->load->model($this->api_models[$this->userModel1]);
			
			$loginResult = $this->login->check_login($clientToken,$userToken);
			
			if ($loginResult) {
					
				$this->load->helper('url');
				$this->load->view('battle/initial.html', $loginResult);
//				$this->load->view('sys/console.html');
				
			} else {
				show_error('not exist', 404, 'forbidden');
			}
		} else if ($uid && $sessionToken) {
			
			foreach ($this->userModel2 as $index => $modelName) {
				$this->load->model($modelName);
			}

			$cards_result_array = $this->get_cards->get_deck($uid);
			$user_message_array = $this->message->get_basic($uid);
			
			$result = array(
				'uid'      	   => $user_message_array['data']['id'],
				'nickname'     => $user_message_array['data']['username'],
				'character'    => $user_message_array['data']['character'],
				'my_deck'      => $cards_result_array['data'],
				'sessionToken' => $sessionToken
			);

			//控制台
			$this->load->helper('url');
			$this->load->view('battle/initial.html', $result);
			$this->load->view('sys/console.html');
		}else{
			show_error('no token no session', 404, 'forbidden');
		}
	}
}