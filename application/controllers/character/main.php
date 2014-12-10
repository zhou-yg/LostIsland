<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Main extends CI_Controller {

	public function index()
	{
		$this->load->model('user/login');
		$clientToken = $this->input->post('clientToken');
		$userToken   = $this->input->post('userToken');

		if(!($clientToken && $userToken)){
			show_error('no token',500,'forbidden');
		}
		$loginResult = $this->login->check_login($clientToken,$userToken);		
		
		if($loginResult){
			
			$this->load->helper('url');
			$this->load->view('character/character_main.html',$loginResult);
		}else{
			show_error('not exist',500,'forbidden');
		}
	}
}