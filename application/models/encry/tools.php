<?php
class Tools extends CI_Model {
	
    function __construct()
    {
        parent::__construct();
    }
	public function delete_slash($_str){
		$str = '';
		for($i=0,$len=strlen($_str);$i<$len;$i++){
			if($_str[$i] !== '\\'){
				$str = $str.$_str[$i];
			}
		}
		return $str;
	}

}
?>