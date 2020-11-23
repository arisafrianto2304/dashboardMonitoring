<?php $this->load->view('Template/menu');?>

	<div class="container-fluid" id="MainDashboard" >
		<div class="row">
			<div class="col-sm-6 pb-3 float-left" id="SKVM_bg" style="z-index:1;position: absolute;">
				
				<div class="col p-0">
						<div class="col-sm-12 pl-0">
							<h4>Permasalahan Vending Machine</h4>
						</div>
						<!-- ABSOLUTE -->
							<div class="float-lg-right" style="margin-top:24px;z-index:100;  position: absolute; float:right; margin-left:470px; width:470px; height:auto;  border:0px solid #ced4da; border-radius:3px; padding-left:10px;">
								<div id="tanggal_dp" style="display:block;">
									<div class="float-left"><span>Tanggal Awal</span><input placeholder="Tanggal Awal" id="datepicker1" name="datepicker1" width="180" /></div>
									<div class="float-left ml-2"><span>Tanggal Akhir</span><input placeholder="Tanggal Akhir" id="datepicker2" name="datepicker2" width="180" /></div>
								</div>
								
								<div id="bulan_dp" style="display:none;">
									<!-- <div class="float-none"> -->
									<label class="mb-0">Pilih Bulan &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</label>
									<select class="form-control col-3" name="bulan" id="bulan">
										<option value="01">Januari</option>
										<option value="02">Februari</option>
										<option value="03">Maret</option>
										<option value="04">April</option>
										<option value="05">Mei</option>
										<option value="06">Juni</option>
										<option value="07">Juli</option>
										<option value="08">Agustus</option>
										<option value="09">September</option>
										<option value="10">Oktober</option>
										<option value="11">November</option>
										<option value="12">Desember</option>
									</select>
									<span style="font-size:10px; margin-left:72px; position:absolute; color:red;">Tahun Ini</span>
								<!-- </div> -->
								</div>

								<div id="bulan_periode_dp" style="display:none;">
									<label class="mb-0">Pilih Bulan Periode &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</label>
									<select class="form-control col-5" name="bulan_periode" id="bulan_periode">
										<option value="1">30 Hari Terakhir</option>
										<option value="3">3 Bulan Terakhir</option>
										<option value="6">6 Bulan Terakhir</option>
										<option value="12">12 Bulan Terakhir</option>
										<option value="18">18 Bulan Terakhir</option>
										<option value="24">24 Bulan Terakhir</option>
									</select>
								</div>

							</div>
						<!-- /ABSOLUTE -->
						<div class="form-group row mb-2">
							<label class="col-sm-3 pt-2" >Vending Machine Owner</label>
							<div class="col-sm-2 pl-0">
								<select class="form-control" name="vm_owner" id="vm_owner">
									<option value="0">Lunari</option>
									<option value="1">Lain-lain</option>
								</select>
							</div>
						</div>

						

						<div class="form-group row mb-2">
							<label class="col-sm-3 pt-2">Vending Machine Group</label>
							<div class="col-sm-3 pl-0">
								<select class="form-control" name="vm_group" id="vm_group">
									<option value="all">All</option>
								</select>
							</div>
							
						</div>

						<div class="form-group row mb-2">
							<label class="col-sm-3 pt-2">Per Vending Machine</label>
							<div class="col-sm-3 pl-0">
								<select class="form-control" name="vm_per" id="vm_per">
									<option value="all">All</option>
								</select>
							</div>
							
						</div>

						<div class="form-group row mb-2">
							<label class="col-sm-3 pt-2">Periode Waktu</label>
							<div class="col-sm-2 pl-0">
								<select class="form-control" name="vm_waktu" id="vm_waktu" onChange="onchange_Periode()">
									<option value="harian">Harian</option>
									<option value="bulanan">Bulan</option>
									<option value="periode">Periode Bulan</option>
								</select>
							</div>
							
						</div>

						<div class="form-group row mb-3 mt-3">
							<label class="col-sm-3 pt-2"></label>
							<div class="col-sm-3 pl-0">
								<button type="button" class="btn btn-primary float-right" onClick="">Submit</button>
							</div>
							
						</div>

				</div>

				
				
			</div>

			<div class="col-sm-6 float-right" id="SKVM_bg2" style="z-index:1;position: absolute; margin-left:980px;">
				<div id="showMapping">
	
				</div>
			</div>


			
		</div>
		
		
	</div>

	<div class="container-fluid" id="MainDashboard" >
		<div class="row">
			<div class="col-sm-12 p-0" id="SKVM_bgMargin" style="">
				
			</div>
		</div>
	</div>

</div>
</div>
<script type="text/javascript">
	

	// var percobaanregex = "app=trx_tiket&action=tiket_ka&booking=3JHM9W&nama=TESTING BRO&noid=TEST 1&berangkat=BOGOR&tujuan=SUKABUMI&tglberangkat=07:50, Rabu/10 Jan 2018&tgldatang=09:54, Rabu/10 Jan 2018&nokereta=390& namakereta=PANGRANGO&nokursi=EKO-4 14A     &hargatiket=20.000&conveniencefee=7.500& discountchannel=-5.000&discountkhusus=2.500&totalbayar=20.000& uangmasuk=20.000&uangkeluar=0&totaluangmesin=20000&totallembaruangmesin=1&payout1=5000& lembarpayout1=0&payout2=10000&lembarpayout2=0&nomortransaksi=1";
	// var text = document.getElementById('text');
	// var hasil = document.getElementById('hasil');
	// var hasil2 = document.getElementById('hasil2');
	// var hasil3 = document.getElementById('hasil3');
	// var hasil4 = document.getElementById('hasil4');
	// $(document).ready(function() {
		// text.innerHTML = percobaanregex;

		// var regexi = percobaanregex.match(/totalbayar.*/);
		// hasil.innerHTML = String(regexi);

		// var potongan = ;
		// regexi = String(regexi);
		
		// var regexi1 = regexi.split("&");
		// regexi1 = String(regexi1);
		// var start = regexi1.split(",",1);
		// hasil2.innerHTML = start;
		// var temp = String(start).substr(11);
		// temp = temp.replace(".", "");
		// temp = Number(temp);
		// hasil3.innerHTML = temp;

	// });
	$(document).ready(function() {
		var bb = "2020-10-08 15:36:10";
		var bc = bb.substr(10);
		
		console.log(bc);
	});
</script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/callFunc.js"></script>
	<!-- <script type="text/javascript" src="<?php echo base_url(); ?>assets/js/chart.js"></script> -->
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/kerusakanvm.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/navbar.js"></script>
</body>
</html>
