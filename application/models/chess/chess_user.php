<?php

/**
 * 
 */
class Chess_user extends CI_Model {
	
	private $userChessTname = 'user_chess';
	
	function __construct() {
		parent::__construct();
		
		$this->load->database();
	}
	/**
	 * $param = obj(
	 *   'type'
	 * 	 'uid'
	 * );
	 */
	 public function set_param($param){
	 	$result = TRUE;
		$type = 'type';
		$data = null;
				
		if(property_exists($param, $type)){
			$type = $param->type;
			$uid  = $param->uid;		
			if($type == 'get'){
				$result = $this->get($uid);
			}else if($type == 'save'){
				$chess = $param->chess;
				$result = $this->save($uid,$chess);
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
	public function get($uid){
		$data = null;
		$userChessTname = $this->userChessTname;
		
		$queryChessSql = "select chess_arr from $userChessTname where uid=$uid";
		$queryChessResult = $this->db->query($queryChessSql);
		
		if($queryChessResult->num_rows() > 0){
			
			$resultArray = $queryChessResult->result_array();
			$data = $resultArray[0];
		}else{
			$data = 'select chess_arr null';
		}
	}
	public function save(){
		
	}
}


?>