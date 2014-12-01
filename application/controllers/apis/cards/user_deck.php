<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Card_deck extends CI_Controller {

	public function index()
	{
    	$this->load->helper('url');
		
	    $this->load->view('cards/cardList.html');
	}
	//两个参数存在key-value的存储服务中，主要用于验证合法性
	//获取当前user的组成卡牌库
	public function get_deck($_userToken,$_sessionToken){
		
	}
}