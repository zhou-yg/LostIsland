<?php
class Init extends CI_Model {
	
	private $user_list_tname = 'user_list';
	private $user_card_tname = 'user_cards';

    function __construct()
    {
        parent::__construct();
    }
	//插入 初始化 基本用户信息
	function user_init($_client_token,$_user_token,$_username){
		$this->load->model('user/user_config');
		
		$user_list_tname = $this->user_list_tname;
		$user_cards_tname = $this->user_card_tname;
				
		$chacter = $this->user_config->get_defualt_character_img();
		
		$insert_user_basic_sql = "insert into $user_list_tname values(NULL,'$_client_token','$_user_token','$_username','$chacter')";
		$insert_user_basic_result = $this->db->simple_query($insert_user_basic_sql);
		
		if($insert_user_basic_result){
			
			$last_uid = $this->db->insert_id();
			
			$init_card_ids_arr = $this->user_config->get_init_card_ids();
			$init_card_ids_str = serialize($init_card_ids_arr);
			
			$init_user_cards_sql = "insert into $user_cards_tname values(NULL,$last_uid,'$init_card_ids_str','$init_card_ids_str')";
			$init_cards_query_result = $this->db->simple_query($init_user_cards_sql);
			
			if($init_cards_query_result){
				return TRUE;
			}else{
				return FALSE;
			}
		}else{
			return FALSE;
		}		
	}
	//插入client_token
	function insert_client_token($_client_token){
			
		$insert_client_sql = "insert into client_tokens values(NULL,'$_client_token')";
		$insert_client_token_result = $this->db->simple_query($insert_client_sql);
		
		if($insert_client_token_result){
			return TRUE;
		}else{
			return FALSE;
		}
	}
	//保证username唯一 是否存在
	function is_name_isxists($_username){
		//保证username 是否存在
		$user_list_tname = $this->user_list_tname;
		$check_username_sql = "select * from $user_list_tname where username='$_username'";
		$result_username_query = $this->db->query($check_username_sql);
		
		//已经存在
		if($result_username_query->num_rows()>0){
			return TRUE;
		}else{
			return FALSE;			
		}
	}
	public function init($_client_token,$_username){
		
		$this->load->database();
		$this->load->model('encry/sec_key');
		
		$t = $this->is_name_isxists($_username);
		if($t){
			return array(
				'result'=>FALSE,
				'data'=>'username repeat'
			);
		}
		//生成一个user_token;
		$user_token = $this->sec_key->create_token();
		
		//insert action
		if($this->insert_client_token($_client_token)){
			
		}else{
			return array(
				'result' => FALSE,
				'data' => 'client_insert'
			);
		}
		
		//插入基本用户信息
		if($this->user_init($_client_token, $user_token, $_username)){
			
		}else{
			return array(
				'result' => FALSE,
				  'data' => 'user_init'
			);
		}	
		
   		return array(
   				'result' => TRUE,
   				'data' => array(
   					'clientToken' => $_client_token,
   					'userToken'   => $user_token,
	   				'username'    => $_username
				 )
			 );
		
	}
}
?>