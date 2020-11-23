<?php $this->load->view('Template/menu');?>

<div class="" id="MainDashboard">
	<div class="container-fluid" id="filterlokasi">
		<div class="row">
			<!-- <form class="col-md-12"> -->
				<div class="col-md-2 pr-0">
					<div class="fontComforta mr-3 FontBold700">Kategori</div>
					<div class="box">
						<select class="col" id="kategori" onchange="showCombox()">
							<option value="Semua" selected="selected">Semua</option>
							<!-- <option>Option 5</option> -->
						</select>
					</div>
				</div>
				<div class="col-md-2" id="comboboxLokasi">
					<div class="fontComforta mr-3 FontBold700">Lokasi</div>
					<div class="box">
						<select class="col" id="lokasi" >
							<option value="Semua" selected="selected">Semua</option>
						</select>
					</div>
				</div>
				<div class="col-md-2" id="comboboxMesin">
					<div class="fontComforta mr-3 FontBold700">Mesin</div>
					<div class="box" >
						<select class="col" id="lokasi" onchange="">
							<option value="Semua" selected="selected">Semua</option>
							<option value="Semua" selected="selected">E-Money</option>
							<option value="Semua" selected="selected">KAI</option>
						</select>
					</div>
				</div>
				<div class="col-md-2" id="tombolSearch">
					<div class="box" >
						<input class="col box btn" id="tombolSubmit" type="button" onclick="myFunction()" value="Submit">
					</div>
				</div>
			<!-- </form> -->
		</div>
	</div>

	<div class="container-fluid" id="filtershowsemualokasi">
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
	</div>
</div>



</div>
</div>
<script type="text/javascript">
var markerLokasi = JSON.parse('<?php echo $markerLokasi; ?>');
console.log('markerlokasi', markerLokasi);
var markerTodays = JSON.parse('<?php echo $markerTodays; ?>');
console.log('marker today', markerTodays);

</script>
	<!-- <script type="text/javascript" src="<?php echo base_url(); ?>assets/js/chart.js"></script> -->
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/lokasijs.js"></script>
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/navbar.js"></script>
</body>
</html>
