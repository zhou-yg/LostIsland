<?php
class Init extends CI_Model {
	
	private $table_name = 'user_list';
	private $user_card_table_name = 'user_cards';

    function __construct()
    {
        parent::__construct();
    }
	//插入 初始化 基本用户信息
	function user_init($_client_token,$_user_token,$_username){
		
		$insert_user_basic_sql = "insert into $this->table_name values(NULL,'$_client_token','$_user_token','$_username')";
		$insert_user_basic_result = $this->db->simple_query($insert_user_basic_sql);
		
		if($insert_user_basic_result){
			
			$last_uid = $this->db->insert_id();
			
			$this->load->model('cards/card_config');
			
			$card_ids_arr = $this->card_config->get_init_card_ids();
			$card_ids_str = serialize($card_ids_arr);
			
			$init_user_cards_sql = "insert into $this->user_card_table_name values(NULL,$last_uid,'$card_ids_str','null')";
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

		$table_name = $this->table_name;
		//保证username 是否存在
		$check_username_sql = "select * from $table_name where username='$_username'";
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
		

		if($this->is_name_isxists($_username)){
			return array(
				'result'=>FALSE,
				'data'=>'username_repeat'
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
				  'data' => 'user_insert'
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