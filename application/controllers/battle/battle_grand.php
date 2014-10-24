<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Battle_grand extends CI_Controller {
	
	public function index()
	{
		$this->output
			 ->set_content_type('application/json')
			 ->set_output(json_encode(array(
			 		'index' => 'Battle_grand'
			 	)));
	}
	public function build(){
		
		
	}
}