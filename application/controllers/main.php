<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Main extends CI_Controller {

	public function index()
	{
		$this->load->helper('url');
		$this->load->view('character/character_main');
	}
}
/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */