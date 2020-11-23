<?php
// defined('BASEPATH') OR exit('No direct script access allowed');

class M_dashboard extends CI_Model{

	public function __construct(){
		$this->load->database();
		parent::__construct();
	}
	
	function getMarkerMapsDashboards(){
		$sql = "SELECT nama_provinsi,nama_lokasi, latitude, longtitude, mesin.`id_mesin`, mesin.`kode_mesin`, status_mesin.`kode_statusmesin`,
						status_online, check_ckd, device_status, COUNT(waktu_transaksi) AS lembar
			FROM lokasi
			JOIN mesin ON mesin.`id_mesin` = lokasi.`id_mesin`
			JOIN provinsi ON provinsi.`id_provinsi` = lokasi.`id_provinsi`
			JOIN status_mesin ON status_mesin.`id_statusmesin` = mesin.`id_statusmesin`
			JOIN transaksi ON mesin.`id_mesin`=transaksi.`id_mesin`
			GROUP BY id_mesin
		";
		return $query = $this->db->query($sql);
	}
	function getMarkerMapsDashboardsToday(){
		$sql = "SELECT kode_mesin,mesin.`id_mesin`, COUNT(waktu_transaksi) AS lembar, SUM(jumlah_transaksi) AS jumlah_transaksi
		FROM mesin
		JOIN transaksi ON mesin.`id_mesin` = transaksi.`id_mesin`
		WHERE waktu_transaksi >= NOW() - INTERVAL 1 DAY
		GROUP BY id_mesin
		";
		return $query = $this->db->query($sql)->result();
	}
	

	function getmarkerJakarta(){
		$sql = "SELECT nama_provinsi,nama_lokasi, latitude, longtitude, mesin.`id_mesin`, mesin.`kode_mesin`, status_mesin.`kode_statusmesin`
		FROM lokasi
		JOIN mesin ON mesin.`id_mesin` = lokasi.`id_mesin`
		JOIN provinsi ON provinsi.`id_provinsi` = lokasi.`id_provinsi`
		JOIN status_mesin ON status_mesin.`id_statusmesin` = mesin.`id_statusmesin`
		WHERE nama_provinsi = 'jakarta' ";
		return $query = $this->db->query($sql);
	}
	function getmarkerJawabarat(){
		$sql = "SELECT nama_provinsi,nama_lokasi, latitude, longtitude, mesin.`id_mesin`, mesin.`kode_mesin`, status_mesin.`kode_statusmesin`
		FROM lokasi
		JOIN mesin ON mesin.`id_mesin` = lokasi.`id_mesin`
		JOIN provinsi ON provinsi.`id_provinsi` = lokasi.`id_provinsi`
		JOIN status_mesin ON status_mesin.`id_statusmesin` = mesin.`id_statusmesin`
		WHERE nama_provinsi = 'jawa barat' ";
		return $query = $this->db->query($sql);
	}
	function getmarkerYogyakarta(){
		$sql = "SELECT nama_provinsi,nama_lokasi, latitude, longtitude, mesin.`id_mesin`, mesin.`kode_mesin`, status_mesin.`kode_statusmesin`
		FROM lokasi
		JOIN mesin ON mesin.`id_mesin` = lokasi.`id_mesin`
		JOIN provinsi ON provinsi.`id_provinsi` = lokasi.`id_provinsi`
		JOIN status_mesin ON status_mesin.`id_statusmesin` = mesin.`id_statusmesin`
		WHERE nama_provinsi = 'yogyakarta' ";
		return $query = $this->db->query($sql);
	}
	
	// Get Kondisi Vending Machine(VM)
	function getKondisiVM(){
		$sql = "SELECT COUNT(*) AS jumlah_kondisi, status_mesin.kode_statusmesin,status_mesin.keterangan
		FROM mesin
		JOIN status_mesin ON status_mesin.`id_statusmesin` = mesin.`id_statusmesin`
		GROUP BY kode_statusmesin";
		return $query = $this->db->query($sql);
	}

	//for dashboard transaction in right
	function getDatadayD(){
		$sql="SELECT SUM(jumlah_transaksi) AS transaksi
		FROM transaksi
		WHERE DAY(waktu_transaksi) = DAY(CURDATE())
		";
		return $query = $this->db->query($sql)->result();
	}
	function getDataweeklyD(){
		$sql="SELECT SUM(jumlah_transaksi) AS transaksi
		FROM transaksi
		WHERE WEEK(waktu_transaksi) = WEEK(CURDATE())
		";
		return $query = $this->db->query($sql)->result();
	}
	function getDatamonthD(){
		$sql="SELECT SUM(jumlah_transaksi) AS transaksi
		FROM transaksi
		WHERE MONTH(waktu_transaksi) = MONTH(CURDATE())
		";
		return $query = $this->db->query($sql)->result();
	}

	//untuk analisis data antara Vending Machine (KAI, E-money)
	function getDatanalisisDKAI($category){
		$sql="SELECT jumlah_transaksi, waktu_transaksi
		FROM transaksi
		JOIN mesin ON mesin.`id_mesin`=transaksi.`id_mesin`
		-- JOIN lokasi ON mesin.`id_mesin`=lokasi.`id_mesin`
		-- join provinsi on provinsi.`id_provinsi`=lokasi.`id_provinsi`
		WHERE kategori = '$category'
		ORDER BY waktu_transaksi ASC
		";
		return $query = $this->db->query($sql)->result();
	}

	function getTop10VM(){
		$sql="SELECT SUM(jumlah_transaksi) AS transaksi, kode_mesin, COUNT(jumlah_transaksi) AS volume
		FROM transaksi
		JOIN mesin ON mesin.`id_mesin`=transaksi.`id_mesin`
		GROUP BY kode_mesin
		ORDER BY transaksi DESC
		LIMIT 10
		";
		return $query = $this->db->query($sql)->result();
	}
}
