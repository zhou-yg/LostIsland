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
			$this->char_min -= 1;
		}
		
		$this->char_max -= 10;
		
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
}
?>