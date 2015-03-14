<?php
class login extends CI_Model {

	private $user_tname = 'user_list';
	private $carsd_tname = 'user_cards';

    function __construct()
    {
        parent::__construct();
    }
	public function set_param($_param){
		$client_token = $this->input->post('client_token');
		$user_token = $this->input->post('user_token');
		
		$result = $this->check_login($client_token, $user_token);
		return $result;
	}
	public function check_token($token){
		return $this->sec_key->set_param(array(
					'type' => 'check',
					'token' => $token
				));
	}
	public function check_login($uid,$_client_token=NULL,$_user_token=null){
		
		$this->load->database();
		
		$user_tname = $this->user_tname;
		$check_sql = "select * from $user_tname where id=$uid ";
		$check_sql_result = $this->db->query($check_sql);

		if($check_sql_result->num_rows()>0){
			
			$result_array = $check_sql_result->result_array();
			$userOne = $result_array[0];
			
			$sessionToken = $this->sec_key->create_token();
			
			//获取当前组
			$cards_tname = $this->carsd_tname;
			$uid = $userOne['id'];

			$this->session->set_userdata(array(
				'sessionToken' => $sessionToken,
				'sessionUid' => $uid
			));

			//获取卡组
			
			$userMsgArr = array(
				'uid'          => $uid,
				'nickname'     => $userOne['username'],
				'character'    => $userOne['character'],
				'sessionToken' => $sessionToken
			);
			return $userMsgArr;
		}else{
			return array(
				'result' => FALSE
			);
		}
	}
}
?>