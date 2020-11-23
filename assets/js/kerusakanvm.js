$('#datepicker1').datepicker({
	uiLibrary: 'bootstrap4',
	format: "yyyy-mm-dd",
});


$('#datepicker2').datepicker({
	uiLibrary: 'bootstrap4',
	format: "yyyy-mm-dd",

});

// var result_Mtopup = await get('http://27.111.44.44/mobile/Percobaan2/get_trxmandiritpharterm/'+vm_group_testing+'/'+vm_satu+'/'+tgl_awal_val+'/'+tgl_akhir_val);
async function loadLimitAPI(url,putaran,kelipatan){
	let limita = 0;
	let limitb = kelipatan;
	var temp_url = []
	for(nol = 0; nol<putaran; nol++){
		temp_url.push(url+limita+"/"+limitb);
		limita = limita+limitb;
	}
	// console.log(temp_url);
	
	var temp_tampungan = [];
	for(a in temp_url){
		// (async () => {
		var url = await fetch(temp_url[a]);
		var ult_json = await url.json();
		// console.log(ult_json);
		// });
		for(b in ult_json){
			temp_tampungan.push(
				ult_json[b]
			);
		}
		// console.log(ult_json);
		// console.log('loading data',a);
	}
	// console.log('a',temp_tampungan);
	// for(load in temp_tampungan){
	// 	console.log('b',temp_tampungan[load]);
	// }
	
	return await temp_tampungan;
	// console.log();
	/* const urls = [
		'http://27.111.44.42/Percobaan2/get_allckdvmKAI/'
	]
	for(nol=0; nol<putaran; nol++){
		var url = await fetch('http://27.111.44.42/Percobaan2/get_allckdvmKAI/'+limita+'/'+limitb);
		var url_json = await url.json();	
		console.log(url_json);
		
	}
	
 */
		/* var temp = [];
	
		let limita = 0;
		Number(limita);
		let limitb = 25;
		Number(limitb);
		// for(nol in putaran){
			var temp
			var temp_tampungan = await fetch('http://27.111.44.42/Percobaan2/get_allckdvmKAI'+'/'+limita+'/'+limitb);
			var temp1 = await temp_tampungan.json();
			
			limita = limita+limitb;
		// }
		
		
		console.log('a',temp1);
		
		// })(); 
		return temp1; */
}

async function testing(){
	var url_ck = await loadLimitAPI("http://27.111.44.42/Percobaan2/get_allckdvmKAI1/",1,15000);
	var pilah = [];
	for(pepilah in url_ck){
		var hari_ini = regex_time2date(url_ck[pepilah]['waktu']);
		if(hari_ini == today()){
			pilah.push({
				id: url_ck[pepilah]['id'],
				stPrinter: (regex_number(url_ck[pepilah]['msgdata'], /stPrinter.*/,10)),
				stBA: (regex_number(url_ck[pepilah]['msgdata'], /stBA.*/,5)),
				stUPS: (regex_number(url_ck[pepilah]['msgdata'], /stUPS.*/,6)),
				vmid: url_ck[pepilah]['vmid'],
				waktu: (url_ck[pepilah]['waktu']),
			});
			
		}
		// return temp_tampungan;
		
	}
	url_ck = pilah;
	return url_ck;
}
async function loadnotLimitAPI(url){
	// var temp_url = []
	
	var temp_tampungan = [];
	// for(a in temp_url){
	var url = await fetch(url);
	var ult_json = await url.json();
		
	for(a in ult_json){
		temp_tampungan.push(
			ult_json[a]
		);
		// console.log('loading data map', a);
	}
		
	// }
	return await temp_tampungan
}



async function loadnotLimitAPItoday(url,today){

}

// (async () => {
// 	var loop  = loadLimitAPI("http://27.111.44.42/Percobaan2/get_allckdvmKAI1/",1,20000);
// 	var temp1 = []
// 	for(ax in loop){
	// var same =  then(loadLimitAPI("http://27.111.44.42/Percobaan2/get_allckdvmKAI1/",1,20000));
// console.log(same);
// 	}
// })();
function getLast3Months() {

	var monthNames = ["January", "February", "March", "April", "May", "June",
	  "July", "August", "September", "October", "November", "December"
	];
  
	var today = new Date();
	var last3Months = []
  
	for (i = 0; i < 11; i++) {
		var mm = today.setMonth(today.getMonth() - i);
		var mms;
	  	last3Months.push(today.getMonth() - i + ' - ' +today.getFullYear()  );
	}
	return last3Months;
}

  function dateRange(startDate, endDate) {
	var start      = startDate.split('-');
	var end        = endDate.split('-');
	var startYear  = parseInt(start[0]);
	var endYear    = parseInt(end[0]);
	// console.log(start);
	// console.log(end);
	var dates = [];
  
	for(var i = startYear; i <= endYear; i++) {
	  var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
	  var startMon = i === startYear ? parseInt(start[1])-1 : 0;
	  for(var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j+1) {
		var month = j+1;
		var displayMonth = month < 10 ? '0'+month : month;
		dates.push({
			waktu: [i, displayMonth, '01'].join('-'),
			value : 1,
		});
	  }
	}
	return dates;
  }
  
// periode 3 bulan
function periode3(){
	var temp = dateRange('2018-10-04','2020-11-04');
	var tamp0 = [];
	var vali = 1;
	// tempt = temp.;
	for(a in temp){
		
		var temp2 = temp[a]['waktu'];
		vali = Number(vali) + temp[a]['value'];
		if(vali%3 == 0){
			
			tamp0.push({
				waktu: temp2,
				value: vali,
			});
			vali = 0;
		}
		
	}
	console.log('tamp',tamp0.sort(waktuCompare));
}

function convertDate(date) {
	var yyyy = date.getFullYear().toString();
	var mm = (date.getMonth()+1).toString();
	var dd  = date.getDate().toString();

	var mmChars = mm.split('');
	var ddChars = dd.split('');

	return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
}
function convertDate_1(date) {
	var yyyy = date.getFullYear().toString();
	var mm = (date.getMonth()+1).toString();
	var dd  = (date.getDate()-1).toString();

	var mmChars = mm.split('');
	var ddChars = dd.split('');

	return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
}

function onchange_Periode(){
	var tanggal_dp = document.getElementById('tanggal_dp');
	var bulan_dp = document.getElementById('bulan_dp');
	var bulan_periode_dp = document.getElementById('bulan_periode_dp');
	var vm_waktu = document.getElementById('vm_waktu');

	var opt_vm_waktu = vm_waktu.options[vm_waktu.selectedIndex].value;
	if(opt_vm_waktu === 'harian'){
		tanggal_dp.style.display = 'block';
		bulan_dp.style.display = 'none';
		bulan_periode_dp.style.display = 'none';
	}else if(opt_vm_waktu === 'bulanan'){
		tanggal_dp.style.display = 'none';
		bulan_dp.style.display = 'block';
		bulan_periode_dp.style.display = 'none';
	}else if(opt_vm_waktu === 'periode'){
		tanggal_dp.style.display = 'none';
		bulan_dp.style.display = 'none';
		bulan_periode_dp.style.display = 'block';
	}
}

async function buttonMARKERMAP(latitude,longtitude){
	var body_table_clickmap = document.getElementById('SKVM_bgMargin');
	

	var latitud = latitude;
	var longtitud = longtitude;
	// var url_ckd_MAN = ;
	var url_ckd_KAI = await loadLimitAPI("http://27.111.44.42/Percobaan2/get_allckdvmKAI1/",1,15000);
	var url_ckd_MAN = await loadLimitAPI("http://27.111.44.44/mobile/Percobaan2/get_allckdvmMAN1/",1,10000);
	var url_map = await loadnotLimitAPI("http://27.111.44.44/mobile/Percobaan2/mapVM1");
	var arr_ckd_KAI = [];
	
	for(len in url_ckd_KAI){
		var hari_ini = regex_time2date(url_ckd_KAI[len]['waktu']);
		if(hari_ini === today()){
			arr_ckd_KAI.push({
				id: url_ckd_KAI[len]['id'],
				vmid: url_ckd_KAI[len]['vmid'],
				stPrinter: (regex_number(url_ckd_KAI[len]['msgdata'], /stPrinter.*/,10)),
				stBa: (regex_number(url_ckd_KAI[len]['msgdata'], /stBA.*/,5)),
				stUps: (regex_number(url_ckd_KAI[len]['msgdata'], /stUPS.*/,6)),
				stCd: '00',
				stReader: '00',
				waktu: url_ckd_KAI[len]['waktu']
			})
		}
	}

	var arr_ckd_MAN = [];
	for(lin in url_ckd_MAN){
		var hari_ini = regex_time2date(url_ckd_MAN[lin]['waktu']);
		if(hari_ini === today()){
			var fokus_bb = url_ckd_MAN[lin]['terminal_id'].split(0)
			// console.log(fokus_bb[0]);
			if(fokus_bb[0] === 'BB'){
				arr_ckd_MAN.push({
					id: url_ckd_MAN[lin]['id'],
					vmid: url_ckd_MAN[lin]['terminal_id'],
					stPrinter: url_ckd_MAN[lin]['status_printer'],
					stBa: url_ckd_MAN[lin]['status_ba'],
					stUps: "00",
					stCd: "00",
					stReader: url_ckd_MAN[lin]['status_reader'],
					waktu: url_ckd_MAN[lin]['waktu']
				});
			}else{
				arr_ckd_MAN.push({
					id: url_ckd_MAN[lin]['id'],
					vmid: url_ckd_MAN[lin]['terminal_id'],
					stPrinter: url_ckd_MAN[lin]['status_printer'],
					stBa: url_ckd_MAN[lin]['status_ba'],
					stUps: "00",
					stCd: url_ckd_MAN[lin]['status_cd1'],
					stReader: url_ckd_MAN[lin]['status_reader'],
					waktu: url_ckd_MAN[lin]['waktu']
				});
			}
		}
	}
	
	var arr_map = [];
	for(arraybtn in url_map){
		if(url_map[arraybtn]['latitude'] == latitud && url_map[arraybtn]['longtitude'] == longtitud ){
			arr_map.push(url_map[arraybtn]);
		}
	}
	
	body_table_clickmap.innerHTML = 
		'<div id="data1load" class="col-sm-12 pt-2">'+
			'<span><h5>Data Harian VM '+arr_map[0]['terminal_id']+' Hari Ini</h5></span>'+
		'</div>'+


		'<div class="col-sm-12">'+
			'<table id="t-table" class="table table-bordered" style="width:100%">'+
				'<thead id="test-tablehead" style="background-color:#2ac0ca;">'+
					'<tr>'+
						'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">No</th>'+
						'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Tanggal</th>'+
						'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Mesin</th>'+
						'<th scope="col" colspan="5" style="vertical-align : middle;text-align:center;">Device Status</th>'+
						'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Keterangan</th>'+

					'</tr>'+
					'<tr>'+
						'<th scope="col"  style="vertical-align : middle;text-align:center;">PRN</th>'+
						'<th scope="col"  style="vertical-align : middle;text-align:center;">BA</th>'+
						'<th scope="col"  style="vertical-align : middle;text-align:center;">CD</th>'+
						'<th scope="col"  style="vertical-align : middle;text-align:center;">RDR</th>'+
						'<th scope="col"  style="vertical-align : middle;text-align:center;">UPS</th>'+
					'</tr>'+

				'</thead>'+
				'<tbody id="test-tablebody">'+
					/* '<tr>'+
						'<td style="text-align:center;">2020-01-01</td>'+
						'<td style="text-align:center;">bb001</td>'+
						'<td style="text-align:center;">00</td>'+
						'<td style="text-align:center;">00</td>'+
						'<td style="text-align:center;">00</td>'+
						'<td style="text-align:center;">ff</td>'+
						'<td style="text-align:center;">ff</td>'+
						'<td style="text-align:center;">butuh perbaikan</td>'+
						'<td style="text-align:center;">lokasi</td>'+
					'</tr>'+ */
				'</tbody>'+
				'<tfoot id="test-tablefoot">'+
				'</tfoot>'+
			'</table>'+
		'</div>';

	var arr_ckdgabungan = [...arr_ckd_KAI, ...arr_ckd_MAN];
	arr_ckdgabungan.sort(waktuCompare);
	
	var show_map = [];
	for(a in arr_ckdgabungan){
		if(arr_ckdgabungan[a]['vmid'] === arr_map[0]['terminal_id']){
			
			show_map.push(arr_ckdgabungan[a]);
			// body_table_clickmap.innerHTML += arr_ckdgabungan[a]['vmid']+'<br>';
		}
	}
	
	var test_tablebody = document.getElementById('test-tablebody');
	if(show_map.length === 0){
		body_table_clickmap.innerHTML = '<div class="">Histori Mesin Tidak Ditemukan</div>';
	}else{
		for(listCmap in show_map){
			var listdari1 = 1;
			listdari1=listdari1+Number(listCmap);
			var waktu = show_map[listCmap]['waktu'];
			var vmid = show_map[listCmap]['vmid'];
			var stPrinter = show_map[listCmap]['stPrinter'];
			var stBa = show_map[listCmap]['stBa'];
			var stCd = show_map[listCmap]['stCd'];
			var stReader = show_map[listCmap]['stReader'];
			var stUps = show_map[listCmap]['stUps'];

			var keterangan;
			if(stPrinter == "00" && stBa == "00" && stCd == "00" && stReader == "00" && stUps == "00"){
				keterangan = '<td style="text-align:center; background-color:green; color:#ffffff;">Mesin Sehat</td>'
			}else{
				keterangan = '<td style="text-align:center; background-color:red; color:#ffffff;">Mesin Butuh Perbaikan</td>';
			}

			test_tablebody.innerHTML += '<tr>'+
			'<td style="text-align:center;">'+listdari1+'</td>'+
			'<td style="text-align:center;">'+waktu+'</td>'+
			'<td style="text-align:center;">'+vmid+'</td>'+
			'<td style="text-align:center;">'+stPrinter+'</td>'+
			'<td style="text-align:center;">'+stBa+'</td>'+
			'<td style="text-align:center;">'+stCd+'</td>'+
			'<td style="text-align:center;">'+stReader+'</td>'+
			'<td style="text-align:center;">'+stUps+'</td>'+
			keterangan+
			// '<td style="text-align:center;"><button class="btn btn-primary" onClick="buttonMARKERMAP('+latitude+','+longtitude+')">lokasi</button></td>'+
		'</tr>';
		}
	} 
	console.log('1',show_map);
	console.log('map1', arr_map);
	

	// return
}

async function testingmap(data){
	var temp_dataMap = data;

	var new_arr1 = [];
	for(statusON = 0; statusON<temp_dataMap.length; statusON++){
		if(temp_dataMap[statusON]['longtitude'] !== '0.000000'){
			new_arr1.push(temp_dataMap[statusON]);
		}
	}
	// console.log('cekcok',new_arr1);

	var map = new google.maps.Map(document.getElementById('showMapping'), {
		zoom: 7,
		center: new google.maps.LatLng(-7.2480381, 110.4466601),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var infowindow = new google.maps.InfoWindow;

	var marker, i;

	for (i = 0; i < new_arr1.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(new_arr1[i]['latitude'], new_arr1[i]['longtitude']),
			map: map
		});

		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				var latitude = new_arr1[i]['latitude'];
				var longtitude = new_arr1[i]['longtitude'];
				var terminal_id = new_arr1[i]['terminal_id'];
				// var latlng = latitude,longtitude;
				infowindow.setContent(
					'<span>'+new_arr1[i]['terminal_id']+'-'+new_arr1[i]['pinlokasi']+'</span><br>'+
					new_arr1[i]['latitude']+'<br>'+
					new_arr1[i]['longtitude']+'<br>'+
					'<button class="btn btn-primary" onClick="buttonMARKERMAP('+latitude+','+longtitude+')"> '+'Lihat Histori'+'</button>'
				);
				infowindow.open(map, marker);
				// if (infoWindow) infoWindow.close();
			}
		})(marker, i));
	}
	return new_arr1
}


async function mainLoad(){
	var test_tablebody = document.getElementById('test-tablebody');

	var url_ckd_KAI = await loadLimitAPI("http://27.111.44.42/Percobaan2/get_allckdvmKAI1/",1,15000);
	var url_ckd_MAN = await loadLimitAPI("http://27.111.44.44/mobile/Percobaan2/get_allckdvmMAN1/",1,10000);
	var url_map = await loadnotLimitAPI("http://27.111.44.44/mobile/Percobaan2/mapVM1");
	var arr_ckd_KAI = [];
	for(len in url_ckd_KAI){
		var hari_ini = regex_time2date(url_ckd_KAI[len]['waktu']);
		if(hari_ini === today()){
			arr_ckd_KAI.push({
				id: url_ckd_KAI[len]['id'],
				vmid: url_ckd_KAI[len]['vmid'],
				stPrinter: (regex_number(url_ckd_KAI[len]['msgdata'], /stPrinter.*/,10)),
				stBA: (regex_number(url_ckd_KAI[len]['msgdata'], /stBA.*/,5)),
				stUps: (regex_number(url_ckd_KAI[len]['msgdata'], /stUPS.*/,6)),
				stCd: '00',
				stReader: '00',
				waktu: url_ckd_KAI[len]['waktu']
			})
		}
	}

	var arr_ckd_MAN = [];
	for(lin in url_ckd_MAN){
		var hari_ini = regex_time2date(url_ckd_MAN[lin]['waktu']);
		if(hari_ini === today()){
			var fokus_bb = url_ckd_MAN[lin]['terminal_id'].split(0)
			// console.log(fokus_bb[0]);
			if(fokus_bb[0] === 'BB'){
				arr_ckd_MAN.push({
					id: url_ckd_MAN[lin]['id'],
					vmid: url_ckd_MAN[lin]['terminal_id'],
					stPrinter: url_ckd_MAN[lin]['status_printer'],
					stBA: url_ckd_MAN[lin]['status_ba'],
					stUps: "00",
					stCd: "00",
					stReader: url_ckd_MAN[lin]['status_reader'],
					waktu: url_ckd_MAN[lin]['waktu']
				});
			}else{
				arr_ckd_MAN.push({
					id: url_ckd_MAN[lin]['id'],
					vmid: url_ckd_MAN[lin]['terminal_id'],
					stPrinter: url_ckd_MAN[lin]['status_printer'],
					stBA: url_ckd_MAN[lin]['status_ba'],
					stUps: "00",
					stCd: url_ckd_MAN[lin]['status_cd1'],
					stReader: url_ckd_MAN[lin]['status_reader'],
					waktu: url_ckd_MAN[lin]['waktu']
				});
			}
		}
	}

	var arr_ckdgabungan = [...arr_ckd_KAI, ...arr_ckd_MAN];
	arr_ckdgabungan = arr_ckdgabungan.sort(waktuCompare);

	// console.log('gabung',arr_ckdgabungan);
	// console.log('map',url_map);

	var arr_ckdgabmap = [];
	for(lan in arr_ckdgabungan){
		for(lmap in url_map){
			// var sub_Jenis, sub_Pinlokasi, sub_Latitude, sub_Longtitude;
			if(arr_ckdgabungan[lan]['vmid'] === url_map[lmap]['terminal_id']){
				/* var sub_Jenis = ;
				var sub_Pinlokasi = ;
				var sub_Latitude = ;
				var sub_Longtitude = ; */

				/* arr_ckdgabmap.push({
					id: arr_ckdgabungan[lan]['id'],
					vmid: arr_ckdgabungan[lan]['vmid'],
					stPrinter: arr_ckdgabungan[lan]['stPrinter'],
					stBa: arr_ckdgabungan[lan]['stBA'],
					stUps: arr_ckdgabungan[lan]['stUps'],
					stCd: arr_ckdgabungan[lan]['stCd'],
					stReader: arr_ckdgabungan[lan]['stReader'],
					waktu: arr_ckdgabungan[lan]['waktu'],
				 */
				var sub_Jenis = url_map[lmap]['jenis'];
				var sub_Pinlokasi =  url_map[lmap]['pinlokasi'];
				var sub_Latitude = url_map[lmap]['latitude'];
				var sub_Longtitude = url_map[lmap]['longtitude'];
						// });
			}
		}
		arr_ckdgabmap.push({
			id: arr_ckdgabungan[lan]['id'],
			vmid: arr_ckdgabungan[lan]['vmid'],
			stPrinter: arr_ckdgabungan[lan]['stPrinter'],
			stBa: arr_ckdgabungan[lan]['stBA'],
			stUps: arr_ckdgabungan[lan]['stUps'],
			stCd: arr_ckdgabungan[lan]['stCd'],
			stReader: arr_ckdgabungan[lan]['stReader'],
			waktu: arr_ckdgabungan[lan]['waktu'],

			group: sub_Jenis,
			pinlokasi: sub_Pinlokasi,
			latitude: sub_Latitude,
			longtitude: sub_Longtitude
		});
	}
	// console.log('sem',arr_ckdgabmap);
	var arr_ckdgabmapClean = removeDuplicates(arr_ckdgabmap,'vmid');
	
	for(listloadpage in arr_ckdgabmapClean){
		var listdari1 = 1;
		listdari1=listdari1+Number(listloadpage);
		var waktu = arr_ckdgabmapClean[listloadpage]['waktu'].substring(0,10);
		var vmid = arr_ckdgabmapClean[listloadpage]['vmid'];
		var stPrinter = arr_ckdgabmapClean[listloadpage]['stPrinter'];
		var stBa = arr_ckdgabmapClean[listloadpage]['stBa'];
		var stCd = arr_ckdgabmapClean[listloadpage]['stCd'];
		var stReader = arr_ckdgabmapClean[listloadpage]['stReader'];
		var stUps = arr_ckdgabmapClean[listloadpage]['stUps'];
		var latitude = arr_ckdgabmapClean[listloadpage]['latitude'];
		var longtitude = arr_ckdgabmapClean[listloadpage]['longtitude'];
		var keterangan;
		if(stPrinter == "00" && stBa == "00" && stCd == "00" && stReader == "00" && stUps == "00"){
			keterangan = '<td style="text-align:center; background-color:green; color:#ffffff;">Mesin Sehat</td>'
		}else{
			keterangan = '<td style="text-align:center; background-color:red; color:#ffffff;">Mesin Butuh Perbaikan</td>';
		}

		test_tablebody.innerHTML += '<tr>'+
			'<td style="text-align:center;">'+listdari1+'</td>'+
			'<td style="text-align:center;">'+waktu+'</td>'+
			'<td style="text-align:center;">'+vmid+'</td>'+
			'<td style="text-align:center;">'+stPrinter+'</td>'+
			'<td style="text-align:center;">'+stBa+'</td>'+
			'<td style="text-align:center;">'+stCd+'</td>'+
			'<td style="text-align:center;">'+stReader+'</td>'+
			'<td style="text-align:center;">'+stUps+'</td>'+
			keterangan+
			'<td style="text-align:center;"><button class="btn btn-primary" onClick="buttonMARKERMAP('+latitude+','+longtitude+')">lokasi</button></td>'+
		'</tr>';
	}
	// console.log(arr_ckdgabmapClean);
	

}

$(document).ready(function() {
	
	var body_table_clickmap = document.getElementById('SKVM_bgMargin');
	body_table_clickmap.innerHTML =
		
		'<div id="data1load" class="col-sm-12 pt-2">'+
			'<span><h5>Data Harian Seluruh VM Hari Ini</h5></span>'+
		'</div>'+
		'<div class="col-sm-12">'+
			'<table id="t-table" class="table table-bordered" style="width:100%">'+
				'<thead id="test-tablehead" style="background-color:#2ac0ca;">'+
					'<tr>'+
						'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">No</th>'+
						'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Tanggal</th>'+
						'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Mesin</th>'+
						'<th scope="col" colspan="5" style="vertical-align : middle;text-align:center;">Device Status</th>'+
						'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Keterangan</th>'+
						'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Histori Mesin</th>'+

					'</tr>'+
					'<tr>'+
						'<th scope="col"  style="vertical-align : middle;text-align:center;">PRN</th>'+
						'<th scope="col"  style="vertical-align : middle;text-align:center;">BA</th>'+
						'<th scope="col"  style="vertical-align : middle;text-align:center;">CD</th>'+
						'<th scope="col"  style="vertical-align : middle;text-align:center;">RDR</th>'+
						'<th scope="col"  style="vertical-align : middle;text-align:center;">UPS</th>'+
					'</tr>'+

				'</thead>'+
				'<tbody id="test-tablebody">'+
					/* '<tr>'+
						'<td style="text-align:center;">2020-01-01</td>'+
						'<td style="text-align:center;">bb001</td>'+
						'<td style="text-align:center;">00</td>'+
						'<td style="text-align:center;">00</td>'+
						'<td style="text-align:center;">00</td>'+
						'<td style="text-align:center;">ff</td>'+
						'<td style="text-align:center;">ff</td>'+
						'<td style="text-align:center;">butuh perbaikan</td>'+
						'<td style="text-align:center;">lokasi</td>'+
					'</tr>'+ */
				'</tbody>'+
				'<tfoot id="test-tablefoot">'+
				'</tfoot>'+
			'</table>'+
		'</div>'
	;


	var datepicker1 = document.getElementById('datepicker1');
	var datepicker2 = document.getElementById('datepicker2');

	datepicker1.value = convertDate(new Date());
	datepicker2.value = convertDate(new Date());

	var url_map = loadnotLimitAPI("http://27.111.44.44/mobile/Percobaan2/mapVM1");
	(async () => {
		// var ckd_kai = await testing();
		mainLoad();
		testingmap(await url_map);
		// var url_ckd_KAI = await loadLimitAPI("http://27.111.44.42/Percobaan2/get_allckdvmKAI1/",1,15000);
		// var url_ckd_MAN = await loadLimitAPI("http://27.111.44.44/mobile/Percobaan2/get_allckdvmMAN1/",1,10000);
		// var url_map = await loadnotLimitAPI("http://27.111.44.44/mobile/Percobaan2/mapVM1");

			
		// var getDuplicate = await getUnique(ckd_kai,'vmid');
		// console.log('getDuplicate',getDuplicate);
		
		// await console.log('same',ckd_kai);
		// await console.log('map', map);
	})();

	/*  // Percobaan async
		const getUser = async (name) => {
			const account = name;
			return account;
		};
		(async () => {
		const myUser = await getUser('andrew');
		document.write('my',myUser);
		})(); 
	*/
});








