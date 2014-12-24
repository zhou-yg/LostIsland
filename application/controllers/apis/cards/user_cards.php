<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Card_cards extends CI_Controller {

	private $argPre = 'parameter';

	public function index()
	{
	}
	public function get_deck(){
		
	}
	public function save_deck(){
		$arg = $this->input->post($this->argPre);
		$argArr = json_decode($arg);
		
		$uid = $argArr['uid'];
		$sessionToken = $argArr['sessionToken'];
		$cardsJson = $argArr['deck'];
		
		$this->output
			 ->set_content_type('application/json')
      		 ->set_output(json_encode(array(
			 	'a' => $uid,
			 	'b' => $sessionToken,
			 	'c' => $cardsJson
			 )));
	}
}