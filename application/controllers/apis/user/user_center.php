<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User_center extends CI_Controller {
	
	public function index()
	{
		$this->load->view('test');
		$this->load->library('session');
	}
	public function get_token(){
		$this->load->model('encry/sec_key');
		
		$token = $this->sec_key->create_token();
		$this->output
			 ->set_content_type('application/json')
			 ->set_output(json_encode(array(
					'token'=>$token
				 )));
	}
	public function check_token($_token){
		$this->load->model('encry/sec_key');
		
		$check_result = $this->sec_key->check_token($_token);
		$this->output
			 ->set_content_type('application/json')
			 ->set_output(json_encode(array(
					'result'=>$check_result
				 )));
		
	}
	public function init(){
		$this->load->model('user/init');
		$this->load->model('encry/sec_key');
		
		$username = $this->input->post('username');
		$client_token = $this->input->post('clientToken');

		if($username && $this->sec_key->check_token($client_token)){
			$resultArr = $this->init->init($client_token,$username);
			$this->output
				 ->set_content_type('application/json')
				 ->set_output(json_encode($resultArr));
		}else{
			$this->output
				 ->set_content_type('application/json')
				 ->set_output(json_encode(array(
				 	'result'=>FALSE,
				 	'data'=>'illegal_data'
				 )));
		}
	}
	//登录 成功 则返回sessiontoken，
	//该id用于后续的所有操作
	public function login(){
		$client_token = $this->input->post('clientToken');
		$user_token   = $this->input->post('userToken');
		
		if($client_token && $user_token){
			
			$this->load->model('user/login');
			$login_result = $this->login->check_login($client_token,$user_token);

			if($login_result){
				$this->load->model('encry/sec_key');
				
				$sessionToken = $this->sec_kty->create_token();
				$this->session->set_userdata(array(
					'sessionToken'=>$sessionToken
				));
				$this->output
					 ->set_content_type('application/json')
					 ->set_output(json_encode(array(
					 	'result'=>$login_result,
					 	'session'=>$sessionToken
					 )));
			}else{
				$this->output
					 ->set_content_type('application/json')
					 ->set_output(json_encode(array(
					 	'result'=>$login_result,
					 )));
			}
		}
	}
	public function user_create()
	{
		$client_token = $this->input->post('clientToken');
		$username = $this->input->post('username');

		if($client_token && $username){
			
			$result_array = $this->user_tokens->user_create($client_token,$username);
			$this->output
				->set_content_type('application/json')
	    		->set_output(json_encode($result_array));
		}
	}
	public function token_create(){
		$token = $this->user_tokens->token_create();
		$this->output
			 ->set_content_type('application/json')
			 ->set_output(json_encode(array(
					'token'=>$token
				 )));
	}
}