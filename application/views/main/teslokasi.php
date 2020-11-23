<?php $this->load->view('Template/menu');?>

<div class="" id="MainDashboard">
	<div class="container-fluid" id="filterlokasi">
		<form action="">
		<div class="row">
				<div class="col-md-2 pr-0">
					<div class="fontComforta mr-3 FontBold700">Kategori</div>
					<div class="box">
						<select class="col" id="kategori" onchange="showCombox1()">
							<option value="Semua" selected="selected">Semua</option>
							<option value="KAI">KAI</option>
							<option value="E-MONEY">E-MONEY</option>
							<!-- <option>Option 5</option> -->
						</select>
					</div>
				</div>
				<div class="col-md-2 pr-0" id="comboboxLokasi">
					<div class="fontComforta mr-3 FontBold700">Lokasi</div>
					<div class="box">
						<select class="col" id="lokasi" onchange="showCombox2()">
							<option value="Semua" selected="selected">Semua</option>
						</select>
					</div>
				</div>
				<div class="col-md-2" id="comboboxMesin">
					<div class="fontComforta mr-3 FontBold700">Mesin</div>
					<div class="box" >
						<select class="col" id="mesin" onchange="">
							<option value="Semua" selected="selected">Semua</option>
						</select>
					</div>
				</div>
				<div class="col-md-2" id="tombolSearch">
					<div class="box" >
						<button type="button" id="tombolSubmit" class="col box btn">Submit</button>
						<!-- <input class="col box btn" id="tombolSubmit" type="button" onclick="myFunction()" value="Submit"> -->
					</div>
				</div>
		</div>
		</form>
	</div>

	<div class="container-fluid" id="filtershowsemualokasi">
	</div>

	<!-- <div class="container-fluid" id="filtershowsemualokasi">
		<div class="pt-3"></div>
		<div class="row pr-3 pl-3">
			<div class="col-md-12 " id="googlemapsDashboardAll"></div>
		</div>
	</div>
	<div class="container-fluid" id="filtershowlokasi">
	E-MONEY  "BISA"
	</div>
	<div class="container-fluid" id="filtershowlokasiKAI">
	KAI "BISA"
	</div>

	<div class="container-fluid" id="kok">
	KOK "BISA"
	</div> -->
</div>



</div>
</div>
<script type="text/javascript">
var markerLokasi = JSON.parse('<?php echo $markerLokasi; ?>');
console.log('marker lokasi', markerLokasi);
var markerTodays = JSON.parse('<?php echo $markerTodays; ?>');
console.log('marker today', markerTodays);

</script>
	<!-- <script type="text/javascript" src="<?php echo base_url(); ?>assets/js/chart.js"></script> -->
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/teslokasi.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/navbar.js"></script>
</body>
</html>
