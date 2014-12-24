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
		$data = '';

		if ($this->cards_one) {
			$data = json_encode(unserialize($this->cards_one[$_type]));

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

				$json1 = $this->cards_one[$_type];

				$data = json_encode(unserialize($this->cards_one[$_type]));
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
		$reuslt = $this->get($_uid, 'deck_cards');
		return $reuslt;
	}

	public function get_all($_uid) {
		$reuslt = $this->get($_uid, 'all_cards');
		return $reuslt;
	}

}
?>