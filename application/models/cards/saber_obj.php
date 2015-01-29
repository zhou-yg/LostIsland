<?php
class Saber_obj extends CI_Model{

	private $saber_tname = 'card_saber';

	private $cardImg_file_path_pre = 'Public/images/cards/';

	private $carddir_pre = 'card';

	private $battleAvatarDirName = 'battleAvatar/';
	private $characterMainDirName ='character_main/';
	private $normalAvatrarDirName = 'normalAvatar/';
	private $selectListDirName = 'select_list/';

	private $img_field_arr = array(
		'battle',
		'character',
		'normal',
		'select',
	);
	private $cards_path_arr = array(
		'battleAvatar/',
		'character_main/',
		'normalAvatar/',
		'select_list/',
	);
    function __construct()
    {
        parent::__construct();
		$this->load->database();
    }
	//获取，新卡专属文件夹的名称序号
	public function create_card_dir(){
		$card_index = $this->db->count_all($this->saber_tname);
		return $card_index + 1;
	}
	public function cardImg_upload(){
		echo '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">';
		$saber_msg = array();
			
		$card_name = $this->input->post('card_name');
		$atk = $this->input->post('atk');
		$hp  = $this->input->post('hp');
		
		$saber_msg['name'] = $card_name;
		$saber_msg['atk'] = intval($atk);
		$saber_msg['hp'] = intval($hp);
		
		$carddir_name = $this->carddir_pre.$this->create_card_dir().'/';
		$carddir_path = $this->cardImg_file_path_pre.$carddir_name;
		
		var_dump($this->cardImg_file_path_pre);
		var_dump($carddir_name);
		var_dump($carddir_path);		
		
		if(!file_exists($carddir_path)){
			$mkdir_result = mkdir($carddir_path);
			if($mkdir_result){
				
				$mkdirR0 = mkdir($carddir_path.$this->battleAvatarDirName);
				$mkdirR1 = mkdir($carddir_path.$this->characterMainDirName);
				$mkdirR2 = mkdir($carddir_path.$this->normalAvatrarDirName);
				$mkdirR3 = mkdir($carddir_path.$this->selectListDirName);
				
				if(!($mkdirR0 && $mkdirR1 && $mkdirR2 && $mkdirR3)){
					echo  'make childdir fail';
					return FALSE;
				}
			}else{
				echo  'make carddir fail';
				return FALSE;
			}
		}

		$up_config = array();
		for($i=0,$len=count($this->img_field_arr);$i<$len;$i++){
			array_push($up_config,array(
				'field'       => $this->img_field_arr[$i],
				'upload_path' => $carddir_path.$this->cards_path_arr[$i]
			));
		}
		$this->load->library('upload',$up_config);

		if(!$this->upload->upload_handle(true)){
			$this->upload->display_errors();
		}
		$all_updata = $this->upload->all_data();

		$tmp_arr = $all_updata[0];
		$saber_msg['normalAvatar']   = $carddir_name.$this->battleAvatarDirName.$tmp_arr['file_name'];
		$tmp_arr = $all_updata[1];
		$saber_msg['select_list']    = $carddir_name.$this->characterMainDirName.$tmp_arr['file_name'];
		$tmp_arr = $all_updata[2];
		$saber_msg['character_main'] = $carddir_name.$this->normalAvatrarDirName.$tmp_arr['file_name'];
		$tmp_arr = $all_updata[3];
		$saber_msg['battleAvatar']   = $carddir_name.$this->selectListDirName.$tmp_arr['file_name'];
		
		if(!($saber_msg['normalAvatar'] && $saber_msg['select_list'] && $saber_msg['character_main'] && $saber_msg['battleAvatar'])){
			$saber_msg = null;
		}
		return $saber_msg;
	}
	/**
	 * $upload_data
	 * 
	 * name:String
	 * atk:int
	 * hp:int
	 * 
	 * normalAvatar
	 * select_list
	 * character_main
	 * battleAvatar
	 */
	public function create(){
		$result = FALSE;
		$data = 'create success';
		
		$upload_data = $this->cardImg_upload();
		if($upload_data){
			$insertData = array(
				'id' => null,
				'name' => $upload_data['name'],
				'normalAvatar' => $upload_data['normalAvatar'],
				'select_list' => $upload_data['select_list'],
				'character_main' => $upload_data['character_main'],
				'battleAvatar' => $upload_data['battleAvatar'],
				'atk' => $upload_data['atk'],
				'hp' => $upload_data['hp']
			);
			$sqlStr = $this->db->insert_string($this->saber_tname,$insertData);
			
			$result = $this->db->simple_query($sqlStr);
			if(!$result){
				$data = 'insert fail';
			}
		}else{
			$result =FALSE;
			$data = 'insert fail';
		}
		
		return array(
			'result' => $result,
			'data' => $data
		);
	}
	public function delete(){
		
	}
}
?>