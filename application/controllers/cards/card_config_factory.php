<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Card_config_factory extends CI_Controller {
	
	public function index()
	{
		$this->output
			 ->set_content_type('application/json')
			 ->set_output(json_encode(array(
			 		'index' => 'Card_config_factory'
			 	)));
	}
	public function _remap($basic_type){
		switch ($basic_type) {
			case 'saber':
				$this->getSaberList();
				break;
			default:
				break;
		}
	}
	public function getSaberList()
	{
		$js = $this->card_config->getSaberConfigJS();

		echo $js;
		/*
		$this->output
			 ->set_content_type('application/json')
      		 ->set_output(json_encode($saber_query_arr));
		*/
	}
	public function get_archer_list()
	{
	}
}