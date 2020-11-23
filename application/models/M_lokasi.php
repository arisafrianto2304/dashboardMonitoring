<?php
// defined('BASEPATH') OR exit('No direct script access allowed');

class M_lokasi extends CI_Model{

	public function __construct(){
		$this->load->database();
		parent::__construct();
	}

	function lokasiShow(){
		$sql="SELECT nama_provinsi,nama_lokasi, latitude, longtitude, mesin.`id_mesin`,kategori, mesin.`kode_mesin`, status_mesin.`kode_statusmesin`,
				status_online, check_ckd, device_status, COUNT(waktu_transaksi) AS lembar
		FROM lokasi
		JOIN mesin ON mesin.`id_mesin` = lokasi.`id_mesin`
		JOIN provinsi ON provinsi.`id_provinsi` = lokasi.`id_provinsi`
		JOIN status_mesin ON status_mesin.`id_statusmesin` = mesin.`id_statusmesin`
		JOIN transaksi ON mesin.`id_mesin`=transaksi.`id_mesin`
		GROUP BY id_mesin"
		;
		return $query = $this->db->query($sql)->result();
	}

	function getMarkerMapsDashboardsToday(){
		$sql = "SELECT kode_mesin,mesin.`id_mesin`, COUNT(waktu_transaksi) AS lembar, SUM(jumlah_transaksi) AS jumlah_transaksi
		FROM mesin
		JOIN transaksi ON mesin.`id_mesin` = transaksi.`id_mesin`
		WHERE DAY(waktu_transaksi) = DAY(CURDATE())
		GROUP BY id_mesin
		";
		return $query = $this->db->query($sql)->result();
	}
}
