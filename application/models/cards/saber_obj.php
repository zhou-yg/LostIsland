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
	private function create_card_dir(){
		$card_index = $this->db->count_all($this->saber_tname);
		return $card_index + 1;
	}
	/*
	 * 上传图片，构建card的属性数据
	 * 
	 */
	private function cardImg_upload($carddir_path,$carddir_name){
		$saber_msg = array();
		
		$card_name = $this->input->post('card_name');
		$atk       = $this->input->post('atk');
		$hp        = $this->input->post('hp');
		
		$saber_msg['name'] = $card_name;
		$saber_msg['atk'] = intval($atk);
		$saber_msg['hp'] = intval($hp);

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

		return $saber_msg;		
	}
	/*	验证该卡的专属文件夹是否存在,
	 * 如果是update操作(带有$_cardIndex)，则不创建，false
	 * 如果是create操作，则创建，
	 */
	private function carddir_exists($_cardIndex = null){
		if($_cardIndex){
			$carddir_name = $this->carddir_pre.$_cardIndex.'/';
		}else{
			$carddir_name = $this->carddir_pre.$this->create_card_dir().'/';
		}
		$carddir_path = $this->cardImg_file_path_pre.$carddir_name;
		
		$fileExistsResult = file_exists($carddir_path);

		if(!$_cardIndex){
			if(!$fileExistsResult){
				$mkdir_result = mkdir($carddir_path);
				if($mkdir_result){
					
					$mkdirR0 = mkdir($carddir_path.$this->battleAvatarDirName);
					$mkdirR1 = mkdir($carddir_path.$this->characterMainDirName);
					$mkdirR2 = mkdir($carddir_path.$this->normalAvatrarDirName);
					$mkdirR3 = mkdir($carddir_path.$this->selectListDirName);
					
					if(!($mkdirR0 && $mkdirR1 && $mkdirR2 && $mkdirR3)){
						return FALSE;
					}else{
					}
				}else{
					return FALSE;
				}
			}
		}else{
			if(!$fileExistsResult){
				return FALSE;
			}
		}
		return array(
			'carddir_path' => $carddir_path,
			'carddir_name' => $carddir_name
		);
	}
	private function cardmsg_build(){
		$dirExistsResult = $this->carddir_exists();
		if(!$dirExistsResult){
			return $dirExistsResult;
		}
		
		$saber_msg = $this->cardImg_upload($dirExistsResult['carddir_path'],$dirExistsResult['carddir_name']);
		
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
		
		$upload_data = $this->cardmsg_build();
		if($upload_data){
			$insertData = array(
				'id'             => null,
				'name'           => $upload_data['name'],
				'normalAvatar'   => $upload_data['normalAvatar'],
				'select_list'    => $upload_data['select_list'],
				'character_main' => $upload_data['character_main'],
				'battleAvatar'   => $upload_data['battleAvatar'],
				'atk'            => $upload_data['atk'],
				'hp'             => $upload_data['hp']
			);
			$sqlStr = $this->db->insert_string($this->saber_tname,$insertData);
			
			$result = $this->db->simple_query($sqlStr);
			if(!$result){
				$data = 'insert fail';
			}
		}else{
			$result =FALSE;
			$data = 'upload data false or dir not exist';
		}
		
		return array(
			'result' => $result,
			'data' => $data
		);
	}
	//card_saber表的主键id
	public function update($_card_index){
		$result = TRUE;
		$data = null;
		
		$dirExistsResult = $this->carddir_exists($_card_index);
		if($dirExistsResult){
			$saber_msg = $this->cardImg_upload($dirExistsResult['carddir_path'],$dirExistsResult['carddir_name']);
		
			//过滤
			$updateData = array();	
			foreach ($saber_msg as $key => $value) {
				if($value){
					$updateData[$key] = $value;
				}
			}
			$where = 'id = '.$_card_index;
	
			$updateSql = $this->db->update_string($this->saber_tname,$updateData,$where);
			
			$queryResult = $this->db->simple_query($updateSql);
			if(!$queryResult){
				$result = FALSE;
				$data = 'saber_obj update fail';
			}
		}else{
			$result = FALSE;
			$data = 'carddir not exist';
		}
		return array(
			'result' => $result,
			'data' => $data
		);
	}
	//card_saber表的主键id
	public function delete($_card_index){
	}
}
?>