<?php $this->load->view('template/menu');?>

	<div class="container-fluid" id="MainDashboard" >
		<div class="row ">

			<div class="col-md-8" >
					<div class="col-md p-3" id="pcb-form1">
						<h4 class="col-md-0">Statistik Pengambilan</h4>
						<div class="col-md-12 d-flex pr-3 pl-0">
							<h5 style="color:#2ac0ca; ">Cashbox</h5>
						</div>
						<div class="col-md-12 p-0 pt-2 mb-2 d-flex pb-3"  id="form-chose2">
							<div class="col-sm-2 col-md-2 pl-0 bd-highlight">
								<button type="button" class="btn w-100 pt-4 pb-4" onClick="mainProgram()" id="button-choose1"><span class="label text-justify label-default">Tutup Buku</span></button>
							</div>
							<div class="col-sm-2 col-md-2 pl-0 bd-highlight">
								<button type="button" class="btn w-100 pt-4 pb-4" onClick="mainHistori()" id="button-choose2"><span class="label text-justify label-default">Histori VM</span></button>
							</div>
						</div>
						<div class="row">
							<div class="col-md-8 p-3">
								<div class="form-inline">
									<div class="col-md-4 m-0 pl-0">
										<label class="float-left">Owner</label>
										<select disabled class="form-control w-100" name="vmowner" id="vmowner">
											<option value="0">Lunari</option>
											<option value="1">Lain-lain</option>
										</select>
									</div>
										
									<div class="col-md-4 m-0 pl-0">
										<label class="float-left ">Group</label>
										<select disabled class="form-control w-100" name="vmgroup" id="vmgroup">
											<option value="0">All</option>
										</select>
									</div>

									<div class="col-md-4 m-0 pl-0">
										<label class="float-left ">Waktu</label>
										<select disabled class="form-control w-100" name="vmwaktu" id="vmwaktu" onChange="showharian_bulan()">
											<option value="harian">Harian</option>
											<option value="bulan">Bulan</option>
											<!--  -->
										</select>
									</div>
								</div>

								<div class="form-inline pt-3" id="show_harian" style="display:block;">
									<div class="col-md-4 m-0 pl-0 float-left">
										<label class="float-left">Tanggal Awal</label><br>
										<input class="form-control" disabled placeholder="Tanggal Awal" id="datepicker1" name="datepicker1" />
									</div>
									<div class="col-md-4 m-0 pl-0 float-left" >
										<label class="float-left">Tanggal Akhir</label><br>
										<input class="form-control" disabled placeholder="Tanggal Akhir" id="datepicker2" name="datepicker2"/>
									</div>
								</div>

								<div class="form-inline pt-3" id="show_bulan" style="display:none;">
									<div class="col-md-4 m-0 pl-0">
									<label class="float-left">Bulan</label>
									<select disabled class="form-control w-100" name="bulan" id="bulan">
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
								</div>
							</div>
						</div>
						<div class="col-md-2 p-0">
							<button type="button" class="btn w-100 button-submit1" onClick="" id=""><span class="label label-default">Submit</span></button>
						</div>
					</div>
			</div>
			
		</div>
		<div class="col-md-4 pt-0 pb-0 pl-0 pr-2" >
			<div class="col-md-12 p-0" id="pcb-form1">
				<!-- <div class="row"> -->
					<div class="col-md-12 p-2" id="">
						<div class="col-md-12 p-2" id="mapPC"></div>
					</div>
				<!-- </div> -->
			</div>
		</div>
		
		<!-- VM Tutup Buku -->
		<div class="col-md-12 mt-2 pr-0" id="#">
			<div class="col-md-12 p-0 pr-2" id="letakTabel">
				<!-- letakTable -->
			</div>
			
		</div>

		<!-- histori bulan ini sudah tutup buku -->
		<div class="col-md-12 mt-2 pr-0" id="#">
			<div class="col-md-12 p-0 pr-2" id="letakTabel2">
				<!-- letakTable2 -->
			</div>
			
		</div>
		
	</div>

	

</div>
</div>
<script type="text/javascript">
	

</script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/callFunc.js"></script>
	<!-- <script type="text/javascript" src="<?php echo base_url(); ?>assets/js/chart.js"></script> -->
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/pengambilanCashbox.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/navbar.js"></script>
</body>
</html>
