<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Card_config_factory extends CI_Controller {
	
	private $configObjPath = 'Public/js/cards/cardConfigObjList.js';
	
	
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
			case 'archer':
				$this->getArcherList();
				break;
			default:
				break;
		}
	}
	public function getSaberList()
	{
		$js = $this->card_config->getSaberConfigJS();
		
		$this->load->helper('file');
		
		
		if( write_file($this->configObjPath,$js)){
	 		 $this->output
			 	  ->set_output(
						'set cardConfigObjList : <span style="color:green">true</span>'
					);
		}else{
	 		 $this->output
			 	  ->set_output(
						'set cardConfigObjList : <span style="color:red">false</span>'
					);
		}
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