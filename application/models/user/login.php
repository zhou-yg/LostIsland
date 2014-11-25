<?php
class login extends CI_Model {

	private $table_name = 'user_list';

    function __construct()
    {
        parent::__construct();
    }
	public function check_login($_client_token,$_user_token){
		
		$this->load->database();
		
		$table_name = $this->table_name;
		$check_sql = "select * from $table_name where client_token='$_client_token' and user_token='$_user_token' ";
		$check_sql_result = $this->db->query($check_sql);

		if($check_sql_result->num_rows()>0){
			return TRUE;
		}else{
			return FALSE;
		}
	}
}
?>