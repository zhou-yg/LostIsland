<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class User_cards extends CI_Controller {

	private $argPre = 'parameter';

	public function index()
	{
	}
	public function get_deck(){
		
	}
	public function save_deck(){
		$arg = $this->input->post($this->argPre);
		$argObj = json_decode($arg);

		$result = null;

		$uid = $argObj->uid;
		$sessionToken = $argObj->sessionToken;
		$cardsArr = json_decode($argObj->cards);

		if($this->session->userdata('sessionToken') === $sessionToken){
			
			$this->load->model('cards/get_cards');
			$cardsStr = serialize($cardsArr);
			$result = $this->get_cards->save_deck($uid,$cardsStr);
			
		}else{
			$result = array(
		 		'result' => $result,
		 		'data'   => $data
			);
		}
		
		$this->output
		 	 ->set_content_type('application/json')
			 ->set_output(json_encode($result));
	}
}