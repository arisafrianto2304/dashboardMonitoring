<?php
// defined('BASEPATH') OR exit('No direct script access allowed');

class M_emoney extends CI_Model{

	public function __construct(){
		$this->load->database();
		parent::__construct();
	}

	function gmapsallKAI(){
		$sql=" SELECT nama_provinsi,nama_lokasi, latitude, longtitude, mesin.`id_mesin`, mesin.`kode_mesin`, status_mesin.`kode_statusmesin`,
				status_online, check_ckd, device_status, COUNT(waktu_transaksi) AS lembar
		FROM lokasi
		JOIN mesin ON mesin.`id_mesin` = lokasi.`id_mesin`
		JOIN provinsi ON provinsi.`id_provinsi` = lokasi.`id_provinsi`
		JOIN status_mesin ON status_mesin.`id_statusmesin` = mesin.`id_statusmesin`
		JOIN transaksi ON mesin.`id_mesin`=transaksi.`id_mesin`
		WHERE kategori = 'E-Money' 
		GROUP BY id_mesin"
		;
		return $query = $this->db->query($sql)->result();
	}
	function getMarkerMapsDashboardsToday(){
		$sql = "SELECT kode_mesin,mesin.`id_mesin`, COUNT(waktu_transaksi) AS lembar, SUM(jumlah_transaksi) AS jumlah_transaksi
		FROM mesin
		JOIN transaksi ON mesin.`id_mesin` = transaksi.`id_mesin`
		WHERE DAY(waktu_transaksi) = DAY(CURDATE()) AND kategori = 'E-Money'
		GROUP BY id_mesin
		";
		return $query = $this->db->query($sql)->result();
	}

	function conditionVMKAI(){
		$sql = "SELECT COUNT(*) AS jumlah_kondisi, status_mesin.keterangan
		FROM mesin
		JOIN status_mesin ON status_mesin.`id_statusmesin` = mesin.`id_statusmesin`
		WHERE kategori = 'E-Money'
		GROUP BY kode_statusmesin
		";
		return $query = $this->db->query($sql)->result();
	}

	// data KAI Header
	function getTotalUserKAI(){
		$sql = "SELECT COUNT(jumlah_transaksi) AS transaksi
		FROM transaksi
		JOIN mesin ON mesin.`id_mesin`=transaksi.`id_mesin`
		WHERE kategori = 'E-Money'
		";
		return $query = $this->db->query($sql)->result();
	}
	function getDatadayK(){
		$sql="SELECT SUM(jumlah_transaksi) AS transaksi
		FROM transaksi
		JOIN mesin ON mesin.`id_mesin`=transaksi.`id_mesin`
		WHERE DAY(waktu_transaksi) = DAY(CURDATE())  AND kategori = 'E-Money'
		";
		return $query = $this->db->query($sql)->result();
	}
	function getDatamonthK(){
		$sql="SELECT SUM(jumlah_transaksi) AS transaksi
		FROM transaksi
		JOIN mesin ON mesin.`id_mesin`=transaksi.`id_mesin`
		WHERE MONTH(waktu_transaksi) = MONTH(CURDATE())  AND kategori = 'E-Money'
		";
		return $query = $this->db->query($sql)->result();
	}
	function getDatayearK(){
		$sql="SELECT SUM(jumlah_transaksi) AS transaksi
		FROM transaksi
		JOIN mesin ON mesin.`id_mesin`=transaksi.`id_mesin`
		WHERE YEAR(waktu_transaksi) = YEAR(CURDATE())  AND kategori = 'E-Money'
		";
		return $query = $this->db->query($sql)->result();
	}

	function trafficallKAI(){
		$sql="SELECT  SUM(jumlah_transaksi) AS total_transaksi, DATE(waktu_transaksi) AS tanggal_transaksi
		FROM transaksi
		JOIN mesin ON mesin.`id_mesin`=transaksi.`id_mesin`
		WHERE kategori = 'E-Money'
		GROUP BY DAY(waktu_transaksi)
		ORDER BY waktu_transaksi ASC
		";
		return $query = $this->db->query($sql)->result();
	}

	function getTop10KAI(){
		$sql="SELECT SUM(jumlah_transaksi) AS transaksi, kode_mesin, COUNT(jumlah_transaksi) AS volume
		FROM transaksi
		JOIN mesin ON mesin.`id_mesin`=transaksi.`id_mesin`
		WHERE kategori = 'E-Money'
		GROUP BY kode_mesin
		ORDER BY transaksi DESC
		LIMIT 10
		";
		return $query = $this->db->query($sql)->result();
	}
}
