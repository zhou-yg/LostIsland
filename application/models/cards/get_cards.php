<?php
class Get_cards extends CI_Model {
	private $cards_tname = 'user_cards';

	private $cache_deck;
	private $cache_uid;

	private $cards_one;

	public function index() {

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
		$data = array();

		if ($this->cards_one) {
			for($i=0,$len=count($_type);$i<$len;$i++){
				$deck_one = $this->cards_one[$_type[$i]];
				if($deck_one){
					$deck_one = unserialize($deck_one);
					array_push($data,$deck_one);
				}
			}
			$data = json_encode($data);
		} else {
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
				for($i=0,$len=count($_type);$i<$len;$i++){
					$deck_one = $this->cards_one[$_type[$i]];
					if($deck_one){
						$deck_one = unserialize($deck_one);
						array_push($data,$deck_one);
					}
				}
				$data = json_encode($data);
			} else {
				$result = FALSE;
				$data = 'data is null acording the uid';
			}
		}
		return array('result' => $result, 'data' => $data);
	}

	//存入的必须是序列化的数组
	public function save_deck($_uid, $_data) {
		$result = $this->save($_uid, 'deck_cards', $_data);
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

	public function get_all($_uid) {
		$reuslt = $this->get($_uid, array('all_cards'));
		return $reuslt;
	}

}
?>