<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Card_list extends CI_Controller {

	public function index()
	{
		echo $this->session->userdata('sessionToken');
		
    	$this->load->helper('url');
	    $this->load->view('cards/cardList.html');
	}
}