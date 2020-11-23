<?php $this->load->view('template/header');?>
<div id="mySidebar" class="sidebar" style="width: 0px;">
	<div id="imgLogo">
		<img class="img-responsive mx-auto d-block"  src="<?php echo base_url('assets/img/LUNARI-logo.png'); ?>" >
	</div>
	<div class="dateTime">
		<span class="float-right dateTimeBorder"><?php echo "&nbsp;&nbsp;".date("d-M-Y")."&nbsp;&nbsp;" ?></span>
	</div>
	<br>
  <a href="<?php echo base_url('dashboardall') ?>">Dashboard</a>
  <!-- <a href="#">Performa</a> -->

  <button class="dropdown-btn">Vending Machine 
    <i class="fa fa-caret-down"></i>
  </button>
  <div class="dropdown-container">
    <a href="<?php echo base_url('kai') ?>">KAI</a>
    <a href="<?php echo base_url('emoney') ?>">E-Money</a>
    <a href="<?php echo base_url('lokasi') ?>">Lokasi</a>
	</div>
	<button class="dropdown-btn">Report
    <i class="fa fa-caret-down"></i>
  </button>
  <div class="dropdown-container">
    <a href="<?php echo base_url('Table') ?>">Histori Transaksi</a>
    <a href="<?php echo base_url('Table/analisaTransaksi') ?>">Analisa Transaksi</a>
		<!-- <a href="<?php echo base_url('Table/statistikKerusakanvm') ?>">Statistik Kerusakan VM</a> -->
    <!-- <a href="<?php echo base_url('lokasi') ?>">Lokasi</a> -->
	</div>


	<button class="dropdown-btn">Statistik
    <i class="fa fa-caret-down"></i>
  </button>
  <div class="dropdown-container">
		<a href="<?php echo base_url('Table/statistikKerusakanvm') ?>">Kerusakan VM</a>
		<a href="<?php echo base_url('Table/statistikPengambilanCashbox') ?>">Pengambilan Cash Box</a>
    <!-- <a href="<?php echo base_url('lokasi') ?>">Lokasi</a> -->
	</div>
	
	<!-- <a href="#">Report</a> -->
  <a href="#">Belum di tentukan</a>
</div>

<div id="main">
  <button class="openbtn" onclick="opencloseSidebar()" >☰ </button>  
</div>


