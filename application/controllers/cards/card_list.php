<?php
if (!defined('BASEPATH'))
	exit('No direct script access allowed');


class Card_list extends CI_Controller {
	
	private $needModel = array(
		'card_op'
	);
	/*
	 * 载入cardList配置
	 * 链接跳转至此 uid,sessionToken
	 * 
	 */
	public function index() {
		
		$uid = $this->session->userdata('uid');
		$sessionToken = $this->session->userdata('sessionToken');

		$this->api_models = include MODEL_MAP;

/*		
		$redis = new Redis();
		$redis->connect('127.0.0.1',6379);
		
		$topNum = $redis->get('topNum');
		if(isset($topNum)){
			$topNum = intval($topNum) + 1;
			$redis->set('topNum',$topNum);
		}else{
			$redis->set('topNum',1);
		}
		var_dump($redis->get('topNum'));
*/
		if ($uid && $sessionToken) {
			if ($sessionToken === $this->session->userdata('sessionToken')) {

				foreach ($this->needModel as $index => $modelMap) {
					$this->load->model($this->api_models[$modelMap]);
				}
				
				$deck_result_array = $this->get_cards->get_deck($uid);
				$all_result_array = $this->get_cards->get_all($uid);
		
				if ($deck_result_array['result'] && $all_result_array['result']) {

					$all_result_array = $all_result_array['data'];
					$cards_arr = array(
						'uid' => $uid, 
						'sessionToken' => $sessionToken, 
						'my_decks' => json_encode($deck_result_array['data']), 
						'all_cards' => json_encode($all_result_array['cards']),
						'all_heroes' => json_encode($all_result_array['heroes'])
					);
					$this->load->helper('url');
					$this->load->view('cards/cardList.html', $cards_arr);
					$this->load->view('sys/console.html');

				} else {
					show_error($deck_result_array['data'] . '<br>' . $all_result_array['data'], 500, 'forbidden');
				}
			} else {
				show_error('illegal sessiontoken', 500, 'forbidden');
			}
		} else {
			show_error('no token', 500, 'forbidden');
		}
	}

}
