<?php
class Card_config extends CI_Model {
	//at present:
	//id name normalAvatar battleAvatar hp atk ability
	// /normalAvatar/0_184_184.jpg,
	// /battleAvatar/0_184_184.jpg
	private $table_pre = 'card_';	
	private $saber     = 'saber';
	private $hero      = 'hero';

	private $types_arr = array();

    function __construct()
    {
        parent::__construct();
		array_push($this->types_arr,$this->saber);
		array_push($this->types_arr,$this->hero);
    }
	public function set_param($_param){
		$type = $_param->type;
		if(in_array($type, $this->types_arr)){
			if($type == $this->saber){
				return $this->getCardConfigJS();
			}
			if($type == $this->hero){
				return $this->getHeroConfigJS();
			}
		}
	}
	public function getCardConfig($_type){
		$this->load->database();
		$table_name = $this->table_pre.$_type;
		
		$get_saber_sql = "select * from $table_name";
		$card_saber_query = $this->db->query($get_saber_sql);
		
		if($card_saber_query->num_rows()>0){
			return $card_saber_query->result_array();
		}else{
			return null;
		}
	}
	public function getCardConfigJS(){

        $this->load->helper('url');

		$saber_query_arr = $this->getCardConfig($this->saber);

	
		$card_config_js_data = 'var cardConfigObjList={';
		
		for ($i=0; $i < count($saber_query_arr); $i++) { 
			foreach ($saber_query_arr[$i] as $key => $value) {
				if($key == 'id'){
					$card_config_js_data .= 'card'.$value.':{';
				}else{
					if(intval($value) == 0 && $value!='0' ){
						$card_config_js_data .= $key.':"'.$value.'",';
					}else{
						$card_config_js_data .= $key.':'.$value.',';
					}
				}
			}
			$card_config_js_data .= '},';
		}
		$card_config_js_data .= '};';

		$card_config_js_data .= 'var cardAvatarPre = "'.base_url().'Public/images/cards/";';

		return $card_config_js_data;		
	}
	public function getHeroConfigJS(){
        $this->load->helper('url');

		$hero_query_arr = $this->getCardConfig($this->hero);

		$hero_config_js_data = 'var heroConfigObjList={';
		
		for ($i=0; $i < count($hero_query_arr); $i++) { 
			foreach ($hero_query_arr[$i] as $key => $value) {
				if($key == 'id'){
					$hero_config_js_data .= 'hero'.$value.':{';
				}else{
					if(intval($value) == 0 && $value!='0' ){
						$hero_config_js_data .= $key.':"'.$value.'",';
					}else{
						$hero_config_js_data .= $key.':'.$value.',';
					}
				}
			}
			$hero_config_js_data .= '},';
		}
		$hero_config_js_data .= '};';

		$hero_config_js_data .= 'var heroAvatarPre = "'.base_url().'Public/images/hero/";';

		return $hero_config_js_data;		
	}
}
?>