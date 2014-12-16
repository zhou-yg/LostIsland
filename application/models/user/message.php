<?php
class Message extends CI_Model {
	private $user_tname = 'user_list';
	
	private $user_one;
	
	function __construct()
    {
        parent::__construct();
    }

	public function get_basic($_uid,$_sessionToken){
		$result = TRUE;
		$data = '';
	
		if($this->user_one){
			$data = array(
					'nickname' => $this->user_one['nickname'],
					'character' => $this->user_one['character']
				);
		}else if($this->session->userdata('sessionToken') === $_sessionToken){
			$this->load->database();
			$user_tname = $this->user_tname;
			
			$get_basic_sql = "select * from $user_tname where id=$_uid";
			$get_basic_query = $this->db->query($get_basic_sql);
			
			if($get_basic_query->num_rows()>0){
				
				$result_array = $get_basic_query->result_array();
				$this->user_one = $result_array[0];
				
				$data = array(
						'nickname' => $this->user_one['username'],
						'character' => $this->user_one['character']
					);
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
}
?>