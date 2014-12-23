<?php
class Sec_key extends CI_Model {
	
    function __construct()
    {
        parent::__construct();
    }
	
	private function unixtime_craete() {
		list($ms, $sec) = explode(' ', microtime());

		$unix_time = $sec * 1000 + $ms * 1000;
		$unix_time = number_format($unix_time);
		$unix_time_arr = explode(',', $unix_time);
		$unix_time = '';
		for ($i = 0, $len = count($unix_time_arr); $i < $len; $i++) {
			$unix_time .= $unix_time_arr[$i];
		}
		return $unix_time;
	}

	//加密:混淆
	private function num_mix($_strnum) {
		$num = '';
		for ($i = 0, $len = strlen($_strnum); $i < $len / 2; $i++) {
			$num .= $_strnum[$i];
			if ($i != ($len - 1) / 2) {
				$num .= $_strnum[$len - $i - 1];
			}
		}
		return $num;
	}

	//解:解混淆
	private function num_clear($_strnum) {
		$prenum = $aftnum = '';
		for ($i = 0, $len = strlen($_strnum); $i < $len; $i += 2) {
			$prenum .= $_strnum[$i];
			$aftnum = $_strnum[$i + 1] . $aftnum;
		}
		return $prenum . $aftnum;
	}

	private function num2bin($_strnum) {
		//2的31次方   小于   最大的10进制数的10位
		$dec_max_len = 9;
		$len = strlen($_strnum);

		$dec_num_pre = substr($_strnum, 0, $len - $dec_max_len);
		$to_bin_num = substr($_strnum, $len - $dec_max_len, $dec_max_len);

		$bin_num = decbin($to_bin_num);
		$a_bin_num = '';

		for ($i = 0, $bin_len = strlen($bin_num); $i < $bin_len; $i++) {
			if ($bin_num[$i] == '1') {
				$a_bin_num .= '0';
			} else {
				$a_bin_num .= '1';
			}
		}

		return array($bin_num, $a_bin_num, $dec_num_pre, $to_bin_num, bindec($a_bin_num));
	}

	private function num2token($_strnum) {
		$max_len = 9;
		$strhex = '';

		for ($i = 0, $len = strlen($_strnum); $i < $len / $max_len; $i++) {
			if ($i != 0) {
				$strhex .= 'X';
			}

			$begin = $i * $max_len;

			$str = substr($_strnum, $begin, $max_len);
			if ($str[0] == '0') {
				$str = '0' . dechex($str);
			} else {
				$str = dechex($str);
			}
			$strhex .= $str;
		}
		return $strhex;
	}

	public function create_token() {
		//获取毫秒数字符串
		$num = $this->unixtime_craete();
		//混淆
		$num = $this->num_mix($num);
		//将需要的部分转到二进制,再转为10进制
		$codes = $this->num2bin($num);
		//变成token
		$token = $this->num2token($codes[2] . $codes[3] . $codes[4]);
		
		if($this->check_token($token)){
			return $token;
		}else{
			return 'false';
		}
	}
	public function check_token($_strtoken) {
		//前4位，相对固定，基本过30年才变
		$absolute_pre = 4;
		$max_len = 9;
		$strdec = '';
		$hex_num_arr = explode('X', $_strtoken);
		$hex_num_len = count($hex_num_arr);

		$check_result = TRUE;

		if ($hex_num_len != 3) {
			return FALSE;
		}
		for ($i = 0; $i < $hex_num_len; $i++) {
			$hex_one = $hex_num_arr[$i];
			if ($hex_one[0] == '0') {
				$dec_one = '0' . hexdec($hex_one);
			} else {
				$dec_one = hexdec($hex_one);
			}
			if ($i != $hex_num_len - 1) {
				if ($max_len != strlen($dec_one)) {
					return FALSE;
				}
			}
			$strdec .= $dec_one;
		}

		$dec_num_arr = array();
		$dec_num_len = $hex_num_len;

		$dec_num_arr[0] = substr($strdec, 0, $absolute_pre);
		$dec_num_arr[1] = substr($strdec, $absolute_pre, $max_len);
		$dec_num_arr[2] = substr($strdec, $absolute_pre + $max_len, strlen($strdec));
		
		if ($max_len != strlen($dec_num_arr[1])) {
			return FALSE;
		}

		$bin_num1 = decbin($dec_num_arr[1]);
		$bin_num2 = decbin($dec_num_arr[2]);

		$bin_num1_len = strlen($bin_num1);
		$bin_num2_len = strlen($bin_num2);

		$k = $bin_num1_len - $bin_num2_len;
		for ($i = 0; $i < $k; $i++) {
			$bin_num2 = '0' . $bin_num2;
		}
		for ($i = 0; $i < $max_len; $i++) {
			if ($bin_num1[$i] == $bin_num2[$i]) {
				$check_result = FALSE;
				break;
			}
		}
		return $check_result;
	}
}
?>