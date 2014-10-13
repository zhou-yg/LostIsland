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
		
		$first = rand($min, $max);
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
		
		for ($i=0; $i < $this->paragraph_num; $i++) { 

			$chars = $this->get_chars();
			$nums = $this->get_nums($chars);

			$token = $token."$chars[0]$nums[0]$chars[1]$nums[1]";

			$this->char_max -= 1;
			$this->char_min += 1;
		}
		
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

		$is_create_new_client_token = FALSE;
		$result_client_token = TRUE;
		//保证client_token唯一
		while ($result_client_token) {
			
			$result_client_token = $this->db->simple_query("select * from client_tokens where client_token='$client_token'");
			if($result_client_token){
				$client_token = $this->token_create();
				$is_create_new_client_token = TRUE;
			}else{
				$insertResult = $this->db->query("insert into client_tokens values(null,'$client_token')");
			}
		}
		//保证username唯一
		$result_username = $this->db->simple_query("select * from user_list where username='$username'");
		if($result_username){
			return FALSE;
		}else{
			//保证user_token唯一
			$result_user_token = TRUE;
			$user_token = $this->token_create();

			while ($result_user_token) {
				$result_user_token = $this->db->simple_query("select * from user_list where user_token='$user_token'");
				if($result_user_token){
					$user_token = $this->token_create();
				}
			}
			
			$this->db->simple_query("insert into user_list values(null,'$client_token','$user_token','$username')");
		}
    	return array( 
    			'clientToken' => $client_token,
    			'userToken'   => $user_token,
    			'username'    => $username
			 	);
	}
}
?>