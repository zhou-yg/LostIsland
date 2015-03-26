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
		$result = TRUE;
		$data = null;

		//没有参数
		if($parameter){
			$parameter = json_decode($parameter,TRUE);
			$fn = $parameter['fn'];
			$param = $parameter['param'];

			$fn = intval($fn);
			
			if(is_string($param)){
				$param = json_decode($param,TRUE);
				if(is_object($param)){
					$param = get_object_vars($param);
				}
			}
			
			$result = $this->check_session($param);
			
			if($result){
				$normal_name = $this->normal_name;
				$model_path = $this->api_models[$fn];
				if($model_path){
					$this->load->model($model_path,$normal_name);
					$data = $this->$normal_name->set_param($param);
				}else{
					$result = FALSE;
					$data = 'no that api';
				}
			}else{
				$result = FALSE;
				$data = 'deny the request';
			}
		}else{
			$result = FALSE;
			$data = 'no param';
		}
		if(!$result){
			$data = array(
				'result' => $result,
				'data'   => $data
			);
		}
		
		$this->output
		 	 ->set_content_type('application/json')
			 ->set_output(json_encode($data));
	}
	private function check_session($param){
		$uid = null;
		$token = null;


		if(isset($param['uid']) && isset($param['token'])){
			$token = $param['token'];
			session_start();
			print_r($_SESSION);		
			$sessionToken = isset($_SESSION['sessionToken'])?$_SESSION['sessionToken']:null;
			
			
			if($token == $sessionToken){
				return TRUE;
			}else{
				return FALSE;
			}
		}else{
			return TRUE;
		}
	}
}