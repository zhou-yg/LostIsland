<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class A extends CI_Controller {
	
	public function index()
	{
		$this->output
			 ->set_output(json_encode(array(
			 		'index' => 'A'
			 	)));
	}
	public function text(){
		echo 'niao';
	}

	public function initial(){
		$this->load->helper('url');
		$this->load->view('battle/initial.html');
	}
}