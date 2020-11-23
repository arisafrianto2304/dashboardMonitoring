<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboardall extends CI_Controller {
	
	function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->model('M_dashboardall');
	}
	public function index(){	
		$data['title']='Dashboard'; // tittle link
		$get_markermaps = $this->M_dashboardall->get_allkai();
		$markerall = array();
			foreach($get_markermaps->result() as $rowallmarker){
				$markerall[] = array(
					'terminal_id' => $rowallmarker->terminal_id, 
					'pinlokasi' => $rowallmarker->pinlokasi, 
					'latitude' => $rowallmarker->latitude,
					'longtitude' => $rowallmarker->longtitude
				);
			}
		$data['markerall'] = json_encode($markerall);
		// $getmarker
		/* $getMarkerMapsDashboards = $this->M_dashboard->getMarkerMapsDashboards();
		$marker = array();
			foreach($getMarkerMapsDashboards->result() as $row1){
				$marker[] = array(
					'nama_provinsi' => $row1->nama_provinsi,
					'nama_lokasi' => $row1->nama_lokasi,
					'latitude' => $row1->latitude,
					'longtitude' => $row1->longtitude,
					'id_mesin' => $row1->id_mesin,
					'kode_mesin' => $row1->kode_mesin,
					'kode_statusmesin' => $row1->kode_statusmesin,
					'status_online' => $row1->status_online,
					'check_ckd' => $row1->check_ckd,
					'device_status' => $row1->device_status,
					'lembar' => $row1->lembar,
				);
			}
		$data['markerDashboard'] = json_encode($marker); */

		// print_r($markerall);

		$this->load->view('main/dashboardall',$data);
		// print_r($marker);
	}
	
}
