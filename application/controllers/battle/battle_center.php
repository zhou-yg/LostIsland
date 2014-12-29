<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Battle_center extends CI_Controller {
	
	public function index()
	{
		$this->output
			 ->set_output(json_encode(array(
			 		'index' => 'Battle_center'
			 	)));
	}
	public function initial(){

		$this->load->helper('url');
		$this->load->view('battle/initial.html');
		$this->load->view('sys/console.html');
	}
}