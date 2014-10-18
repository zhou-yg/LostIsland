<?php
class User_tokens extends CI_Model {
	//token的总长度
	private $token_length = 16;
	//每段的长度
	private $paragraph_length = 4;
	//分3端
	private $paragraph_num = 4;
	//每段的范围
	private $char_base = 64;	
	private $char_max = 27;	
	private $char_min = 1;	

	private $num_max = 9;	
	private $num_min = 0;	

    function __construct()
    {
        parent::__construct();
    }
	function get_chars(){
		
		$base = $this->char_base;
		$max = $this->char_max;
		$min = $this->char_min;
		
		$first = rand($min, $max-1);
		$last = $max - $first;
		
		$first = chr($first + $base);
		$last = chr($last + $base);
		
		return array($first,$last);
	}
	function get_nums($_chars){
		
		$max = $this->num_max;
		$min = $this->num_min;
		
		$first = rand($min, $max);
		$last = $max - $first;
		
		$first_c = ord($_chars[0]);
		$last_c = ord($_chars[1]);
		
		if($first>$last){
			$t = $first;
			$first = $last;
			$last = $t;
		}
		if($first_c>$last_c){
			$t = $first;
			$first = $last;
			$last = $t;
		}
		
		return array($first,$last);
	}
	public function token_create(){
		
		$token = '';
		$max = $this->char_max;
		$min = $this->char_min;
		
		for ($i=0; $i < $this->paragraph_num; $i++) { 

			$chars = $this->get_chars();
			$nums  = $this->get_nums($chars);

			$token = $token."$chars[0]$nums[0]$chars[1]$nums[1]";

			$this->char_max -= 1;
			$this->char_min += 1;
		}
		
		$this->char_max = $max;
		$this->char_min = $min;
		
		return $token;
	}
	public function token_check($_token){
		
		$result = TRUE;
		
		for ($i=0; $i < $this->paragraph_num; $i++) { 
			
			$chars = array();
			$nums = array();
			
			for ($j=$i*$this->paragraph_length; $j < $i*$this->paragraph_length+$this->paragraph_length; $j++) {
					 
				if($j%2==0){
					array_push($chars,$_token[$j]);
				}else{
					array_push($nums,$_token[$j]);
				}
			}

			$chars[0] = ord($chars[0]);
			$chars[1] = ord($chars[1]);
			
			if($chars[0]+$chars[1] != $this->char_base*2+$this->char_max){
				$result = FALSE;
			}
			if($nums[0]+$nums[1] != $this->num_max+$this->num_min){
				$result = FALSE;
			}
			if($chars[0]<$chars[1]){
				if($nums[0]>$nums[1]){
					$result = FALSE;
				}
			}
			if($chars[0]>$chars[1]){
				if($nums[0]<$nums[1]){
					$result = FALSE;
				}
			}
			$this->char_max -= 1;
			$this->char_min -= 1;
		}
		return $result;
	}
	public function get_utoken($token,$table){
		
		
	}
	public function user_create($client_token,$username){
		$this->load->database();

		$isnt_new_client_token = TRUE;
		$result_client_token_query = TRUE;
		
		//保证client_token唯一
		while ($isnt_new_client_token) {

			$check_client_sql = "select * from client_tokens where client_token='$client_token'";
			$result_client_token_query = $this->db->query($check_client_sql);
			
			if($result_client_token_query->num_rows()>0){
				//the client token already exits
				$client_token = $this->token_create();
			}else{
				//the client token didn't exit
				$isnt_new_client_token = FALSE;
			}			
		}
		//保证username唯一
		$check_username_sql = "select * from user_list where username='$username'";
		$result_username_query = $this->db->query($check_username_sql);
		
		if($result_username_query->num_rows()>0){
			//the username already exits
			return array(
					'username_result' => FALSE
				);
		}else{
			//the username didn't exit
			//保证user_token唯一
			$isnt_new_user_token = TRUE;
			$user_token = $this->token_create();
			
			while($isnt_new_user_token){
				
				$check_user_token_sql = "select * from user_list where user_token='$user_token' ";
				$result_user_token_query = $this->db->query($check_user_token_sql);
				
				if($result_user_token_query->num_rows()>0){
					//user token already exits
					$user_token = $this->token_create();
				}else{
					//user token didn't exits
					$isnt_new_user_token = FALSE;
				}
			}
		}
		//insert action
		$insert_client_sql = "insert into client_tokens values(NULL,'$client_token')";
		$insert_client_token_result = $this->db->simple_query($insert_client_sql);
		if($insert_client_token_result){
		}else{
			return array(
				'result' => FALSE,
				  'data' => 'client insert'
			);
		}
					
		$insert_user_basic_sql = "insert into user_list values(NULL,'$client_token','$user_token','$username')";
		$insert_user_basic_result = $this->db->simple_query($insert_user_basic_sql);
		if($insert_user_basic_result){
		}else{
			return array(
				'result' => FALSE,
				  'data' => 'user insert'
			);
		}
				
   		return array(
   				'result' => TRUE,
   				'data' => array(
   					'clientToken' => $client_token,
   					'userToken'   => $user_token,
	   				'username'    => $username
				 )
			 );
	}
}
?>