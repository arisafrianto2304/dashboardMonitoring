<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller {
	
	function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->model('M_dashboard');
	}
	public function index(){	
		$data['title']='Dashboard';
		$getMarkerMapsDashboards = $this->M_dashboard->getMarkerMapsDashboards();
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
		$data['markerDashboard'] = json_encode($marker);

		$getMarkerMapsDashboardsToday = $this->M_dashboard->getMarkerMapsDashboardsToday();
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
		
		// Tarik Data Per-Provinsi
		// $markerJakarta = array();
		// $markerJawabarat = array();
		// $markerYogyakarta = array();
		$getmarkerJakarta = $this->M_dashboard->getmarkerJakarta();
			foreach($getmarkerJakarta->result() as $rowJkt){
				$markerJakarta[] = array(
					'nama_provinsi' => $rowJkt->nama_provinsi,
					'nama_lokasi' => $rowJkt->nama_lokasi,
					'latitude' => $rowJkt->latitude,
					'longtitude' => $rowJkt->longtitude,
					'id_mesin' => $rowJkt->id_mesin,
					'kode_mesin' => $rowJkt->kode_mesin,
					'kode_statusmesin' => $rowJkt->kode_statusmesin,
				);
			}
		$getmarkerJawabarat = $this->M_dashboard->getmarkerJawabarat();
			foreach($getmarkerJawabarat->result() as $rowJwb){
				$markerJawabarat[] = array(
					'nama_provinsi' => $rowJwb->nama_provinsi,
					'nama_lokasi' => $rowJwb->nama_lokasi,
					'latitude' => $rowJwb->latitude,
					'longtitude' => $rowJwb->longtitude,
					'id_mesin' => $rowJwb->id_mesin,
					'kode_mesin' => $rowJwb->kode_mesin,
					'kode_statusmesin' => $rowJwb->kode_statusmesin,
				);
			}
		$getmarkerYogyakarta = $this->M_dashboard->getmarkerYogyakarta();
			foreach($getmarkerYogyakarta->result() as $rowYog){
				$markerYogyakarta[] = array(
					'nama_provinsi' => $rowYog->nama_provinsi,
					'nama_lokasi' => $rowYog->nama_lokasi,
					'latitude' => $rowYog->latitude,
					'longtitude' => $rowYog->longtitude,
					'id_mesin' => $rowYog->id_mesin,
					'kode_mesin' => $rowYog->kode_mesin,
					'kode_statusmesin' => $rowYog->kode_statusmesin,
				);
			}
		$data['markerJkt'] = json_encode($markerJakarta);
		// $data['markerJwb'] = json_encode($markerJawabarat);
		// $data['markerYog'] = json_encode($markerYogyakarta);

		// kondisi mesin di dashboard chartPie
		$getKondisiVM = $this->M_dashboard->getKondisiVM();
			foreach($getKondisiVM->result() as $rowKondisiChartPie){
				$chartKondisiVM[] = array(
					'kode_statusmesin' => $rowKondisiChartPie->keterangan,
					'jumlah_kondisi' => $rowKondisiChartPie->jumlah_kondisi
				);
			}
		$data['chartKondisimesin'] = json_encode($chartKondisiVM);
		
		$getDatadayD = $this->M_dashboard->getDatadayD();
		$data['data_dayD'] = json_encode($getDatadayD);
		$getDatweeklyD = $this->M_dashboard->getDataweeklyD();
		$data['data_weekD'] = json_encode($getDatweeklyD);
		$getDatamonthD = $this->M_dashboard->getDatamonthD();
		$data['data_monthD'] = json_encode($getDatamonthD);

		$getTop10VM = $this->M_dashboard->getTop10VM();
			foreach($getTop10VM as $rowtopvm10){
				$top10vm [] = array(
					'kode_mesin' => $rowtopvm10->kode_mesin,
					'transaksi' => $rowtopvm10->transaksi,
					'volume' => $rowtopvm10->volume
				);
			}
		$data['top10vmD'] = json_encode($top10vm);
		// print_r($top10vm);

		$kai = 'KAI';
		$emoney = 'E-MONEY';
		$getDatanalisiskai = $this->M_dashboard->getDatanalisisDKAI($kai);
			foreach($getDatanalisiskai as $rowdatKAI){
				$dataAnalisiskai[] =  array(
					'jumlah_transaksi' => $rowdatKAI->jumlah_transaksi,
					'waktu_transaksi' => $rowdatKAI->waktu_transaksi,
				);
			}
		$getDatanalisisemoney = $this->M_dashboard->getDatanalisisDKAI($emoney);
		foreach($getDatanalisisemoney as $rowdatEmoney){
			$dataAnalisisemoney[] =  array(
				'jumlah_transaksi' => $rowdatEmoney->jumlah_transaksi,
				'waktu_transaksi' => $rowdatEmoney->waktu_transaksi
			);
		}
		$data['dataanalisiskai'] = json_encode($dataAnalisiskai);
		$data['dataanalisisemoney'] = json_encode($dataAnalisisemoney);
		// print_r($dataAnalisisemoney);

		$this->load->view('main/dashboard',$data);
		// print_r($marker);
	}
	
}
