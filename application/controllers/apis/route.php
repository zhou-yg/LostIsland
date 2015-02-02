<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Route extends CI_Controller {
	//模块 编号映射
	private $api_models = array();

	private $normal_name = 'loaded_model';
	/* 
	 * 构建tag和model的映射
	 * */
    function __construct()
    {
        parent::__construct();
		$this->api_models = include APPPATH.'config/'.'/model_map.php';
    }
	/*
	 *  api入口
	 *  参数fn：要调用的api
	 *  参数param：传递给该api的参数
	 * */
	public function _remap(){
		$parameter = $this->input->get('parameter');
		
		//这里常规流程
		if($parameter){
			$parameter = json_decode($parameter);
			$fn = $parameter->fn;
			$param = $parameter->param;
		}else{
			//这里兼容老旧的
			$fn    = $this->input->get('fn');
			$param = $this->input->get('param');
		}
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