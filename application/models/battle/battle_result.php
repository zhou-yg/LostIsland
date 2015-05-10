<?php
/*
 * fn = 4001
 * 
 * 结果通知
 * 
 * */
class Battle_result extends CI_Model {
	
	private $tName = 'user_list';
	
    function __construct()
    {
        parent::__construct();
	}
	public function set_param($param){
		$result = TRUE;
		$data = null;	
		$type = 'type';
		
		if(isset($param[$type])){
			$type = $param['type'];
			
			if($type == 'battleResult'){
				
				$winUidArr = $param['win'];
				$loseUidArr = $param['lose'];
				
				if(!is_array($winUidArr)){
					$winUidArr = array($winUidArr);
				}
				if(!is_array($loseUidArr)){
					$loseUidArr = array($loseUidArr);
				}
				
				$data = $this->set_battleResult($winUidArr,$loseUidArr);
				
			}else if($type == ''){
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
	
	private function set_battleResult($winUidArr,$loseUidArr){
		$this->load->database();
		$tName = $this->tName;
		
		$winData = 'SET win=win+1 ';
		$where = null;
		foreach ($winUidArr as $index => $winUid){
			if(isset($where)){
				$where .= ' or id='.$winUid;
			}else{
				$where = 'id='.$winUid;
			}
		}
		$where = 'WHERE '.$where;
		$winUpdateSql = "UPDATE $tName " .$winData.$where;
		
		$loseData = 'SET lose=lose+1 ';
		$where = null;
		foreach ($loseUidArr as $index => $loseUid) {
			if(isset($where)){
				$where .= ' or lose>=0 and id='.$loseUid;
			}else{
				$where = 'lose>=0 and id='.$loseUid;
			}		
		}
		$where = 'WHERE '.$where;
		$loseUpdateSql = "UPDATE $tName ".$loseData.$where;
		
		$winQueryResult = $this->db->simple_query($winUpdateSql);
		$loseQueryResult = $this->db->simple_query($loseUpdateSql);
		
		return $winQueryResult && $loseQueryResult;
	}
}
?>