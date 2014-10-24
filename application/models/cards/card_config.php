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
	
	public function getSaberConfig(){
		$this->load->database();
		$table_name = $this->table_pre.$this->saber;
		
		$get_saber_sql = "select * from $table_name";
		$card_saber_query = $this->db->query($get_saber_sql);
		
		if($card_saber_query->num_rows()>0){
			
			return $card_saber_query->result_array();
			
		}else{
			
		}
	}
}
?>