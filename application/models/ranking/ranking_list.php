<?php
/*
 * fn = 5001
 * 
 * 排行榜
 * 
 * */
class Ranking_list extends CI_Model {
	
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
			
			if($type == 'all'){
				
				$data = $this->get_all_rankignlist();
				
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
	private function get_all_rankignlist(){
		$this->load->database();
		$tName = $this->tName;

		$rankingListSql = "SELECT username,avatar,win FROM $tName ORDER BY win DESC limit 0,5";
		
		$queryResult = $this->db->query($rankingListSql);
		$result = $queryResult->result();
		var_dump($result);
	}
}
?>