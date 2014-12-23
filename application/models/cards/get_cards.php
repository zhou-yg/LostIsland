<?php
class Get_cards extends CI_Model {
	private $cards_tname = 'user_cards';

	private $cache_deck;
	private $cache_uid;

	private $cards_one;

	public function index(){
		
	}
	public function save($_uid,$_sessionToken,$_type,$_data){
			
		$result = TRUE;
		$data = 'update success';
			
		if($this->session->userdata('sessionToken') === $_sessionToken){
			
			$dataArr = array(
				'$_type' => $_data
			);
			$where = 'uid = $_uid';
			$save_cards_sql = $this->db->update_string($this->cards_tname,$dataArr,$where);
			$save_cards_query_result = $this->db>simple_query($save_cards_sql);
		
			if(!$save_cards_query_result){
				$data = 'update fail';
			}
		}else{
			$data = 'illegal sessionToken in save cards';
		}
		return array(
			'result' => $result,
			'data' => $data
		);
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
	//存入的必须是序列化的数组
	public function save_deck($_uid,$_sessionToken,$_data){
		$result = $this->save($_uid, $_sessionToken, 'deck_cards', $_data);
		return $resultl;
	}
	public function save_all($_uid,$_sessionToken,$_data){
		$result = $this->save($_uid, $_sessionToken, 'all_cards', $_data);
		return $resultl;
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