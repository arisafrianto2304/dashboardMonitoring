<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Table extends CI_Controller {
	
	function __construct()
	{
		parent::__construct();
		$this->load->helper('url'); 
		$this->load->database();
		$this->load->model('M_table');
	}
	public function index(){	
		$data['title']='Historis Transaksi'; // tittle link
		/* $get_markermaps = $this->M_dashboardall->get_allkai();
		$markerall = array();
			foreach($get_markermaps->result() as $rowallmarker){
				$markerall[] = array(
					'terminal_id' => $rowallmarker->terminal_id, 
					'pinlokasi' => $rowallmarker->pinlokasi, 
					'latitude' => $rowallmarker->latitude,
					'longtitude' => $rowallmarker->longtitude
				);
			}
		$data['markerall'] = json_encode($markerall); */

		$this->load->view('main/tablehistoris',$data);
	}
	
	public function analisaTransaksi(){	
		$data['title']='Lunari - Analisa Transaksi'; // tittle link
		/* $get_markermaps = $this->M_dashboardall->get_allkai();
		$markerall = array();
			foreach($get_markermaps->result() as $rowallmarker){
				$markerall[] = array(
					'terminal_id' => $rowallmarker->terminal_id, 
					'pinlokasi' => $rowallmarker->pinlokasi, 
					'latitude' => $rowallmarker->latitude,
					'longtitude' => $rowallmarker->longtitude
				);
			}
		$data['markerall'] = json_encode($markerall); */

		$this->load->view('main/analisa_transaksi',$data);
	}


	public function statistikKerusakanvm(){	
		$data['title']='Lunari - Statistik Kerusakan VM'; // tittle link
		/* $get_markermaps = $this->M_dashboardall->get_allkai();
		$markerall = array();
			foreach($get_markermaps->result() as $rowallmarker){
				$markerall[] = array(
					'terminal_id' => $rowallmarker->terminal_id, 
					'pinlokasi' => $rowallmarker->pinlokasi, 
					'latitude' => $rowallmarker->latitude,
					'longtitude' => $rowallmarker->longtitude
				);
			}
		$data['markerall'] = json_encode($markerall); */

		$this->load->view('main/statistik_kerusakanvm',$data);
	}

	public function statistikPengambilanCashbox(){	
		$data['title']='Lunari - Statistik Pengambilan Cashbox'; // tittle link
		/* $get_markermaps = $this->M_dashboardall->get_allkai();
		$markerall = array();
			foreach($get_markermaps->result() as $rowallmarker){
				$markerall[] = array(
					'terminal_id' => $rowallmarker->terminal_id, 
					'pinlokasi' => $rowallmarker->pinlokasi, 
					'latitude' => $rowallmarker->latitude,
					'longtitude' => $rowallmarker->longtitude
				);
			}
		$data['markerall'] = json_encode($markerall); */

		$this->load->view('main/pengambilanCashbox',$data);
	}

	
}
