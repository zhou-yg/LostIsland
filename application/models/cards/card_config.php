<?php
class Card_config extends CI_Model {
	//at present:
	//id name normalAvatar battleAvatar hp atk ability
	private $table_pre = 'card_';	
	private $saber     = 'saber';
	private $archer    = 'archer';

    function __construct()
    {
        parent::__construct();
    }
	
	public function getSaberConfig($_type){
		$this->load->database();
		$table_name = $this->table_pre.$this->saber;
		
		$get_saber_sql = "select * from $table_name";
		$card_saber_query = $this->db->query($get_saber_sql);
		
		if($card_saber_query->num_rows()>0){
			
			if($_type == 'array' || $_type == 'arr'){
				return $card_saber_query->result_array();
			}else if($_type == 'object' || $_type == 'obj'){
				return $card_saber_query->result();
			}else{
				return null;
			}
		}else{
			return null;
		}
	}
	public function getSaberConfigJS(){

		$saber_query_arr = $this->getSaberConfig('arr');

		$card_config_js_data = 'cardConfigList={';
		
		for ($i=0; $i < count($saber_query_arr); $i++) { 
			foreach ($saber_query_arr[$i] as $key => $value) {
				if($key == 'id'){
					$card_config_js_data .= 'card'.$value.':{';
				}else{
					if(is_string($value)){
						$card_config_js_data .= $key.':"'.$value.'",';
					}else{
						$card_config_js_data .= $key.':'.$value.',';
					}
				}
			}
			$card_config_js_data .= '},';
		}
		$card_config_js_data .= '}';
		
		return $card_config_js_data;		
	}
}
?>