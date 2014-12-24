<?php
if (!defined('BASEPATH'))
	exit('No direct script access allowed');

class Card_list extends CI_Controller {

	public function index() {
		$uid = $this->session->userdata('uid');
		$sessionToken = $this->session->userdata('sessionToken');

		if ($uid && $sessionToken) {

			$this->load->model('cards/get_cards');
			$deck_result_array = $this->get_cards->get_deck($uid, $sessionToken);
			$all_result_array = $this->get_cards->get_all($uid, $sessionToken);

			if ($deck_result_array['result'] && $all_result_array['result']) {
			
				$cards_arr = array(
					'uid' => $uid,
					'sessionToken' => $sessionToken,
					'deck' => $deck_result_array['data'], 
					'all' => $all_result_array['data']
				);
			
				$this->load->helper('url');
				$this->load->view('cards/cardList.html', $cards_arr);
				$this->load->view('test/console.html');
			}else{
				show_error($deck_result_array['data'].'<br>'.$all_result_array['data'], 500, 'forbidden');
			}
		} else {
			show_error('no token', 500, 'forbidden');
		}
	}
}
