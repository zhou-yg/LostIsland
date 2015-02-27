<?php

/**
 * 获取chess的数据
 */
class Chess extends CI_Model {
	
	private $chessTname = 'card_chess';
	
	private $chessConfigPath = 'Public/js/chess/chessConfigObjList.js';
	
	function __construct() {
		parent::__construct();
	}
	
	/**
	 * $param = obj(
	 *   'type'
	 * );
	 */
	 public function set_param($param){
	 	$result = TRUE;
		$type = 'type';
		$data = null;
				
		if(property_exists($param, $type)){
			$type = $param->type;
			
			if($type == 'arr'){
				$data = $this->getChessConfigArr();
				if(!isset($data)){
					$result = FALSE;
					$data = 'get data arr';
				}
			}else if($type == 'js'){
				$data = $this->getChessConfigJS();
				if(isset($data)){
					$result = $this->setConfigFile($data);
					if($result){
						$data = null;
					}else{
						$data = 'write config js file fail';
					}
				}else{
					$result = FALSE;
				}
			}
		}else{
			$result = FALSE;
			$data = 'type isnot exist in param object';
		}
		return array(
			'result' => $result,
			'data'   => $data
		);
	 }
	 
	 public function getChessConfigArr(){
		$this->load->database();
		$chessTname = $this->chessTname;
		
		$chessSql = "SELECT * FROM $chessTname";
		$chessQuery = $this->db->query($chessSql);
		
		if($chessQuery->num_rows()>0){
			return $chessQuery->result_array();
		}else{
			return null;
		}
	 }
	 public function getChessConfigJS(){

        $this->load->helper('url');

		$saber_query_arr = $this->getChessConfigArr();

	
		$card_config_js_data = 'var chessConfigObjList={';
		
		for ($i=0; $i < count($saber_query_arr); $i++) { 
			foreach ($saber_query_arr[$i] as $key => $value) {
				if($key == 'id'){
					$card_config_js_data .= 'chess'.$value.':{';
				}else{
					if(intval($value) == 0 && $value!='0' ){
						$card_config_js_data .= $key.':"'.$value.'",';
					}else{
						$card_config_js_data .= $key.':'.$value.',';
					}
				}
			}
			$card_config_js_data .= '},';
		}
		$card_config_js_data .= '};';

		$card_config_js_data .= 'var chessImgPre = "'.base_url().'Public/images/";';

		return $card_config_js_data;		
	}
	private function setConfigFile($data){
		$this->load->helper('file');
		
		$path = $this->chessConfigPath;
		
		if(write_file($path,$data)){
			return TRUE;
		}else{
			return FALSE;
		}
	}
}



?>