<?php

/**
 * fn = 3001
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
		$data = null;

		$type = 'type';
		$uid = 'uid';
		
		if(isset($param[$type])){

			$type = $param[$type];
			$uid  = $param[$uid];		

			if($type == 'get'){
				$data = $this->get($uid);
			}else if($type == 'save'){
				$chess = $param['chess'];
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
			$data = unserialize($data['chess_arr']);
		}else{
			$data = 'select chess_arr null';
		}
		return $data;
	}
	public function save($uid,$chessArr){
		$userChessTname = $this->userChessTname;
		
		$sqlArr = array(
			'chess_arr' => serialize($chessArr)
		);
		$where = "uid = $uid";
		$updateSql = $this->db->update_string($userChessTname,$sqlArr,$where);
		
		$updateSqlQueryResult = $this->db->simple_query($updateSql);
		return $updateSqlQueryResult;
	}
}


?>