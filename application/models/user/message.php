<?php
class Message extends CI_Model {
	private $user_tname = 'user_list';
	
	private $user_one;
	
	function __construct()
    {
        parent::__construct();
    }
	public function set_param($_param){
		$uid = $_param['uid'];
		return $this->get_basic($uid);
	}
	public function get_basic($_uid){
		$result = TRUE;
		$data = '';
	
		if($this->user_one){
			$data = array(
					'uid'     => $this->user_one['id'],
					'nickname' => $this->user_one['nickname'],
					'character' => $this->user_one['character']
				);
		}else{
			$this->load->database();
			$user_tname = $this->user_tname;
			
			$get_basic_sql = "select * from $user_tname where id=$_uid";
			$get_basic_query = $this->db->query($get_basic_sql);
			
			if($get_basic_query->num_rows()>0){
				
				$result_array = $get_basic_query->result_array();
				$this->user_one = $result_array[0];
				
				$data = $this->user_one;
				//删除不必要de信息
				unset($data['client_token']);
				unset($data['user_token']);
			}else{
				$result = FALSE;
				$data = 'data is null acording the uid';
			}
		}
		return array(
			'result' => $result,
			'data' => $data
		);
	}
}
?>