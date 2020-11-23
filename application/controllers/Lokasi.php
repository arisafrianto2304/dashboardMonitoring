<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Lokasi extends CI_Controller {
	
	function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->model('M_lokasi');
	}
	
	public function index(){
		$lokasiShow = $this->M_lokasi->lokasiShow();
		$markerLokasi = array();
			foreach($lokasiShow as $row1){
				$markerLokasi[] = array(
					'nama_provinsi' => $row1->nama_provinsi,
					'nama_lokasi' => $row1->nama_lokasi,
					'latitude' => $row1->latitude,
					'longtitude' => $row1->longtitude,
					'id_mesin' => $row1->id_mesin,
					'kategori' => $row1->kategori,
					'kode_mesin' => $row1->kode_mesin,
					'kode_statusmesin' => $row1->kode_statusmesin,
					'status_online' => $row1->status_online,
					'check_ckd' => $row1->check_ckd,
					'device_status' => $row1->device_status,
					'lembar' => $row1->lembar,
				);
			}
		$data['markerLokasi'] = json_encode($markerLokasi);

		$getMarkerMapsDashboardsToday = $this->M_lokasi->getMarkerMapsDashboardsToday();
		$markerToday = array();
			foreach($getMarkerMapsDashboardsToday as $rowtodays){
				$markerToday[] = array(
					'kode_mesin' => $rowtodays->kode_mesin,
					'id_mesin' => $rowtodays->id_mesin,
					'lembar' => $rowtodays->lembar,
					'jumlah_transaksi' => $rowtodays->jumlah_transaksi,
				);
			}
		$data['markerTodays'] = json_encode($markerToday);
		$data['title']='Vending Machine - Detail Lokasi';
		$this->load->view('main/lokasi',$data);
		
	}
	
}
