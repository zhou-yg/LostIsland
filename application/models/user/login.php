<?php
class login extends CI_Model {

	private $user_tname = 'user_list';
	private $carsd_tname = 'user_cards';

    function __construct()
    {
        parent::__construct();
    }
	public function check_login($_client_token,$_user_token){
		session_start();
		
		$this->load->database();
		
		$user_tname = $this->user_tname;
		$check_sql = "select * from $user_tname where client_token='$_client_token' and user_token='$_user_token' ";
		$check_sql_result = $this->db->query($check_sql);

		if($check_sql_result->num_rows()>0){
			
			$result_array = $check_sql_result->result_array();
			$userOne = $result_array[0];
			
			$sessionToken = $this->sec_key->create_token();
			
			$this->session->set_userdata(array(
				'sessionToken' => $sessionToken
			));

			//获取当前组
			$cards_tname = $this->carsd_tname;
			$uid = $userOne['id'];
			$get_deck_sql = "select * from $cards_tname where uid=$uid ";
			$get_deck_query = $this->db->query($get_deck_sql);
			
			if($get_deck_query->num_rows()>0){
				$result_array = $get_deck_query->result_array();
				$cardsOne = $result_array[0];


				$userMsgArr = array(
					'nickname'     => $userOne['username'],
					'character'    => $userOne['character'],
					'my_deck'      => json_encode(unserialize($cardsOne['deck_cards'])),
					'sessionToken' => $sessionToken
				);

				return $userMsgArr;
			}else{
				return FALSE;
			}
		}else{
			return FALSE;
		}
	}
}
?>