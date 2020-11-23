<?php $this->load->view('Template/menu');?>


		
		<!-- <div class="col-md-12 float-right"> -->
		<div class="container-fluid" id="MainDashboard">
			<div class="row">
				<div class="col-md-12">
					<div class="row">
						<div class="col-md-6">
							<div class="row-fluid">
								<div class="col-md-12" id="bgGmaps">
									<div class="row-fluid">
										<div class="col-md-12 p-0">
											<span class="fontComforta mr-3 FontBold700" id="textPosVM">Posisi Vending Machine</span>
											<a class="tombollink" href="<?php echo base_url('dashboard') ?>">All</a>
											<a class="tombollink" href="<?php echo base_url('kai') ?>">KAI</a>
											<a class="tombollink" href="<?php echo base_url('emoney') ?>">E-Money</a>
										</div>
										<div class="container" id="bgMapsP">
											<div class="row">
												<div class="col-md-12" id="googlemapsDashboardAll"></div>
												<div class="col-md-12" id="googlemapsEvClick"></div>
												<!-- <div class="col-md-5 pl-1">
													<span>Transaksi</span>
												</div> -->
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
						
						<div class="col-md-3" id="mTo">
							<div class="row" id="paddingx10">
								<div class="col-md-12 " id="bgGmaps" >
									<span class="fontComforta FontBold700" id="chartKondisi" ">Kondisi Mesin</span>
									<div class="container">
										<div class="row">
										<div class="col-md-12" id="chartdiv" ></div>
										</div>
									</div>
									
								</div>
							</div>
						</div>
						<div class="col-md-3">
							<div class="row">
								<div class="col-md-12" >
									<div class="container" id="tranHarian">
										<div class="row">
											<div class="col-md-9 p-0 float-left">
												<div class="row">

												</div>
												<div class="col-md-12" id="tHarian">Rp.<span id="tHarianf"></span></div>
												<div class="col-md-12" id="tHariana"><a href="#">Transaksi Harian</a></div>
											</div>
											<div class="col-md-3 p-0 float-right" >
												<div class="row">
													<div class="col-md-12">
														<span class="float-right  mt-3 mr-2" id="iconic-fin"><i id="iconFA" class="fa fa-signal""></i></span>
													</div>
												</div>
											</div>
											
											
										</div>
									</div>
								</div>
								
								<div class="col-md-12" >
									<div class="container" id="tranMingguan">
										<div class="row">
											<div class="col-md-9 p-0 float-left">
												<div class="row">

												</div>
												<div class="col-md-12" id="tHarian">Rp.<span id="tHariang"></span></div>
												<div class="col-md-12" id="tHariana"><a href="#">Transaksi Mingguan</a></div>
											</div>
											<div class="col-md-3 p-0 float-right" >
												<div class="row">
													<div class="col-md-12">
														<span class="float-right  mt-3 mr-2" id="iconic-fin"><i id="iconFA" class="fa fa-bar-chart"></i></span>
													</div>
												</div>
											</div>
											
											
										</div>
									</div>
								</div>

								<div class="col-md-12" >
									<div class="container" id="tranBulanan">
										<div class="row">
											<div class="col-md-9 p-0 float-left">
												<div class="row">

												</div>
												<div class="col-md-12" id="tHarian">Rp.<span id="tHarianh"></span></div>
												<div class="col-md-12" id="tHariana"><a href="#">Transaksi Bulanan</a></div>
											</div>
											<div class="col-md-3 p-0 float-right" >
												<div class="row">
													<div class="col-md-12">
														<span class="float-right  mt-3 mr-2" id="iconic-fin"><i id="iconFA" class="fa fa-industry"></i></span>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- <div class="col-md-12" id="tranMingguan">Transaksi Mingguan</div>
								<div class="col-md-12" id="tranBulanan">Transaksi Bulanan</div> -->
							</div>
						</div>
					</div>
				</div>

				<div class="container-fluid mt-2 mb-2">
					<div class="row">
						<div class="col-md-12">
							<div class="row ">
								<div class="col-md-9 float-left">
									<div class="row-fluid batasmob">
										<div class="col-md-12 pr-0 ">
											<div class="row bgWhite" id="samaaja">
												<span class="fontComforta FontBold700">Analisis Pendapatan</span>
												<div class="col-md-12 pt-0 pr-0 pl-0" id="chartAnalisisPenjualan"></div>
											</div>
										</div>
									</div>
								</div>
								<div class="col-md-3 float-right" >
									<div class="row-fluid">
										<div class="col-md-12">
											<div class="row bgWhite scrollbar-cyan bordered-cyan" id="samaaja">
												<span class="fontComforta FontBold700">Top 10 Vending Machine</span>
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
				</div>
			</div>
			<!-- <div class="row">
				<div class="col-md-7" >
					<div class="row-fluid">
						<div class="col-md-12" id="bgGmaps">
							<span id="textPosVM">Posisi Vending Machine</span>
							<div class="row">
								<div class="float-left" id="googlemapsDashboardAll"></div>	
								<div class="float-right" id="">asd</div>	
							</div>
						</div>
					</div>
				</div>
				<div class="col-md-5">
					asdasdasda
				</div>
			</div> -->
			<div class="container-fluid mb-2">
				<div class="row">
				<div class="col-md-12">
						<div class="row bgWhite scrollbar-cyan bordered-cyan" id="samaaja">
							<span class="fontComforta FontBold700">Gangguan Vending Machine</span>
							<table class="table table-striped" id="top10VMD">
							<thead>
								<tr>
								<th scope="col pt-2">No</th>
								<th scope="col pt-2">Mesin</th>
								<th scope="col pt-2">Lokasi</th>
								<!-- <th scope="col pt-2">Total transaksi</th> -->
								<th scope="col pt-2">Error</th>
								<th scope="col pt-2"></th>
								</tr>
							</thead>
							<tbody id="problemVM">
							</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

		</div>	
		<!-- </div> -->

		</div>
		</div>
		
		
		<script type="text/javascript">
		var baseURL = 	"<?php echo base_url() ?>";
		var Markers1 = JSON.parse('<?php echo $markerDashboard; ?>');
		var markerTodays = JSON.parse('<?php echo $markerTodays ?>');
		var markersToday = [];
		
		console.log('marker today',markerTodays);
		for(a=0;a<Markers1.length;a++){
			markersToday.push(
				markerTodays[a]);
		}
		console.log('new',markersToday);
		// console.log('cekcek',Markers1);
		// Marker Per-Provinsi
		var MarkerJKT = JSON.parse('<?php echo $markerJkt; ?>');
		
		console.log(MarkerJKT);
		// console.log(MarkerJWB);
		var MarkerTemp = [];
		for(i=0;i<MarkerJKT.length;i++){
			MarkerTemp.push(MarkerJKT[i]);
		}
		var filter = MarkerTemp.filter(function(el){
			return el != null;
		});
		console.log('hmm',MarkerTemp);
		console.log('alah',filter);
		// document.write(MarkerTemp[0][1]);
		// for()
		// Kondisi Machine
		var chartKondisimesin = JSON.parse('<?php echo $chartKondisimesin; ?>');
		
		//Transaksi Dashboard sebelah kanan
		var transaksiD = JSON.parse('<?php echo $data_dayD; ?>');
		var transaksiW = JSON.parse('<?php echo $data_weekD; ?>');
		var transaksiM = JSON.parse('<?php echo $data_monthD; ?>');
		var transaksiDWM = []
		transaksiDWM.push(transaksiD[0],transaksiW[0],transaksiM[0]);
		console.log(transaksiDWM);

		// top 10 VM
		var temptop10VMD = JSON.parse('<?php echo $top10vmD; ?>')
		
		$(document).ready(function(){	
			var tabletop10 = $('#top10VMDD');
			for(rowtop10vm = 0; rowtop10vm < temptop10VMD.length; rowtop10vm++){
				tabletop10.append(
					"<tr>"+
					"<td id='top10vmd'>"+ temptop10VMD[rowtop10vm].kode_mesin +"</td>"+
					"<td id='top10vmd'>"+ temptop10VMD[rowtop10vm].volume +"</td>"+
					"<td id='top10vmd'>"+ 'Rp.'+ temptop10VMD[rowtop10vm].transaksi +"</td>"+
					"</tr>"
				);
			}
		});

		$(document).ready(function(){	
			var tabletop10 = $('#problemVM');
			let no = 0;
			for(rowerr = 0; rowerr < Markers1.length; rowerr++){
				
				if(Markers1[rowerr].status_online !== "normal" || Markers1[rowerr].check_ckd !== "normal" || Markers1[rowerr].device_status !== "normal"){
					no += 1;
					
					if(Markers1[rowerr].status_online !== "normal"){
						var ston = "<div>Online : "+Markers1[rowerr].status_online+"</div>";
					}else{
						var ston = "<div style='display:none;'></div>";
					}
					if(Markers1[rowerr].check_ckd !== "normal"){
						var ckdon = "<div>Ckd : "+Markers1[rowerr].check_ckd+"</div>";
					}else{
						var ckdon = "<div style='display:none;'></div>";
					}
					if(Markers1[rowerr].device_status !== "normal"){
						var dvcon = "<div>Device : "+Markers1[rowerr].device_status+"</div>";
					}else{
						var dvcon = "<div style='display:none;'></div>";
					}
					// if()
					lati = Markers1[rowerr].latitude;
					longti = Markers1[rowerr].longtitude;
					
					// document.getElementById("btnfoc").value = lati;
					tabletop10.append(

						"<tr>"+
						"<td id='top10vmd'>"+ no +"</td>"+
						"<td id='top10vmd'>"+ Markers1[rowerr].kode_mesin +"</td>"+
						"<td id='top10vmd'>"+ Markers1[rowerr].nama_lokasi +"</td>"+
						"<td id='top10vmd'>"+ 
							ston+
							ckdon+
							dvcon+
						"</td>"+
						"<td id='top10vmd'><button id='btnfoc' value='lati,longti' onclick='button1marker(lati, longti)' type='button' class='btn btn-primary'>Submit</button></td>"+
						// "<td id='top10vmd'>"+ Markers1[rowerr].volume +"</td>"+
						// "<td id='top10vmd'>"+ 'Rp.'+ Markers1[rowerr].transaksi +"</td>"+
						"</tr>"
					);
				}
				
			}
		});
		
		
		var datanalisisDkai = JSON.parse('<?php echo $dataanalisiskai; ?>');
		var datanalisisDemoney = JSON.parse('<?php echo $dataanalisisemoney; ?>');
		console.log(datanalisisDemoney);
		

		// console.log(temptop10VMD);

		//Langsung ke ID tertuju
		window.onload = function() {
            dashboardtrans();
            function dashboardtrans(){
				document.getElementById('tHarianf').innerHTML = transaksiDWM[0].transaksi;
				document.getElementById('tHariang').innerHTML = transaksiDWM[1].transaksi;
				document.getElementById('tHarianh').innerHTML = transaksiDWM[2].transaksi;
            };
        }
		// document.getElementById('tHarianf').innerHTML = ;
		// for(a=0;a < tempMarkers.length;a++){
			// console.log(tempMarkers[a]);
		// }
		// var tempMarkers = [];
		// tempMarkers.push(MarkerJKT,MarkerJWB,MarkerYOG);
		// console.log(tempMarkers[0][1]);
		// for(a=0;a<tempMarkers.length;a++){
		// 	console.log(tempMarkers[a]);
		// }
		// console.log(chartKondisimesin);
		
		</script>



		<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/chart.js"></script>
		<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/google_maps.js"></script>
		<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/navbar.js"></script>
	</body>
</html>
