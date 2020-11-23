<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Emoney extends CI_Controller {
	
	function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->model('M_emoney');
	}
	
	public function index(){
		$gmapsallKAI = $this->M_emoney->gmapsallKAI();
		// $markerKAI = array();
		foreach($gmapsallKAI as $row1){
			$markerKAI[] = array(
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
		$data['markerallKAI'] = json_encode($markerKAI);
		$getMarkerMapsDashboardsToday = $this->M_emoney->getMarkerMapsDashboardsToday();
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


		$conditionVMKAI = $this->M_emoney->conditionVMKAI();
		foreach($conditionVMKAI as $rowKondisiChartPie){
			$conditionVMallkai[] = array(
				'kode_statusmesin' => $rowKondisiChartPie->keterangan,
				'jumlah_kondisi' => $rowKondisiChartPie->jumlah_kondisi
			);
		}
		$data['conditionVMKAI'] = json_encode($conditionVMallkai);
		// print_r($conditionVMallkai);

		$getTotalUserKAI = $this->M_emoney->getTotalUserKAI();
		$data['data_userK'] = json_encode($getTotalUserKAI);
		$getDatadayK = $this->M_emoney->getDatadayK();
		$data['data_dayK'] = json_encode($getDatadayK);
		$getDatamonthK = $this->M_emoney->getDatamonthK();
		$data['data_monthK'] = json_encode($getDatamonthK);
		$getDatayearK = $this->M_emoney->getDatayearK();
		$data['data_yearK'] = json_encode($getDatayearK);

		$trafficallKAI = $this->M_emoney->trafficallKAI();
		foreach($trafficallKAI as $rowtrafficallKAI){
			$temptrafficKAI[] = array(
				'tanggal_transaksi' => $rowtrafficallKAI->tanggal_transaksi,
				'total_transaksi' => $rowtrafficallKAI->total_transaksi,
			);
		}
		$data['data_trafficallKAI'] = json_encode($temptrafficKAI);
		// print_r($temptrafficKAI);

		$getTop10KAI = $this->M_emoney->getTop10KAI();
			foreach($getTop10KAI as $rowtopvm10){
				$top10vmkai [] = array(
					'kode_mesin' => $rowtopvm10->kode_mesin,
					'transaksi' => $rowtopvm10->transaksi,
					'volume' => $rowtopvm10->volume
				);
			}
		$data['top10vmKAI'] = json_encode($getTop10KAI);
		// print_r($top10vmkai);

		$data['title']='Vending Machine - E-money';
		$this->load->view('main/emoney',$data);
	}
	
}
