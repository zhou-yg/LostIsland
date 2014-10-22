<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Useres_center extends CI_Controller {
	
	public function index()
	{
		$this->load->view('test');
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
	public function user_token_check()
	{
		$token    = $this->input->post('token');
		$username = $this->input->post('username');
		
		$result = $this->user_tokens->token_check($token);
		if($result){
			$this->output
				->set_content_type('application/json')
	    		->set_output(json_encode(array( 'token'=>$token,'username'=>$username)));
		}else{
			$this->output
				->set_content_type('application/json')
	    		->set_output(json_encode(array( 'token'=>$token,'username'=>$username)));
		}
	}
}