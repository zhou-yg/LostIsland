<?php
class Get_cards extends CI_Model {
	private $cards_tname = 'user_cards';

	private $cache_deck;
	private $cache_uid;

	private $cards_one;

	public function index(){
		
	}
	public function save($_uid,$_sessionToken,$_type){
		
	}
	public function get($_uid,$_sessionToken,$_type){
		
		$result = TRUE;
		$data = '';
		
		if($this->cards_one){
			$data = json_encode(unserialize($this->cards_one[$_type]));

		}else if($this->session->userdata('sessionToken') === $_sessionToken){
			$this->load->database();
			$cards_tname = $this->cards_tname;
			
			$get_deck_sql = "select * from $cards_tname where uid=$_uid";
			$get_deck_query = $this->db->query($get_deck_sql);
			
			if($get_deck_query->num_rows()>0){
				
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
			}else{
				$result = FALSE;
				$data = 'data is null acording the uid';
			}
		}else{
			$result = FALSE;
			$data = 'sessionToken illegal';
		}
		return array(
			'result' => $result,
			'data' => $data
		);		
	}
	public function save_deck($_uid,$_sessionToken){
		
	}
	public function get_deck($_uid,$_sessionToken){
		$reuslt = $this->get($_uid,$_sessionToken,'deck_cards');
		return $reuslt;
	}
	public function get_all($_uid,$_sessionToken){
		$reuslt = $this->get($_uid,$_sessionToken,'all_cards');
		return $reuslt;
	}
}
?>