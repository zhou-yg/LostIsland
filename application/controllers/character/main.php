<?php
if (!defined('BASEPATH'))
	exit('No direct script access allowed');

class Main extends CI_Controller {

	public function index() {
		
		$clientToken = $this->input->post('clientToken');
		$userToken = $this->input->post('userToken');

		$uid = $this->session->userdata('uid');
		$sessionToken = $this->session->userdata('sessionToken');

		if ($clientToken && $userToken) {
			$this->load->model('user/login');
			$loginResult = $this->login->check_login($clientToken, $userToken);
			
			if ($loginResult) {

				$this->load->helper('url');
				$this->load->view('character/character_main.html', $loginResult);
				$this->load->view('test/console.html');
			} else {
				show_error('not exist', 500, 'forbidden');
			}
		} else if ($uid && $sessionToken) {
			
			$this->load->model('cards/get_cards');
			$this->load->model('user/message');
			$cards_result_array = $this->get_cards->get_deck($uid,$sessionToken);
			$user_message_array = $this->message->get_basic($uid,$sessionToken);
			
			$result = array(
				'nickname' => $user_message_array['data']['nickname'],
				'character'=> $user_message_array['data']['character'],
				'my_deck'  => $cards_result_array['data'],
				'sessionToken' => $sessionToken
			);

			$this->load->helper('url');
			$this->load->view('character/character_main.html', $result);
			$this->load->view('sys/console.html');
		} else {
			show_error('no token', 500, 'forbidden');
		}
	}
}
