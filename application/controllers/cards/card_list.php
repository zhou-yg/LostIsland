<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Card_list extends CI_Controller {

	public function index()
	{
		$uid = $this->session->userdata('uid');
		$sessionToken = $this->session->userdata('sessionToken');

		echo $uid.'<br>';
		echo $sessionToken.'<br>';
		
    	$this->load->helper('url');
	    $this->load->view('cards/cardList.html');
		$this->load->view('test/console.html');
	}
}