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
											<a class="tombollink" href="<?php echo base_url() ?>">All</a>
											<!-- <a class="tombollink" href="<?php echo base_url('kai') ?>">KAI</a> -->
											<!-- <a class="tombollink" href="<?php echo base_url('emoney') ?>">E-Money</a> -->
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
									<span class="fontComforta FontBold700" id="chartKondisi" >Kondisi Mesin</span>
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
												<div class="col-md-12" id="tHariana">Trx.<span id="tHarianftrx"></span></div>
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
												<div class="col-md-12" id="tHariana">Trx.<span id="tHariangtrx"></span></div>
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
												<div class="col-md-12" id="tHariana">Trx.<span id="tHarianhtrx"></span></div>
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
													<!-- <th scope="col pt-2">Total transaksi</th> -->
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

		</div>	
		<!-- </div> -->

		</div>
		</div>
		<?php
			$urlEmoney = 'http://27.111.44.44/mobile/Percobaan/get_percobaan';
			$urlEmoney_lbr = 'http://27.111.44.44/mobile/Percobaan/get_percobaan1/';
			$urlEmoney_dvc = 'http://27.111.44.44/mobile/Percobaan/get_checkingvm';
			$urlEmoney_Analisisharian ='http://27.111.44.44/mobile/Percobaan/get_dataAnalistopup_mandiri';//analisis harian KAI (TOP UP)
			$urlEmoney_AnalisisharianCard ='http://27.111.44.44/mobile/Percobaan/get_dataAnaliscard_mandiri';//analisis harian KAI (CARD)
			$urlEmoney_topVM = 'http://27.111.44.44/mobile/Percobaan/get_topemoney';//trx
			$urlEmoney_topVMcard = 'http://27.111.44.44/mobile/Percobaan/get_topemoneycard'; //trx card
			
			$urlKai = 'http://27.111.44.42/Percobaan/get_percobaan';
			$urlKai_lbr = "http://27.111.44.42/Percobaan/get_trxlbrcashbox";
			$urlKai_dvc = "http://27.111.44.42/Percobaan/get_ckdKAI";
			$urlKai_Analisisharian = "http://27.111.44.42/Percobaan/get_dataAnalisisKAI";//analisis harian KAI
			$urlKai_topVM = "http://27.111.44.42/Percobaan/get_topkai";// trx


			$urlTRhmb = 'http://27.111.44.42/Percobaan/get_trxtotalhmb';//kai
			$urlTRhmbtopup = 'http://27.111.44.44/mobile/Percobaan/get_topuptotalhmb';//topup mandiri
			$urlTRhmbcard = 'http://27.111.44.44/mobile/Percobaan/get_cardtotalhmb';//card mandiri

			// list topup & card
			$urlListkaitopup = 'http://27.111.44.42/Percobaan/list_vmkai';
			$urlListemoneycard = 'http://27.111.44.44/mobile/Percobaan/list_topupmandiricard';
			$urlListemoneytopup = 'http://27.111.44.44/mobile/Percobaan/list_topupmandiri';
			
			$restMesinKAI = file_get_contents($urlKai);
			$restMesinKAI_lbr = file_get_contents($urlKai_lbr);
			$restMesinKAI_dvc = file_get_contents($urlKai_dvc);
			$restMesinKAI_Analisisharian = file_get_contents($urlKai_Analisisharian);
			$restMesinKAI_topVM = file_get_contents($urlKai_topVM);

			$restMesinEmoney = file_get_contents($urlEmoney);
			$restMesinEmoney_lbr = file_get_contents($urlEmoney_lbr);
			$restMesinEmoney_dvc = file_get_contents($urlEmoney_dvc);
			$restMesinEmoney_Analisisharian = file_get_contents($urlEmoney_Analisisharian);
			$restMesinEmoney_AnalisisharianCard = file_get_contents($urlEmoney_AnalisisharianCard);
			$restMesinEmoney_topVM = file_get_contents($urlEmoney_topVM);
			$restMesinEmoney_topVMcard = file_get_contents($urlEmoney_topVMcard);
			// print_r($restMesin);
			
			//trx main
			$restTRhmb = file_get_contents($urlTRhmb);
			$restTRhmbtopup = file_get_contents($urlTRhmbtopup);
			$restTRhmbcard = file_get_contents($urlTRhmbcard);

			// list trx topup & card
			$restkaiTopup = file_get_contents($urlListkaitopup);
			$restemoneyTopup = file_get_contents($urlListemoneytopup);
			$restemoneyCard = file_get_contents($urlListemoneycard);

		?>
		

		<script type="text/javascript">
		var baseURL = 	"<?php echo base_url() ?>";
		// data dari database
		var markersAll = JSON.parse('<?php echo $markerall; ?>');
		//API KAI
		var vmKai = <?php echo $restMesinKAI; ?>;
		var vmKai_lbr = <?php echo $restMesinKAI_lbr; ?>;
		var vmKai_dvc = <?php echo $restMesinKAI_dvc; ?>;
		var vmKai_Analisisharian = <?php echo $restMesinKAI_Analisisharian; ?>;
		var vmKai_topVM = <?php echo $restMesinKAI_topVM; ?>;


		//API Emoney
		var vmEmoney = <?php echo $restMesinEmoney; ?>;
		var vmEmoney_lbr = <?php echo $restMesinEmoney_lbr; ?>;
		var vmEmoney_dvc = <?php echo $restMesinEmoney_dvc; ?>;
		var vmEmoney_Analisisharian = <?php echo $restMesinEmoney_Analisisharian; ?>;
		var vmEmoney_Analisishariancard = <?php echo $restMesinEmoney_AnalisisharianCard; ?>;
		var vmEmoney_topVM = <?php echo $restMesinEmoney_topVM; ?>;
		var vmEmoney_topVMcard = <?php echo $restMesinEmoney_topVMcard; ?>;

		// list topup & card
		var vmKai_topup = <?php echo $restkaiTopup; ?>;
		var vmEmoney_topup = <?php echo $restemoneyTopup; ?>;
		var vmEmoney_card = <?php echo $restemoneyCard; ?>;


		console.log('vmKai_topup',vmKai_topup);
		console.log('vmEmoney_topup',vmEmoney_topup);
		console.log('vmEmoney_card',vmEmoney_card);
		//API TRANSAKSI HMB
		trHMB = <?php echo $restTRhmb ;?>;
		trHMBtopup = <?php echo $restTRhmbtopup; ?>;
		trHMBcard = <?php echo $restTRhmbcard; ?>;
		console.log('trHMB KAI', trHMB);
		console.log('trHMBtopup emoney', trHMBtopup);
		console.log('vmEmoney_card emoney', trHMBcard);
		var cek_operator = Number(trHMB[0].transaksi_harian)+Number(trHMBtopup[0].transaksi_harian)+Number(trHMBcard[0].transaksi_harian);
		console.log('operator',cek_operator)

	
		
		


		/* let data_kai_h = Number(trHMB[0].transaksi_harian)+Number(trHMBtopup[0].transaksi_harian)+Number(trHMBcard[0].transaksi_harian);
		let data_kai_m = Number(trHMB[1].transaksi_mingguan)+Number(trHMBtopup[1].transaksi_mingguan)+Number(trHMBcard[1].transaksi_mingguan);
		let data_kai_b = Number(trHMB[2].transaksi_bulanan)+Number(trHMBtopup[2].transaksi_bulanan)+Number(trHMBcard[2].transaksi_bulanan); */
		
		// let trharian = Number(trHMB[0].transaksi_harian+trHMBtopup[0].transaksi_harian+trHMBcard[0].transaksi_harian);
		console.log('vmEmoney',vmEmoney);
		console.log('vmEmoney_lbr',vmEmoney_lbr);
		console.log('vmEmoney_dvc',vmEmoney_dvc);

		console.log('vmKai',vmKai);
		console.log('vmKai_lbr',vmKai_lbr);
		console.log('vmKai_dvc',vmKai_dvc);

		console.log('data analisis',vmEmoney_lbr);
		
		console.log('data analisis',vmEmoney_Analisisharian);
		console.log('all',markersAll);

		function rubah(angka){
			var reverse = angka.toString().split('').reverse().join(''),
			ribuan = reverse.match(/\d{1,3}/g);
			ribuan = ribuan.join('.').split('').reverse().join('');
			return ribuan;
		}


		

		
		

		/* const getSecondUser = async () => {
			const url = 'http://27.111.44.42/Percobaan/get_trxh';
			const response = await fetch(url);
			console.log(await response.json());
		} */
		// console.log('getSecondUser',exampleFetch());


		async function exampleFetch() {
			const response_kai = await fetch('http://27.111.44.42/Percobaan/get_trxh');
			const response_emoneyt = await fetch('http://27.111.44.44/mobile/Percobaan/get_trxh');
			const response_emoneyc = await fetch('http://27.111.44.44/mobile/Percobaan/get_trxhc');
			const json_emoneyt= await response_emoneyt.json();
			const json_emoneyc= await response_emoneyc.json();
			const json_kai = await response_kai.json();

			// console.log('json_emoneyt',json_emoneyt);
			// console.log('json_emoneyc',json_emoneyc);
			console.log('json_kai',json_kai);
			
			var json = [...json_emoneyt, ...json_emoneyc, ...json_kai];
			console.log('json harian',json);
			var sampe_trx = 0;
			var sampe_mount = 0;
			for(x in json){
				sampe_trx = sampe_trx + Number(json[x]['trx']);
				sampe_mount = sampe_mount + Number(json[x]['amount']);
			}

			// var sampe_mount1 = sampe_mount;
			document.getElementById('tHarianf').innerHTML = rubah(sampe_mount);
			document.getElementById('tHarianftrx').innerHTML = rubah(sampe_trx);
		}

		async function exampleFetchm() {
			const response_kai = await fetch('http://27.111.44.42/Percobaan/get_trxm');
			const response_emoneyt = await fetch('http://27.111.44.44/mobile/Percobaan/get_trxm');
			const response_emoneyc = await fetch('http://27.111.44.44/mobile/Percobaan/get_trxmc');
			const json_emoneyt= await response_emoneyt.json();
			const json_emoneyc= await response_emoneyc.json();
			const json_kai = await response_kai.json();

			console.log('json_emoneyt',json_emoneyt);
			console.log('json_emoneyc',json_emoneyc);
			console.log('json_kai',json_kai);
			
			var json = [...json_emoneyt, ...json_emoneyc, ...json_kai];
			console.log('json',json);
			var sampe_trx = 0;
			var sampe_mount = 0;
			for(x in json){
				sampe_trx = sampe_trx + Number(json[x]['trx']);
				sampe_mount = sampe_mount + Number(json[x]['amount']);
			}
			
			// var sampe_mount1 = sampe_mount;
			document.getElementById('tHariang').innerHTML = rubah(sampe_mount);
			document.getElementById('tHariangtrx').innerHTML = rubah(sampe_trx);
		}

		async function exampleFetchb() {
			const response_kai = await fetch('http://27.111.44.42/Percobaan/get_trxb');
			const response_emoneyt = await fetch('http://27.111.44.44/mobile/Percobaan/get_trxb');
			const response_emoneyc = await fetch('http://27.111.44.44/mobile/Percobaan/get_trxbc');
			const json_emoneyt= await response_emoneyt.json();
			const json_emoneyc= await response_emoneyc.json();
			const json_kai = await response_kai.json();

			console.log('json_emoneyt',json_emoneyt);
			console.log('json_emoneyc',json_emoneyc);
			console.log('json_kai',json_kai);
			
			var json = [...json_emoneyt, ...json_emoneyc, ...json_kai];
			console.log('json',json);
			var sampe_trx = 0;
			var sampe_mount = 0;
			for(x in json){
				sampe_trx = sampe_trx + Number(json[x]['trx']);
				sampe_mount = sampe_mount + Number(json[x]['amount']);
			}
			
			// var sampe_mount1 = sampe_mount;
			document.getElementById('tHarianh').innerHTML = rubah(sampe_mount);
			document.getElementById('tHarianhtrx').innerHTML = rubah(sampe_trx);
		}


		/* window.onload = function() {

			dashboardtrans();

            function dashboardtrans(){
				document.getElementById('tHariang').innerHTML = data_kai_m;
				document.getElementById('tHarianh').innerHTML = data_kai_b;
            };
		} */
		function compare( a, b ) {
			if ( a.trx > b.trx ){
				return -1;
			}
			if ( a.trx < b.trx ){
				return 1;
			}
			return 0;
		}

		function dynamicsort(property,order) {
			var sort_order = 1;
			if(order === "desc"){
				sort_order = -1;
			}
			return function (a, b){
				// a should come before b in the sorted order
				if(a[property] < b[property]){
						return -1 * sort_order;
				// a should come after b in the sorted order
				}else if(a[property] > b[property]){
						return 1 * sort_order;
				// a and b are the same
				}else{
						return 0 * sort_order;
				}
			}
		}

		var temp_topVM=[];
		for(top1=0; top1<vmEmoney_topVM.length; top1++){
			for(top2=0; top2<vmEmoney_topVMcard.length; top2++){
				if(vmEmoney_topVM[top1]['terminal_id'] === vmEmoney_topVMcard[top2]['terminal_id']){
					temp_topVM.push({
						terminal_id: (vmEmoney_topVM[top1]['terminal_id']),
						trx: (Number(vmEmoney_topVM[top1]['trx']) + Number(vmEmoney_topVMcard[top2]['trx']))
					});
				}
			}
		}
		for(top3=0; top3<vmKai_topVM.length; top3++){
			temp_topVM.push({
				terminal_id: (vmKai_topVM[top3]['vmid']),
				trx: (Number(vmKai_topVM[top3]['trx']))
			});
		}
		temp_topVM = temp_topVM.sort(compare);
		console.log('temp_topVM',temp_topVM.sort(compare));
		

		async function topvm() {
			const response_kai = await fetch('http://27.111.44.42/Percobaan/get_topvmkaih');
			const response_emoneyt = await fetch('http://27.111.44.44/mobile/Percobaan/get_toph');
			const response_emoneyc = await fetch('http://27.111.44.44/mobile/Percobaan/get_tophc');
			const json_emoneyt= await response_emoneyt.json();
			const json_emoneyc= await response_emoneyc.json();
			const json_kai = await response_kai.json();

			console.log('json_emoneyt',json_emoneyt);
			console.log('json_emoneyc',json_emoneyc);
			console.log('json_kai',json_kai);
			
			var json = [...json_emoneyt, ...json_emoneyc, ...json_kai];
			var temp = [];
			for(y in json){
				temp.push({
					terminal_id: (json[y]['terminal_id']),
					trx: (Number(json[y]['trx']))
				});
			}
			// json = json.sort(compare);
			temp = temp.sort(dynamicsort("trx", "desc"));
			

			var tabletop10 = $('#top10VMDD');
			for(rowtop10vm = 0; rowtop10vm < 10; rowtop10vm++){
				tabletop10.append(
					"<tr>"+
						"<td id='top10vmd'>"+ temp[rowtop10vm]['terminal_id'] +"</td>"+
						"<td id='top10vmd'>"+ temp[rowtop10vm]['trx'] +"</td>"+
						// "<td id='top10vmd'>"+ 'Rp.'+ temptop10VMD[rowtop10vm].transaksi +"</td>"+
					"</tr>"
				);
			} 
			
			// var sampe_mount1 = sampe_mount;

			
		}


		$(document).ready(function(){
			(async () => {
				exampleFetch();
				exampleFetchm();
				exampleFetchb();
				
				topvm();
			})();



			
		});
		</script>


		<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/googlemaps_fordashboard.js"></script>
		<!-- <script type="text/javascript" src="<?php echo base_url(); ?>assets/js/chart.js"></script> -->
		<!-- <script type="text/javascript" src="<?php echo base_url(); ?>assets/js/google_maps.js"></script> -->
		<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/navbar.js"></script>
		<script type="text/javascript" src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
		<script type="text/javascript" src="https://cdn.datatables.net/1.10.21/js/dataTables.bootstrap4.min.js"></script>
	</body>
</html>
