<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Route extends CI_Controller {

	private $api_model_key = array(
		1000,
		1001,
		1002,
		1003,
		2001,
		2002
	);
	private $api_model_paths = array(
		'encry/sec_key',
		'user/init',
		'user/login',
		'user/message',
		'cards/card_config',
		'cards/get_cards'
	);
	private $api_models = array();

	private $normal_name = 'loaded_model';
	/* 
	 * 构建tag和model的映射
	 * */
    function __construct()
    {
        parent::__construct();
		for($i=0,$len = count($this->api_model_key);$i<$len;$i++){
			$key = $this->api_model_key[$i];
			$this->api_models[$key] = $this->api_model_paths[$i];
		}
    }
	/*
	 *  api入口
	 *  参数fn：要调用的api
	 *  参数param：传递给该api的参数
	 * */
	public function _remap(){
		$fn    = $this->input->get('fn');
		$param = $this->input->get('param');
		
		$fn = intval($fn);
		if(is_string($param)){
			$param = json_decode($param);
		}
		
		if(in_array($fn, $this->api_model_key)){
			$normal_name = $this->normal_name;
			$model_path = $this->api_models[$fn];


			$this->load->model($model_path,$normal_name);

			$result = $this->$normal_name->set_param($param);
			$this->output
			 	 ->set_content_type('application/json')
				 ->set_output(json_encode($result));
		}
	}
}