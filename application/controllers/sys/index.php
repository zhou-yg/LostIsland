<?php
class Index extends CI_Controller {
	
	public function all_cards(){
		$this->load->helper('url');
		$this->load->view('sys/allCardsDisplay.html');		
	}
	public function create_card(){
		$this->load->helper('url');
		$this->load->helper('form');
		$this->load->view('sys/createCard.html');		
	}
}
?>