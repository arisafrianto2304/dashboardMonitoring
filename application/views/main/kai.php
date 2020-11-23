<?php $this->load->view('Template/menu');?>

		<div class="container-fluid" id="MainDashboard">
			<div class="row pl-2">
				<div class="col-md-3">
					<div class="row" id="paddingRG">
						<div class="col-md-12 pr-0" id="kai-jumlahpengguna">
							<div class="float-left">
							<div id="title-Xtopkai"><span>Pengguna KAI</span></div>
							<div id="title-Ytopkai"><span id="userHK">Masuki Nilai Jumlah User</span></div>
							<div><span>user</span></div>
							</div>
							<a href="" class="hrefDec"><div class="float-right" id="iconinkai"><i class="fa fa-user-o" aria-hidden="true"></i></div></a>
						</div>
					</div>	
				</div>
				
				<div class="col-md-3">
					<div class="row" id="paddingRG">
						<div class="col-md-12 pr-0" id="kai-jumlahpengguna1">
							<div class="float-left">
							<div id="title-Xtopkai"><span>Transaksi Harian</span></div>
							<div id="title-Ytopkai"><span>Rp.</span><span id="dayHK">Masuki Nilai Jumlah Harian</span></div>
							<!-- <div><span>user</span></div> -->
							</div>
							<a href="" class="hrefDec"><div class="float-right" id="iconinkai1"><i class="fa fa-bar-chart" id="sizeiconinKAI" aria-hidden="true"></i></div></a>
						</div>
					</div>	
				</div>

				<div class="col-md-3">
					<div class="row" id="paddingRG">
						<div class="col-md-12 pr-0" id="kai-jumlahpengguna2">
							<div class="float-left">
							<div id="title-Xtopkai"><span>Transaksi Bulanan</span></div>
							<div id="title-Ytopkai"><span>Rp.</span><span id="monthHK">Masuki Nilai Jumlah bulanan</span></div>
							<!-- <div><span>user</span></div> -->
							</div>
							<a href="" class="hrefDec"><div class="float-right" id="iconinkai2"><i class="fa fa-line-chart" id="sizeiconinKAI" aria-hidden="true"></i></div></a>
						</div>
					</div>	
				</div>

				<div class="col-md-3">
					<div class="row" id="paddingRG">
						<div class="col-md-12 pr-0" id="kai-jumlahpengguna3">
							<div class="float-left">
							<div id="title-Xtopkai"><span>Transaksi Tahunan</span></div>
							<div id="title-Ytopkai"><span>Rp.</span><span id="yearHK">Masuki Nilai Jumlah Bulanan</span></div>
							<!-- <div><span>user</span></div> -->
							</div>
							<a href="" class="hrefDec"><div class="float-right" id="iconinkai3"><i class="fa fa-area-chart" id="sizeiconinKAI" aria-hidden="true"></i></div></a>
						</div>
					</div>	
				</div>

				
			</div>
			<div class="row p-2 mt-1">
				<div class="col-md-8">
					<div class="row pr-1" id="paddingRG">
						<div class="col-md-12 p-0" id="boxShadoww">
							<div class="row-fluid boxPad10">
								<div class="col-md-8 pl-0 float-left">
									<span class="fontComforta mr-3 FontBold700" id="textPosVM">Vending Machine KAI</span>
									<a class="tombollink" href="<?php echo base_url('dashboard') ?>">All</a>
									<a class="tombollink" href="<?php echo base_url('kai') ?>">KAI</a>
									<a class="tombollink" href="<?php echo base_url('emoney') ?>">E-Money</a>
									<a></a>
								</div>
								<div class="col-md-4 pl-0 float-left pr-0">
									<a class="float-right tombollink" href="<?php echo base_url('lokasi') ?>">Lokasi</a>
								</div>
								<div class="row-fluid">
									<div class="col-md-12 mt-2 mb-2 float-left" id="markersallKAI"></div>
									<!-- <div class="col-md-3 mt-2 mb-2 p-0 float-left" id="">
										<div class="h-100 OverFlowY">
										<table class="table mb-0 table-bordered">
											<thead>
											<tr>
												<th style="background-color:#2ac0ca; color:#fff;">Lokasi</th>
											</tr>
											</thead>
											<tbody id="testing" style='height:248px;overflow:auto;display:block;width:auto;'>
											<tr>
												<td>John</td>
											</tr>
											<tr>
												<td>John</td>
											</tr>
											<tr>
												<td>John</td>
											</tr>
											<tr>
												<td>John</td>
											</tr>
											<tr>
												<td>John</td>
											</tr>
											<tr>
												<td>John</td>
											</tr>
											</tbody>
										</table>
										</div>
									</div> -->
								</div>
								
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-4">
					<div class="row" id="paddingRG">
						<div class="col-md-12" id="boxShadoww">
							<div class="row">
								<div class="col-md-12">
									<span class="fontComforta mr-3 FontBold700" id="textPosVM">Traffic Kondisi Mesin KAI</span>
								</div>
								<div class="col-md-12" id="chartPieConditionKAI"></div>
							</div>
						</div>
					</div>
				</div>
			</div>	
			
			<div class="row pl-3 pr-3">
				<div class="col-md-8">
					<div class="row">
						<div class="col-md-12" id="boxShadoww">
							<!-- <div class="container p-0 pr-2"> -->
								<span class="fontComforta FontBold700" id="textPosVM">Traffic KAI</span>
								<div class="col-md-12 pl-0 pr-2" id="pengunjungKai"></div>
							<!-- </div> -->
						</div>
					</div>
				</div>
				<!-- <div class="col-md-4">
					<div class="row">
						<div class="col-md-12" id="boxShadoww">
							asd
						</div>
					</div>
				</div> -->
				<div class="col-md-4">
					<div class="row pad10px">
						<div class="col-md-12" id="boxShadoww">
							<span class="fontComforta FontBold700" id="textPosVM">Top Vending Machine KAI</span>
							<table class="table table-striped" id="top10VMD">
							<thead>
								<tr>
								<th scope="col pt-2">Mesin</th>
								<th scope="col pt-2">Volume</th>
								<th scope="col pt-2">Total transaksi</th>
								</tr>
							</thead>
							<tbody id="top10VMDD">
							</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		

		</div>
		</div>


		<script type="text/javascript">
		var MarkersKAI = JSON.parse('<?php echo $markerallKAI; ?>');
		var markerTodays = JSON.parse('<?php echo $markerTodays ?>');
		var conditionVMKAI = JSON.parse('<?php echo $conditionVMKAI; ?>');


		var data_userK = JSON.parse('<?php echo $data_userK; ?>');
		var data_dayK = JSON.parse('<?php echo $data_dayK; ?>');
		var data_monthK = JSON.parse('<?php echo $data_monthK; ?>');
		var data_yearK = JSON.parse('<?php echo $data_yearK; ?>');

		var data_trafficKAI = JSON.parse('<?php echo $data_trafficallKAI; ?>')
		// console.log(data_trafficKAI);

		var data_top10vmKAI = JSON.parse('<?php echo $top10vmKAI; ?>');
		$(document).ready(function(){	
			var tabletop10 = $('#top10VMDD');
			for(rowtop10vm = 0; rowtop10vm < data_top10vmKAI.length; rowtop10vm++){
				tabletop10.append(
					"<tr>"+
					"<td id='top10vmd'>"+ data_top10vmKAI[rowtop10vm].kode_mesin +"</td>"+
					"<td id='top10vmd'>"+ data_top10vmKAI[rowtop10vm].volume +"</td>"+
					"<td id='top10vmd'>"+ 'Rp.'+ data_top10vmKAI[rowtop10vm].transaksi +"</td>"+
					"</tr>"
				);
			}
		});

		console.log(data_top10vmKAI);
		window.onload = function(){
			dataHeaderKAI();
			function dataHeaderKAI(){
				document.getElementById('userHK').innerHTML = data_userK[0].transaksi;
				document.getElementById('dayHK').innerHTML = data_dayK[0].transaksi;
				document.getElementById('monthHK').innerHTML = data_monthK[0].transaksi;
				document.getElementById('yearHK').innerHTML = data_yearK[0].transaksi;
			}
		}
		</script>
		<!-- <script type="text/javascript" src="<?php echo base_url(); ?>assets/js/chart.js"></script> -->
		<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/kai_graphmaps.js"></script>
		<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/navbar.js"></script>
	</body>
</html>
