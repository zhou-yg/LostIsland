<?php
class Init extends CI_Model {
	
	private $user_list_tname = 'user_list';
	private $user_card_tname = 'user_cards';

	private $user_chess_tname = 'user_chess';

    function __construct()
    {
        parent::__construct();
		$this->load->database();
		$this->load->model('encry/sec_key');
		$this->load->model('user/user_config');
    }
	/**
	 * $_param = array(
	 * 	'username',
	 * 	'clientToken'
	 * );
	 */
	public function set_param($_param){
		$client_token = $this->input->post('clientToken');
		$username = $this->input->post('username');
		
		if($username && $this->sec_key->check_token($client_token)){
			return $this->init($client_token, $username);
		}else{
			return array(
				'result' => FALSE,
				'data' => 'illegal_token or no name'
			);
		}
	}
	//插入 初始化 基本用户信息
	function user_init($_client_token,$_user_token,$_username){
		
		$user_list_tname = $this->user_list_tname;
		$user_cards_tname = $this->user_card_tname;
		$user_chess_tname = $this->user_chess_tname;
				
		$chacter = $this->user_config->get_defualt_character_img();
		
		
		$insert_user_basic_sql = "insert into $user_list_tname values(NULL,'$_client_token','$_user_token','$_username','$chacter',0,0)";
		$insert_user_basic_result = $this->db->simple_query($insert_user_basic_sql);
		
		if($insert_user_basic_result){
			$last_uid = $this->db->insert_id();
			//初始化时，拥有的所有card
			$init_all_card_ids_arr = $this->user_config->get_init_all_card_ids();
			$init_all_card_ids_str = serialize($init_all_card_ids_arr);
			//初始化时，拥有的所有hero
			$init_all_hero_ids_arr = $this->user_config->get_init_all_hero_ids();
			$init_all_hero_ids_str = serialize($init_all_hero_ids_arr);
			//初始化时，拥有的所有deck
			$init_all_deck = array();

			$init_card_ids_arr = $this->user_config->get_init_card_ids();
			$init_all_deck[0] = $init_card_ids_arr;
			
			$init_all_decks_str = serialize($init_all_deck);

			$insert_data_arr = array(
				'id' => null,
				'uid'=> $last_uid,
				'all_heroes' =>	$init_all_hero_ids_str,
				'all_cards'  => $init_all_card_ids_str,
				'all_decks'  => $init_all_decks_str, 
				'deck_cards' =>  null,
				'deck_cards_2' => null,
				'deck_cards_3' => null,
				'deck_cards_4' => null,
				'deck_cards_5' => null,
				'deck_cards_6' => null,
				'deck_cards_7' => null,
				'deck_cards_8' => null
			);
			$init_user_cards_sql = $this->db->insert_string($user_cards_tname,$insert_data_arr); 
			$init_cards_query_result = $this->db->simple_query($init_user_cards_sql);
			
			//拥有的chess
			$init_chesses = $this->user_config->get_init_chesses();
			$init_chess_str = serialize($init_chesses);
			
			$insert_chess_arr = array(
				'id' => null,
				'uid' => $last_uid,
				'chess_arr' => $init_chess_str
			);
			$insert_chess_sql = $this->db->insert_string($user_chess_tname,$insert_chess_arr);
			$init_chess_query_result = $this->db->simple_query($insert_chess_sql);
			
			if($init_cards_query_result && $init_chess_query_result){
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
		//保证username 是否存在
		$user_list_tname = $this->user_list_tname;
		$check_username_sql = "select * from $user_list_tname where username='$_username'";
		$result_username_query = $this->db->query($check_username_sql);
		
		//已经存在
		if($result_username_query->num_rows()>0){
			return TRUE;
		}else{
			return FALSE;			
		}
	}
	public function init($_client_token,$_username){
		
		$result = TRUE;
		$data;
		//事务开始
		$this->db->trans_begin();
		
		$t = $this->is_name_isxists($_username);
		if($t){
			$result=FALSE;
			$data = 'username repeat';
		}
		//生成一个user_token;
		$user_token = $this->sec_key->create_token();
		
		//insert action
		if($this->insert_client_token($_client_token)){
			
		}else{
			$result=FALSE;
			$data = 'client_insert';
		}
		
		//插入基本用户信息
		if($this->user_init($_client_token, $user_token, $_username)){
			
		}else{
			$result=FALSE;
			$data = 'user_init';
		}	

		if($result){
			$this->db->trans_commit();
	   		return array(
   					'result' => $result,
   					'data' => array(
   						'clientToken' => $_client_token,
   						'userToken'   => $user_token,
	   					'username'    => $_username
					 )
			 );
		}else{
			$this->db->trans_rollback();
	   		return array(
   					'result' => $result,
   					'data' => $data
			 );
		}
	}
}
?>