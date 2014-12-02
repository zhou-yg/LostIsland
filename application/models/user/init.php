<?php
class Init extends CI_Model {
	
	private $table_name = 'user_list';

    function __construct()
    {
        parent::__construct();
    }
	public function init($_client_token,$_username){
		
		$this->load->database();
		$this->load->model('encry/sec_key');
		
		$table_name = $this->table_name;
		//保证username 是否存在
		$check_username_sql = "select * from $table_name where username='$_username'";
		$result_username_query = $this->db->query($check_username_sql);

		if($result_username_query->num_rows()>0){
			return array(
				'result'=>FALSE,
				'data'=>'username_repeat'
			);
		}
		//生成一个user_token;
		$user_token = $this->sec_key->create_token();
		
		//insert action
		$insert_client_sql = "insert into client_tokens values(NULL,'$_client_token')";
		$insert_client_token_result = $this->db->simple_query($insert_client_sql);
		if($insert_client_token_result){
		}else{
			return array(
				'result' => FALSE,
				'data' => 'client_insert'
			);
		}
		
		//插入基本用户信息
		$insert_user_basic_sql = "insert into user_list values(NULL,'$_client_token','$user_token','$_username')";
		$insert_user_basic_result = $this->db->simple_query($insert_user_basic_sql);
		if($insert_user_basic_result){
			
			$select_last_id_sql = 'select last_insert_id()';
			$last_id_query = $this->db->query($select_last_id_sql);
			
			print_r($last_id_query);			
			
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