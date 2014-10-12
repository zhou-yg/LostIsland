<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class useres_create extends CI_Controller {
	
	public function index()
	{
		$this->load->view('test.html');
	}
	public function user_token_create()
	{
		$token = $this->user_tokens->token_create();
		
		$this->output
			->set_content_type('application/json')
    		->set_output(json_encode(array( 'token'=>$token )));
	}
	public function user_token_check($_token)
	{
		if($_token){
			$token    = $this->input->post('token');
			$username = $this->input->post('username');
		}
		
		$result = $this->user_tokens->token_check($token);
		if($result){
			
		}else{
			
		}
	}
}