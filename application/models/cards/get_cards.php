<?php
class Get_cards extends CI_Model {
	private $cards_tname = 'user_cards';

	private $cache_deck;
	private $cache_uid;

	private $cards_one;

	private $save_deck_map = array(
		'deck1' =>'deck_cards',	
		'deck2' =>'deck_cards_2',	
		'deck3' =>'deck_cards_3',	
		'deck4' =>'deck_cards_4',	
		'deck5' =>'deck_cards_5',	
		'deck6' =>'deck_cards_6',	
		'deck7' =>'deck_cards_7',	
		'deck8' =>'deck_cards_8',	
	);

	public function set_param($_param){
		$uid = $_param->type;
		$type = $_param->type;
		$result = null;
		
		switch($type){
			case 'save_deck':
				$tname_key = $_param->deck_name;
				$data = $_param->data;
				$result = $this->save_deck($uid, $tname_key,$data);
				break;
			case 'save_all':
				$data = $_param->data;
				$result = $this->save_all($uid, $data);
				break;
			case 'get_deck':
				$result = $this->get_deck($uid);
				break;
			case 'get_all_cards':
				$result = $this->get_all_cards($uid);
				break;
			case 'get_all_heroes':
				$result = $this->get_all_heroes($uid);
				break;
		}
		if(!$result){
			$result = array(
				'result' => FALSE
			);
		}
		return $result;
	}
	private function save($_uid, $_type, $_data) {

		$result = TRUE;
		$data = 'update success';

		$this->load->database();
		$save_cards_sql = "UPDATE $this->cards_tname SET $_type='$_data' WHERE uid='$_uid' ";
		
		$save_cards_query_result = $this->db->simple_query($save_cards_sql);

		if (!$save_cards_query_result) {
			$data = 'update fail';
		}
		return array('result' => $result, 'data' => $data);
	}

	private function get($_uid, $_type) {

		$result = TRUE;
		$data = null;

		if (!$this->cards_one){
			$this->load->database();
			$cards_tname = $this->cards_tname;

			$get_deck_sql = "select * from $cards_tname where uid=$_uid";
			$get_deck_query = $this->db->query($get_deck_sql);

			if ($get_deck_query->num_rows() > 0) {

				$result_array = $get_deck_query->result_array();
				/*
				 *  当前表下的一条查询记录
				 *  $result_array[0] = (
				 *     deck_cards =>  [],
				 *     all_cards => []
				 *  )
				 * */
				$this->cards_one = $result_array[0];
			} 
		}
		if ($this->cards_one) {
			$len = count($_type);

			if($len===1){
				$_type = $_type[0];
				$deck_one = $this->cards_one[$_type];
				if($deck_one){
					$data = unserialize($deck_one);
				}	
							
			}else if($len>1){
				$data = array();
				for($i=0;$i<$len;$i++){
					$deck_one = $this->cards_one[$_type[$i]];
					if($deck_one){
						$deck_one = unserialize($deck_one);
						array_push($data,$deck_one);
					}
				}
			}
			$data = json_encode($data);
		}else{
			$result = FALSE;
			$data = 'data is null acording the uid';
		}
		
		return array('result' => $result, 'data' => $data);
	}

	//存入的必须是序列化的数组
	public function save_deck($_uid, $_tname_key,$_data) {
		$tname = $this->save_deck_map[$_tname_key];
		if($tname){
			$result = $this->save($_uid, $tname, $_data);
		}else{
			$result = array(
				'result' => FALSE,
				'data' => 'no that deck'	
			);
		}
		return $result;
	}
	public function save_all($_uid, $_data) {
		$result = $this->save($_uid, 'all_cards', $_data);
		return $resultl;
	}
	public function get_deck($_uid) {
		$reuslt = $this->get($_uid, array('deck_cards','deck_cards_2','deck_cards_3','deck_cards_4','deck_cards_5','deck_cards_6','deck_cards_7','deck_cards_8'));
		return $reuslt;
	}
	public function get_all_cards($_uid) {
		$reuslt = $this->get($_uid, array('all_cards'));
		return $reuslt;
	}
	public function get_all_heroes($_uid){
		$reuslt = $this->get($_uid, array('all_heroes'));
		return $reuslt;
	}
	public function get_all($_uid){
		$all_cards_arr = $this->get_all_cards($_uid);
		$all_heroes_arr= $this->get_all_heroes($_uid);
		
		$result = TRUE;
		$data = array();
		if($all_cards_arr['result'] && $all_heroes_arr['result']){
			$data['cards']  = $all_cards_arr['data'];
			$data['heroes'] = $all_heroes_arr['data'];
		}else{
			$result = FALSE;
			$data = 'get all fail';
		}
		return array(
			'result' => $result,
			'data' => $data
		);
	}
}
?>