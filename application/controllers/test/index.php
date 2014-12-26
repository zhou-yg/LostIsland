<?php
class Index extends CI_Controller {
	
	public function all_cards(){
		$this->load->helper('url');
		$this->load->view('test/allCardsDisplay.html');		
	}
}
?>