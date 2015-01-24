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
		'decka' =>0,	
		'deckb' =>1,	
		'deckc' =>2,	
		'deckd' =>3,	
		'decke' =>4,	
		'deckf' =>5,	
		'deckg' =>6,	
		'deckh' =>7,	
	);
	/**
	 * 路由号:2002 
	 *
	 * $_param = object(
	 *    *token:'验证'
	 *    *type:'决定调用哪个处理函数',
	 *    name:'如果是save操作，决定存哪个字段',
	 * 	  data:'如果是save的操作，则需要data',
	 * );
	 */
	public function set_param($_param){
		$session_token = $_param->token;
		$uid = $_param->uid;
		$type = $_param->type;
		$result = null;
		if($session_token === $this->session->userdata('sessionToken')){
			switch($type){
				case 'save_deck':
					$tname_key = $_param->name;
					$tname_key = strtolower($tname_key);
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
		}else{
			$result = array(
				'result' => FALSE,
				'data' => 'token illegal'
			);
		}
		
		if(!$result){
			$result = array(
				'result' => FALSE
			);
		}
		return $result;
	}

	//存入的必须是序列化的数组
	public function save_deck($_uid, $_index_key,$_data) {
		$tindex = $this->save_deck_map[$_index_key];
		$all_decks = $this->get_deck($_uid);

		if($all_decks['result']){
			$all_decks = $all_decks['data'];

			if($_data == 'null'){
				$_data = '';
			}else if(is_object($_data)){
				$_data = get_object_vars($_data);
			}

			if(is_int($tindex) && $tindex>=0 && $tindex<4){
				$all_decks[$tindex] = $_data;
				$all_decks = serialize($all_decks);
				return $this->save($_uid, 'all_decks', $all_decks);

			}else{
				$result = FALSE;
				$data = 'no that deck index';
			}
		}else{
			$result = FALSE;
			$data = 'get all decks fail';
		}
		return array(
			'result' => $result,
			'data' => $data
		);
	}
	public function save_all($_uid, $_data) {
		$result = $this->save($_uid, 'all_cards', $_data);
		return $resultl;
	}
	public function get_deck($_uid) {
//		$reuslt = $this->get($_uid, array('all_decks','deck_cards','deck_cards_2','deck_cards_3','deck_cards_4','deck_cards_5','deck_cards_6','deck_cards_7','deck_cards_8'));
		$reuslt = $this->get($_uid, array('all_decks'));
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
	private function save($_uid, $_type, $_data) {
		$card_tname = $this->cards_tname;
		$result = TRUE;
		$data = 'update success';

		$this->load->database();
		if(!is_string($_data)){
			$result = FALSE;
			$data = 'save data is not str';
		}else{
			$save_cards_sql = "UPDATE $card_tname SET $_type='$_data' WHERE uid='$_uid' ";
			$save_cards_query_result = $this->db->simple_query($save_cards_sql);
			if (!$save_cards_query_result) {
				$result = FALSE;
				$data = 'update fail';
			}
		}
		return array('result' => $result, 'data' => $data);
	}
	/**
	 * uid 
	 * type 获取哪几个字段，
	 *   如果type的length>1 则返回二维数组
	 *   反之 则返回一维数组
	 */
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
					if($deck_one && is_array($deck_one)){
						$deck_one = unserialize($deck_one);
						$data[] = $deck_one;
					}else{
						$data[] = $deck_one;
					}
				}
			}
		}else{
			$result = FALSE;
			$data = 'data is null acording the uid';
		}
		
		return array('result' => $result, 'data' => $data);
	}
	
}
?>