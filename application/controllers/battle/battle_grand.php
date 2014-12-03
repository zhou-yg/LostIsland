<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Battle_grand extends CI_Controller {
	
	public function index()
	{
		$this->output
			 ->set_output(json_encode(array(
			 		'index' => 'Battle_grand'
			 	)));
	}
	public function build(){
		$this->load->helper('url');
		$this->load->view('battle/battleGrand');
	}
}