<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class test extends CI_Controller {

	public function index()
	{
		$this->load->helper('url');
		$this->load->view('test');
	}
	public function postTo(){
		
	}
}
/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */