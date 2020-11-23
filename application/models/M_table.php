<?php
// defined('BASEPATH') OR exit('No direct script access allowed');

class M_table extends CI_Model{

	public function __construct(){
		$this->load->database();
		parent::__construct();
	}

	function conditionVMKAI(){
		$sql = "
		
		";
		return $query = $this->db->query($sql)->result();
	}
}
