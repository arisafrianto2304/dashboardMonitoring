
var d = new Date();
           var currMonth = d.getMonth();
           var currYear = d.getFullYear();
		   var startDate = new Date(currYear, currMonth, 1);
		   
$('#datepicker1').datepicker({
	uiLibrary: 'bootstrap4',
	format: "yyyy-mm-dd",
});


$('#datepicker2').datepicker({
	uiLibrary: 'bootstrap4',
	format: "yyyy-mm-dd",

});
// $('#bulanpicker').datepicker({
// 	uiLibrary: 'bootstrap4',
// 	format: "mm-yyyy",
//     viewMode: "months", 
//     minViewMode: "months"
// });

function waktuCompare(a,b) {
	if( a.waktu < b.waktu){
		return -1;
	}
	if( a.waktu > b.waktu){
		return 1;
	}
	return 0;
}

async function get(url_api) {
    let url = url_api;
    let obj = await (await fetch(url)).json();
    
    //console.log(obj);
    return obj;
}


// transfersi RUPIAH
function rubah(angka){
	var reverse = angka.toString().split('').reverse().join(''),
	ribuan = reverse.match(/\d{1,3}/g);
	ribuan = ribuan.join('.').split('').reverse().join('');
	return ribuan;
}
function rubahkenol(angka){
	var hilang = angka.replace(/[^\w\s]/gi, '');
	return hilang;
}

// remove duplicated
function removeDuplicates(originalArray, prop) {
	var newArray = [];
	var lookupObject  = {};

	for(var i in originalArray) {
	   lookupObject[originalArray[i][prop]] = originalArray[i];
	}

	for(i in lookupObject) {
		newArray.push(lookupObject[i]);
	}
	 return newArray;
}

function trx_show(){
	var vm_group_testing = document.getElementById('vm_group');
	var vm_location_testing = document.getElementById('vm_location');
	var vm_locationtr_testing = document.getElementById('tr_vmlocation');
	var vm_satu_testing = document.getElementById('vm_satu');


	// var vm_satu_testing = document.getElementById('vm_satu');
	if(vm_group_testing.options[vm_group_testing.selectedIndex].text == 'KAI'){
		vm_locationtr_testing.style.display = 'block';
		vm_satu_testing.innerHTML = '<option value="All">All</option>';
		var vm_satu_kai = vm_location_testing.options[vm_location_testing.selectedIndex].text;
		$.ajax({
			url: "http://27.111.44.42/Percobaan2/get_vmlokasi",
			success: function (jdata) {
				jsonData=jdata;
				vm_location_testing.innerHTML = '<option value="All">All</option>';
				for(a in jsonData ){
					vm_location_testing.innerHTML += '<option value="'+jsonData[a]['location_name']+'">'+jsonData[a]['location_name']+'</option>';
					
				}
				
			}
		});
	}
	else if(vm_group_testing.options[vm_group_testing.selectedIndex].text != 'KAI'){
		var valueselainkai = vm_group_testing.options[vm_group_testing.selectedIndex].text;
		vm_locationtr_testing.style.display = 'none';
		vm_location_testing.innerHTML = '<option value="Null" selected>Null</option>';
		$.ajax({
			method: "get",
			dataType: "json",
			url: "http://27.111.44.44/mobile/Percobaan2/get_vmlokasinamegroup/"+valueselainkai,
			success: function (jdata) {
				jsonData=jdata;
				vm_satu_testing.innerHTML = '<option value="All">All</option>';
				for(a in jsonData ){
					vm_satu_testing.innerHTML += '<option value="'+jsonData[a]['terminal_id']+'">'+jsonData[a]['terminal_id']+'</option>';
				}
			}
		});
		//vm_location_testing.innerHTML = '<option value="'+jsonData[a]['location_name']+'">'+jsonData[a]['location_name']+'</option>';
	}
}

function perVM_KAI(){
	var vm_location_testing = document.getElementById('vm_location');
	var vm_satu_testing = document.getElementById('vm_satu');
	var valuelocation = vm_location_testing.options[vm_location_testing.selectedIndex].text;
	$.ajax({
		method: "get",
		dataType: "json",
		url: "http://27.111.44.42/Percobaan2/get_vmlokasi_vmname/"+valuelocation,
		success: function (jdata) {
			jsonData=jdata;
			vm_satu_testing.innerHTML = '<option value="All">All</option>';
			// console.log(jsonData);
			for(a in jsonData ){
				// if(jsonData[a]['location_name'] == vmsatu ){
					vm_satu_testing.innerHTML += '<option value="'+jsonData[a]['terminal_id']+'">'+jsonData[a]['terminal_id']+'</option>';
				// }
				
			}
		}
	});
}

function option_Periode(){
	var vm_periode = document.getElementById('vm_periode');
	var tr_periode_tanggal = document.getElementById('tr_periode_tanggal');
	var tr_periode_bulan = document.getElementById('tr_periode_bulan');
	var tr_periode_tahun = document.getElementById('tr_periode_tahun');

	var vm_periode_val = vm_periode.options[vm_periode.selectedIndex].value;
	if(vm_periode_val == 'bulan'){
		tr_periode_tanggal.style.display = 'none';
		tr_periode_bulan.style.display = 'block';
		tr_periode_tahun.style.display = 'none';
	}else if(vm_periode_val == 'harian'){
		tr_periode_tanggal.style.display = 'block';
		tr_periode_bulan.style.display = 'none';
		tr_periode_tahun.style.display = 'none';
	}else if(vm_periode_val == 'tahun'){
		tr_periode_tanggal.style.display = 'none';
		tr_periode_bulan.style.display = 'none';
		tr_periode_tahun.style.display = 'block';
	}
}

function grafikchart(datashow){
	
	var lishow = datashow;
	var tampilkanchart = document.getElementById('tampilkanchart');
	tampilkanchart.style.display = 'block';
	var chartGrafik = [];
	console.log('lishowa', lishow);

	var reduced = lishow.reduce(function(allDates, date) {
		if (allDates.some(function(e) {
			return e.waktu === date.waktu
		})) {
		allDates.filter(function(e) {
			return e.waktu === date.waktu
		})[0].trx += +date.trx
		} else {
		allDates.push({
			waktu: date.waktu,
			trx: +date.trx
		})
		}
		return allDates
	}, []);
	
	console.log('reduced',reduced);

	for(x = 0; x<reduced.length; x++){
		chartGrafik.push(
			[new Date(reduced[x]['waktu']).getTime(), Number(reduced[x]['trx'])]
		);
	}
	console.log('chartGrafik',chartGrafik);
	
	// var zoomButton;
	Highcharts.stockChart('tampilkanchart', {
		
		chart:{
			
			// type:'line',
			// zoomType: 'x',
			event:{
				load:function(){
					
				}
			},
		},
		
		
		credits: {
			enabled: false
		  },
		  rangeSelector: {
			buttons: [/* {
				type: 'day',
				count: 1,
				text: '1D',
				
			}, */
			{
				type: 'week',
				count: 1,
				text: '1B'
			},
			{
				type: 'month',
				count: 3,
				text: '3B'
			},
			{
				type: 'month',
				count: 6,
				text: '6B'
			},
			{
				type: 'year',
				count: 1,
				text: '1T'
			},
			{
				type: 'all',
				text: 'Semua'
			}],
			selected:2,
			inputEnabled:false
		},
		xAxis: {
			type: 'datetime'
		  },
		  
		title: {
			text: ''
		},
		/* plotOptions: {
			series: {
				lineWidth: 1
			}
		}, */

		exporting: { 
			enabled: false 
		},
		
		series: [{
			
			name: 'Grafik Data',
			data: chartGrafik,
			type: 'column',
			dataGrouping: {
				enabled: false
			}
		}]
	});
}




function sendMyAjax(URL_address){
	$.ajax({
		 type: 'POST',
		 url: URL_address,
		 success: function (result) {
		 }
	 });
};


// select data hari ini
function new_today(){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today = yyyy + '-' + mm + '-' + dd;
	return today;
}

function today(tgl_awal_hariini,tgl_akhir_hariini){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today = yyyy + '-' + mm + '-' + dd;


	var today1 = new Date();
	var dd1 = String(today1.getDate()+1).padStart(2, '0');
	var mm1 = String(today1.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy1 = today1.getFullYear();
	today1 = yyyy1 + '-' + mm1 + '-' + dd1;
		

	if(tgl_akhir_hariini == today && tgl_awal_hariini == today ){
		tgl_akhir_hariini = today1;

		// console.log('dalem if',tgl_awal_hariini, tgl_akhir_hariini);	
		
		
	}else if(tgl_awal_hariini != today && tgl_akhir_hariini == today){
		tgl_akhir_hariini = today1;
	}
	console.log('luar if',tgl_awal_hariini +' '+ tgl_akhir_hariini);
		return tgl_akhir_hariini;
	
}


function tabletampil(){
	var test_table1 = document.getElementById('test-table');
	test_table1.style.display = 'block';
	var test_table = document.getElementById('test-tabletabled');
	var vm_group_testing = document.getElementById('vm_group');

	var vm_location_testing = document.getElementById('vm_location');
	var vm_satu_testing = document.getElementById('vm_satu');

	var tgl_awal = document.getElementById('datepicker1');
	var tgl_akhir = document.getElementById('datepicker2');
	var tgl_awal_val = tgl_awal.value;
	var tgl_akhir_val = tgl_akhir.value;

	var tampilkanchart = document.getElementById('tampilkanchart');
	
	var lokasi = vm_location_testing.options[vm_location_testing.selectedIndex].text;
	var vm_satu = vm_satu_testing.options[vm_satu_testing.selectedIndex].text;

	var vm_periode = document.getElementById('vm_periode');
	var vm_periode_bulan = document.getElementById('vm_periode_bulan');
	var vm_periodetahun = document.getElementById('vm_periodetahun');
	// vm_periode = vm_periode.options[vm_periode.selectedIndex].text
	

	var test_tablebody = document.getElementById('test-tablebody');
	var test_tablefoot = document.getElementById('test-tablefoot');
	if(vm_group_testing.options[vm_group_testing.selectedIndex].text == 'All' ){
		if(vm_periode.options[vm_periode.selectedIndex].value == 'harian'){
			test_table.innerHTML = 
				'<thead id="test-tablehead">'+
					'<tr>'+
						'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Tanggal</th>'+
						'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">KAI</th>'+
						'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Topup</th>'+
						'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Card</th>'+
						'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Total</th>'+
					'</tr>'+
					'<tr>'+
						'<th style="text-align:center;">Trx</th>'+
						'<th style="text-align:center;">Amount</th>'+
						'<th style="text-align:center;">Trx</th>'+
						'<th style="text-align:center;">Amount</th>'+
						'<th style="text-align:center;">Trx</th>'+
						'<th style="text-align:center;">Amount</th>'+
						'<th style="text-align:center;">Trx</th>'+
						'<th style="text-align:center;">Amount</th>'+
					'</tr>'+
				'</thead>'+
				'<tbody id="test-tablebody">'+
				'</tbody>'+
				'<tfoot id="test-tablefoot">'+
				'</tfoot>';

				tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);
				var test_tablebody = document.getElementById('test-tablebody');
				var test_tablefoot = document.getElementById('test-tablefoot');
			(async () => {
				var result_KAI = await get('http://27.111.44.42/Percobaan2/get_trxallkai/'+tgl_awal_val+'/'+tgl_akhir_val);
				var result_Mtopup = await get('http://27.111.44.44/mobile/Percobaan2/get_trxalltopup/'+tgl_awal_val+'/'+tgl_akhir_val);
				var result_Mcard = await get('http://27.111.44.44/mobile/Percobaan2/get_trxallcard/'+tgl_awal_val+'/'+tgl_akhir_val);
				console.log('result_KAI',result_KAI);
				// var temp_result = ;
				console.log('result_Mtopup',result_Mtopup);
				console.log('result_Mcard',result_Mcard);
				var selisihtgl = Math.floor(( Date.parse(tgl_akhir_val) - Date.parse(tgl_awal_val) ) / 86400000);
				for(a in result_Mtopup){
					if(typeof result_KAI !== 'undefined'){
						result_KAI.push({
							waktu: result_Mtopup[a]['waktu'],
							trx: Number(0),
							amount: Number(0)
						})
					}
				}

				var kai = result_KAI.reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].trx += +date.trx
					}if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					} else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);
				console.log('testing kai',kai);
				var mtopup = result_Mtopup.reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);
				console.log('testing kai',mtopup );
				var mcard = result_Mcard.reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);

				// penjumlahan berdasarkan tanggal
				kai.sort(waktuCompare);
				mtopup.sort(waktuCompare);
				mcard.sort(waktuCompare);
				var temp_tgl= [...kai, ...mtopup, ...mcard];
				temp_tgl = temp_tgl.reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);

				console.log(kai);
				console.log(mtopup);
				console.log(mcard);

				var temp_final_mcard = [];
				var temp_final_mtopup = [];
				var temp_final_kai = [];
				for(tglx in temp_tgl){
					for(tglu in mcard){
						if(temp_tgl[tglx]['waktu'] == mcard[tglu]['waktu'] ){
							temp_final_mcard.push({
								waktu: (temp_tgl[tglx]['waktu']),
								trx: mcard[tglu]['trx'],
								amount: mcard[tglu]['amount']
							});
						}else if(temp_tgl[tglx]['waktu'] != mcard[tglu]['waktu']){
							temp_final_mcard.push({
								waktu: (temp_tgl[tglx]['waktu']),
								trx: 0,
								amount: 0
							});
						}else if(mcard[tglu]['waktu'] != new_today()){
							temp_final_mcard.push({
								waktu: (new_today()),
								trx: 0,
								amount: 0
							});
						}else {
							temp_final_mcard.push({
								waktu: (new_today()),
								trx: 0,
								amount: 0
							});
						}
					}
					for(tglv in mtopup){
						if(temp_tgl[tglx]['waktu'] == mtopup[tglv]['waktu'] ){
							temp_final_mtopup.push({
								waktu: (temp_tgl[tglx]['waktu']),
								trx: mtopup[tglv]['trx'],
								amount: mtopup[tglv]['amount']
							});
						}else if(temp_tgl[tglx]['waktu'] != mtopup[tglv]['waktu']){
							temp_final_mtopup.push({
								waktu: (temp_tgl[tglx]['waktu']),
								trx: 0,
								amount: 0
							});
						}else{
							temp_final_mtopup.push({
								waktu: (new_today()),
								trx: 0,
								amount: 0
							});
						}
					}
					
					for(tglt in kai){
						if(temp_tgl[tglx]['waktu'] == kai[tglt]['waktu'] ){
							temp_final_kai.push({
								waktu: (temp_tgl[tglx]['waktu']),
								trx: kai[tglt]['trx'],
								amount: kai[tglt]['amount']
							});
						}else if(temp_tgl[tglx]['waktu'] != kai[tglt]['waktu'] ){
							temp_final_kai.push({
								waktu: (temp_tgl[tglt]['waktu']),
								trx: 0,
								amount: 0
							});
						}
						else{
							temp_final_kai.push({
								waktu: (new_today()),
								trx: 0,
								amount: 0
							});
						}
					}
				}
				console.log('tgl', temp_tgl);
				console.log(temp_final_mcard);
				console.log(temp_final_mtopup);

				
				temp_final_mcard = temp_final_mcard.sort(waktuCompare).reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);
				temp_final_mtopup = temp_final_mtopup.sort(waktuCompare).reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);
				temp_final_kai = temp_final_kai.sort(waktuCompare).reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);

				var temp_final_pertanggal = [...temp_final_mcard, ...temp_final_mtopup, ...temp_final_kai]
				temp_final_pertanggal = temp_final_pertanggal.reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);


				console.log('card_clean topup',temp_final_mtopup);
				console.log('card_clean card',temp_final_mcard);
				console.log('temp_final_kai',temp_final_kai);
				console.log('temp_final_pertanggal',temp_final_pertanggal);
				

				// console.log('temp_final_c',temp_final_c);
				/* var result = [...result_KAI, ...result_Mtopup, ...result_Mcard]; */
				for(x in temp_tgl){
					test_tablebody.innerHTML += '<tr>'+
						'<td style="text-align:center;">'+temp_tgl[x]['waktu']+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_kai[x]['trx'])+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_kai[x]['amount']) +'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['trx'])+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['amount'])+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_mcard[x]['trx'])+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_mcard[x]['amount'])+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['trx'] )+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['amount']) +'</td>'+
					'</tr>';
				}

				var sum_kaitrx = 0;
				var sum_kaiamount = 0;
				var sum_emonttrx = 0;
				var sum_emonttamount = 0;
				var sum_emontctrx = 0;
				var sum_emontcamount = 0;
				var sum_totaltrx = 0;
				var sum_totalamount = 0;
				for(var t = 0; t < test_tablebody.rows.length; t++){
					sum_kaitrx = sum_kaitrx + parseInt(test_tablebody.rows[t].cells[1].innerHTML.replace(/\./g, ""));
					sum_kaiamount = sum_kaiamount + parseInt(test_tablebody.rows[t].cells[2].innerHTML.replace(/\./g, ""));
					sum_emonttrx = sum_emonttrx + parseInt(test_tablebody.rows[t].cells[3].innerHTML.replace(/\./g, ""));
					sum_emonttamount = sum_emonttamount + parseInt(test_tablebody.rows[t].cells[4].innerHTML.replace(/\./g, ""));
					sum_emontctrx = sum_emontctrx + parseInt(test_tablebody.rows[t].cells[5].innerHTML.replace(/\./g, ""));
					sum_emontcamount = sum_emontcamount + parseInt(test_tablebody.rows[t].cells[6].innerHTML.replace(/\./g, ""));
					sum_totaltrx = sum_totaltrx + parseInt(test_tablebody.rows[t].cells[7].innerHTML.replace(/\./g, ""));
					sum_totalamount = sum_totalamount + parseInt(test_tablebody.rows[t].cells[8].innerHTML.replace(/\./g, ""));
				}

				console.log(sum_kaitrx);
				test_tablefoot.innerHTML += '<tr>'+
					'<td style="text-align:left;"><b>Total</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_kaitrx)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_kaiamount)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_emonttrx)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_emonttamount)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_emontctrx)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_emontcamount)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_totaltrx)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_totalamount)+'</b></td>'+
				'</tr>';

				grafikchart(temp_final_pertanggal);
			})();
		}else if(vm_periode.options[vm_periode.selectedIndex].value == 'bulan'){
			vm_periode_bulan = vm_periode_bulan.value;
			test_table.innerHTML = 
				'<thead id="test-tablehead">'+
					'<tr>'+
						'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Tanggal</th>'+
						'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">KAI</th>'+
						'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Topup</th>'+
						'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Card</th>'+
						'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Total</th>'+
					'</tr>'+
					'<tr>'+
						'<th style="text-align:center;">Trx</th>'+
						'<th style="text-align:center;">Amount</th>'+
						'<th style="text-align:center;">Trx</th>'+
						'<th style="text-align:center;">Amount</th>'+
						'<th style="text-align:center;">Trx</th>'+
						'<th style="text-align:center;">Amount</th>'+
						'<th style="text-align:center;">Trx</th>'+
						'<th style="text-align:center;">Amount</th>'+
					'</tr>'+
				'</thead>'+
				'<tbody id="test-tablebody">'+
				'</tbody>'+
				'<tfoot id="test-tablefoot">'+
				'</tfoot>';

				var test_tablebody = document.getElementById('test-tablebody');
				var test_tablefoot = document.getElementById('test-tablefoot');
			(async () => {
				var result_KAI = await get('http://27.111.44.42/Percobaan2/get_allmonthkai/'+vm_periode_bulan);
				var result_Mtopup1 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopup/'+vm_periode_bulan+'/0/15000');
				var result_Mtopup2 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopup/'+vm_periode_bulan+'/15000/15000');
				var result_Mtopup3 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopup/'+vm_periode_bulan+'/30000/15000');
				var result_Mtopup4 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopup/'+vm_periode_bulan+'/45000/15000');
				// var result_Mtopup3 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopup/'+vm_periode_bulan+'/45000/15000');
				var result_Mtopup = [...result_Mtopup1, ...result_Mtopup2, ...result_Mtopup3, ...result_Mtopup4]
				var result_Mcard = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthcard/'+vm_periode_bulan);
				console.log('result_KAI',result_KAI);
				// var temp_result = ;
				console.log('result_Mtopup',result_Mtopup);
				console.log('result_Mcard',result_Mcard);
				var selisihtgl = Math.floor(( Date.parse(tgl_akhir_val) - Date.parse(tgl_awal_val) ) / 86400000);
				
				for(a in result_Mtopup){
					if(typeof result_KAI !== 'undefined'){
						result_KAI.push({
							waktu: result_Mtopup[a]['waktu'],
							trx: Number(0),
							amount: Number(0)
						})
					}
				}


				var kai = result_KAI.reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].trx += +date.trx
					}if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					} else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);
				console.log('testing kai',kai);
				var mtopup = result_Mtopup.reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);
				console.log('testing kai',mtopup );
				var mcard = result_Mcard.reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);

				// penjumlahan berdasarkan tanggal
				kai.sort(waktuCompare);
				mtopup.sort(waktuCompare);
				mcard.sort(waktuCompare);
				var temp_tgl= [...kai, ...mtopup, ...mcard];
				temp_tgl = temp_tgl.reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);

				console.log(kai);
				console.log(mtopup);
				console.log(mcard);

				var temp_final_mcard = [];
				var temp_final_mtopup = [];
				var temp_final_kai = [];
				for(tglx in temp_tgl){
					for(tglu in mcard){
						if(temp_tgl[tglx]['waktu'] == mcard[tglu]['waktu'] ){
							temp_final_mcard.push({
								waktu: (temp_tgl[tglx]['waktu']),
								trx: mcard[tglu]['trx'],
								amount: mcard[tglu]['amount']
							});
						}else if(temp_tgl[tglx]['waktu'] != mcard[tglu]['waktu']){
							temp_final_mcard.push({
								waktu: (temp_tgl[tglx]['waktu']),
								trx: 0,
								amount: 0
							});
						}else if(mcard[tglu]['waktu'] != new_today()){
							temp_final_mcard.push({
								waktu: (new_today()),
								trx: 0,
								amount: 0
							});
						}else {
							temp_final_mcard.push({
								waktu: (new_today()),
								trx: 0,
								amount: 0
							});
						}
					}
					for(tglv in mtopup){
						if(temp_tgl[tglx]['waktu'] == mtopup[tglv]['waktu'] ){
							temp_final_mtopup.push({
								waktu: (temp_tgl[tglx]['waktu']),
								trx: mtopup[tglv]['trx'],
								amount: mtopup[tglv]['amount']
							});
						}else if(temp_tgl[tglx]['waktu'] != mtopup[tglv]['waktu']){
							temp_final_mtopup.push({
								waktu: (temp_tgl[tglx]['waktu']),
								trx: 0,
								amount: 0
							});
						}else{
							temp_final_mtopup.push({
								waktu: (new_today()),
								trx: 0,
								amount: 0
							});
						}
					}
					
					for(tglt in kai){
						if(temp_tgl[tglx]['waktu'] == kai[tglt]['waktu'] ){
							temp_final_kai.push({
								waktu: (temp_tgl[tglx]['waktu']),
								trx: kai[tglt]['trx'],
								amount: kai[tglt]['amount']
							});
						}else if(temp_tgl[tglx]['waktu'] != kai[tglt]['waktu'] ){
							temp_final_kai.push({
								waktu: (temp_tgl[tglt]['waktu']),
								trx: 0,
								amount: 0
							});
						}
						else{
							temp_final_kai.push({
								waktu: (new_today()),
								trx: 0,
								amount: 0
							});
						}
					}
				}
				console.log('tgl', temp_tgl);
				console.log(temp_final_mcard);
				console.log(temp_final_mtopup);

				
				temp_final_mcard = temp_final_mcard.sort(waktuCompare).reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);
				temp_final_mtopup = temp_final_mtopup.sort(waktuCompare).reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);
				temp_final_kai = temp_final_kai.sort(waktuCompare).reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);

				var temp_final_pertanggal = [...temp_final_mcard, ...temp_final_mtopup, ...temp_final_kai]
				temp_final_pertanggal = temp_final_pertanggal.reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);


				console.log('card_clean topup',temp_final_mtopup);
				console.log('card_clean card',temp_final_mcard);
				console.log('temp_final_kai',temp_final_kai);
				console.log('temp_final_pertanggal',temp_final_pertanggal);
				

				// console.log('temp_final_c',temp_final_c);
				/* var result = [...result_KAI, ...result_Mtopup, ...result_Mcard]; */
				for(x in temp_tgl){
					test_tablebody.innerHTML += '<tr>'+
						'<td style="text-align:center;">'+temp_tgl[x]['waktu']+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_kai[x]['trx'])+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_kai[x]['amount']) +'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['trx'])+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['amount'])+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_mcard[x]['trx'])+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_mcard[x]['amount'])+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['trx'] )+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['amount']) +'</td>'+
					'</tr>';
				}

				var sum_kaitrx = 0;
				var sum_kaiamount = 0;
				var sum_emonttrx = 0;
				var sum_emonttamount = 0;
				var sum_emontctrx = 0;
				var sum_emontcamount = 0;
				var sum_totaltrx = 0;
				var sum_totalamount = 0;
				for(var t = 0; t < test_tablebody.rows.length; t++){
					sum_kaitrx = sum_kaitrx + parseInt(test_tablebody.rows[t].cells[1].innerHTML.replace(/\./g, ""));
					sum_kaiamount = sum_kaiamount + parseInt(test_tablebody.rows[t].cells[2].innerHTML.replace(/\./g, ""));
					sum_emonttrx = sum_emonttrx + parseInt(test_tablebody.rows[t].cells[3].innerHTML.replace(/\./g, ""));
					sum_emonttamount = sum_emonttamount + parseInt(test_tablebody.rows[t].cells[4].innerHTML.replace(/\./g, ""));
					sum_emontctrx = sum_emontctrx + parseInt(test_tablebody.rows[t].cells[5].innerHTML.replace(/\./g, ""));
					sum_emontcamount = sum_emontcamount + parseInt(test_tablebody.rows[t].cells[6].innerHTML.replace(/\./g, ""));
					sum_totaltrx = sum_totaltrx + parseInt(test_tablebody.rows[t].cells[7].innerHTML.replace(/\./g, ""));
					sum_totalamount = sum_totalamount + parseInt(test_tablebody.rows[t].cells[8].innerHTML.replace(/\./g, ""));
				}

				console.log(sum_kaitrx);
				test_tablefoot.innerHTML += '<tr>'+
					'<td style="text-align:left;"><b>Total</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_kaitrx)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_kaiamount)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_emonttrx)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_emonttamount)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_emontctrx)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_emontcamount)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_totaltrx)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_totalamount)+'</b></td>'+
				'</tr>';

				grafikchart(temp_final_pertanggal);
			})();
		}else if(vm_periode.options[vm_periode.selectedIndex].value == 'tahun'){
			vm_periodetahun = vm_periodetahun.value;
			test_table.innerHTML = 
				'<thead id="test-tablehead">'+
					'<tr>'+
						'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Tanggal</th>'+
						'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">KAI</th>'+
						'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Topup</th>'+
						'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Card</th>'+
						'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Total</th>'+
					'</tr>'+
					'<tr>'+
						'<th style="text-align:center;">Trx</th>'+
						'<th style="text-align:center;">Amount</th>'+
						'<th style="text-align:center;">Trx</th>'+
						'<th style="text-align:center;">Amount</th>'+
						'<th style="text-align:center;">Trx</th>'+
						'<th style="text-align:center;">Amount</th>'+
						'<th style="text-align:center;">Trx</th>'+
						'<th style="text-align:center;">Amount</th>'+
					'</tr>'+
				'</thead>'+
				'<tbody id="test-tablebody">'+
				'</tbody>'+
				'<tfoot id="test-tablefoot">'+
				'</tfoot>';

				var test_tablebody = document.getElementById('test-tablebody');
				var test_tablefoot = document.getElementById('test-tablefoot');
			(async () => {
				var result_KAI = await get('http://27.111.44.42/Percobaan2/get_allyearkai/'+vm_periodetahun);
				var result_Mtopup1 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopup/'+vm_periodetahun+'/0/50000');
				var result_Mtopup2 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopup/'+vm_periodetahun+'/50000/50000');
				var result_Mtopup3 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopup/'+vm_periodetahun+'/100000/50000');
				var result_Mtopup4 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopup/'+vm_periodetahun+'/150000/50000');
				var result_Mtopup5 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopup/'+vm_periodetahun+'/200000/50000');
				var result_Mtopup6 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopup/'+vm_periodetahun+'/250000/50000');
				var result_Mtopup7 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopup/'+vm_periodetahun+'/300000/50000');
				var result_Mtopup8 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopup/'+vm_periodetahun+'/350000/50000');
				var result_Mtopup9 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopup/'+vm_periodetahun+'/400000/50000');
				var result_Mtopup10 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopup/'+vm_periodetahun+'/450000/50000');
				var result_Mtopup11 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopup/'+vm_periodetahun+'/500000/50000');
				var result_Mtopup12 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopup/'+vm_periodetahun+'/550000/50000');
				var result_Mtopup = [...result_Mtopup1, ...result_Mtopup2, ...result_Mtopup3, ...result_Mtopup4, ...result_Mtopup5, ...result_Mtopup6, 
									...result_Mtopup7, ...result_Mtopup8, ...result_Mtopup9, ...result_Mtopup10, ...result_Mtopup11, ...result_Mtopup12]
				
				var result_Mcard = await get('http://27.111.44.44/mobile/Percobaan2/get_allyearcard/'+vm_periodetahun);
				console.log('result_KAI',result_KAI);
				// var temp_result = ;
				console.log('result_Mtopup',result_Mtopup);
				console.log('result_Mcard',result_Mcard);
				var selisihtgl = Math.floor(( Date.parse(tgl_akhir_val) - Date.parse(tgl_awal_val) ) / 86400000);
				
				for(a in result_Mtopup){
					if(typeof result_KAI !== 'undefined'){
						result_KAI.push({
							waktu: result_Mtopup[a]['waktu'],
							trx: Number(0),
							amount: Number(0)
						})
					}
				}

				var kai = result_KAI.reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].trx += +date.trx
					}if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					} else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);
				console.log('testing kai',kai);
				var mtopup = result_Mtopup.reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);
				console.log('testing kai',mtopup );
				var mcard = result_Mcard.reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);

				// penjumlahan berdasarkan tanggal
				kai.sort(waktuCompare);
				mtopup.sort(waktuCompare);
				mcard.sort(waktuCompare);
				var temp_tgl= [...kai, ...mtopup, ...mcard];
				temp_tgl = temp_tgl.reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);

				console.log(kai);
				console.log(mtopup);
				console.log(mcard);

				var temp_final_mcard = [];
				var temp_final_mtopup = [];
				var temp_final_kai = [];
				for(tglx in temp_tgl){
					for(tglu in mcard){
						if(temp_tgl[tglx]['waktu'] == mcard[tglu]['waktu'] ){
							temp_final_mcard.push({
								waktu: (temp_tgl[tglx]['waktu']),
								trx: mcard[tglu]['trx'],
								amount: mcard[tglu]['amount']
							});
						}else if(temp_tgl[tglx]['waktu'] != mcard[tglu]['waktu']){
							temp_final_mcard.push({
								waktu: (temp_tgl[tglx]['waktu']),
								trx: 0,
								amount: 0
							});
						}else if(mcard[tglu]['waktu'] != new_today()){
							temp_final_mcard.push({
								waktu: (new_today()),
								trx: 0,
								amount: 0
							});
						}else {
							temp_final_mcard.push({
								waktu: (new_today()),
								trx: 0,
								amount: 0
							});
						}
					}
					for(tglv in mtopup){
						if(temp_tgl[tglx]['waktu'] == mtopup[tglv]['waktu'] ){
							temp_final_mtopup.push({
								waktu: (temp_tgl[tglx]['waktu']),
								trx: mtopup[tglv]['trx'],
								amount: mtopup[tglv]['amount']
							});
						}else if(temp_tgl[tglx]['waktu'] != mtopup[tglv]['waktu']){
							temp_final_mtopup.push({
								waktu: (temp_tgl[tglx]['waktu']),
								trx: 0,
								amount: 0
							});
						}else{
							temp_final_mtopup.push({
								waktu: (new_today()),
								trx: 0,
								amount: 0
							});
						}
					}
					
					for(tglt in kai){
						if(temp_tgl[tglx]['waktu'] == kai[tglt]['waktu'] ){
							temp_final_kai.push({
								waktu: (temp_tgl[tglx]['waktu']),
								trx: kai[tglt]['trx'],
								amount: kai[tglt]['amount']
							});
						}else if(temp_tgl[tglx]['waktu'] != kai[tglt]['waktu'] ){
							temp_final_kai.push({
								waktu: (temp_tgl[tglt]['waktu']),
								trx: 0,
								amount: 0
							});
						}
						else{
							temp_final_kai.push({
								waktu: (new_today()),
								trx: 0,
								amount: 0
							});
						}
					}
				}
				console.log('tgl', temp_tgl);
				console.log(temp_final_mcard);
				console.log(temp_final_mtopup);

				
				temp_final_mcard = temp_final_mcard.sort(waktuCompare).reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);
				temp_final_mtopup = temp_final_mtopup.sort(waktuCompare).reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);
				temp_final_kai = temp_final_kai.sort(waktuCompare).reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);

				var temp_final_pertanggal = [...temp_final_mcard, ...temp_final_mtopup, ...temp_final_kai]
				temp_final_pertanggal = temp_final_pertanggal.reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);


				console.log('card_clean topup',temp_final_mtopup);
				console.log('card_clean card',temp_final_mcard);
				console.log('temp_final_kai',temp_final_kai);
				console.log('temp_final_pertanggal',temp_final_pertanggal);
				

				// console.log('temp_final_c',temp_final_c);
				/* var result = [...result_KAI, ...result_Mtopup, ...result_Mcard]; */
				for(x in temp_tgl){
					test_tablebody.innerHTML += '<tr>'+
						'<td style="text-align:center;">'+temp_tgl[x]['waktu']+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_kai[x]['trx'])+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_kai[x]['amount']) +'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['trx'])+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['amount'])+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_mcard[x]['trx'])+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_mcard[x]['amount'])+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['trx'] )+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['amount']) +'</td>'+
					'</tr>';
				}

				var sum_kaitrx = 0;
				var sum_kaiamount = 0;
				var sum_emonttrx = 0;
				var sum_emonttamount = 0;
				var sum_emontctrx = 0;
				var sum_emontcamount = 0;
				var sum_totaltrx = 0;
				var sum_totalamount = 0;
				for(var t = 0; t < test_tablebody.rows.length; t++){
					sum_kaitrx = sum_kaitrx + parseInt(test_tablebody.rows[t].cells[1].innerHTML.replace(/\./g, ""));
					sum_kaiamount = sum_kaiamount + parseInt(test_tablebody.rows[t].cells[2].innerHTML.replace(/\./g, ""));
					sum_emonttrx = sum_emonttrx + parseInt(test_tablebody.rows[t].cells[3].innerHTML.replace(/\./g, ""));
					sum_emonttamount = sum_emonttamount + parseInt(test_tablebody.rows[t].cells[4].innerHTML.replace(/\./g, ""));
					sum_emontctrx = sum_emontctrx + parseInt(test_tablebody.rows[t].cells[5].innerHTML.replace(/\./g, ""));
					sum_emontcamount = sum_emontcamount + parseInt(test_tablebody.rows[t].cells[6].innerHTML.replace(/\./g, ""));
					sum_totaltrx = sum_totaltrx + parseInt(test_tablebody.rows[t].cells[7].innerHTML.replace(/\./g, ""));
					sum_totalamount = sum_totalamount + parseInt(test_tablebody.rows[t].cells[8].innerHTML.replace(/\./g, ""));
				}

				console.log(sum_kaitrx);
				test_tablefoot.innerHTML += '<tr>'+
					'<td style="text-align:left;"><b>Total</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_kaitrx)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_kaiamount)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_emonttrx)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_emonttamount)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_emontctrx)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_emontcamount)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_totaltrx)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_totalamount)+'</b></td>'+
				'</tr>';

				grafikchart(temp_final_pertanggal);
			})();
		}
	}else if(vm_group_testing.options[vm_group_testing.selectedIndex].text != 'All'){
		if(vm_periode.options[vm_periode.selectedIndex].value == 'harian'){
			if(vm_group_testing.options[vm_group_testing.selectedIndex].text == 'KAI'){
				if(lokasi == 'All'){
					test_table.innerHTML = 
						'<thead id="test-tablehead">'+
							'<tr>'+
								'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Tanggal</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">KAI</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Topup</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Card</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Total</th>'+
							'</tr>'+
							'<tr>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
							'</tr>'+
						'</thead>'+
						'<tbody id="test-tablebody">'+
						'</tbody>'+
						'<tfoot id="test-tablefoot">'+
						'</tfoot>';

					tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);
					var test_tablebody = document.getElementById('test-tablebody');
					var test_tablefoot = document.getElementById('test-tablefoot');
					(async () => {
						var result_KAI = await get('http://27.111.44.42/Percobaan2/get_trxallkai/'+tgl_awal_val+'/'+tgl_akhir_val);
						console.log('result_KAI',result_KAI);
						

						var kai = result_KAI.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
							}if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							} else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						console.log('testing kai',kai);
						
						kai.sort(waktuCompare);
						
						var temp_tgl= [...kai];
						temp_tgl = temp_tgl.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);

						console.log(kai);
						
						var temp_final_kai = [];
						for(tglx in temp_tgl){
							for(tglt in kai){
								if(temp_tgl[tglx]['waktu'] == kai[tglt]['waktu'] ){
									temp_final_kai.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: kai[tglt]['trx'],
										amount: kai[tglt]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != kai[tglt]['waktu'] ){
									temp_final_kai.push({
										waktu: (temp_tgl[tglt]['waktu']),
										trx: 0,
										amount: 0
									});
								}
								else{
									temp_final_kai.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							}
						}
						console.log('tgl', temp_tgl);
						
						temp_final_kai = temp_final_kai.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);

						var temp_final_pertanggal = [...temp_final_kai]
						temp_final_pertanggal = temp_final_pertanggal.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);


						
						console.log('temp_final_kai',temp_final_kai);
						console.log('temp_final_pertanggal',temp_final_pertanggal);
						

						
						for(x in temp_tgl){
							test_tablebody.innerHTML += '<tr>'+
								'<td style="text-align:center;">'+temp_tgl[x]['waktu']+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_kai[x]['trx'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_kai[x]['amount']) +'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['trx'] )+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['amount']) +'</td>'+
							'</tr>';
						}

						var sum_kaitrx = 0;
						var sum_kaiamount = 0;
						var sum_emonttrx = 0;
						var sum_emonttamount = 0;
						var sum_emontctrx = 0;
						var sum_emontcamount = 0;
						var sum_totaltrx = 0;
						var sum_totalamount = 0;
						for(var t = 0; t < test_tablebody.rows.length; t++){
							sum_kaitrx = sum_kaitrx + parseInt(test_tablebody.rows[t].cells[1].innerHTML.replace(/\./g, ""));
							sum_kaiamount = sum_kaiamount + parseInt(test_tablebody.rows[t].cells[2].innerHTML.replace(/\./g, ""));
							sum_emonttrx = sum_emonttrx + parseInt(test_tablebody.rows[t].cells[3].innerHTML.replace(/\./g, ""));
							sum_emonttamount = sum_emonttamount + parseInt(test_tablebody.rows[t].cells[4].innerHTML.replace(/\./g, ""));
							sum_emontctrx = sum_emontctrx + parseInt(test_tablebody.rows[t].cells[5].innerHTML.replace(/\./g, ""));
							sum_emontcamount = sum_emontcamount + parseInt(test_tablebody.rows[t].cells[6].innerHTML.replace(/\./g, ""));
							sum_totaltrx = sum_totaltrx + parseInt(test_tablebody.rows[t].cells[7].innerHTML.replace(/\./g, ""));
							sum_totalamount = sum_totalamount + parseInt(test_tablebody.rows[t].cells[8].innerHTML.replace(/\./g, ""));
						}

						console.log(sum_kaitrx);
						test_tablefoot.innerHTML += '<tr>'+
							'<td style="text-align:left;"><b>Total</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_kaitrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_kaiamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emonttrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emonttamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emontctrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emontcamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_totaltrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_totalamount)+'</b></td>'+
						'</tr>';

						grafikchart(temp_final_pertanggal);
					})();
				}else{
					if(vm_satu == 'All'){
						test_table.innerHTML = 
						'<thead id="test-tablehead">'+
							'<tr>'+
								'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Tanggal</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">KAI</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Topup</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Card</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Total</th>'+
							'</tr>'+
							'<tr>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
							'</tr>'+
						'</thead>'+
						'<tbody id="test-tablebody">'+
						'</tbody>'+
						'<tfoot id="test-tablefoot">'+
						'</tfoot>';

					tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);
					var test_tablebody = document.getElementById('test-tablebody');
					var test_tablefoot = document.getElementById('test-tablefoot');
					(async () => {
						var result_KAI = await get('http://27.111.44.42/Percobaan2/get_trxallkaiharloc/'+lokasi+'/'+tgl_awal_val+'/'+tgl_akhir_val);
						console.log('result_KAI',result_KAI);
						

						var kai = result_KAI.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
							}if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							} else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						console.log('testing kai',kai);
						
						kai.sort(waktuCompare);
						
						var temp_tgl= [...kai];
						temp_tgl = temp_tgl.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);

						console.log(kai);
						
						var temp_final_kai = [];
						for(tglx in temp_tgl){
							for(tglt in kai){
								if(temp_tgl[tglx]['waktu'] == kai[tglt]['waktu'] ){
									temp_final_kai.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: kai[tglt]['trx'],
										amount: kai[tglt]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != kai[tglt]['waktu'] ){
									temp_final_kai.push({
										waktu: (temp_tgl[tglt]['waktu']),
										trx: 0,
										amount: 0
									});
								}
								else{
									temp_final_kai.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							}
						}
						console.log('tgl', temp_tgl);
						
						temp_final_kai = temp_final_kai.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);

						var temp_final_pertanggal = [...temp_final_kai]
						temp_final_pertanggal = temp_final_pertanggal.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);


						
						console.log('temp_final_kai',temp_final_kai);
						console.log('temp_final_pertanggal',temp_final_pertanggal);
						

						
						for(x in temp_tgl){
							test_tablebody.innerHTML += '<tr>'+
								'<td style="text-align:center;">'+temp_tgl[x]['waktu']+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_kai[x]['trx'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_kai[x]['amount']) +'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['trx'] )+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['amount']) +'</td>'+
							'</tr>';
						}

						var sum_kaitrx = 0;
						var sum_kaiamount = 0;
						var sum_emonttrx = 0;
						var sum_emonttamount = 0;
						var sum_emontctrx = 0;
						var sum_emontcamount = 0;
						var sum_totaltrx = 0;
						var sum_totalamount = 0;
						for(var t = 0; t < test_tablebody.rows.length; t++){
							sum_kaitrx = sum_kaitrx + parseInt(test_tablebody.rows[t].cells[1].innerHTML.replace(/\./g, ""));
							sum_kaiamount = sum_kaiamount + parseInt(test_tablebody.rows[t].cells[2].innerHTML.replace(/\./g, ""));
							sum_emonttrx = sum_emonttrx + parseInt(test_tablebody.rows[t].cells[3].innerHTML.replace(/\./g, ""));
							sum_emonttamount = sum_emonttamount + parseInt(test_tablebody.rows[t].cells[4].innerHTML.replace(/\./g, ""));
							sum_emontctrx = sum_emontctrx + parseInt(test_tablebody.rows[t].cells[5].innerHTML.replace(/\./g, ""));
							sum_emontcamount = sum_emontcamount + parseInt(test_tablebody.rows[t].cells[6].innerHTML.replace(/\./g, ""));
							sum_totaltrx = sum_totaltrx + parseInt(test_tablebody.rows[t].cells[7].innerHTML.replace(/\./g, ""));
							sum_totalamount = sum_totalamount + parseInt(test_tablebody.rows[t].cells[8].innerHTML.replace(/\./g, ""));
						}

						console.log(sum_kaitrx);
						test_tablefoot.innerHTML += '<tr>'+
							'<td style="text-align:left;"><b>Total</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_kaitrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_kaiamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emonttrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emonttamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emontctrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emontcamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_totaltrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_totalamount)+'</b></td>'+
						'</tr>';

						grafikchart(temp_final_pertanggal);
					})();
					}else{
						test_table.innerHTML = 
						'<thead id="test-tablehead">'+
							'<tr>'+
								'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Tanggal</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">KAI</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Topup</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Card</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Total</th>'+
							'</tr>'+
							'<tr>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
							'</tr>'+
						'</thead>'+
						'<tbody id="test-tablebody">'+
						'</tbody>'+
						'<tfoot id="test-tablefoot">'+
						'</tfoot>';

					tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);
					var test_tablebody = document.getElementById('test-tablebody');
					var test_tablefoot = document.getElementById('test-tablefoot');
					(async () => {
						var result_KAI = await get('http://27.111.44.42/Percobaan2/get_trxallkaiharlocterm/'+lokasi+'/'+vm_satu+'/'+tgl_awal_val+'/'+tgl_akhir_val);
						console.log('result_KAI',result_KAI);
						

						var kai = result_KAI.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
							}if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							} else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						console.log('testing kai',kai);
						
						kai.sort(waktuCompare);
						
						var temp_tgl= [...kai];
						temp_tgl = temp_tgl.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);

						console.log(kai);
						
						var temp_final_kai = [];
						for(tglx in temp_tgl){
							for(tglt in kai){
								if(temp_tgl[tglx]['waktu'] == kai[tglt]['waktu'] ){
									temp_final_kai.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: kai[tglt]['trx'],
										amount: kai[tglt]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != kai[tglt]['waktu'] ){
									temp_final_kai.push({
										waktu: (temp_tgl[tglt]['waktu']),
										trx: 0,
										amount: 0
									});
								}
								else{
									temp_final_kai.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							}
						}
						console.log('tgl', temp_tgl);
						
						temp_final_kai = temp_final_kai.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);

						var temp_final_pertanggal = [...temp_final_kai]
						temp_final_pertanggal = temp_final_pertanggal.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);


						
						console.log('temp_final_kai',temp_final_kai);
						console.log('temp_final_pertanggal',temp_final_pertanggal);
						

						
						for(x in temp_tgl){
							test_tablebody.innerHTML += '<tr>'+
								'<td style="text-align:center;">'+temp_tgl[x]['waktu']+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_kai[x]['trx'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_kai[x]['amount']) +'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['trx'] )+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['amount']) +'</td>'+
							'</tr>';
						}

						var sum_kaitrx = 0;
						var sum_kaiamount = 0;
						var sum_emonttrx = 0;
						var sum_emonttamount = 0;
						var sum_emontctrx = 0;
						var sum_emontcamount = 0;
						var sum_totaltrx = 0;
						var sum_totalamount = 0;
						for(var t = 0; t < test_tablebody.rows.length; t++){
							sum_kaitrx = sum_kaitrx + parseInt(test_tablebody.rows[t].cells[1].innerHTML.replace(/\./g, ""));
							sum_kaiamount = sum_kaiamount + parseInt(test_tablebody.rows[t].cells[2].innerHTML.replace(/\./g, ""));
							sum_emonttrx = sum_emonttrx + parseInt(test_tablebody.rows[t].cells[3].innerHTML.replace(/\./g, ""));
							sum_emonttamount = sum_emonttamount + parseInt(test_tablebody.rows[t].cells[4].innerHTML.replace(/\./g, ""));
							sum_emontctrx = sum_emontctrx + parseInt(test_tablebody.rows[t].cells[5].innerHTML.replace(/\./g, ""));
							sum_emontcamount = sum_emontcamount + parseInt(test_tablebody.rows[t].cells[6].innerHTML.replace(/\./g, ""));
							sum_totaltrx = sum_totaltrx + parseInt(test_tablebody.rows[t].cells[7].innerHTML.replace(/\./g, ""));
							sum_totalamount = sum_totalamount + parseInt(test_tablebody.rows[t].cells[8].innerHTML.replace(/\./g, ""));
						}

						console.log(sum_kaitrx);
						test_tablefoot.innerHTML += '<tr>'+
							'<td style="text-align:left;"><b>Total</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_kaitrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_kaiamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emonttrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emonttamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emontctrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emontcamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_totaltrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_totalamount)+'</b></td>'+
						'</tr>';

						grafikchart(temp_final_pertanggal);
					})();
					}
				}
					
			}else if(vm_group_testing.options[vm_group_testing.selectedIndex].text == 'BB'){
				if(vm_satu == 'All'){
					test_table.innerHTML = 
						'<thead id="test-tablehead">'+
							'<tr>'+
								'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Tanggal</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">KAI</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Topup</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Card</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Total</th>'+
							'</tr>'+
							'<tr>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
							'</tr>'+
						'</thead>'+
						'<tbody id="test-tablebody">'+
						'</tbody>'+
						'<tfoot id="test-tablefoot">'+
						'</tfoot>';

					tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);
					var test_tablebody = document.getElementById('test-tablebody');
					var test_tablefoot = document.getElementById('test-tablefoot');
					vm_group_testing = vm_group_testing.options[vm_group_testing.selectedIndex].text;
					(async () => {
						// var result_KAI = await get('http://27.111.44.42/Percobaan2/get_trxallkai/'+tgl_awal_val+'/'+tgl_akhir_val);

						// = vm_group_testing.value;
						var result_Mtopup = await get('http://27.111.44.44/mobile/Percobaan2/get_trxmandiritp/'+vm_group_testing+'/'+tgl_awal_val+'/'+tgl_akhir_val);
						var result_Mcard = await get('http://27.111.44.44/mobile/Percobaan2/get_trxmandiricard/'+vm_group_testing+'/'+tgl_awal_val+'/'+tgl_akhir_val);
						// console.log('result_KAI',result_KAI);
						// var temp_result = ;
						// console.log('result_Mtopup',result_Mtopup);
						// console.log('result_Mcard',result_Mcard);
						// var selisihtgl = Math.floor(( Date.parse(tgl_akhir_val) - Date.parse(tgl_awal_val) ) / 86400000);
						

						/* var kai = result_KAI.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
							}if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							} else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						console.log('testing kai',kai); */
						var mtopup = result_Mtopup.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						console.log('testing kai',mtopup );
						var mcard = result_Mcard.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);

						// penjumlahan berdasarkan tanggal
						// kai.sort(waktuCompare);
						mtopup.sort(waktuCompare);
						mcard.sort(waktuCompare);
						var temp_tgl= [...mtopup, ...mcard];
						temp_tgl = temp_tgl.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);

						// console.log(kai);
						// console.log(mtopup);
						// console.log(mcard);

						var temp_final_mcard = [];
						var temp_final_mtopup = [];
						// var temp_final_kai = [];
						for(tglx in temp_tgl){
							for(tglu in mcard){
								if(temp_tgl[tglx]['waktu'] == mcard[tglu]['waktu'] ){
									temp_final_mcard.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: mcard[tglu]['trx'],
										amount: mcard[tglu]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != mcard[tglu]['waktu']){
									temp_final_mcard.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: 0,
										amount: 0
									});
								}else if(mcard[tglu]['waktu'] != new_today()){
									temp_final_mcard.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}else {
									temp_final_mcard.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							}
							for(tglv in mtopup){
								if(temp_tgl[tglx]['waktu'] == mtopup[tglv]['waktu'] ){
									temp_final_mtopup.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: mtopup[tglv]['trx'],
										amount: mtopup[tglv]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != mtopup[tglv]['waktu']){
									temp_final_mtopup.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: 0,
										amount: 0
									});
								}else{
									temp_final_mtopup.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							}
							
							/* for(tglt in kai){
								if(temp_tgl[tglx]['waktu'] == kai[tglt]['waktu'] ){
									temp_final_kai.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: kai[tglt]['trx'],
										amount: kai[tglt]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != kai[tglt]['waktu'] ){
									temp_final_kai.push({
										waktu: (temp_tgl[tglt]['waktu']),
										trx: 0,
										amount: 0
									});
								}
								else{
									temp_final_kai.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							} */
						}
						// console.log('tgl', temp_tgl);
						// console.log(temp_final_mcard);
						// console.log(temp_final_mtopup);

						
						temp_final_mcard = temp_final_mcard.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						temp_final_mtopup = temp_final_mtopup.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						/* temp_final_kai = temp_final_kai.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []); */

						var temp_final_pertanggal = [...temp_final_mtopup, ...temp_final_mcard]
						temp_final_pertanggal = temp_final_pertanggal.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);


						// console.log('card_clean topup',temp_final_mtopup);
						// console.log('card_clean card',temp_final_mcard);
						// console.log('temp_final_kai',temp_final_kai);
						console.log('temp_final_pertanggal',temp_final_pertanggal);
						

						// console.log('temp_final_c',temp_final_c);
						/* var result = [...result_KAI, ...result_Mtopup, ...result_Mcard]; */
						for(x in temp_tgl){
							console.log(temp_final_mtopup[x]['trx']);
							test_tablebody.innerHTML += '<tr>'+
								'<td style="text-align:center;">'+temp_tgl[x]['waktu']+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['trx'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['amount'])+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['trx'] )+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['amount']) +'</td>'+
							'</tr>';
						}

						var sum_kaitrx = 0;
						var sum_kaiamount = 0;
						var sum_emonttrx = 0;
						var sum_emonttamount = 0;
						var sum_emontctrx = 0;
						var sum_emontcamount = 0;
						var sum_totaltrx = 0;
						var sum_totalamount = 0;
						for(var t = 0; t < test_tablebody.rows.length; t++){
							sum_kaitrx = sum_kaitrx + parseInt(test_tablebody.rows[t].cells[1].innerHTML.replace(/\./g, ""));
							sum_kaiamount = sum_kaiamount + parseInt(test_tablebody.rows[t].cells[2].innerHTML.replace(/\./g, ""));
							sum_emonttrx = sum_emonttrx + parseInt(test_tablebody.rows[t].cells[3].innerHTML.replace(/\./g, ""));
							sum_emonttamount = sum_emonttamount + parseInt(test_tablebody.rows[t].cells[4].innerHTML.replace(/\./g, ""));
							sum_emontctrx = sum_emontctrx + parseInt(test_tablebody.rows[t].cells[5].innerHTML.replace(/\./g, ""));
							sum_emontcamount = sum_emontcamount + parseInt(test_tablebody.rows[t].cells[6].innerHTML.replace(/\./g, ""));
							sum_totaltrx = sum_totaltrx + parseInt(test_tablebody.rows[t].cells[7].innerHTML.replace(/\./g, ""));
							sum_totalamount = sum_totalamount + parseInt(test_tablebody.rows[t].cells[8].innerHTML.replace(/\./g, ""));
						}

						console.log(sum_kaitrx);
						test_tablefoot.innerHTML += '<tr>'+
							'<td style="text-align:left;"><b>Total</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_kaitrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_kaiamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emonttrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emonttamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emontctrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emontcamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_totaltrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_totalamount)+'</b></td>'+
						'</tr>';

						grafikchart(temp_final_pertanggal);
					})();
				}else{
					test_table.innerHTML = 
						'<thead id="test-tablehead">'+
							'<tr>'+
								'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Tanggal</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">KAI</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Topup</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Card</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Total</th>'+
							'</tr>'+
							'<tr>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
							'</tr>'+
						'</thead>'+
						'<tbody id="test-tablebody">'+
						'</tbody>'+
						'<tfoot id="test-tablefoot">'+
						'</tfoot>';

					tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);
					var test_tablebody = document.getElementById('test-tablebody');
					var test_tablefoot = document.getElementById('test-tablefoot');
					vm_group_testing = vm_group_testing.options[vm_group_testing.selectedIndex].text;
					(async () => {
						// var result_KAI = await get('http://27.111.44.42/Percobaan2/get_trxallkai/'+tgl_awal_val+'/'+tgl_akhir_val);

						// = vm_group_testing.value;
						var result_Mtopup = await get('http://27.111.44.44/mobile/Percobaan2/get_trxmandiritpharterm/'+vm_group_testing+'/'+vm_satu+'/'+tgl_awal_val+'/'+tgl_akhir_val);
						var result_Mcard = await get('http://27.111.44.44/mobile/Percobaan2/get_trxmandiricardharterm/'+vm_group_testing+'/'+vm_satu+'/'+tgl_awal_val+'/'+tgl_akhir_val);
						// console.log('result_KAI',result_KAI);
						// var temp_result = ;
						// console.log('result_Mtopup',result_Mtopup);
						// console.log('result_Mcard',result_Mcard);
						// var selisihtgl = Math.floor(( Date.parse(tgl_akhir_val) - Date.parse(tgl_awal_val) ) / 86400000);
						

						/* var kai = result_KAI.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
							}if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							} else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						console.log('testing kai',kai); */
						var mtopup = result_Mtopup.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						console.log('testing kai',mtopup );
						var mcard = result_Mcard.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);

						// penjumlahan berdasarkan tanggal
						// kai.sort(waktuCompare);
						mtopup.sort(waktuCompare);
						mcard.sort(waktuCompare);
						var temp_tgl= [...mtopup, ...mcard];
						temp_tgl = temp_tgl.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);

						// console.log(kai);
						// console.log(mtopup);
						// console.log(mcard);

						var temp_final_mcard = [];
						var temp_final_mtopup = [];
						// var temp_final_kai = [];
						for(tglx in temp_tgl){
							for(tglu in mcard){
								if(temp_tgl[tglx]['waktu'] == mcard[tglu]['waktu'] ){
									temp_final_mcard.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: mcard[tglu]['trx'],
										amount: mcard[tglu]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != mcard[tglu]['waktu']){
									temp_final_mcard.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: 0,
										amount: 0
									});
								}else if(mcard[tglu]['waktu'] != new_today()){
									temp_final_mcard.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}else {
									temp_final_mcard.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							}
							for(tglv in mtopup){
								if(temp_tgl[tglx]['waktu'] == mtopup[tglv]['waktu'] ){
									temp_final_mtopup.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: mtopup[tglv]['trx'],
										amount: mtopup[tglv]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != mtopup[tglv]['waktu']){
									temp_final_mtopup.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: 0,
										amount: 0
									});
								}else{
									temp_final_mtopup.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							}
							
							/* for(tglt in kai){
								if(temp_tgl[tglx]['waktu'] == kai[tglt]['waktu'] ){
									temp_final_kai.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: kai[tglt]['trx'],
										amount: kai[tglt]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != kai[tglt]['waktu'] ){
									temp_final_kai.push({
										waktu: (temp_tgl[tglt]['waktu']),
										trx: 0,
										amount: 0
									});
								}
								else{
									temp_final_kai.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							} */
						}
						// console.log('tgl', temp_tgl);
						// console.log(temp_final_mcard);
						// console.log(temp_final_mtopup);

						
						temp_final_mcard = temp_final_mcard.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						temp_final_mtopup = temp_final_mtopup.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						/* temp_final_kai = temp_final_kai.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []); */

						var temp_final_pertanggal = [...temp_final_mtopup, ...temp_final_mcard]
						temp_final_pertanggal = temp_final_pertanggal.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);


						// console.log('card_clean topup',temp_final_mtopup);
						// console.log('card_clean card',temp_final_mcard);
						// console.log('temp_final_kai',temp_final_kai);
						console.log('temp_final_pertanggal',temp_final_pertanggal);
						

						// console.log('temp_final_c',temp_final_c);
						/* var result = [...result_KAI, ...result_Mtopup, ...result_Mcard]; */
						for(x in temp_tgl){
							console.log(temp_final_mtopup[x]['trx']);
							test_tablebody.innerHTML += '<tr>'+
								'<td style="text-align:center;">'+temp_tgl[x]['waktu']+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['trx'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['amount'])+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['trx'] )+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['amount']) +'</td>'+
							'</tr>';
						}

						var sum_kaitrx = 0;
						var sum_kaiamount = 0;
						var sum_emonttrx = 0;
						var sum_emonttamount = 0;
						var sum_emontctrx = 0;
						var sum_emontcamount = 0;
						var sum_totaltrx = 0;
						var sum_totalamount = 0;
						for(var t = 0; t < test_tablebody.rows.length; t++){
							sum_kaitrx = sum_kaitrx + parseInt(test_tablebody.rows[t].cells[1].innerHTML.replace(/\./g, ""));
							sum_kaiamount = sum_kaiamount + parseInt(test_tablebody.rows[t].cells[2].innerHTML.replace(/\./g, ""));
							sum_emonttrx = sum_emonttrx + parseInt(test_tablebody.rows[t].cells[3].innerHTML.replace(/\./g, ""));
							sum_emonttamount = sum_emonttamount + parseInt(test_tablebody.rows[t].cells[4].innerHTML.replace(/\./g, ""));
							sum_emontctrx = sum_emontctrx + parseInt(test_tablebody.rows[t].cells[5].innerHTML.replace(/\./g, ""));
							sum_emontcamount = sum_emontcamount + parseInt(test_tablebody.rows[t].cells[6].innerHTML.replace(/\./g, ""));
							sum_totaltrx = sum_totaltrx + parseInt(test_tablebody.rows[t].cells[7].innerHTML.replace(/\./g, ""));
							sum_totalamount = sum_totalamount + parseInt(test_tablebody.rows[t].cells[8].innerHTML.replace(/\./g, ""));
						}

						console.log(sum_kaitrx);
						test_tablefoot.innerHTML += '<tr>'+
							'<td style="text-align:left;"><b>Total</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_kaitrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_kaiamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emonttrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emonttamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emontctrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emontcamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_totaltrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_totalamount)+'</b></td>'+
						'</tr>';

						grafikchart(temp_final_pertanggal);
					})();
				}
				
			}else{
				if(vm_satu == 'All'){
					test_table.innerHTML = 
						'<thead id="test-tablehead">'+
							'<tr>'+
								'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Tanggal</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">KAI</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Topup</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Card</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Total</th>'+
							'</tr>'+
							'<tr>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
							'</tr>'+
						'</thead>'+
						'<tbody id="test-tablebody">'+
						'</tbody>'+
						'<tfoot id="test-tablefoot">'+
						'</tfoot>';

					tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);
					var test_tablebody = document.getElementById('test-tablebody');
					var test_tablefoot = document.getElementById('test-tablefoot');
					vm_group_testing = vm_group_testing.options[vm_group_testing.selectedIndex].text;
					(async () => {
						// var result_KAI = await get('http://27.111.44.42/Percobaan2/get_trxallkai/'+tgl_awal_val+'/'+tgl_akhir_val);

						// = vm_group_testing.value;
						var result_Mtopup = await get('http://27.111.44.44/mobile/Percobaan2/get_trxmandiritp/'+vm_group_testing+'/'+tgl_awal_val+'/'+tgl_akhir_val);
						var result_Mcard = await get('http://27.111.44.44/mobile/Percobaan2/get_trxmandiricard/'+vm_group_testing+'/'+tgl_awal_val+'/'+tgl_akhir_val);
						// console.log('result_KAI',result_KAI);
						// var temp_result = ;
						// console.log('result_Mtopup',result_Mtopup);
						// console.log('result_Mcard',result_Mcard);
						// var selisihtgl = Math.floor(( Date.parse(tgl_akhir_val) - Date.parse(tgl_awal_val) ) / 86400000);
						

						/* var kai = result_KAI.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
							}if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							} else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						console.log('testing kai',kai); */
						var mtopup = result_Mtopup.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						console.log('testing kai',mtopup );
						var mcard = result_Mcard.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);

						// penjumlahan berdasarkan tanggal
						// kai.sort(waktuCompare);
						mtopup.sort(waktuCompare);
						mcard.sort(waktuCompare);
						var temp_tgl= [...mtopup, ...mcard];
						temp_tgl = temp_tgl.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);

						// console.log(kai);
						// console.log(mtopup);
						// console.log(mcard);

						var temp_final_mcard = [];
						var temp_final_mtopup = [];
						// var temp_final_kai = [];
						for(tglx in temp_tgl){
							for(tglu in mcard){
								if(temp_tgl[tglx]['waktu'] == mcard[tglu]['waktu'] ){
									temp_final_mcard.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: mcard[tglu]['trx'],
										amount: mcard[tglu]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != mcard[tglu]['waktu']){
									temp_final_mcard.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: 0,
										amount: 0
									});
								}else if(mcard[tglu]['waktu'] != new_today()){
									temp_final_mcard.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}else {
									temp_final_mcard.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							}
							for(tglv in mtopup){
								if(temp_tgl[tglx]['waktu'] == mtopup[tglv]['waktu'] ){
									temp_final_mtopup.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: mtopup[tglv]['trx'],
										amount: mtopup[tglv]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != mtopup[tglv]['waktu']){
									temp_final_mtopup.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: 0,
										amount: 0
									});
								}else{
									temp_final_mtopup.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							}
							
							/* for(tglt in kai){
								if(temp_tgl[tglx]['waktu'] == kai[tglt]['waktu'] ){
									temp_final_kai.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: kai[tglt]['trx'],
										amount: kai[tglt]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != kai[tglt]['waktu'] ){
									temp_final_kai.push({
										waktu: (temp_tgl[tglt]['waktu']),
										trx: 0,
										amount: 0
									});
								}
								else{
									temp_final_kai.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							} */
						}
						// console.log('tgl', temp_tgl);
						// console.log(temp_final_mcard);
						// console.log(temp_final_mtopup);

						
						temp_final_mcard = temp_final_mcard.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						temp_final_mtopup = temp_final_mtopup.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						/* temp_final_kai = temp_final_kai.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []); */

						var temp_final_pertanggal = [...temp_final_mtopup, ...temp_final_mcard]
						temp_final_pertanggal = temp_final_pertanggal.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);


						// console.log('card_clean topup',temp_final_mtopup);
						// console.log('card_clean card',temp_final_mcard);
						// console.log('temp_final_kai',temp_final_kai);
						console.log('temp_final_pertanggal',temp_final_pertanggal);
						

						// console.log('temp_final_c',temp_final_c);
						/* var result = [...result_KAI, ...result_Mtopup, ...result_Mcard]; */
						for(x in temp_tgl){
							console.log(temp_final_mtopup[x]['trx']);
							test_tablebody.innerHTML += '<tr>'+
								'<td style="text-align:center;">'+temp_tgl[x]['waktu']+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['trx'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['amount'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mcard[x]['trx'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mcard[x]['amount'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['trx'] )+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['amount']) +'</td>'+
							'</tr>';
						}

						var sum_kaitrx = 0;
						var sum_kaiamount = 0;
						var sum_emonttrx = 0;
						var sum_emonttamount = 0;
						var sum_emontctrx = 0;
						var sum_emontcamount = 0;
						var sum_totaltrx = 0;
						var sum_totalamount = 0;
						for(var t = 0; t < test_tablebody.rows.length; t++){
							sum_kaitrx = sum_kaitrx + parseInt(test_tablebody.rows[t].cells[1].innerHTML.replace(/\./g, ""));
							sum_kaiamount = sum_kaiamount + parseInt(test_tablebody.rows[t].cells[2].innerHTML.replace(/\./g, ""));
							sum_emonttrx = sum_emonttrx + parseInt(test_tablebody.rows[t].cells[3].innerHTML.replace(/\./g, ""));
							sum_emonttamount = sum_emonttamount + parseInt(test_tablebody.rows[t].cells[4].innerHTML.replace(/\./g, ""));
							sum_emontctrx = sum_emontctrx + parseInt(test_tablebody.rows[t].cells[5].innerHTML.replace(/\./g, ""));
							sum_emontcamount = sum_emontcamount + parseInt(test_tablebody.rows[t].cells[6].innerHTML.replace(/\./g, ""));
							sum_totaltrx = sum_totaltrx + parseInt(test_tablebody.rows[t].cells[7].innerHTML.replace(/\./g, ""));
							sum_totalamount = sum_totalamount + parseInt(test_tablebody.rows[t].cells[8].innerHTML.replace(/\./g, ""));
						}

						console.log(sum_kaitrx);
						test_tablefoot.innerHTML += '<tr>'+
							'<td style="text-align:left;"><b>Total</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_kaitrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_kaiamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emonttrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emonttamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emontctrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emontcamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_totaltrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_totalamount)+'</b></td>'+
						'</tr>';

						grafikchart(temp_final_pertanggal);
					})();
				}else{
					test_table.innerHTML = 
						'<thead id="test-tablehead">'+
							'<tr>'+
								'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Tanggal</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">KAI</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Topup</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Card</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Total</th>'+
							'</tr>'+
							'<tr>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
							'</tr>'+
						'</thead>'+
						'<tbody id="test-tablebody">'+
						'</tbody>'+
						'<tfoot id="test-tablefoot">'+
						'</tfoot>';

					tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);
					var test_tablebody = document.getElementById('test-tablebody');
					var test_tablefoot = document.getElementById('test-tablefoot');
					vm_group_testing = vm_group_testing.options[vm_group_testing.selectedIndex].text;
					(async () => {
						// var result_KAI = await get('http://27.111.44.42/Percobaan2/get_trxallkai/'+tgl_awal_val+'/'+tgl_akhir_val);

						// = vm_group_testing.value;
						var result_Mtopup = await get('http://27.111.44.44/mobile/Percobaan2/get_trxmandiritpharterm/'+vm_group_testing+'/'+vm_satu+'/'+tgl_awal_val+'/'+tgl_akhir_val);
						var result_Mcard = await get('http://27.111.44.44/mobile/Percobaan2/get_trxmandiricardharterm/'+vm_group_testing+'/'+vm_satu+'/'+tgl_awal_val+'/'+tgl_akhir_val);
						// console.log('result_KAI',result_KAI);
						// var temp_result = ;
						// console.log('result_Mtopup',result_Mtopup);
						// console.log('result_Mcard',result_Mcard);
						// var selisihtgl = Math.floor(( Date.parse(tgl_akhir_val) - Date.parse(tgl_awal_val) ) / 86400000);
						

						/* var kai = result_KAI.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
							}if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							} else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						console.log('testing kai',kai); */
						var mtopup = result_Mtopup.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						console.log('testing kai',mtopup );
						var mcard = result_Mcard.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);

						// penjumlahan berdasarkan tanggal
						// kai.sort(waktuCompare);
						mtopup.sort(waktuCompare);
						mcard.sort(waktuCompare);
						var temp_tgl= [...mtopup, ...mcard];
						temp_tgl = temp_tgl.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);

						// console.log(kai);
						// console.log(mtopup);
						// console.log(mcard);

						var temp_final_mcard = [];
						var temp_final_mtopup = [];
						// var temp_final_kai = [];
						for(tglx in temp_tgl){
							for(tglu in mcard){
								if(temp_tgl[tglx]['waktu'] == mcard[tglu]['waktu'] ){
									temp_final_mcard.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: mcard[tglu]['trx'],
										amount: mcard[tglu]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != mcard[tglu]['waktu']){
									temp_final_mcard.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: 0,
										amount: 0
									});
								}else if(mcard[tglu]['waktu'] != new_today()){
									temp_final_mcard.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}else {
									temp_final_mcard.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							}
							for(tglv in mtopup){
								if(temp_tgl[tglx]['waktu'] == mtopup[tglv]['waktu'] ){
									temp_final_mtopup.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: mtopup[tglv]['trx'],
										amount: mtopup[tglv]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != mtopup[tglv]['waktu']){
									temp_final_mtopup.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: 0,
										amount: 0
									});
								}else{
									temp_final_mtopup.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							}
							
							/* for(tglt in kai){
								if(temp_tgl[tglx]['waktu'] == kai[tglt]['waktu'] ){
									temp_final_kai.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: kai[tglt]['trx'],
										amount: kai[tglt]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != kai[tglt]['waktu'] ){
									temp_final_kai.push({
										waktu: (temp_tgl[tglt]['waktu']),
										trx: 0,
										amount: 0
									});
								}
								else{
									temp_final_kai.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							} */
						}
						// console.log('tgl', temp_tgl);
						// console.log(temp_final_mcard);
						// console.log(temp_final_mtopup);

						
						temp_final_mcard = temp_final_mcard.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						temp_final_mtopup = temp_final_mtopup.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						/* temp_final_kai = temp_final_kai.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []); */

						var temp_final_pertanggal = [...temp_final_mtopup, ...temp_final_mcard]
						temp_final_pertanggal = temp_final_pertanggal.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);


						// console.log('card_clean topup',temp_final_mtopup);
						// console.log('card_clean card',temp_final_mcard);
						// console.log('temp_final_kai',temp_final_kai);
						console.log('temp_final_pertanggal',temp_final_pertanggal);
						

						// console.log('temp_final_c',temp_final_c);
						/* var result = [...result_KAI, ...result_Mtopup, ...result_Mcard]; */
						for(x in temp_tgl){
							console.log(temp_final_mtopup[x]['trx']);
							test_tablebody.innerHTML += '<tr>'+
								'<td style="text-align:center;">'+temp_tgl[x]['waktu']+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['trx'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['amount'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mcard[x]['trx'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mcard[x]['amount'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['trx'] )+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['amount']) +'</td>'+
							'</tr>';
						}

						var sum_kaitrx = 0;
						var sum_kaiamount = 0;
						var sum_emonttrx = 0;
						var sum_emonttamount = 0;
						var sum_emontctrx = 0;
						var sum_emontcamount = 0;
						var sum_totaltrx = 0;
						var sum_totalamount = 0;
						for(var t = 0; t < test_tablebody.rows.length; t++){
							sum_kaitrx = sum_kaitrx + parseInt(test_tablebody.rows[t].cells[1].innerHTML.replace(/\./g, ""));
							sum_kaiamount = sum_kaiamount + parseInt(test_tablebody.rows[t].cells[2].innerHTML.replace(/\./g, ""));
							sum_emonttrx = sum_emonttrx + parseInt(test_tablebody.rows[t].cells[3].innerHTML.replace(/\./g, ""));
							sum_emonttamount = sum_emonttamount + parseInt(test_tablebody.rows[t].cells[4].innerHTML.replace(/\./g, ""));
							sum_emontctrx = sum_emontctrx + parseInt(test_tablebody.rows[t].cells[5].innerHTML.replace(/\./g, ""));
							sum_emontcamount = sum_emontcamount + parseInt(test_tablebody.rows[t].cells[6].innerHTML.replace(/\./g, ""));
							sum_totaltrx = sum_totaltrx + parseInt(test_tablebody.rows[t].cells[7].innerHTML.replace(/\./g, ""));
							sum_totalamount = sum_totalamount + parseInt(test_tablebody.rows[t].cells[8].innerHTML.replace(/\./g, ""));
						}

						console.log(sum_kaitrx);
						test_tablefoot.innerHTML += '<tr>'+
							'<td style="text-align:left;"><b>Total</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_kaitrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_kaiamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emonttrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emonttamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emontctrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emontcamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_totaltrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_totalamount)+'</b></td>'+
						'</tr>';

						grafikchart(temp_final_pertanggal);
					})();
				}
				
			}
		}else if(vm_periode.options[vm_periode.selectedIndex].value == 'bulan'){
			if(vm_group_testing.options[vm_group_testing.selectedIndex].text == 'KAI'){
				if(lokasi == 'All'){
					vm_periode_bulan = vm_periode_bulan.value;
					test_table.innerHTML = 
						'<thead id="test-tablehead">'+
							'<tr>'+
								'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Tanggal</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">KAI</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Topup</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Card</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Total</th>'+
							'</tr>'+
							'<tr>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
							'</tr>'+
						'</thead>'+
						'<tbody id="test-tablebody">'+
						'</tbody>'+
						'<tfoot id="test-tablefoot">'+
						'</tfoot>';

						var test_tablebody = document.getElementById('test-tablebody');
						var test_tablefoot = document.getElementById('test-tablefoot');
					(async () => {
						var result_KAI = await get('http://27.111.44.42/Percobaan2/get_allmonthkai/'+vm_periode_bulan);
						/* var result_Mtopup1 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopup/'+vm_periode_bulan+'/0/15000');
						var result_Mtopup2 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopup/'+vm_periode_bulan+'/15000/15000');
						var result_Mtopup3 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopup/'+vm_periode_bulan+'/30000/15000');
						var result_Mtopup4 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopup/'+vm_periode_bulan+'/45000/15000');
						// var result_Mtopup3 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopup/'+vm_periode_bulan+'/45000/15000');
						var result_Mtopup = [...result_Mtopup1, ...result_Mtopup2, ...result_Mtopup3, ...result_Mtopup4]
						var result_Mcard = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthcard/'+vm_periode_bulan);
						console.log('result_KAI',result_KAI);
						// var temp_result = ;
						console.log('result_Mtopup',result_Mtopup);
						console.log('result_Mcard',result_Mcard);
						var selisihtgl = Math.floor(( Date.parse(tgl_akhir_val) - Date.parse(tgl_awal_val) ) / 86400000);
						*/

						var kai = result_KAI.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
							}if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							} else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						console.log('testing kai',kai);
						/* var mtopup = result_Mtopup.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						console.log('testing kai',mtopup ); */
						/* var mcard = result_Mcard.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []); */

						// penjumlahan berdasarkan tanggal
						kai.sort(waktuCompare);
						/* mtopup.sort(waktuCompare);
						mcard.sort(waktuCompare); */
						var temp_tgl= [...kai/* , ...mtopup, ...mcard */];
						temp_tgl = temp_tgl.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);

						console.log(kai);
						/* console.log(mtopup);
						console.log(mcard); */

						var temp_final_mcard = [];
						var temp_final_mtopup = [];
						var temp_final_kai = [];
						for(tglx in temp_tgl){
							/* for(tglu in mcard){
								if(temp_tgl[tglx]['waktu'] == mcard[tglu]['waktu'] ){
									temp_final_mcard.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: mcard[tglu]['trx'],
										amount: mcard[tglu]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != mcard[tglu]['waktu']){
									temp_final_mcard.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: 0,
										amount: 0
									});
								}else if(mcard[tglu]['waktu'] != new_today()){
									temp_final_mcard.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}else {
									temp_final_mcard.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							} */
							/* for(tglv in mtopup){
								if(temp_tgl[tglx]['waktu'] == mtopup[tglv]['waktu'] ){
									temp_final_mtopup.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: mtopup[tglv]['trx'],
										amount: mtopup[tglv]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != mtopup[tglv]['waktu']){
									temp_final_mtopup.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: 0,
										amount: 0
									});
								}else{
									temp_final_mtopup.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							} */
							
							for(tglt in kai){
								if(temp_tgl[tglx]['waktu'] == kai[tglt]['waktu'] ){
									temp_final_kai.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: kai[tglt]['trx'],
										amount: kai[tglt]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != kai[tglt]['waktu'] ){
									temp_final_kai.push({
										waktu: (temp_tgl[tglt]['waktu']),
										trx: 0,
										amount: 0
									});
								}
								else{
									temp_final_kai.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							}
						}
						/* console.log('tgl', temp_tgl);
						console.log(temp_final_mcard);
						console.log(temp_final_mtopup); */

						
						/* temp_final_mcard = temp_final_mcard.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []); */
						/* temp_final_mtopup = temp_final_mtopup.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []); */
						temp_final_kai = temp_final_kai.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);

						var temp_final_pertanggal = [/* ...temp_final_mcard, ...temp_final_mtopup, */ ...temp_final_kai]
						temp_final_pertanggal = temp_final_pertanggal.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);


						/* console.log('card_clean topup',temp_final_mtopup);
						console.log('card_clean card',temp_final_mcard);
						console.log('temp_final_kai',temp_final_kai);
						console.log('temp_final_pertanggal',temp_final_pertanggal); */
						

						// console.log('temp_final_c',temp_final_c);
						/* var result = [...result_KAI, ...result_Mtopup, ...result_Mcard]; */
						for(x in temp_tgl){
							test_tablebody.innerHTML += '<tr>'+
								'<td style="text-align:center;">'+temp_tgl[x]['waktu']+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_kai[x]['trx'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_kai[x]['amount']) +'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['trx'] )+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['amount']) +'</td>'+
							'</tr>';
						}

						var sum_kaitrx = 0;
						var sum_kaiamount = 0;
						var sum_emonttrx = 0;
						var sum_emonttamount = 0;
						var sum_emontctrx = 0;
						var sum_emontcamount = 0;
						var sum_totaltrx = 0;
						var sum_totalamount = 0;
						for(var t = 0; t < test_tablebody.rows.length; t++){
							sum_kaitrx = sum_kaitrx + parseInt(test_tablebody.rows[t].cells[1].innerHTML.replace(/\./g, ""));
							sum_kaiamount = sum_kaiamount + parseInt(test_tablebody.rows[t].cells[2].innerHTML.replace(/\./g, ""));
							sum_emonttrx = sum_emonttrx + parseInt(test_tablebody.rows[t].cells[3].innerHTML.replace(/\./g, ""));
							sum_emonttamount = sum_emonttamount + parseInt(test_tablebody.rows[t].cells[4].innerHTML.replace(/\./g, ""));
							sum_emontctrx = sum_emontctrx + parseInt(test_tablebody.rows[t].cells[5].innerHTML.replace(/\./g, ""));
							sum_emontcamount = sum_emontcamount + parseInt(test_tablebody.rows[t].cells[6].innerHTML.replace(/\./g, ""));
							sum_totaltrx = sum_totaltrx + parseInt(test_tablebody.rows[t].cells[7].innerHTML.replace(/\./g, ""));
							sum_totalamount = sum_totalamount + parseInt(test_tablebody.rows[t].cells[8].innerHTML.replace(/\./g, ""));
						}

						console.log(sum_kaitrx);
						test_tablefoot.innerHTML += '<tr>'+
							'<td style="text-align:left;"><b>Total</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_kaitrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_kaiamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emonttrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emonttamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emontctrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emontcamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_totaltrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_totalamount)+'</b></td>'+
						'</tr>';

						grafikchart(temp_final_pertanggal);
					})();
				}else{
					if(vm_satu == 'All'){
						vm_periode_bulan = vm_periode_bulan.value;
						test_table.innerHTML = 
							'<thead id="test-tablehead">'+
								'<tr>'+
									'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Tanggal</th>'+
									'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">KAI</th>'+
									'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Topup</th>'+
									'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Card</th>'+
									'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Total</th>'+
								'</tr>'+
								'<tr>'+
									'<th style="text-align:center;">Trx</th>'+
									'<th style="text-align:center;">Amount</th>'+
									'<th style="text-align:center;">Trx</th>'+
									'<th style="text-align:center;">Amount</th>'+
									'<th style="text-align:center;">Trx</th>'+
									'<th style="text-align:center;">Amount</th>'+
									'<th style="text-align:center;">Trx</th>'+
									'<th style="text-align:center;">Amount</th>'+
								'</tr>'+
							'</thead>'+
							'<tbody id="test-tablebody">'+
							'</tbody>'+
							'<tfoot id="test-tablefoot">'+
							'</tfoot>';

							var test_tablebody = document.getElementById('test-tablebody');
							var test_tablefoot = document.getElementById('test-tablefoot');
						(async () => {
							var result_KAI = await get('http://27.111.44.42/Percobaan2/get_allmonthkailoc/'+vm_periode_bulan+'/'+lokasi);
							/* var result_Mtopup1 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopup/'+vm_periode_bulan+'/0/15000');
							var result_Mtopup2 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopup/'+vm_periode_bulan+'/15000/15000');
							var result_Mtopup3 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopup/'+vm_periode_bulan+'/30000/15000');
							var result_Mtopup4 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopup/'+vm_periode_bulan+'/45000/15000');
							// var result_Mtopup3 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopup/'+vm_periode_bulan+'/45000/15000');
							var result_Mtopup = [...result_Mtopup1, ...result_Mtopup2, ...result_Mtopup3, ...result_Mtopup4]
							var result_Mcard = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthcard/'+vm_periode_bulan);
							console.log('result_KAI',result_KAI);
							// var temp_result = ;
							console.log('result_Mtopup',result_Mtopup);
							console.log('result_Mcard',result_Mcard);
							var selisihtgl = Math.floor(( Date.parse(tgl_akhir_val) - Date.parse(tgl_awal_val) ) / 86400000);
							*/

							var kai = result_KAI.reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].trx += +date.trx
								}if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								} else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []);
							console.log('testing kai',kai);
							/* var mtopup = result_Mtopup.reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
								} if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								}else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []);
							console.log('testing kai',mtopup ); */
							/* var mcard = result_Mcard.reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
								} if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								}else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []); */

							// penjumlahan berdasarkan tanggal
							kai.sort(waktuCompare);
							/* mtopup.sort(waktuCompare);
							mcard.sort(waktuCompare); */
							var temp_tgl= [...kai/* , ...mtopup, ...mcard */];
							temp_tgl = temp_tgl.reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
								} if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								}else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []);

							console.log(kai);
							/* console.log(mtopup);
							console.log(mcard); */

							var temp_final_mcard = [];
							var temp_final_mtopup = [];
							var temp_final_kai = [];
							for(tglx in temp_tgl){
								/* for(tglu in mcard){
									if(temp_tgl[tglx]['waktu'] == mcard[tglu]['waktu'] ){
										temp_final_mcard.push({
											waktu: (temp_tgl[tglx]['waktu']),
											trx: mcard[tglu]['trx'],
											amount: mcard[tglu]['amount']
										});
									}else if(temp_tgl[tglx]['waktu'] != mcard[tglu]['waktu']){
										temp_final_mcard.push({
											waktu: (temp_tgl[tglx]['waktu']),
											trx: 0,
											amount: 0
										});
									}else if(mcard[tglu]['waktu'] != new_today()){
										temp_final_mcard.push({
											waktu: (new_today()),
											trx: 0,
											amount: 0
										});
									}else {
										temp_final_mcard.push({
											waktu: (new_today()),
											trx: 0,
											amount: 0
										});
									}
								} */
								/* for(tglv in mtopup){
									if(temp_tgl[tglx]['waktu'] == mtopup[tglv]['waktu'] ){
										temp_final_mtopup.push({
											waktu: (temp_tgl[tglx]['waktu']),
											trx: mtopup[tglv]['trx'],
											amount: mtopup[tglv]['amount']
										});
									}else if(temp_tgl[tglx]['waktu'] != mtopup[tglv]['waktu']){
										temp_final_mtopup.push({
											waktu: (temp_tgl[tglx]['waktu']),
											trx: 0,
											amount: 0
										});
									}else{
										temp_final_mtopup.push({
											waktu: (new_today()),
											trx: 0,
											amount: 0
										});
									}
								} */
								
								for(tglt in kai){
									if(temp_tgl[tglx]['waktu'] == kai[tglt]['waktu'] ){
										temp_final_kai.push({
											waktu: (temp_tgl[tglx]['waktu']),
											trx: kai[tglt]['trx'],
											amount: kai[tglt]['amount']
										});
									}else if(temp_tgl[tglx]['waktu'] != kai[tglt]['waktu'] ){
										temp_final_kai.push({
											waktu: (temp_tgl[tglt]['waktu']),
											trx: 0,
											amount: 0
										});
									}
									else{
										temp_final_kai.push({
											waktu: (new_today()),
											trx: 0,
											amount: 0
										});
									}
								}
							}
							/* console.log('tgl', temp_tgl);
							console.log(temp_final_mcard);
							console.log(temp_final_mtopup); */

							
							/* temp_final_mcard = temp_final_mcard.sort(waktuCompare).reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
								} if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								}else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []); */
							/* temp_final_mtopup = temp_final_mtopup.sort(waktuCompare).reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
								} if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								}else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []); */
							temp_final_kai = temp_final_kai.sort(waktuCompare).reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
								} if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								}else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []);

							var temp_final_pertanggal = [/* ...temp_final_mcard, ...temp_final_mtopup, */ ...temp_final_kai]
							temp_final_pertanggal = temp_final_pertanggal.reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
								} if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								}else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []);


							/* console.log('card_clean topup',temp_final_mtopup);
							console.log('card_clean card',temp_final_mcard);
							console.log('temp_final_kai',temp_final_kai);
							console.log('temp_final_pertanggal',temp_final_pertanggal); */
							

							// console.log('temp_final_c',temp_final_c);
							/* var result = [...result_KAI, ...result_Mtopup, ...result_Mcard]; */
							for(x in temp_tgl){
								test_tablebody.innerHTML += '<tr>'+
									'<td style="text-align:center;">'+temp_tgl[x]['waktu']+'</td>'+
									'<td style="text-align:center;">'+rubah(temp_final_kai[x]['trx'])+'</td>'+
									'<td style="text-align:center;">'+rubah(temp_final_kai[x]['amount']) +'</td>'+
									'<td style="text-align:center;">'+0+'</td>'+
									'<td style="text-align:center;">'+0+'</td>'+
									'<td style="text-align:center;">'+0+'</td>'+
									'<td style="text-align:center;">'+0+'</td>'+
									'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['trx'] )+'</td>'+
									'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['amount']) +'</td>'+
								'</tr>';
							}

							var sum_kaitrx = 0;
							var sum_kaiamount = 0;
							var sum_emonttrx = 0;
							var sum_emonttamount = 0;
							var sum_emontctrx = 0;
							var sum_emontcamount = 0;
							var sum_totaltrx = 0;
							var sum_totalamount = 0;
							for(var t = 0; t < test_tablebody.rows.length; t++){
								sum_kaitrx = sum_kaitrx + parseInt(test_tablebody.rows[t].cells[1].innerHTML.replace(/\./g, ""));
								sum_kaiamount = sum_kaiamount + parseInt(test_tablebody.rows[t].cells[2].innerHTML.replace(/\./g, ""));
								sum_emonttrx = sum_emonttrx + parseInt(test_tablebody.rows[t].cells[3].innerHTML.replace(/\./g, ""));
								sum_emonttamount = sum_emonttamount + parseInt(test_tablebody.rows[t].cells[4].innerHTML.replace(/\./g, ""));
								sum_emontctrx = sum_emontctrx + parseInt(test_tablebody.rows[t].cells[5].innerHTML.replace(/\./g, ""));
								sum_emontcamount = sum_emontcamount + parseInt(test_tablebody.rows[t].cells[6].innerHTML.replace(/\./g, ""));
								sum_totaltrx = sum_totaltrx + parseInt(test_tablebody.rows[t].cells[7].innerHTML.replace(/\./g, ""));
								sum_totalamount = sum_totalamount + parseInt(test_tablebody.rows[t].cells[8].innerHTML.replace(/\./g, ""));
							}

							console.log(sum_kaitrx);
							test_tablefoot.innerHTML += '<tr>'+
								'<td style="text-align:left;"><b>Total</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_kaitrx)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_kaiamount)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_emonttrx)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_emonttamount)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_emontctrx)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_emontcamount)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_totaltrx)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_totalamount)+'</b></td>'+
							'</tr>';

							grafikchart(temp_final_pertanggal);
						})();
					}else{
						vm_periode_bulan = vm_periode_bulan.value;
						test_table.innerHTML = 
							'<thead id="test-tablehead">'+
								'<tr>'+
									'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Tanggal</th>'+
									'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">KAI</th>'+
									'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Topup</th>'+
									'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Card</th>'+
									'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Total</th>'+
								'</tr>'+
								'<tr>'+
									'<th style="text-align:center;">Trx</th>'+
									'<th style="text-align:center;">Amount</th>'+
									'<th style="text-align:center;">Trx</th>'+
									'<th style="text-align:center;">Amount</th>'+
									'<th style="text-align:center;">Trx</th>'+
									'<th style="text-align:center;">Amount</th>'+
									'<th style="text-align:center;">Trx</th>'+
									'<th style="text-align:center;">Amount</th>'+
								'</tr>'+
							'</thead>'+
							'<tbody id="test-tablebody">'+
							'</tbody>'+
							'<tfoot id="test-tablefoot">'+
							'</tfoot>';

							var test_tablebody = document.getElementById('test-tablebody');
							var test_tablefoot = document.getElementById('test-tablefoot');
						(async () => {
							var result_KAI = await get('http://27.111.44.42/Percobaan2/get_allmonthkailocterm/'+vm_periode_bulan+'/'+lokasi+'/'+vm_satu);
							/* var result_Mtopup1 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopup/'+vm_periode_bulan+'/0/15000');
							var result_Mtopup2 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopup/'+vm_periode_bulan+'/15000/15000');
							var result_Mtopup3 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopup/'+vm_periode_bulan+'/30000/15000');
							var result_Mtopup4 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopup/'+vm_periode_bulan+'/45000/15000');
							// var result_Mtopup3 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopup/'+vm_periode_bulan+'/45000/15000');
							var result_Mtopup = [...result_Mtopup1, ...result_Mtopup2, ...result_Mtopup3, ...result_Mtopup4]
							var result_Mcard = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthcard/'+vm_periode_bulan);
							console.log('result_KAI',result_KAI);
							// var temp_result = ;
							console.log('result_Mtopup',result_Mtopup);
							console.log('result_Mcard',result_Mcard);
							var selisihtgl = Math.floor(( Date.parse(tgl_akhir_val) - Date.parse(tgl_awal_val) ) / 86400000);
							*/

							var kai = result_KAI.reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].trx += +date.trx
								}if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								} else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []);
							console.log('testing kai',kai);
							/* var mtopup = result_Mtopup.reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
								} if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								}else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []);
							console.log('testing kai',mtopup ); */
							/* var mcard = result_Mcard.reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
								} if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								}else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []); */

							// penjumlahan berdasarkan tanggal
							kai.sort(waktuCompare);
							/* mtopup.sort(waktuCompare);
							mcard.sort(waktuCompare); */
							var temp_tgl= [...kai/* , ...mtopup, ...mcard */];
							temp_tgl = temp_tgl.reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
								} if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								}else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []);

							console.log(kai);
							/* console.log(mtopup);
							console.log(mcard); */

							var temp_final_mcard = [];
							var temp_final_mtopup = [];
							var temp_final_kai = [];
							for(tglx in temp_tgl){
								/* for(tglu in mcard){
									if(temp_tgl[tglx]['waktu'] == mcard[tglu]['waktu'] ){
										temp_final_mcard.push({
											waktu: (temp_tgl[tglx]['waktu']),
											trx: mcard[tglu]['trx'],
											amount: mcard[tglu]['amount']
										});
									}else if(temp_tgl[tglx]['waktu'] != mcard[tglu]['waktu']){
										temp_final_mcard.push({
											waktu: (temp_tgl[tglx]['waktu']),
											trx: 0,
											amount: 0
										});
									}else if(mcard[tglu]['waktu'] != new_today()){
										temp_final_mcard.push({
											waktu: (new_today()),
											trx: 0,
											amount: 0
										});
									}else {
										temp_final_mcard.push({
											waktu: (new_today()),
											trx: 0,
											amount: 0
										});
									}
								} */
								/* for(tglv in mtopup){
									if(temp_tgl[tglx]['waktu'] == mtopup[tglv]['waktu'] ){
										temp_final_mtopup.push({
											waktu: (temp_tgl[tglx]['waktu']),
											trx: mtopup[tglv]['trx'],
											amount: mtopup[tglv]['amount']
										});
									}else if(temp_tgl[tglx]['waktu'] != mtopup[tglv]['waktu']){
										temp_final_mtopup.push({
											waktu: (temp_tgl[tglx]['waktu']),
											trx: 0,
											amount: 0
										});
									}else{
										temp_final_mtopup.push({
											waktu: (new_today()),
											trx: 0,
											amount: 0
										});
									}
								} */
								
								for(tglt in kai){
									if(temp_tgl[tglx]['waktu'] == kai[tglt]['waktu'] ){
										temp_final_kai.push({
											waktu: (temp_tgl[tglx]['waktu']),
											trx: kai[tglt]['trx'],
											amount: kai[tglt]['amount']
										});
									}else if(temp_tgl[tglx]['waktu'] != kai[tglt]['waktu'] ){
										temp_final_kai.push({
											waktu: (temp_tgl[tglt]['waktu']),
											trx: 0,
											amount: 0
										});
									}
									else{
										temp_final_kai.push({
											waktu: (new_today()),
											trx: 0,
											amount: 0
										});
									}
								}
							}
							/* console.log('tgl', temp_tgl);
							console.log(temp_final_mcard);
							console.log(temp_final_mtopup); */

							
							/* temp_final_mcard = temp_final_mcard.sort(waktuCompare).reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
								} if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								}else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []); */
							/* temp_final_mtopup = temp_final_mtopup.sort(waktuCompare).reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
								} if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								}else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []); */
							temp_final_kai = temp_final_kai.sort(waktuCompare).reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
								} if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								}else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []);

							var temp_final_pertanggal = [/* ...temp_final_mcard, ...temp_final_mtopup, */ ...temp_final_kai]
							temp_final_pertanggal = temp_final_pertanggal.reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
								} if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								}else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []);


							/* console.log('card_clean topup',temp_final_mtopup);
							console.log('card_clean card',temp_final_mcard);
							console.log('temp_final_kai',temp_final_kai);
							console.log('temp_final_pertanggal',temp_final_pertanggal); */
							

							// console.log('temp_final_c',temp_final_c);
							/* var result = [...result_KAI, ...result_Mtopup, ...result_Mcard]; */
							for(x in temp_tgl){
								test_tablebody.innerHTML += '<tr>'+
									'<td style="text-align:center;">'+temp_tgl[x]['waktu']+'</td>'+
									'<td style="text-align:center;">'+rubah(temp_final_kai[x]['trx'])+'</td>'+
									'<td style="text-align:center;">'+rubah(temp_final_kai[x]['amount']) +'</td>'+
									'<td style="text-align:center;">'+0+'</td>'+
									'<td style="text-align:center;">'+0+'</td>'+
									'<td style="text-align:center;">'+0+'</td>'+
									'<td style="text-align:center;">'+0+'</td>'+
									'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['trx'] )+'</td>'+
									'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['amount']) +'</td>'+
								'</tr>';
							}

							var sum_kaitrx = 0;
							var sum_kaiamount = 0;
							var sum_emonttrx = 0;
							var sum_emonttamount = 0;
							var sum_emontctrx = 0;
							var sum_emontcamount = 0;
							var sum_totaltrx = 0;
							var sum_totalamount = 0;
							for(var t = 0; t < test_tablebody.rows.length; t++){
								sum_kaitrx = sum_kaitrx + parseInt(test_tablebody.rows[t].cells[1].innerHTML.replace(/\./g, ""));
								sum_kaiamount = sum_kaiamount + parseInt(test_tablebody.rows[t].cells[2].innerHTML.replace(/\./g, ""));
								sum_emonttrx = sum_emonttrx + parseInt(test_tablebody.rows[t].cells[3].innerHTML.replace(/\./g, ""));
								sum_emonttamount = sum_emonttamount + parseInt(test_tablebody.rows[t].cells[4].innerHTML.replace(/\./g, ""));
								sum_emontctrx = sum_emontctrx + parseInt(test_tablebody.rows[t].cells[5].innerHTML.replace(/\./g, ""));
								sum_emontcamount = sum_emontcamount + parseInt(test_tablebody.rows[t].cells[6].innerHTML.replace(/\./g, ""));
								sum_totaltrx = sum_totaltrx + parseInt(test_tablebody.rows[t].cells[7].innerHTML.replace(/\./g, ""));
								sum_totalamount = sum_totalamount + parseInt(test_tablebody.rows[t].cells[8].innerHTML.replace(/\./g, ""));
							}

							console.log(sum_kaitrx);
							test_tablefoot.innerHTML += '<tr>'+
								'<td style="text-align:left;"><b>Total</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_kaitrx)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_kaiamount)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_emonttrx)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_emonttamount)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_emontctrx)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_emontcamount)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_totaltrx)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_totalamount)+'</b></td>'+
							'</tr>';

							grafikchart(temp_final_pertanggal);
						})();
					}
				}
			
			}else if(vm_group_testing.options[vm_group_testing.selectedIndex].text == 'BB'){
				if(vm_satu == 'All'){
					vm_periode_bulan = vm_periode_bulan.value;
					test_table.innerHTML = 
						'<thead id="test-tablehead">'+
							'<tr>'+
								'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Tanggal</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">KAI</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Topup</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Card</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Total</th>'+
							'</tr>'+
							'<tr>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
							'</tr>'+
						'</thead>'+
						'<tbody id="test-tablebody">'+
						'</tbody>'+
						'<tfoot id="test-tablefoot">'+
						'</tfoot>';

						var test_tablebody = document.getElementById('test-tablebody');
						var test_tablefoot = document.getElementById('test-tablefoot');
						vm_group_testing = vm_group_testing.value;
					(async () => {
						// var result_KAI = await get('http://27.111.44.42/Percobaan2/get_allmonthkai/'+vm_periode_bulan);
						var result_Mtopup1 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopupgrup/'+vm_periode_bulan+'/'+vm_group_testing+'/0/15000');
						var result_Mtopup2 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopupgrup/'+vm_periode_bulan+'/'+vm_group_testing+'/15000/15000');
						var result_Mtopup3 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopupgrup/'+vm_periode_bulan+'/'+vm_group_testing+'/30000/15000');
						var result_Mtopup4 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopupgrup/'+vm_periode_bulan+'/'+vm_group_testing+'/45000/15000');
						// var result_Mtopup3 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopup/'+vm_periode_bulan+'/45000/15000');
						var result_Mtopup = [...result_Mtopup1, ...result_Mtopup2, ...result_Mtopup3, ...result_Mtopup4]
						var result_Mcard = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthcardgrup/'+vm_periode_bulan+'/'+vm_group_testing);
						// console.log('result_KAI',result_KAI);
						// var temp_result = ;
						console.log('result_Mtopup',result_Mtopup);
						console.log('result_Mcard',result_Mcard);
						for(a in result_Mtopup){
							if(typeof result_Mcard !== 'undefined'){
								result_Mcard.push({
									waktu: result_Mtopup[a]['waktu'],
									trx: Number(0),
									amount: Number(0)
								})
							}
						}
						var selisihtgl = Math.floor(( Date.parse(tgl_akhir_val) - Date.parse(tgl_awal_val) ) / 86400000);
						

						/* var kai = result_KAI.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
							}if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							} else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						console.log('testing kai',kai); */
						var mtopup = result_Mtopup.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						console.log('testing kai',mtopup );
						var mcard = result_Mcard.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);

						// penjumlahan berdasarkan tanggal
						// kai.sort(waktuCompare);
						mtopup.sort(waktuCompare);
						mcard.sort(waktuCompare);
						var temp_tgl= [/* ...kai,  */...mtopup, ...mcard];
						temp_tgl = temp_tgl.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);

						// console.log(kai);
						/* console.log(mtopup);
						console.log(mcard); */

						var temp_final_mcard = [];
						var temp_final_mtopup = [];
						var temp_final_kai = [];
						for(tglx in temp_tgl){
							for(tglu in mcard){
								if(temp_tgl[tglx]['waktu'] == mcard[tglu]['waktu'] ){
									temp_final_mcard.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: mcard[tglu]['trx'],
										amount: mcard[tglu]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != mcard[tglu]['waktu']){
									temp_final_mcard.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: 0,
										amount: 0
									});
								}else if(mcard[tglu]['waktu'] != new_today()){
									temp_final_mcard.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}else {
									temp_final_mcard.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							}
							for(tglv in mtopup){
								if(temp_tgl[tglx]['waktu'] == mtopup[tglv]['waktu'] ){
									temp_final_mtopup.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: mtopup[tglv]['trx'],
										amount: mtopup[tglv]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != mtopup[tglv]['waktu']){
									temp_final_mtopup.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: 0,
										amount: 0
									});
								}else{
									temp_final_mtopup.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							}
							
							/* for(tglt in kai){
								if(temp_tgl[tglx]['waktu'] == kai[tglt]['waktu'] ){
									temp_final_kai.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: kai[tglt]['trx'],
										amount: kai[tglt]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != kai[tglt]['waktu'] ){
									temp_final_kai.push({
										waktu: (temp_tgl[tglt]['waktu']),
										trx: 0,
										amount: 0
									});
								}
								else{
									temp_final_kai.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							} */
						}
						/* console.log('tgl', temp_tgl);
						console.log(temp_final_mcard);
						console.log(temp_final_mtopup); */

						
						temp_final_mcard = temp_final_mcard.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						temp_final_mtopup = temp_final_mtopup.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						/* temp_final_kai = temp_final_kai.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []); */

						var temp_final_pertanggal = [...temp_final_mcard, ...temp_final_mtopup/* , ...temp_final_kai */]
						temp_final_pertanggal = temp_final_pertanggal.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);


						/* console.log('card_clean topup',temp_final_mtopup);
						console.log('card_clean card',temp_final_mcard);
						console.log('temp_final_kai',temp_final_kai);
						console.log('temp_final_pertanggal',temp_final_pertanggal); */
						

						// console.log('temp_final_c',temp_final_c);
						/* var result = [...result_KAI, ...result_Mtopup, ...result_Mcard]; */
						for(x in temp_tgl){
							test_tablebody.innerHTML += '<tr>'+
								'<td style="text-align:center;">'+temp_tgl[x]['waktu']+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['trx'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['amount'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mcard[x]['trx'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mcard[x]['amount'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['trx'] )+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['amount']) +'</td>'+
							'</tr>';
						}

						var sum_kaitrx = 0;
						var sum_kaiamount = 0;
						var sum_emonttrx = 0;
						var sum_emonttamount = 0;
						var sum_emontctrx = 0;
						var sum_emontcamount = 0;
						var sum_totaltrx = 0;
						var sum_totalamount = 0;
						for(var t = 0; t < test_tablebody.rows.length; t++){
							sum_kaitrx = sum_kaitrx + parseInt(test_tablebody.rows[t].cells[1].innerHTML.replace(/\./g, ""));
							sum_kaiamount = sum_kaiamount + parseInt(test_tablebody.rows[t].cells[2].innerHTML.replace(/\./g, ""));
							sum_emonttrx = sum_emonttrx + parseInt(test_tablebody.rows[t].cells[3].innerHTML.replace(/\./g, ""));
							sum_emonttamount = sum_emonttamount + parseInt(test_tablebody.rows[t].cells[4].innerHTML.replace(/\./g, ""));
							sum_emontctrx = sum_emontctrx + parseInt(test_tablebody.rows[t].cells[5].innerHTML.replace(/\./g, ""));
							sum_emontcamount = sum_emontcamount + parseInt(test_tablebody.rows[t].cells[6].innerHTML.replace(/\./g, ""));
							sum_totaltrx = sum_totaltrx + parseInt(test_tablebody.rows[t].cells[7].innerHTML.replace(/\./g, ""));
							sum_totalamount = sum_totalamount + parseInt(test_tablebody.rows[t].cells[8].innerHTML.replace(/\./g, ""));
						}

						console.log(sum_kaitrx);
						test_tablefoot.innerHTML += '<tr>'+
							'<td style="text-align:left;"><b>Total</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_kaitrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_kaiamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emonttrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emonttamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emontctrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emontcamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_totaltrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_totalamount)+'</b></td>'+
						'</tr>';

						grafikchart(temp_final_pertanggal);
					})();
				}else{
					vm_periode_bulan = vm_periode_bulan.value;
					test_table.innerHTML = 
						'<thead id="test-tablehead">'+
							'<tr>'+
								'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Tanggal</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">KAI</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Topup</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Card</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Total</th>'+
							'</tr>'+
							'<tr>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
							'</tr>'+
						'</thead>'+
						'<tbody id="test-tablebody">'+
						'</tbody>'+
						'<tfoot id="test-tablefoot">'+
						'</tfoot>';

						var test_tablebody = document.getElementById('test-tablebody');
						var test_tablefoot = document.getElementById('test-tablefoot');
						vm_group_testing = vm_group_testing.value;
					(async () => {
						// var result_KAI = await get('http://27.111.44.42/Percobaan2/get_allmonthkai/'+vm_periode_bulan);
						var result_Mtopup1 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopupgrupterm/'+vm_periode_bulan+'/'+vm_group_testing+'/'+vm_satu+'/0/15000');
						var result_Mtopup2 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopupgrupterm/'+vm_periode_bulan+'/'+vm_group_testing+'/'+vm_satu+'/15000/15000');
						var result_Mtopup3 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopupgrupterm/'+vm_periode_bulan+'/'+vm_group_testing+'/'+vm_satu+'/30000/15000');
						var result_Mtopup4 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopupgrupterm/'+vm_periode_bulan+'/'+vm_group_testing+'/'+vm_satu+'/45000/15000');
						// var result_Mtopup3 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopup/'+vm_periode_bulan+'/45000/15000');
						var result_Mtopup = [...result_Mtopup1, ...result_Mtopup2, ...result_Mtopup3, ...result_Mtopup4]
						var result_Mcard = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthcardgrupterm/'+vm_periode_bulan+'/'+vm_group_testing+'/'+vm_satu);
						// console.log('result_KAI',result_KAI);
						// var temp_result = ;
						console.log('result_Mtopup',result_Mtopup);
						console.log('result_Mcard',result_Mcard);

						for(a in result_Mtopup){
							if(typeof result_Mcard !== 'undefined'){
								result_Mcard.push({
									waktu: result_Mtopup[a]['waktu'],
									trx: Number(0),
									amount: Number(0)
								})
							}
						}
						var selisihtgl = Math.floor(( Date.parse(tgl_akhir_val) - Date.parse(tgl_awal_val) ) / 86400000);
						

						/* var kai = result_KAI.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
							}if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							} else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						console.log('testing kai',kai); */
						var mtopup = result_Mtopup.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						console.log('testing kai',mtopup );
						var mcard = result_Mcard.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);

						// penjumlahan berdasarkan tanggal
						// kai.sort(waktuCompare);
						mtopup.sort(waktuCompare);
						mcard.sort(waktuCompare);
						var temp_tgl= [/* ...kai,  */...mtopup, ...mcard];
						temp_tgl = temp_tgl.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);

						// console.log(kai);
						/* console.log(mtopup);
						console.log(mcard); */

						var temp_final_mcard = [];
						var temp_final_mtopup = [];
						var temp_final_kai = [];
						for(tglx in temp_tgl){
							for(tglu in mcard){
								if(temp_tgl[tglx]['waktu'] == mcard[tglu]['waktu'] ){
									temp_final_mcard.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: mcard[tglu]['trx'],
										amount: mcard[tglu]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != mcard[tglu]['waktu']){
									temp_final_mcard.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: 0,
										amount: 0
									});
								}else if(mcard[tglu]['waktu'] != new_today()){
									temp_final_mcard.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}else {
									temp_final_mcard.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							}
							for(tglv in mtopup){
								if(temp_tgl[tglx]['waktu'] == mtopup[tglv]['waktu'] ){
									temp_final_mtopup.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: mtopup[tglv]['trx'],
										amount: mtopup[tglv]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != mtopup[tglv]['waktu']){
									temp_final_mtopup.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: 0,
										amount: 0
									});
								}else{
									temp_final_mtopup.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							}
							
							/* for(tglt in kai){
								if(temp_tgl[tglx]['waktu'] == kai[tglt]['waktu'] ){
									temp_final_kai.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: kai[tglt]['trx'],
										amount: kai[tglt]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != kai[tglt]['waktu'] ){
									temp_final_kai.push({
										waktu: (temp_tgl[tglt]['waktu']),
										trx: 0,
										amount: 0
									});
								}
								else{
									temp_final_kai.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							} */
						}
						/* console.log('tgl', temp_tgl);
						console.log(temp_final_mcard);
						console.log(temp_final_mtopup); */

						
						temp_final_mcard = temp_final_mcard.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						temp_final_mtopup = temp_final_mtopup.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						/* temp_final_kai = temp_final_kai.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []); */

						var temp_final_pertanggal = [...temp_final_mcard, ...temp_final_mtopup/* , ...temp_final_kai */]
						temp_final_pertanggal = temp_final_pertanggal.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);


						/* console.log('card_clean topup',temp_final_mtopup);
						console.log('card_clean card',temp_final_mcard);
						console.log('temp_final_kai',temp_final_kai);
						console.log('temp_final_pertanggal',temp_final_pertanggal); */
						

						// console.log('temp_final_c',temp_final_c);
						/* var result = [...result_KAI, ...result_Mtopup, ...result_Mcard]; */
						for(x in temp_tgl){
							test_tablebody.innerHTML += '<tr>'+
								'<td style="text-align:center;">'+temp_tgl[x]['waktu']+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['trx'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['amount'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mcard[x]['trx'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mcard[x]['amount'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['trx'] )+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['amount']) +'</td>'+
							'</tr>';
						}

						var sum_kaitrx = 0;
						var sum_kaiamount = 0;
						var sum_emonttrx = 0;
						var sum_emonttamount = 0;
						var sum_emontctrx = 0;
						var sum_emontcamount = 0;
						var sum_totaltrx = 0;
						var sum_totalamount = 0;
						for(var t = 0; t < test_tablebody.rows.length; t++){
							sum_kaitrx = sum_kaitrx + parseInt(test_tablebody.rows[t].cells[1].innerHTML.replace(/\./g, ""));
							sum_kaiamount = sum_kaiamount + parseInt(test_tablebody.rows[t].cells[2].innerHTML.replace(/\./g, ""));
							sum_emonttrx = sum_emonttrx + parseInt(test_tablebody.rows[t].cells[3].innerHTML.replace(/\./g, ""));
							sum_emonttamount = sum_emonttamount + parseInt(test_tablebody.rows[t].cells[4].innerHTML.replace(/\./g, ""));
							sum_emontctrx = sum_emontctrx + parseInt(test_tablebody.rows[t].cells[5].innerHTML.replace(/\./g, ""));
							sum_emontcamount = sum_emontcamount + parseInt(test_tablebody.rows[t].cells[6].innerHTML.replace(/\./g, ""));
							sum_totaltrx = sum_totaltrx + parseInt(test_tablebody.rows[t].cells[7].innerHTML.replace(/\./g, ""));
							sum_totalamount = sum_totalamount + parseInt(test_tablebody.rows[t].cells[8].innerHTML.replace(/\./g, ""));
						}

						console.log(sum_kaitrx);
						test_tablefoot.innerHTML += '<tr>'+
							'<td style="text-align:left;"><b>Total</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_kaitrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_kaiamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emonttrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emonttamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emontctrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emontcamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_totaltrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_totalamount)+'</b></td>'+
						'</tr>';

						grafikchart(temp_final_pertanggal);
					})();
				}
				
			}else{
				vm_periode_bulan = vm_periode_bulan.value;
				test_table.innerHTML = 
					'<thead id="test-tablehead">'+
						'<tr>'+
							'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Tanggal</th>'+
							'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">KAI</th>'+
							'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Topup</th>'+
							'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Card</th>'+
							'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Total</th>'+
						'</tr>'+
						'<tr>'+
							'<th style="text-align:center;">Trx</th>'+
							'<th style="text-align:center;">Amount</th>'+
							'<th style="text-align:center;">Trx</th>'+
							'<th style="text-align:center;">Amount</th>'+
							'<th style="text-align:center;">Trx</th>'+
							'<th style="text-align:center;">Amount</th>'+
							'<th style="text-align:center;">Trx</th>'+
							'<th style="text-align:center;">Amount</th>'+
						'</tr>'+
					'</thead>'+
					'<tbody id="test-tablebody">'+
					'</tbody>'+
					'<tfoot id="test-tablefoot">'+
					'</tfoot>';

					var test_tablebody = document.getElementById('test-tablebody');
					var test_tablefoot = document.getElementById('test-tablefoot');
					vm_group_testing = vm_group_testing.value;
				(async () => {
					// var result_KAI = await get('http://27.111.44.42/Percobaan2/get_allmonthkai/'+vm_periode_bulan);
					var result_Mtopup1 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopupgrup/'+vm_periode_bulan+'/'+vm_group_testing+'/0/15000');
					var result_Mtopup2 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopupgrup/'+vm_periode_bulan+'/'+vm_group_testing+'/15000/15000');
					var result_Mtopup3 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopupgrup/'+vm_periode_bulan+'/'+vm_group_testing+'/30000/15000');
					var result_Mtopup4 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopupgrup/'+vm_periode_bulan+'/'+vm_group_testing+'/45000/15000');
					// var result_Mtopup3 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopup/'+vm_periode_bulan+'/45000/15000');
					var result_Mtopup = [...result_Mtopup1, ...result_Mtopup2, ...result_Mtopup3, ...result_Mtopup4]
					var result_Mcard = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthcardgrup/'+vm_periode_bulan);
					// console.log('result_KAI',result_KAI);
					// var temp_result = ;
					console.log('result_Mtopup',result_Mtopup);
					console.log('result_Mcard',result_Mcard);
					
						for(a in result_Mtopup){
							if(typeof result_Mcard !== 'undefined'){
								result_Mcard.push({
									waktu: result_Mtopup[a]['waktu'],
									trx: Number(0),
									amount: Number(0)
								})
							}
						}
					console.log(result_Mcard);
					var selisihtgl = Math.floor(( Date.parse(tgl_akhir_val) - Date.parse(tgl_awal_val) ) / 86400000);
					

					/* var kai = result_KAI.reduce(function(allDates, date) {
						if (allDates.some(function(e) {
							return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
						}if(allDates.some(function(e) {
							return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].amount += +date.amount
						} else {
						allDates.push({
							waktu: date.waktu,
							trx: +date.trx,
							amount: +date.amount
						})
						}
						return allDates
					}, []);
					console.log('testing kai',kai); */
					var mtopup = result_Mtopup.reduce(function(allDates, date) {
						if (allDates.some(function(e) {
							return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].trx += +date.trx
						} if(allDates.some(function(e) {
							return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].amount += +date.amount
						}else {
						allDates.push({
							waktu: date.waktu,
							trx: +date.trx,
							amount: +date.amount
						})
						}
						return allDates
					}, []);
					console.log('testing kai',mtopup );
					var mcard = result_Mcard.reduce(function(allDates, date) {
						if (allDates.some(function(e) {
							return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].trx += +date.trx
						} if(allDates.some(function(e) {
							return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].amount += +date.amount
						}else {
						allDates.push({
							waktu: date.waktu,
							trx: +date.trx,
							amount: +date.amount
						})
						}
						return allDates
					}, []);

					// penjumlahan berdasarkan tanggal
					// kai.sort(waktuCompare);
					mtopup.sort(waktuCompare);
					mcard.sort(waktuCompare);
					var temp_tgl= [/* ...kai,  */...mtopup, ...mcard];
					temp_tgl = temp_tgl.reduce(function(allDates, date) {
						if (allDates.some(function(e) {
							return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].trx += +date.trx
						} if(allDates.some(function(e) {
							return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].amount += +date.amount
						}else {
						allDates.push({
							waktu: date.waktu,
							trx: +date.trx,
							amount: +date.amount
						})
						}
						return allDates
					}, []);

					// console.log(kai);
					/* console.log(mtopup);
					console.log(mcard); */

					var temp_final_mcard = [];
					var temp_final_mtopup = [];
					var temp_final_kai = [];
					for(tglx in temp_tgl){
						for(tglu in mcard){
							if(temp_tgl[tglx]['waktu'] == mcard[tglu]['waktu'] ){
								temp_final_mcard.push({
									waktu: (temp_tgl[tglx]['waktu']),
									trx: mcard[tglu]['trx'],
									amount: mcard[tglu]['amount']
								});
							}else if(temp_tgl[tglx]['waktu'] != mcard[tglu]['waktu']){
								temp_final_mcard.push({
									waktu: (temp_tgl[tglx]['waktu']),
									trx: 0,
									amount: 0
								});
							}else if(mcard[tglu]['waktu'] != new_today()){
								temp_final_mcard.push({
									waktu: (new_today()),
									trx: 0,
									amount: 0
								});
							}else {
								temp_final_mcard.push({
									waktu: (new_today()),
									trx: 0,
									amount: 0
								});
							}
						}
						for(tglv in mtopup){
							if(temp_tgl[tglx]['waktu'] == mtopup[tglv]['waktu'] ){
								temp_final_mtopup.push({
									waktu: (temp_tgl[tglx]['waktu']),
									trx: mtopup[tglv]['trx'],
									amount: mtopup[tglv]['amount']
								});
							}else if(temp_tgl[tglx]['waktu'] != mtopup[tglv]['waktu']){
								temp_final_mtopup.push({
									waktu: (temp_tgl[tglx]['waktu']),
									trx: 0,
									amount: 0
								});
							}else{
								temp_final_mtopup.push({
									waktu: (new_today()),
									trx: 0,
									amount: 0
								});
							}
						}
						
						/* for(tglt in kai){
							if(temp_tgl[tglx]['waktu'] == kai[tglt]['waktu'] ){
								temp_final_kai.push({
									waktu: (temp_tgl[tglx]['waktu']),
									trx: kai[tglt]['trx'],
									amount: kai[tglt]['amount']
								});
							}else if(temp_tgl[tglx]['waktu'] != kai[tglt]['waktu'] ){
								temp_final_kai.push({
									waktu: (temp_tgl[tglt]['waktu']),
									trx: 0,
									amount: 0
								});
							}
							else{
								temp_final_kai.push({
									waktu: (new_today()),
									trx: 0,
									amount: 0
								});
							}
						} */
					}
					/* console.log('tgl', temp_tgl);
					console.log(temp_final_mcard);
					console.log(temp_final_mtopup); */

					
					temp_final_mcard = temp_final_mcard.sort(waktuCompare).reduce(function(allDates, date) {
						if (allDates.some(function(e) {
							return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].trx += +date.trx
						} if(allDates.some(function(e) {
							return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].amount += +date.amount
						}else {
						allDates.push({
							waktu: date.waktu,
							trx: +date.trx,
							amount: +date.amount
						})
						}
						return allDates
					}, []);
					temp_final_mtopup = temp_final_mtopup.sort(waktuCompare).reduce(function(allDates, date) {
						if (allDates.some(function(e) {
							return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].trx += +date.trx
						} if(allDates.some(function(e) {
							return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].amount += +date.amount
						}else {
						allDates.push({
							waktu: date.waktu,
							trx: +date.trx,
							amount: +date.amount
						})
						}
						return allDates
					}, []);
					/* temp_final_kai = temp_final_kai.sort(waktuCompare).reduce(function(allDates, date) {
						if (allDates.some(function(e) {
							return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].trx += +date.trx
						} if(allDates.some(function(e) {
							return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].amount += +date.amount
						}else {
						allDates.push({
							waktu: date.waktu,
							trx: +date.trx,
							amount: +date.amount
						})
						}
						return allDates
					}, []); */

					var temp_final_pertanggal = [...temp_final_mcard, ...temp_final_mtopup/* , ...temp_final_kai */]
					temp_final_pertanggal = temp_final_pertanggal.reduce(function(allDates, date) {
						if (allDates.some(function(e) {
							return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].trx += +date.trx
						} if(allDates.some(function(e) {
							return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].amount += +date.amount
						}else {
						allDates.push({
							waktu: date.waktu,
							trx: +date.trx,
							amount: +date.amount
						})
						}
						return allDates
					}, []);


					/* console.log('card_clean topup',temp_final_mtopup);
					console.log('card_clean card',temp_final_mcard);
					console.log('temp_final_kai',temp_final_kai);
					console.log('temp_final_pertanggal',temp_final_pertanggal); */
					

					// console.log('temp_final_c',temp_final_c);
					/* var result = [...result_KAI, ...result_Mtopup, ...result_Mcard]; */
					for(x in temp_tgl){
						test_tablebody.innerHTML += '<tr>'+
							'<td style="text-align:center;">'+temp_tgl[x]['waktu']+'</td>'+
							'<td style="text-align:center;">'+0+'</td>'+
							'<td style="text-align:center;">'+0+'</td>'+
							'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['trx'])+'</td>'+
							'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['amount'])+'</td>'+
							'<td style="text-align:center;">'+rubah(temp_final_mcard[x]['trx'])+'</td>'+
							'<td style="text-align:center;">'+rubah(temp_final_mcard[x]['amount'])+'</td>'+
							'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['trx'] )+'</td>'+
							'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['amount']) +'</td>'+
						'</tr>';
					}

					var sum_kaitrx = 0;
					var sum_kaiamount = 0;
					var sum_emonttrx = 0;
					var sum_emonttamount = 0;
					var sum_emontctrx = 0;
					var sum_emontcamount = 0;
					var sum_totaltrx = 0;
					var sum_totalamount = 0;
					for(var t = 0; t < test_tablebody.rows.length; t++){
						sum_kaitrx = sum_kaitrx + parseInt(test_tablebody.rows[t].cells[1].innerHTML.replace(/\./g, ""));
						sum_kaiamount = sum_kaiamount + parseInt(test_tablebody.rows[t].cells[2].innerHTML.replace(/\./g, ""));
						sum_emonttrx = sum_emonttrx + parseInt(test_tablebody.rows[t].cells[3].innerHTML.replace(/\./g, ""));
						sum_emonttamount = sum_emonttamount + parseInt(test_tablebody.rows[t].cells[4].innerHTML.replace(/\./g, ""));
						sum_emontctrx = sum_emontctrx + parseInt(test_tablebody.rows[t].cells[5].innerHTML.replace(/\./g, ""));
						sum_emontcamount = sum_emontcamount + parseInt(test_tablebody.rows[t].cells[6].innerHTML.replace(/\./g, ""));
						sum_totaltrx = sum_totaltrx + parseInt(test_tablebody.rows[t].cells[7].innerHTML.replace(/\./g, ""));
						sum_totalamount = sum_totalamount + parseInt(test_tablebody.rows[t].cells[8].innerHTML.replace(/\./g, ""));
					}

					console.log(sum_kaitrx);
					test_tablefoot.innerHTML += '<tr>'+
						'<td style="text-align:left;"><b>Total</b></td>'+
						'<td style="text-align:center;"><b>'+rubah(sum_kaitrx)+'</b></td>'+
						'<td style="text-align:center;"><b>'+rubah(sum_kaiamount)+'</b></td>'+
						'<td style="text-align:center;"><b>'+rubah(sum_emonttrx)+'</b></td>'+
						'<td style="text-align:center;"><b>'+rubah(sum_emonttamount)+'</b></td>'+
						'<td style="text-align:center;"><b>'+rubah(sum_emontctrx)+'</b></td>'+
						'<td style="text-align:center;"><b>'+rubah(sum_emontcamount)+'</b></td>'+
						'<td style="text-align:center;"><b>'+rubah(sum_totaltrx)+'</b></td>'+
						'<td style="text-align:center;"><b>'+rubah(sum_totalamount)+'</b></td>'+
					'</tr>';

					grafikchart(temp_final_pertanggal);
				})();
			}
		}else if(vm_periode.options[vm_periode.selectedIndex].value == 'tahun'){
			if(vm_group_testing.options[vm_group_testing.selectedIndex].text == 'KAI'){
				if(lokasi == 'All'){
					
						vm_periodetahun = vm_periodetahun.value;
						test_table.innerHTML = 
						'<thead id="test-tablehead">'+
							'<tr>'+
								'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Tanggal</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">KAI</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Topup</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Card</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Total</th>'+
							'</tr>'+
							'<tr>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
							'</tr>'+
						'</thead>'+
						'<tbody id="test-tablebody">'+
						'</tbody>'+
						'<tfoot id="test-tablefoot">'+
						'</tfoot>';

						var test_tablebody = document.getElementById('test-tablebody');
						var test_tablefoot = document.getElementById('test-tablefoot');
						(async () => {
							var result_KAI = await get('http://27.111.44.42/Percobaan2/get_allyearkai/'+vm_periodetahun);

							var kai = result_KAI.reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].trx += +date.trx
								}if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								} else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []);
							kai.sort(waktuCompare);
							var temp_tgl= [...kai,];
							temp_tgl = temp_tgl.reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
								} if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								}else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []);

							var temp_final_kai = [];
							for(tglx in temp_tgl){
								for(tglt in kai){
									if(temp_tgl[tglx]['waktu'] == kai[tglt]['waktu'] ){
										temp_final_kai.push({
											waktu: (temp_tgl[tglx]['waktu']),
											trx: kai[tglt]['trx'],
											amount: kai[tglt]['amount']
										});
									}else if(temp_tgl[tglx]['waktu'] != kai[tglt]['waktu'] ){
										temp_final_kai.push({
											waktu: (temp_tgl[tglt]['waktu']),
											trx: 0,
											amount: 0
										});
									}
									else{
										temp_final_kai.push({
											waktu: (new_today()),
											trx: 0,
											amount: 0
										});
									}
								}
							}
							
							temp_final_kai = temp_final_kai.sort(waktuCompare).reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
								} if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								}else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []);

							var temp_final_pertanggal = [...temp_final_kai]
							temp_final_pertanggal = temp_final_pertanggal.reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
								} if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								}else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []);
							
							for(x in temp_tgl){
								test_tablebody.innerHTML += '<tr>'+
									'<td style="text-align:center;">'+temp_tgl[x]['waktu']+'</td>'+
									'<td style="text-align:center;">'+rubah(temp_final_kai[x]['trx'])+'</td>'+
									'<td style="text-align:center;">'+rubah(temp_final_kai[x]['amount']) +'</td>'+
									'<td style="text-align:center;">'+0+'</td>'+
									'<td style="text-align:center;">'+0+'</td>'+
									'<td style="text-align:center;">'+0+'</td>'+
									'<td style="text-align:center;">'+0+'</td>'+
									'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['trx'] )+'</td>'+
									'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['amount']) +'</td>'+
								'</tr>';
							}

							var sum_kaitrx = 0;
							var sum_kaiamount = 0;
							var sum_emonttrx = 0;
							var sum_emonttamount = 0;
							var sum_emontctrx = 0;
							var sum_emontcamount = 0;
							var sum_totaltrx = 0;
							var sum_totalamount = 0;
							for(var t = 0; t < test_tablebody.rows.length; t++){
								sum_kaitrx = sum_kaitrx + parseInt(test_tablebody.rows[t].cells[1].innerHTML.replace(/\./g, ""));
								sum_kaiamount = sum_kaiamount + parseInt(test_tablebody.rows[t].cells[2].innerHTML.replace(/\./g, ""));
								sum_emonttrx = sum_emonttrx + parseInt(test_tablebody.rows[t].cells[3].innerHTML.replace(/\./g, ""));
								sum_emonttamount = sum_emonttamount + parseInt(test_tablebody.rows[t].cells[4].innerHTML.replace(/\./g, ""));
								sum_emontctrx = sum_emontctrx + parseInt(test_tablebody.rows[t].cells[5].innerHTML.replace(/\./g, ""));
								sum_emontcamount = sum_emontcamount + parseInt(test_tablebody.rows[t].cells[6].innerHTML.replace(/\./g, ""));
								sum_totaltrx = sum_totaltrx + parseInt(test_tablebody.rows[t].cells[7].innerHTML.replace(/\./g, ""));
								sum_totalamount = sum_totalamount + parseInt(test_tablebody.rows[t].cells[8].innerHTML.replace(/\./g, ""));
							}

							console.log(sum_kaitrx);
							test_tablefoot.innerHTML += '<tr>'+
								'<td style="text-align:left;"><b>Total</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_kaitrx)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_kaiamount)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_emonttrx)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_emonttamount)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_emontctrx)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_emontcamount)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_totaltrx)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_totalamount)+'</b></td>'+
							'</tr>';

							grafikchart(temp_final_pertanggal);
						})();
					
				}else if(lokasi != 'All'){
					if(vm_satu == 'All'){
						vm_periodetahun = vm_periodetahun.value;
						test_table.innerHTML = 
						'<thead id="test-tablehead">'+
							'<tr>'+
								'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Tanggal</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">KAI</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Topup</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Card</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Total</th>'+
							'</tr>'+
							'<tr>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
							'</tr>'+
						'</thead>'+
						'<tbody id="test-tablebody">'+
						'</tbody>'+
						'<tfoot id="test-tablefoot">'+
						'</tfoot>';

						var test_tablebody = document.getElementById('test-tablebody');
						var test_tablefoot = document.getElementById('test-tablefoot');
						(async () => {
							var result_KAI = await get('http://27.111.44.42/Percobaan2/get_allyearkailoc/'+vm_periodetahun+'/'+lokasi);

							var kai = result_KAI.reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].trx += +date.trx
								}if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								} else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []);
							kai.sort(waktuCompare);
							var temp_tgl= [...kai,];
							temp_tgl = temp_tgl.reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
								} if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								}else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []);

							var temp_final_kai = [];
							for(tglx in temp_tgl){
								for(tglt in kai){
									if(temp_tgl[tglx]['waktu'] == kai[tglt]['waktu'] ){
										temp_final_kai.push({
											waktu: (temp_tgl[tglx]['waktu']),
											trx: kai[tglt]['trx'],
											amount: kai[tglt]['amount']
										});
									}else if(temp_tgl[tglx]['waktu'] != kai[tglt]['waktu'] ){
										temp_final_kai.push({
											waktu: (temp_tgl[tglt]['waktu']),
											trx: 0,
											amount: 0
										});
									}
									else{
										temp_final_kai.push({
											waktu: (new_today()),
											trx: 0,
											amount: 0
										});
									}
								}
							}
							
							temp_final_kai = temp_final_kai.sort(waktuCompare).reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
								} if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								}else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []);

							var temp_final_pertanggal = [...temp_final_kai]
							temp_final_pertanggal = temp_final_pertanggal.reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
								} if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								}else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []);
							
							for(x in temp_tgl){
								test_tablebody.innerHTML += '<tr>'+
									'<td style="text-align:center;">'+temp_tgl[x]['waktu']+'</td>'+
									'<td style="text-align:center;">'+rubah(temp_final_kai[x]['trx'])+'</td>'+
									'<td style="text-align:center;">'+rubah(temp_final_kai[x]['amount']) +'</td>'+
									'<td style="text-align:center;">'+0+'</td>'+
									'<td style="text-align:center;">'+0+'</td>'+
									'<td style="text-align:center;">'+0+'</td>'+
									'<td style="text-align:center;">'+0+'</td>'+
									'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['trx'] )+'</td>'+
									'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['amount']) +'</td>'+
								'</tr>';
							}

							var sum_kaitrx = 0;
							var sum_kaiamount = 0;
							var sum_emonttrx = 0;
							var sum_emonttamount = 0;
							var sum_emontctrx = 0;
							var sum_emontcamount = 0;
							var sum_totaltrx = 0;
							var sum_totalamount = 0;
							for(var t = 0; t < test_tablebody.rows.length; t++){
								sum_kaitrx = sum_kaitrx + parseInt(test_tablebody.rows[t].cells[1].innerHTML.replace(/\./g, ""));
								sum_kaiamount = sum_kaiamount + parseInt(test_tablebody.rows[t].cells[2].innerHTML.replace(/\./g, ""));
								sum_emonttrx = sum_emonttrx + parseInt(test_tablebody.rows[t].cells[3].innerHTML.replace(/\./g, ""));
								sum_emonttamount = sum_emonttamount + parseInt(test_tablebody.rows[t].cells[4].innerHTML.replace(/\./g, ""));
								sum_emontctrx = sum_emontctrx + parseInt(test_tablebody.rows[t].cells[5].innerHTML.replace(/\./g, ""));
								sum_emontcamount = sum_emontcamount + parseInt(test_tablebody.rows[t].cells[6].innerHTML.replace(/\./g, ""));
								sum_totaltrx = sum_totaltrx + parseInt(test_tablebody.rows[t].cells[7].innerHTML.replace(/\./g, ""));
								sum_totalamount = sum_totalamount + parseInt(test_tablebody.rows[t].cells[8].innerHTML.replace(/\./g, ""));
							}

							console.log(sum_kaitrx);
							test_tablefoot.innerHTML += '<tr>'+
								'<td style="text-align:left;"><b>Total</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_kaitrx)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_kaiamount)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_emonttrx)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_emonttamount)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_emontctrx)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_emontcamount)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_totaltrx)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_totalamount)+'</b></td>'+
							'</tr>';

							grafikchart(temp_final_pertanggal);
						})();
					}else{
						vm_periodetahun = vm_periodetahun.value;
						// vm_satu = vm_satu.value;
						test_table.innerHTML = 
						'<thead id="test-tablehead">'+
							'<tr>'+
								'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Tanggal</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">KAI</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Topup</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Card</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Total</th>'+
							'</tr>'+
							'<tr>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
							'</tr>'+
						'</thead>'+
						'<tbody id="test-tablebody">'+
						'</tbody>'+
						'<tfoot id="test-tablefoot">'+
						'</tfoot>';

						var test_tablebody = document.getElementById('test-tablebody');
						var test_tablefoot = document.getElementById('test-tablefoot');
						(async () => {
							var result_KAI = await get('http://27.111.44.42/Percobaan2/get_allyearkailocter/'+vm_periodetahun+'/'+lokasi+'/'+vm_satu);

							var kai = result_KAI.reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].trx += +date.trx
								}if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								} else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []);
							kai.sort(waktuCompare);
							var temp_tgl= [...kai,];
							temp_tgl = temp_tgl.reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
								} if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								}else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []);

							var temp_final_kai = [];
							for(tglx in temp_tgl){
								for(tglt in kai){
									if(temp_tgl[tglx]['waktu'] == kai[tglt]['waktu'] ){
										temp_final_kai.push({
											waktu: (temp_tgl[tglx]['waktu']),
											trx: kai[tglt]['trx'],
											amount: kai[tglt]['amount']
										});
									}else if(temp_tgl[tglx]['waktu'] != kai[tglt]['waktu'] ){
										temp_final_kai.push({
											waktu: (temp_tgl[tglt]['waktu']),
											trx: 0,
											amount: 0
										});
									}
									else{
										temp_final_kai.push({
											waktu: (new_today()),
											trx: 0,
											amount: 0
										});
									}
								}
							}
							
							temp_final_kai = temp_final_kai.sort(waktuCompare).reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
								} if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								}else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []);

							var temp_final_pertanggal = [...temp_final_kai]
							temp_final_pertanggal = temp_final_pertanggal.reduce(function(allDates, date) {
								if (allDates.some(function(e) {
									return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
								} if(allDates.some(function(e) {
									return e.waktu === date.waktu
									})) {
									allDates.filter(function(e) {
										return e.waktu === date.waktu
									})[0].amount += +date.amount
								}else {
								allDates.push({
									waktu: date.waktu,
									trx: +date.trx,
									amount: +date.amount
								})
								}
								return allDates
							}, []);
							
							for(x in temp_tgl){
								test_tablebody.innerHTML += '<tr>'+
									'<td style="text-align:center;">'+temp_tgl[x]['waktu']+'</td>'+
									'<td style="text-align:center;">'+rubah(temp_final_kai[x]['trx'])+'</td>'+
									'<td style="text-align:center;">'+rubah(temp_final_kai[x]['amount']) +'</td>'+
									'<td style="text-align:center;">'+0+'</td>'+
									'<td style="text-align:center;">'+0+'</td>'+
									'<td style="text-align:center;">'+0+'</td>'+
									'<td style="text-align:center;">'+0+'</td>'+
									'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['trx'] )+'</td>'+
									'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['amount']) +'</td>'+
								'</tr>';
							}

							var sum_kaitrx = 0;
							var sum_kaiamount = 0;
							var sum_emonttrx = 0;
							var sum_emonttamount = 0;
							var sum_emontctrx = 0;
							var sum_emontcamount = 0;
							var sum_totaltrx = 0;
							var sum_totalamount = 0;
							for(var t = 0; t < test_tablebody.rows.length; t++){
								sum_kaitrx = sum_kaitrx + parseInt(test_tablebody.rows[t].cells[1].innerHTML.replace(/\./g, ""));
								sum_kaiamount = sum_kaiamount + parseInt(test_tablebody.rows[t].cells[2].innerHTML.replace(/\./g, ""));
								sum_emonttrx = sum_emonttrx + parseInt(test_tablebody.rows[t].cells[3].innerHTML.replace(/\./g, ""));
								sum_emonttamount = sum_emonttamount + parseInt(test_tablebody.rows[t].cells[4].innerHTML.replace(/\./g, ""));
								sum_emontctrx = sum_emontctrx + parseInt(test_tablebody.rows[t].cells[5].innerHTML.replace(/\./g, ""));
								sum_emontcamount = sum_emontcamount + parseInt(test_tablebody.rows[t].cells[6].innerHTML.replace(/\./g, ""));
								sum_totaltrx = sum_totaltrx + parseInt(test_tablebody.rows[t].cells[7].innerHTML.replace(/\./g, ""));
								sum_totalamount = sum_totalamount + parseInt(test_tablebody.rows[t].cells[8].innerHTML.replace(/\./g, ""));
							}

							console.log(sum_kaitrx);
							test_tablefoot.innerHTML += '<tr>'+
								'<td style="text-align:left;"><b>Total</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_kaitrx)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_kaiamount)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_emonttrx)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_emonttamount)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_emontctrx)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_emontcamount)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_totaltrx)+'</b></td>'+
								'<td style="text-align:center;"><b>'+rubah(sum_totalamount)+'</b></td>'+
							'</tr>';

							grafikchart(temp_final_pertanggal);
						})();
					}
				}
				
			}else{
				if(vm_satu == 'All'){
					vm_periodetahun = vm_periodetahun.value;
					test_table.innerHTML = 
						'<thead id="test-tablehead">'+
							'<tr>'+
								'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Tanggal</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">KAI</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Topup</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Card</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Total</th>'+
							'</tr>'+
							'<tr>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
							'</tr>'+
						'</thead>'+
						'<tbody id="test-tablebody">'+
						'</tbody>'+
						'<tfoot id="test-tablefoot">'+
						'</tfoot>';

						var test_tablebody = document.getElementById('test-tablebody');
						var test_tablefoot = document.getElementById('test-tablefoot');
						vm_group_testing = vm_group_testing.value;
					(async () => {
						// var result_KAI = await get('http://27.111.44.42/Percobaan2/get_allmonthkai/'+vm_periode_bulan);
						var result_Mtopup1 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopupnm/'+vm_group_testing+'/'+vm_periodetahun+'/0/15000');
						var result_Mtopup2 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopupnm/'+vm_group_testing+'/'+vm_periodetahun+'/15000/15000');
						var result_Mtopup3 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopupnm/'+vm_group_testing+'/'+vm_periodetahun+'/30000/15000');
						var result_Mtopup4 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopupnm/'+vm_group_testing+'/'+vm_periodetahun+'/45000/15000');
						var result_Mtopup5 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopupnm/'+vm_group_testing+'/'+vm_periodetahun+'/60000/15000');
						var result_Mtopup6 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopupnm/'+vm_group_testing+'/'+vm_periodetahun+'/75000/15000');
						var result_Mtopup7 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopupnm/'+vm_group_testing+'/'+vm_periodetahun+'/90000/15000');
						// var result_Mtopup3 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopup/'+vm_periode_bulan+'/45000/15000');
						var result_Mtopup = [...result_Mtopup1, ...result_Mtopup2, ...result_Mtopup3, ...result_Mtopup4, ...result_Mtopup5, ...result_Mtopup6, ...result_Mtopup7]
						var result_Mcard = await get('http://27.111.44.44/mobile/Percobaan2/get_allyearcardnm/'+vm_group_testing+'/'+vm_periodetahun);
						// console.log('result_KAI',result_KAI);
						// var temp_result = ;
						console.log('result_Mtopup',result_Mtopup);
						console.log('result_Mcard',result_Mcard);

						for(a in result_Mtopup){
							if(typeof result_Mcard !== 'undefined'){
								result_Mcard.push({
									waktu: result_Mtopup[a]['waktu'],
									trx: Number(0),
									amount: Number(0)
								})
							}
						}
						var selisihtgl = Math.floor(( Date.parse(tgl_akhir_val) - Date.parse(tgl_awal_val) ) / 86400000);
						

						/* var kai = result_KAI.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
							}if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							} else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						console.log('testing kai',kai); */
						var mtopup = result_Mtopup.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						console.log('testing kai',mtopup );
						var mcard = result_Mcard.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);

						// penjumlahan berdasarkan tanggal
						// kai.sort(waktuCompare);
						mtopup.sort(waktuCompare);
						mcard.sort(waktuCompare);
						var temp_tgl= [/* ...kai,  */...mtopup, ...mcard];
						temp_tgl = temp_tgl.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);

						// console.log(kai);
						/* console.log(mtopup);
						console.log(mcard); */

						var temp_final_mcard = [];
						var temp_final_mtopup = [];
						var temp_final_kai = [];
						for(tglx in temp_tgl){
							for(tglu in mcard){
								if(temp_tgl[tglx]['waktu'] == mcard[tglu]['waktu'] ){
									temp_final_mcard.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: mcard[tglu]['trx'],
										amount: mcard[tglu]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != mcard[tglu]['waktu']){
									temp_final_mcard.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: 0,
										amount: 0
									});
								}else if(mcard[tglu]['waktu'] != new_today()){
									temp_final_mcard.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}else {
									temp_final_mcard.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							}
							for(tglv in mtopup){
								if(temp_tgl[tglx]['waktu'] == mtopup[tglv]['waktu'] ){
									temp_final_mtopup.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: mtopup[tglv]['trx'],
										amount: mtopup[tglv]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != mtopup[tglv]['waktu']){
									temp_final_mtopup.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: 0,
										amount: 0
									});
								}else{
									temp_final_mtopup.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							}
							
							/* for(tglt in kai){
								if(temp_tgl[tglx]['waktu'] == kai[tglt]['waktu'] ){
									temp_final_kai.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: kai[tglt]['trx'],
										amount: kai[tglt]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != kai[tglt]['waktu'] ){
									temp_final_kai.push({
										waktu: (temp_tgl[tglt]['waktu']),
										trx: 0,
										amount: 0
									});
								}
								else{
									temp_final_kai.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							} */
						}
						/* console.log('tgl', temp_tgl);
						console.log(temp_final_mcard);
						console.log(temp_final_mtopup); */

						
						temp_final_mcard = temp_final_mcard.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						temp_final_mtopup = temp_final_mtopup.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						/* temp_final_kai = temp_final_kai.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []); */

						var temp_final_pertanggal = [...temp_final_mcard, ...temp_final_mtopup/* , ...temp_final_kai */]
						temp_final_pertanggal = temp_final_pertanggal.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);


						/* console.log('card_clean topup',temp_final_mtopup);
						console.log('card_clean card',temp_final_mcard);
						console.log('temp_final_kai',temp_final_kai);
						console.log('temp_final_pertanggal',temp_final_pertanggal); */
						

						// console.log('temp_final_c',temp_final_c);
						/* var result = [...result_KAI, ...result_Mtopup, ...result_Mcard]; */
						for(x in temp_tgl){
							test_tablebody.innerHTML += '<tr>'+
								'<td style="text-align:center;">'+temp_tgl[x]['waktu']+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['trx'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['amount'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mcard[x]['trx'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mcard[x]['amount'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['trx'] )+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['amount']) +'</td>'+
							'</tr>';
						}

						var sum_kaitrx = 0;
						var sum_kaiamount = 0;
						var sum_emonttrx = 0;
						var sum_emonttamount = 0;
						var sum_emontctrx = 0;
						var sum_emontcamount = 0;
						var sum_totaltrx = 0;
						var sum_totalamount = 0;
						for(var t = 0; t < test_tablebody.rows.length; t++){
							sum_kaitrx = sum_kaitrx + parseInt(test_tablebody.rows[t].cells[1].innerHTML.replace(/\./g, ""));
							sum_kaiamount = sum_kaiamount + parseInt(test_tablebody.rows[t].cells[2].innerHTML.replace(/\./g, ""));
							sum_emonttrx = sum_emonttrx + parseInt(test_tablebody.rows[t].cells[3].innerHTML.replace(/\./g, ""));
							sum_emonttamount = sum_emonttamount + parseInt(test_tablebody.rows[t].cells[4].innerHTML.replace(/\./g, ""));
							sum_emontctrx = sum_emontctrx + parseInt(test_tablebody.rows[t].cells[5].innerHTML.replace(/\./g, ""));
							sum_emontcamount = sum_emontcamount + parseInt(test_tablebody.rows[t].cells[6].innerHTML.replace(/\./g, ""));
							sum_totaltrx = sum_totaltrx + parseInt(test_tablebody.rows[t].cells[7].innerHTML.replace(/\./g, ""));
							sum_totalamount = sum_totalamount + parseInt(test_tablebody.rows[t].cells[8].innerHTML.replace(/\./g, ""));
						}

						console.log(sum_kaitrx);
						test_tablefoot.innerHTML += '<tr>'+
							'<td style="text-align:left;"><b>Total</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_kaitrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_kaiamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emonttrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emonttamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emontctrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emontcamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_totaltrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_totalamount)+'</b></td>'+
						'</tr>';

						grafikchart(temp_final_pertanggal);
					})();
				}else{
					vm_periodetahun = vm_periodetahun.value;
					test_table.innerHTML = 
						'<thead id="test-tablehead">'+
							'<tr>'+
								'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Tanggal</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">KAI</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Topup</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Card</th>'+
								'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Total</th>'+
							'</tr>'+
							'<tr>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
								'<th style="text-align:center;">Trx</th>'+
								'<th style="text-align:center;">Amount</th>'+
							'</tr>'+
						'</thead>'+
						'<tbody id="test-tablebody">'+
						'</tbody>'+
						'<tfoot id="test-tablefoot">'+
						'</tfoot>';

						var test_tablebody = document.getElementById('test-tablebody');
						var test_tablefoot = document.getElementById('test-tablefoot');
						vm_group_testing = vm_group_testing.value;
					(async () => {
						// var result_KAI = await get('http://27.111.44.42/Percobaan2/get_allmonthkai/'+vm_periode_bulan);
						var result_Mtopup1 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopupnmterm/'+vm_group_testing+'/'+vm_satu+'/'+vm_periodetahun+'/0/15000');
						var result_Mtopup2 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopupnmterm/'+vm_group_testing+'/'+vm_satu+'/'+vm_periodetahun+'/15000/15000');
						var result_Mtopup3 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopupnmterm/'+vm_group_testing+'/'+vm_satu+'/'+vm_periodetahun+'/30000/15000');
						var result_Mtopup4 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopupnmterm/'+vm_group_testing+'/'+vm_satu+'/'+vm_periodetahun+'/45000/15000');
						var result_Mtopup5 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopupnmterm/'+vm_group_testing+'/'+vm_satu+'/'+vm_periodetahun+'/60000/15000');
						var result_Mtopup6 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopupnmterm/'+vm_group_testing+'/'+vm_satu+'/'+vm_periodetahun+'/75000/15000');
						var result_Mtopup7 = await get('http://27.111.44.44/mobile/Percobaan2/get_allyeartopupnmterm/'+vm_group_testing+'/'+vm_satu+'/'+vm_periodetahun+'/90000/15000');
						// var result_Mtopup3 = await get('http://27.111.44.44/mobile/Percobaan2/get_allmonthtopup/'+vm_periode_bulan+'/45000/15000');
						var result_Mtopup = [...result_Mtopup1, ...result_Mtopup2, ...result_Mtopup3, ...result_Mtopup4, ...result_Mtopup5, ...result_Mtopup6, ...result_Mtopup7]
						var result_Mcard = await get('http://27.111.44.44/mobile/Percobaan2/get_allyearcardnmterm/'+vm_group_testing+'/'+vm_satu+'/'+vm_periodetahun);
						// console.log('result_KAI',result_KAI);
						// var temp_result = ;
						console.log('result_Mtopup',result_Mtopup);
						console.log('result_Mcard',result_Mcard);

						for(a in result_Mtopup){
							if(typeof result_Mcard !== 'undefined'){
								result_Mcard.push({
									waktu: result_Mtopup[a]['waktu'],
									trx: Number(0),
									amount: Number(0)
								})
							}
						}
						var selisihtgl = Math.floor(( Date.parse(tgl_akhir_val) - Date.parse(tgl_awal_val) ) / 86400000);
						

						/* var kai = result_KAI.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].trx += +date.trx
							}if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							} else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						console.log('testing kai',kai); */
						var mtopup = result_Mtopup.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						console.log('testing kai',mtopup );
						var mcard = result_Mcard.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);

						// penjumlahan berdasarkan tanggal
						// kai.sort(waktuCompare);
						mtopup.sort(waktuCompare);
						mcard.sort(waktuCompare);
						var temp_tgl= [/* ...kai,  */...mtopup, ...mcard];
						temp_tgl = temp_tgl.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);

						// console.log(kai);
						/* console.log(mtopup);
						console.log(mcard); */

						var temp_final_mcard = [];
						var temp_final_mtopup = [];
						var temp_final_kai = [];
						for(tglx in temp_tgl){
							for(tglu in mcard){
								if(temp_tgl[tglx]['waktu'] == mcard[tglu]['waktu'] ){
									temp_final_mcard.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: mcard[tglu]['trx'],
										amount: mcard[tglu]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != mcard[tglu]['waktu']){
									temp_final_mcard.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: 0,
										amount: 0
									});
								}else if(mcard[tglu]['waktu'] != new_today()){
									temp_final_mcard.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}else {
									temp_final_mcard.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							}
							for(tglv in mtopup){
								if(temp_tgl[tglx]['waktu'] == mtopup[tglv]['waktu'] ){
									temp_final_mtopup.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: mtopup[tglv]['trx'],
										amount: mtopup[tglv]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != mtopup[tglv]['waktu']){
									temp_final_mtopup.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: 0,
										amount: 0
									});
								}else{
									temp_final_mtopup.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							}
							
							/* for(tglt in kai){
								if(temp_tgl[tglx]['waktu'] == kai[tglt]['waktu'] ){
									temp_final_kai.push({
										waktu: (temp_tgl[tglx]['waktu']),
										trx: kai[tglt]['trx'],
										amount: kai[tglt]['amount']
									});
								}else if(temp_tgl[tglx]['waktu'] != kai[tglt]['waktu'] ){
									temp_final_kai.push({
										waktu: (temp_tgl[tglt]['waktu']),
										trx: 0,
										amount: 0
									});
								}
								else{
									temp_final_kai.push({
										waktu: (new_today()),
										trx: 0,
										amount: 0
									});
								}
							} */
						}
						/* console.log('tgl', temp_tgl);
						console.log(temp_final_mcard);
						console.log(temp_final_mtopup); */

						
						temp_final_mcard = temp_final_mcard.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						temp_final_mtopup = temp_final_mtopup.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);
						/* temp_final_kai = temp_final_kai.sort(waktuCompare).reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []); */

						var temp_final_pertanggal = [...temp_final_mcard, ...temp_final_mtopup/* , ...temp_final_kai */]
						temp_final_pertanggal = temp_final_pertanggal.reduce(function(allDates, date) {
							if (allDates.some(function(e) {
								return e.waktu === date.waktu
							})) {
							allDates.filter(function(e) {
								return e.waktu === date.waktu
							})[0].trx += +date.trx
							} if(allDates.some(function(e) {
								return e.waktu === date.waktu
								})) {
								allDates.filter(function(e) {
									return e.waktu === date.waktu
								})[0].amount += +date.amount
							}else {
							allDates.push({
								waktu: date.waktu,
								trx: +date.trx,
								amount: +date.amount
							})
							}
							return allDates
						}, []);


						/* console.log('card_clean topup',temp_final_mtopup);
						console.log('card_clean card',temp_final_mcard);
						console.log('temp_final_kai',temp_final_kai);
						console.log('temp_final_pertanggal',temp_final_pertanggal); */
						

						// console.log('temp_final_c',temp_final_c);
						/* var result = [...result_KAI, ...result_Mtopup, ...result_Mcard]; */
						for(x in temp_tgl){
							test_tablebody.innerHTML += '<tr>'+
								'<td style="text-align:center;">'+temp_tgl[x]['waktu']+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+0+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['trx'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['amount'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mcard[x]['trx'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_mcard[x]['amount'])+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['trx'] )+'</td>'+
								'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['amount']) +'</td>'+
							'</tr>';
						}

						var sum_kaitrx = 0;
						var sum_kaiamount = 0;
						var sum_emonttrx = 0;
						var sum_emonttamount = 0;
						var sum_emontctrx = 0;
						var sum_emontcamount = 0;
						var sum_totaltrx = 0;
						var sum_totalamount = 0;
						for(var t = 0; t < test_tablebody.rows.length; t++){
							sum_kaitrx = sum_kaitrx + parseInt(test_tablebody.rows[t].cells[1].innerHTML.replace(/\./g, ""));
							sum_kaiamount = sum_kaiamount + parseInt(test_tablebody.rows[t].cells[2].innerHTML.replace(/\./g, ""));
							sum_emonttrx = sum_emonttrx + parseInt(test_tablebody.rows[t].cells[3].innerHTML.replace(/\./g, ""));
							sum_emonttamount = sum_emonttamount + parseInt(test_tablebody.rows[t].cells[4].innerHTML.replace(/\./g, ""));
							sum_emontctrx = sum_emontctrx + parseInt(test_tablebody.rows[t].cells[5].innerHTML.replace(/\./g, ""));
							sum_emontcamount = sum_emontcamount + parseInt(test_tablebody.rows[t].cells[6].innerHTML.replace(/\./g, ""));
							sum_totaltrx = sum_totaltrx + parseInt(test_tablebody.rows[t].cells[7].innerHTML.replace(/\./g, ""));
							sum_totalamount = sum_totalamount + parseInt(test_tablebody.rows[t].cells[8].innerHTML.replace(/\./g, ""));
						}

						console.log(sum_kaitrx);
						test_tablefoot.innerHTML += '<tr>'+
							'<td style="text-align:left;"><b>Total</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_kaitrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_kaiamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emonttrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emonttamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emontctrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_emontcamount)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_totaltrx)+'</b></td>'+
							'<td style="text-align:center;"><b>'+rubah(sum_totalamount)+'</b></td>'+
						'</tr>';

						grafikchart(temp_final_pertanggal);
					})();
				}
				
			}
			
		}
	}
	/* else if(vm_group_testing.options[vm_group_testing.selectedIndex].text != 'All' && vm_satu != 'All'){
		vm_satu = vm_satu;
		vm_group_testing = vm_group_testing;
		if(vm_satu == 'KAI'){

		}else{

		}
	} */
}













function displayHistoriTransaksi1(){
	var vm_group_testing = document.getElementById('vm_group');

	var vm_location_testing = document.getElementById('vm_location');
	var vm_satu_testing = document.getElementById('vm_satu');

	var tgl_awal = document.getElementById('datepicker1');
	var tgl_akhir = document.getElementById('datepicker2');
	tgl_awal_val = tgl_awal.value;
	tgl_akhir_val = tgl_akhir.value;

	var tempt1 ;
	var tempt2;

	var tampilkan = document.getElementById('tampilkan');
	var tampilkanchart = document.getElementById('tampilkanchart');
	var lokasi = vm_location_testing.options[vm_location_testing.selectedIndex].text;
	var vm_satu = vm_satu_testing.options[vm_satu_testing.selectedIndex].text;
				// var llokasi = vm_location_testing.options[vm_location_testing.selectedIndex].value;
	console.log('test',vm_satu);
	if(vm_group_testing.options[vm_group_testing.selectedIndex].text == 'KAI'){
		if(vm_location_testing.options[vm_location_testing.selectedIndex].text == 'All'){
			tampilkan.innerHTML = '<table id="table-data" class="table"  style="width:100%">'+
				'</table>';
				
				tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);
				// console.log('sesudah',tgl_akhir_val);
				$.ajax({
					/* method: "get",
					dataType: "json", */
					url: "http://27.111.44.42/Percobaan2/get_trxallkai/"+tgl_awal_val+'/'+tgl_akhir_val,
					success: function (jdataall) {
						jsonDataall=jdataall.sort(waktuCompare);
						console.log(jsonDataall);
						tampilkan.style.display = 'block';

						var t = $('#table-data').DataTable( {
							"data": jsonDataall,
							"bFilter": false,
							"columns": [
								{ "data":"", "title": "No"  },
								{ "data":"terminal_id", "title": "Terminal ID"},
								{ "data":"location_name", "title": "Lokasi"},
								{ "data":"trx", "title": "Transaksi" },
								{ "data":"waktu", "title": "Tanggal" }
							]
						} );
						t.on( 'order.dt search.dt', function () {
							t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
								cell.innerHTML = i+1;
								
							} );
							// console.log()
							// t.column(2, {search:'applied', order:'applied'})
							// console.log('saya lagi',t.column(2).data());
						} ).draw();
						
						/* t.on('drowCallback', function(settings){
							alert('asd');
							// console.log('saya lagi',t.column(2).data());
						}).draw(); */

						grafikchart(jsonDataall);
					}
				});
		}else if(vm_location_testing.options[vm_location_testing.selectedIndex].text != 'All'){
			if(vm_satu_testing.options[vm_satu_testing.selectedIndex].text == 'All'){
				
				
				tampilkan.innerHTML = '<table id="table-data" class="table"  style="width:100%">'+
				'</table>';
				tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);

				$.ajax({
					/* method: "get",
					dataType: "json", */
					url: "http://27.111.44.42/Percobaan2/get_trxallockai/"+lokasi+'/'+tgl_awal_val+'/'+tgl_akhir_val,
					success: function (jdata) {
						jsonData=jdata.sort(waktuCompare);
						console.log(jsonData);
						tampilkan.style.display = 'block';

						var t = $('#table-data').DataTable( {
							"data": jsonData,
							"bFilter": false,
							"columns": [
								{ "data":"", "title": "No"  },
								{ "data":"terminal_id", "title": "Terminal ID"},
								{ "data":"location_name", "title": "Lokasi"},
								{ "data":"trx", "title": "Transaksi" },
								{ "data":"waktu", "title": "Tanggal" }
							]
						} );
						t.on( 'order.dt search.dt', function () {
							t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
								cell.innerHTML = i+1;
							} );
						} ).draw();
						grafikchart(jsonData);
					}
				});

			}
			else if(vm_satu_testing.options[vm_satu_testing.selectedIndex].text != 'All'){
				var llokasi=lokasi;
				
				console.log('a',llokasi);
				tampilkan.innerHTML = '<table id="table-data" class="table"  style="width:100%">'+
				'</table>';
				tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);
				$.ajax({
					/* method: "get",
					dataType: "json", */
					url: "http://27.111.44.42/Percobaan2/get_trxkai/"+llokasi+'/'+vm_satu+'/'+tgl_awal_val+'/'+tgl_akhir_val,
					success: function (jdata1) {
						jsonData1=jdata1.sort(waktuCompare);
						console.log(jsonData);
						tampilkan.style.display = 'block';

						var t = $('#table-data').DataTable( {
							"data": jsonData1,
							"bFilter": false,
							"columns": [
								{ "data":"", "title": "No"  },
								{ "data":"terminal_id", "title": "Terminal ID"},
								{ "data":"location_name", "title": "Lokasi"},
								{ "data":"trx", "title": "Transaksi" },
								{ "data":"waktu", "title": "Tanggal" }
							]
						} );
						t.on( 'order.dt search.dt', function () {
							t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
								cell.innerHTML = i+1;
							} );
						} ).draw();
						grafikchart(jsonData1);
					}
				});
			}
		}
	}else if(vm_group_testing.options[vm_group_testing.selectedIndex].text == 'All'){
		tampilkan.innerHTML = '<table id="table-data" class="table"  style="width:100%">'+
			'</table>';
		tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);
		(async () => {
			var result_KAI = await get('http://27.111.44.42/Percobaan2/get_trxallkai/'+tgl_awal_val+'/'+tgl_akhir_val);
			var result_Mtopup = await get('http://27.111.44.44/mobile/Percobaan2/get_trxalltopup/'+tgl_awal_val+'/'+tgl_akhir_val);
			var result_Mcard = await get('http://27.111.44.44/mobile/Percobaan2/get_trxallcard/'+tgl_awal_val+'/'+tgl_akhir_val);
				
			var result = [...result_KAI, ...result_Mtopup, ...result_Mcard];

			tampilkan.style.display = 'block';
			var jsonData2r = result.sort(waktuCompare);
			console.log('jsonData2',jsonData2r);
			var t = $('#table-data').DataTable( {
				"data": jsonData2r,
				"bFilter": false,
				"columns": [
					{ "data":"", "title": "No"  },
					{ "data":"terminal_id", "title": "Terminal ID"},
					{ "data":"name_group", "title": "Lokasi"},
					{ "data":"trx", "title": "Transaksi" },
					{ "data":"waktu", "title": "Tanggal" }
				]
			} );
			t.on( 'order.dt search.dt', function () {
				t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
					cell.innerHTML = i+1;
				} );
			} ).draw();
			grafikchart(jsonData2r);

		})();
	}
	else{
		if(vm_satu_testing.options[vm_satu_testing.selectedIndex].value == 'All'){
			tampilkan.innerHTML = '<table id="table-data" class="table"  style="width:100%">'+
			'</table>';
			vm_group_testing = vm_group_testing.options[vm_group_testing.selectedIndex].text;
			tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);

			(async () => {

				var result_topup = await get('http://27.111.44.44/mobile/Percobaan2/get_trxmandiritp/'+vm_group_testing+'/'+tgl_awal_val+'/'+tgl_akhir_val);
				var result_card = await get('http://27.111.44.44/mobile/Percobaan2/get_trxmandiricard/'+vm_group_testing+'/'+tgl_awal_val+'/'+tgl_akhir_val);
				
				var result = [...result_card, ...result_topup];
				


				console.log('result_topup',result_topup);
				console.log('result_card',result_card);
				console.log('result',result);
				
				tampilkan.style.display = 'block';
				var jsonData2 = result.sort(waktuCompare);
				console.log('jsonData2',jsonData2);
				var t = $('#table-data').DataTable( {
					"data": jsonData2,
					"bFilter": false,
					"columns": [
						{ "data":"", "title": "No"  },
						{ "data":"terminal_id", "title": "Terminal ID"},
						{ "data":"name_group", "title": "Lokasi"},
						{ "data":"trx", "title": "Transaksi" },
						{ "data":"waktu", "title": "Tanggal" }
					]
				} );
				t.on( 'order.dt search.dt', function () {
					t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
						cell.innerHTML = i+1;
					} );
				} ).draw();
				grafikchart(jsonData2);
			
			})();
			
		}else{
			tampilkan.innerHTML = '<table id="table-data" class="table"  style="width:100%">'+
			'</table>';
			vm_group_ = vm_group_testing.options[vm_group_testing.selectedIndex].text;
			vm_satu_ = vm_satu_testing.options[vm_satu_testing.selectedIndex].text;
			tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);

			(async () => {
			
			var result_topup = await get('http://27.111.44.44/mobile/Percobaan2/get_trxmandiritpterminaltopup/'+vm_group_+'/'+vm_satu_+'/'+tgl_awal_val+'/'+tgl_akhir_val);
			var result_card = await get('http://27.111.44.44/mobile/Percobaan2/get_trxmandiritpterminalcard/'+vm_group_+'/'+vm_satu_+'/'+tgl_awal_val+'/'+tgl_akhir_val);
			
			var result = [...result_card, ...result_topup];

			console.log('result_topup',result_topup);
			console.log('result_card',result_card);
			console.log('result',result);


			tampilkan.style.display = 'block';
			var jsonData3 = result.sort(waktuCompare);
			console.log('jsonData2',jsonData3);
			var t = $('#table-data').DataTable( {
				"data": jsonData3,
				"bFilter": false,
				"columns": [
					{ "data":"", "title": "No"  },
					{ "data":"terminal_id", "title": "Terminal ID"},
					{ "data":"name_group", "title": "Lokasi"},
					{ "data":"trx", "title": "Transaksi" },
					{ "data":"waktu", "title": "Tanggal" }
				]
			} );
			t.on( 'order.dt search.dt', function () {
				t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
					cell.innerHTML = i+1;
				} );
			} ).draw();
			grafikchart(jsonData3);
			
			})();
		}
	}
	
}





// function listdataALL2(datashow){
// 	// var tbodyall = document.getElementById('trbodyisiall');
// 	var vmsatu = document.getElementById('vm_satu');
// 	// var vmsatuoption = vmsatu.options[vmsatu.selectedIndex].text;
// 	// var y = 1;
// 	var lishow = data['lunari'][datashow];
// 	var arr = []
// 	for(x=0; x<lishow.length; x++){
// 		if(vmsatu.value == '0'){
// 			var xlishow = lishow[x];
// 			arr.push(xlishow);
// 		}else if(vmsatu.value != '0' && lishow[x]['terminal_id'] == vmsatu.value){
// 			var xlishow = lishow[x];
// 			arr.push(xlishow);
// 		}
// 	}
	 
// 	var t = $('#example').DataTable( {
// 		"data": arr,
// 		"columns": [
// 			{ "data":"", "title": "No"  },
// 			{ "data":"terminal_id", "title": "Terminal ID"},
// 			{ "data":"trx", "title": "Transaksi" , render: function(data){
// 				return "Rp." + rubah(data);
// 			}},
// 			{ "data":"waktu", "title": "Tanggal" }
// 		]
// 	} );
// 	t.on( 'order.dt search.dt', function () {
//         t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
//             cell.innerHTML = i+1;
//         } );
// 	} ).draw();
// 	console.log('arr',arr);

// 	grafikchart(arr);
// }

// fungsi datepicker tanggal
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








async function loadmain(){
	var test_table1 = document.getElementById('test-table');
	test_table1.style.display = 'block';
	var test_table = document.getElementById('test-tabletabled');
	var vm_group_testing = document.getElementById('vm_group');

	var vm_location_testing = document.getElementById('vm_location');
	var vm_satu_testing = document.getElementById('vm_satu');

	var tgl_awal = document.getElementById('datepicker1');
	var tgl_akhir = document.getElementById('datepicker2');
	var tgl_awal_val = tgl_awal.value;
	var tgl_akhir_val = tgl_akhir.value;

	var tampilkanchart = document.getElementById('tampilkanchart');
	
	var lokasi = vm_location_testing.options[vm_location_testing.selectedIndex].text;
	var vm_satu = vm_satu_testing.options[vm_satu_testing.selectedIndex].text;

	var vm_periode = document.getElementById('vm_periode');
	var vm_periode_bulan = document.getElementById('vm_periode_bulan');
	var vm_periodetahun = document.getElementById('vm_periodetahun');
	// vm_periode = vm_periode.options[vm_periode.selectedIndex].text
	

	var test_tablebody = document.getElementById('test-tablebody');
	var test_tablefoot = document.getElementById('test-tablefoot');
	// if(vm_group_testing.options[vm_group_testing.selectedIndex].text == 'All' ){
		// if(vm_periode.options[vm_periode.selectedIndex].value == 'harian'){
			test_table.innerHTML = 
				'<thead id="test-tablehead">'+
					'<tr>'+
						'<th scope="col" rowspan="2" style="vertical-align : middle;text-align:center;">Tanggal</th>'+
						'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">KAI</th>'+
						'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Topup</th>'+
						'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Emoney - Card</th>'+
						'<th scope="col" colspan="2" style="vertical-align : middle;text-align:center;">Total</th>'+
					'</tr>'+
					'<tr>'+
						'<th style="text-align:center;">Trx</th>'+
						'<th style="text-align:center;">Amount</th>'+
						'<th style="text-align:center;">Trx</th>'+
						'<th style="text-align:center;">Amount</th>'+
						'<th style="text-align:center;">Trx</th>'+
						'<th style="text-align:center;">Amount</th>'+
						'<th style="text-align:center;">Trx</th>'+
						'<th style="text-align:center;">Amount</th>'+
					'</tr>'+
				'</thead>'+
				'<tbody id="test-tablebody">'+
				'</tbody>'+
				'<tfoot id="test-tablefoot">'+
				'</tfoot>';

				tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);
				var test_tablebody = document.getElementById('test-tablebody');
				var test_tablefoot = document.getElementById('test-tablefoot');
			// (async () => {
				var result_KAI = await get('http://27.111.44.42/Percobaan2/get_trxallkai/'+tgl_awal_val+'/'+tgl_akhir_val);
				var result_Mtopup = await get('http://27.111.44.44/mobile/Percobaan2/get_trxalltopup/'+tgl_awal_val+'/'+tgl_akhir_val);
				var result_Mcard = await get('http://27.111.44.44/mobile/Percobaan2/get_trxallcard/'+tgl_awal_val+'/'+tgl_akhir_val);
				console.log('result_KAI',result_KAI);
				// var temp_result = ;
				console.log('result_Mtopup',result_Mtopup);
				console.log('result_Mcard',result_Mcard);
				var selisihtgl = Math.floor(( Date.parse(tgl_akhir_val) - Date.parse(tgl_awal_val) ) / 86400000);
				for(a in result_Mtopup){
					if(typeof result_KAI !== 'undefined'){
						result_KAI.push({
							waktu: result_Mtopup[a]['waktu'],
							trx: Number(0),
							amount: Number(0)
						})
					}
				}

				var kai = result_KAI.reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].trx += +date.trx
					}if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					} else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);
				console.log('testing kai',kai);
				var mtopup = result_Mtopup.reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);
				console.log('testing kai',mtopup );
				var mcard = result_Mcard.reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);

				// penjumlahan berdasarkan tanggal
				kai.sort(waktuCompare);
				mtopup.sort(waktuCompare);
				mcard.sort(waktuCompare);
				var temp_tgl= [...kai, ...mtopup, ...mcard];
				temp_tgl = temp_tgl.reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);

				console.log(kai);
				console.log(mtopup);
				console.log(mcard);

				var temp_final_mcard = [];
				var temp_final_mtopup = [];
				var temp_final_kai = [];
				for(tglx in temp_tgl){
					for(tglu in mcard){
						if(temp_tgl[tglx]['waktu'] == mcard[tglu]['waktu'] ){
							temp_final_mcard.push({
								waktu: (temp_tgl[tglx]['waktu']),
								trx: mcard[tglu]['trx'],
								amount: mcard[tglu]['amount']
							});
						}else if(temp_tgl[tglx]['waktu'] != mcard[tglu]['waktu']){
							temp_final_mcard.push({
								waktu: (temp_tgl[tglx]['waktu']),
								trx: 0,
								amount: 0
							});
						}else if(mcard[tglu]['waktu'] != new_today()){
							temp_final_mcard.push({
								waktu: (new_today()),
								trx: 0,
								amount: 0
							});
						}else {
							temp_final_mcard.push({
								waktu: (new_today()),
								trx: 0,
								amount: 0
							});
						}
					}
					for(tglv in mtopup){
						if(temp_tgl[tglx]['waktu'] == mtopup[tglv]['waktu'] ){
							temp_final_mtopup.push({
								waktu: (temp_tgl[tglx]['waktu']),
								trx: mtopup[tglv]['trx'],
								amount: mtopup[tglv]['amount']
							});
						}else if(temp_tgl[tglx]['waktu'] != mtopup[tglv]['waktu']){
							temp_final_mtopup.push({
								waktu: (temp_tgl[tglx]['waktu']),
								trx: 0,
								amount: 0
							});
						}else{
							temp_final_mtopup.push({
								waktu: (new_today()),
								trx: 0,
								amount: 0
							});
						}
					}
					
					for(tglt in kai){
						if(temp_tgl[tglx]['waktu'] == kai[tglt]['waktu'] ){
							temp_final_kai.push({
								waktu: (temp_tgl[tglx]['waktu']),
								trx: kai[tglt]['trx'],
								amount: kai[tglt]['amount']
							});
						}else if(temp_tgl[tglx]['waktu'] != kai[tglt]['waktu'] ){
							temp_final_kai.push({
								waktu: (temp_tgl[tglt]['waktu']),
								trx: 0,
								amount: 0
							});
						}
						else{
							temp_final_kai.push({
								waktu: (new_today()),
								trx: 0,
								amount: 0
							});
						}
					}
				}
				console.log('tgl', temp_tgl);
				console.log(temp_final_mcard);
				console.log(temp_final_mtopup);

				
				temp_final_mcard = temp_final_mcard.sort(waktuCompare).reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);
				temp_final_mtopup = temp_final_mtopup.sort(waktuCompare).reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);
				temp_final_kai = temp_final_kai.sort(waktuCompare).reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);

				var temp_final_pertanggal = [...temp_final_mcard, ...temp_final_mtopup, ...temp_final_kai]
				temp_final_pertanggal = temp_final_pertanggal.reduce(function(allDates, date) {
					if (allDates.some(function(e) {
						return e.waktu === date.waktu
					})) {
					allDates.filter(function(e) {
						return e.waktu === date.waktu
					})[0].trx += +date.trx
					} if(allDates.some(function(e) {
						return e.waktu === date.waktu
						})) {
						allDates.filter(function(e) {
							return e.waktu === date.waktu
						})[0].amount += +date.amount
					}else {
					allDates.push({
						waktu: date.waktu,
						trx: +date.trx,
						amount: +date.amount
					})
					}
					return allDates
				}, []);


				console.log('card_clean topup',temp_final_mtopup);
				console.log('card_clean card',temp_final_mcard);
				console.log('temp_final_kai',temp_final_kai);
				console.log('temp_final_pertanggal',temp_final_pertanggal);
				

				// console.log('temp_final_c',temp_final_c);
				/* var result = [...result_KAI, ...result_Mtopup, ...result_Mcard]; */
				for(x in temp_tgl){
					test_tablebody.innerHTML += '<tr>'+
						'<td style="text-align:center;">'+temp_tgl[x]['waktu']+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_kai[x]['trx'])+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_kai[x]['amount']) +'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['trx'])+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_mtopup[x]['amount'])+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_mcard[x]['trx'])+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_mcard[x]['amount'])+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['trx'] )+'</td>'+
						'<td style="text-align:center;">'+rubah(temp_final_pertanggal[x]['amount']) +'</td>'+
					'</tr>';
				}

				var sum_kaitrx = 0;
				var sum_kaiamount = 0;
				var sum_emonttrx = 0;
				var sum_emonttamount = 0;
				var sum_emontctrx = 0;
				var sum_emontcamount = 0;
				var sum_totaltrx = 0;
				var sum_totalamount = 0;
				for(var t = 0; t < test_tablebody.rows.length; t++){
					sum_kaitrx = sum_kaitrx + parseInt(test_tablebody.rows[t].cells[1].innerHTML.replace(/\./g, ""));
					sum_kaiamount = sum_kaiamount + parseInt(test_tablebody.rows[t].cells[2].innerHTML.replace(/\./g, ""));
					sum_emonttrx = sum_emonttrx + parseInt(test_tablebody.rows[t].cells[3].innerHTML.replace(/\./g, ""));
					sum_emonttamount = sum_emonttamount + parseInt(test_tablebody.rows[t].cells[4].innerHTML.replace(/\./g, ""));
					sum_emontctrx = sum_emontctrx + parseInt(test_tablebody.rows[t].cells[5].innerHTML.replace(/\./g, ""));
					sum_emontcamount = sum_emontcamount + parseInt(test_tablebody.rows[t].cells[6].innerHTML.replace(/\./g, ""));
					sum_totaltrx = sum_totaltrx + parseInt(test_tablebody.rows[t].cells[7].innerHTML.replace(/\./g, ""));
					sum_totalamount = sum_totalamount + parseInt(test_tablebody.rows[t].cells[8].innerHTML.replace(/\./g, ""));
				}

				console.log(sum_kaitrx);
				test_tablefoot.innerHTML += '<tr>'+
					'<td style="text-align:left;"><b>Total</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_kaitrx)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_kaiamount)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_emonttrx)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_emonttamount)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_emontctrx)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_emontcamount)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_totaltrx)+'</b></td>'+
					'<td style="text-align:center;"><b>'+rubah(sum_totalamount)+'</b></td>'+
				'</tr>';

				grafikchart(temp_final_pertanggal);
			// })();
		// }
}



$(document).ready(function() {
	var vm_group_testing = document.getElementById('vm_group');
	var datepicker1 = document.getElementById('datepicker1');
	var datepicker2 = document.getElementById('datepicker2');
	var vm_periodetahun = document.getElementById('vm_periodetahun');

	datepicker1.value = convertDate_1(new Date());
	datepicker2.value = convertDate(new Date());
	

	// vm_satu_testing.innerHTML += '<option value="'+jsonData[a]['terminal_id']+'">'+jsonData[a]['terminal_id']+'</option>';

	loadmain()
	$.ajax({
		url:"http://27.111.44.42/Percobaan2/get_tahunselected",
		success:function(data){
			jsontahun = data;
			vm_periodetahun.innerHTML = '<option selected="selected" value="'+jsontahun[1]['tahun']+'">'+jsontahun[1]['tahun']+'</option>';
			
			for(a=2; a < jsontahun.length; a++){
				vm_periodetahun.innerHTML += '<option value="'+jsontahun[a]['tahun']+'">'+jsontahun[a]['tahun']+'</option>';
			}

			/* .innerHTML = '<option value="All">All</option>';
			// console.log(jsonData);
			for(a in jsonData ){
				// if(jsonData[a]['location_name'] == vmsatu ){
					vm_satu_testing.innerHTML += '<option value="'+jsonData[a]['terminal_id']+'">'+jsonData[a]['terminal_id']+'</option>';
				// }
				
			} */




			



		}
	});

	$.ajax({
		url: "http://27.111.44.44/mobile/Percobaan2/get_vmlokasigroup",
		success: function (jdata) {
			jsonMandiri=jdata;
			
			for(a in jsonMandiri ){
				vm_group_testing.innerHTML += '<option value="'+jsonMandiri[a]['name_group']+'">'+jsonMandiri[a]['name_group']+'</option>';
			}
			vm_group_testing.innerHTML += '<option value="KAI">KAI</option>';
		}
	});
	
	
});













// var data ={
// 	'lunari':{
// 		'bluebird':[
// 			{'terminal_id':'BB0001', 'trx':'10000', 'waktu':'2020-07-25'},
// 			{'terminal_id':'BB0002', 'trx':'12000', 'waktu':'2020-07-25'},
// 			{'terminal_id':'BB0004', 'trx':'10000', 'waktu':'2020-07-25'},
// 			{'terminal_id':'BB0003', 'trx':'10300', 'waktu':'2020-07-25'},
// 			{'terminal_id':'BB0004', 'trx':'10000', 'waktu':'2020-07-26'},
// 			{'terminal_id':'BB0001', 'trx':'10000', 'waktu':'2020-07-26'},
// 			{'terminal_id':'BB0002', 'trx':'12000', 'waktu':'2020-07-26'},
// 			{'terminal_id':'BB0001', 'trx':'12000', 'waktu':'2020-07-27'},
// 			{'terminal_id':'BB0001', 'trx':'12000', 'waktu':'2020-07-27'},
// 			{'terminal_id':'BB0002', 'trx':'12000', 'waktu':'2020-07-27'},
// 			{'terminal_id':'BB0002', 'trx':'12000', 'waktu':'2020-07-28'},
// 		],
// 		'pvj':[
// 			{'terminal_id':'PVJ0001', 'trx':'200', 'waktu':'2020-07-25'},
// 			{'terminal_id':'PVJ0002', 'trx':'3000', 'waktu':'2020-07-25'},
// 			{'terminal_id':'PVJ0004', 'trx':'2000', 'waktu':'2020-07-26'},
// 			{'terminal_id':'PVJ0001', 'trx':'1000', 'waktu':'2020-07-27'}
// 		],
// 		'mag':[
// 			{'terminal_id':'MAG0001', 'trx':'2050', 'waktu':'2020-07-25'},
// 			{'terminal_id':'MAG0002', 'trx':'3100', 'waktu':'2020-07-25'},
// 			{'terminal_id':'MAG0002', 'trx':'2300', 'waktu':'2020-07-26'},
// 			{'terminal_id':'MAG0001', 'trx':'1200', 'waktu':'2020-07-27'}
// 		],
// 		'kai':[
// 			{'terminal_id':'KA0001', 'trx':'201', 'waktu':'2020-07-25'},
// 			{'terminal_id':'KA0002', 'trx':'3002', 'waktu':'2020-07-25'},
// 			{'terminal_id':'KA0002', 'trx':'2090', 'waktu':'2020-07-26'},
// 			{'terminal_id':'KA0001', 'trx':'1020', 'waktu':'2020-07-27'}
// 		],
// 		'mandiri':[
// 			{'terminal_id':'MA0001', 'trx':'100', 'waktu':'2020-07-25'},
// 			{'terminal_id':'MA0002', 'trx':'3100', 'waktu':'2020-07-25'},
// 			{'terminal_id':'MA0002', 'trx':'2500', 'waktu':'2020-07-26'},
// 			{'terminal_id':'MA0001', 'trx':'1200', 'waktu':'2020-07-27'}
// 		]
// 	}
// };

// var data_VMstatus={
// 	'lunari':{
// 		'bluebird':[
// 			{'terminal_id':'BB0001', 'online_status':'1', 'waktu':'2020-07-25'},
// 			{'terminal_id':'BB0002', 'online_status':'1', 'waktu':'2020-07-25'},
// 			{'terminal_id':'BB0001', 'online_status':'0', 'waktu':'2020-07-26'},
// 			{'terminal_id':'BB0002', 'online_status':'0', 'waktu':'2020-07-26'},
// 			{'terminal_id':'BB0001', 'online_status':'1', 'waktu':'2020-07-27'},
// 			{'terminal_id':'BB0002', 'online_status':'1', 'waktu':'2020-07-27'},
// 		],
// 		'pvj':[
// 			{'terminal_id':'PVJ0001', 'online_status':'1', 'waktu':'2020-07-25'},
// 			{'terminal_id':'PVJ0001', 'online_status':'0', 'waktu':'2020-07-26'},
// 			{'terminal_id':'PVJ0001', 'online_status':'1', 'waktu':'2020-07-26'},
// 			{'terminal_id':'PVJ0002', 'online_status':'1', 'waktu':'2020-07-27'},
// 		],
// 	}
// }





	
// });






// var data3 = data['lunari']['bluebird'];
// console.log("data3",data3);


$(document).ready(function() {
	$.fn.dataTable.ext.errMode = 'none'; //REMOVE alert WARNING
});



// var datanya;
// function tempObject(object){
// 	var temp = [];
// 	var dat = data['lunari'][object];
// 	for(d in dat){
// 		temp.push(dat[d]);
// 	}
// 	return temp;
// }

// looping1 data
// function looping1(dat,param){
// 	var six;
// 	for(x in dat){
// 		six = dat[x][param];
// 	}
// 	return six;
// }

// transfersi RUPIAH
// function rubah(angka){
// 	var reverse = angka.toString().split('').reverse().join(''),
// 	ribuan = reverse.match(/\d{1,3}/g);
// 	ribuan = ribuan.join('.').split('').reverse().join('');
// 	return ribuan;
// }

// var temp_all = [
// 	...tempObject('bluebird'),
// 	...tempObject('kai'),
// 	...tempObject('mag'),
// 	...tempObject('mandiri'),
// 	...tempObject('pvj')
// ];
// console.log('temp', temp_all);

// for(d in data['lunari']['kai']){
// 	if(data['lunari']['kai'][d]['waktu'] === '2020-07-28'){
// 		console.log('kai',data['lunari']['kai'][d]);
// 	}
	
// }

// var Today = (new Date()).toISOString().split('T')[0];

// for(hm in temp_all){
// 	if()
// }

// function waktuCompare(a,b) {
// 	if( a.waktu < b.waktu){
// 		return -1;
// 	}
// 	if( a.waktu > b.waktu){
// 		return 1;
// 	}
// 	return 0;
// }

// console.log(temp_all.sort(waktuCompare));

// function removeDuplicates(originalArray, prop) {
// 	var newArray = [];
// 	var lookupObject  = {};

// 	for(var i in originalArray) {
// 	   lookupObject[originalArray[i][prop]] = originalArray[i];
// 	}

// 	for(i in lookupObject) {
// 		newArray.push(lookupObject[i]);
// 	}
// 	 return newArray;
// }

// console.log('remove duplicate',removeDuplicates(data['lunari']['mandiri'], "terminal_id"))
// console.log(data['lunari']); 
// for(a=0; a<data['lunari']['mandiri'].length; a++){
// 	console.log(data['lunari']['mandiri'][a]); 
// }
// $(document).ready(function(){
// 	// z=0; z<historiTransaksi.length; z++
// 	/* for(da=0; da<data['lunari']['mandiri'].length; da++){
// 		console.log('cek',data['lunari']['mandiri'][da]);
// 	} */
// 	console.log('test',data['lunari']['mandiri']);
// 	for(listvmsatu =0; listvmsatu<data['lunari'].length; listvmsatu++){
// 		console.log(data['lunari']['kai'][listvmsatu]);
		
// 	}
// 	$('#vm_group').change(function (){
// 		var val = $(this).val();
// 		var selectVMsatu = document.getElementById('vm_satu');
// 		if(val == '1'){
// 			for(lmandiri=0; lmandiri<data['lunari']['mandiri'].length; lmandiri++){
// 				console.log(data['lunari']['mandiri']['terminal_id']);
				
// 				// $('#vm_satu').innerHTML += ('<option value='+lmandiri+'>'+data['lunari']['mandiri'][lmandiri]['terminal_id']+'</option>');
// 				selectVMsatu += '<option value="'+lmandiri+'">'+data['lunari']['mandiri'][lmandiri]['terminal_id']+'</option>';
// 			}
// 		}else if(val == '0'){
// 			$('#vm_satu').html('<option value="0" >All</option>');
// 		}
// 	});
// });
// console.log(data['lunari']['mandiri']['terminal_id']);
// function selected_vmgroup(){
// 	var selectedVMgroup = document.getElementById('vm_group');
// 	var selectedVMsatu = document.getElementById('vm_satu');

// 	if(selectedVMgroup.selectedIndex == '1'){
// 		selectedVMsatu.innerHTML = '<option value="0" >All</option>';
// 		var mandiri = removeDuplicates(data['lunari']['mandiri'], "terminal_id");
// 		for(lmandiri=0; lmandiri<mandiri.length; lmandiri++){
// 			// console.log(data['lunari']['mandiri'][lmandiri]['terminal_id']); 
// 			selectedVMsatu.innerHTML += '<option value="'+mandiri[lmandiri]['terminal_id']+'">'+mandiri[lmandiri]['terminal_id']+'</option>';
// 		}
// 	}else if(selectedVMgroup.selectedIndex == '2'){
// 		selectedVMsatu.innerHTML = '<option value="0" >All</option>';
// 		var bluebird = removeDuplicates(data['lunari']['bluebird'], "terminal_id");
// 		for(lbluebird=0; lbluebird<bluebird.length; lbluebird++){
// 			// console.log(bluebird[lbluebird]);
// 			selectedVMsatu.innerHTML += '<option value="'+bluebird[lbluebird]['terminal_id']+'">'+bluebird[lbluebird]['terminal_id']+'</option>';
// 		}
// 	}else if(selectedVMgroup.selectedIndex == '3'){
// 		selectedVMsatu.innerHTML = '<option value="0" >All</option>';
// 		var pvj = removeDuplicates(data['lunari']['pvj'], "terminal_id");
// 		for(lpvj=0; lpvj<pvj.length; lpvj++){
// 			selectedVMsatu.innerHTML += '<option value="'+pvj[lpvj]['terminal_id']+'">'+pvj[lpvj]['terminal_id']+'</option>';
// 		}
// 	}
// 	else if(selectedVMgroup.selectedIndex == '4'){
// 		selectedVMsatu.innerHTML = '<option value="0" >All</option>';
// 		var mag = removeDuplicates(data['lunari']['mag'], "terminal_id");
// 		for(lmag=0; lmag<mag.length; lmag++){
// 			selectedVMsatu.innerHTML += '<option value="'+mag[lmag]['terminal_id']+'">'+mag[lmag]['terminal_id']+'</option>';
// 		}
// 	}else if(selectedVMgroup.selectedIndex == '5'){
// 		var kai = removeDuplicates(data['lunari']['kai'], "terminal_id");
// 		for(lkai=0; lkai<kai.length; lkai++){
// 			selectedVMsatu.innerHTML += '<option value="'+kai[lkai]['terminal_id']+'">'+kai[lkai]['terminal_id']+'</option>';
// 		}
// 	}else if(selectedVMgroup.selectedIndex == '0'){
// 		selectedVMsatu.innerHTML = '<option value="0" >All</option>';
// 	}
// }

// function listdataALL(datashow){
// 	var tbodyall = document.getElementById('dtBasicExample').getElementsByTagName('tbody');
// 	var lishow = data['lunari'][datashow];
// 	for(x=0; x<lishow.length; x++){
// 		tbodyall.innerHTML += '<tr>'+
// 			'<td>'+(x+1)+'</td>'+
// 			'<td>'+lishow[x]['terminal_id']+'</td>'+
// 			'<td>'+lishow[x]['trx']+'</td>'+
// 			'<td>'+lishow[x]['waktu']+'</td>'+
// 		'</tr>';
// 	}
// }

// function listdataALL1(datashow){
// 	var tbodyall = document.getElementById('trbodyisiall');
// 	var vmsatu = document.getElementById('vm_satu');
// 	var vmsatuoption = vmsatu.options[vmsatu.selectedIndex].text;
// 	var y = 1;
// 	var lishow = data['lunari'][datashow];
// 	;
// 	for(x=0; x<lishow.length; x++){
// 		if(vmsatu.value == '0'){
// 			/* var y = 0; */
// 			tbodyall.innerHTML += '<tr>'+
// 				'<td>'+(y++)+'</td>'+
// 				'<td>'+lishow[x]['terminal_id']+'</td>'+
// 				'<td>'+lishow[x]['trx']+'</td>'+
// 				'<td>'+lishow[x]['waktu']+'</td>'+
// 			'</tr>';
// 			console.log('2',data['lunari'][datashow])
// 		}else if(vmsatu.value != '0' && lishow[x]['terminal_id'] == vmsatu.value){
// 			tbodyall.innerHTML += '<tr>'+
// 				'<td>'+(y++)+'</td>'+
// 				'<td>'+lishow[x]['terminal_id']+'</td>'+
// 				'<td>'+lishow[x]['trx']+'</td>'+
// 				'<td>'+lishow[x]['waktu']+'</td>'+
// 			'</tr>';
// 			console.log('1',data['lunari'][datashow])
// 		}
// 	}
// }

// function grafikchart(datashow){
// 	var lishow = datashow;
// 	var tampilkanchart = document.getElementById('tampilkanchart');
// 	tampilkanchart.style.display = 'block';
// 	var chartGrafik = [];
// 	console.log('lishowa', lishow);

// 	var reduced = lishow.reduce(function(allDates, date) {
// 		if (allDates.some(function(e) {
// 			return e.waktu === date.waktu
// 		})) {
// 		allDates.filter(function(e) {
// 			return e.waktu === date.waktu
// 		})[0].trx += +date.trx
// 		} else {
// 		allDates.push({
// 			waktu: date.waktu,
// 			trx: +date.trx
// 		})
// 		}
// 		return allDates
// 	}, []);
	
// 	console.log('reduced',reduced);

// 	for(x = 0; x<reduced.length; x++){
// 		chartGrafik.push(
// 			[new Date(reduced[x]['waktu']).getTime(), Number(reduced[x]['trx'])]
// 		);
// 	}
// 	console.log('chartGrafik',chartGrafik);
	

// 	Highcharts.stockChart('tampilkanchart', {
// 		chart:{
// 			event:{
// 				load:function(){
					
// 				}
// 			},
// 		},
// 		credits: {
// 			enabled: false
// 		  },
// 		  rangeSelector: {
// 			buttons: [{
// 				type: 'day',
// 				count: 1,
// 				text: '1D',
				
// 			},{
// 				type: 'week',
// 				count: 1,
// 				text: '1W'
// 			},
// 			{
// 				type: 'month',
// 				count: 1,
// 				text: '1M'
// 			},
// 			{
// 				type: 'all',
// 				text: 'All'
// 			}],
// 			selected:0,
// 			inputEnabled:false
// 		},
// 		xAxis: {
// 		},
// 		title: {
// 			text: ''
// 		},
// 		exporting: { 
// 			enabled: false 
// 		},
// 		series: [{
// 			name: 'Grafik Data',
// 			data: chartGrafik,
// 			type: 'column',
// 		}]
// 	});


// }

// function listdataALL2(datashow){
// 	// var tbodyall = document.getElementById('trbodyisiall');
// 	var vmsatu = document.getElementById('vm_satu');
// 	// var vmsatuoption = vmsatu.options[vmsatu.selectedIndex].text;
// 	// var y = 1;
// 	var lishow = data['lunari'][datashow];
// 	var arr = []
// 	for(x=0; x<lishow.length; x++){
// 		if(vmsatu.value == '0'){
// 			var xlishow = lishow[x];
// 			arr.push(xlishow);
// 		}else if(vmsatu.value != '0' && lishow[x]['terminal_id'] == vmsatu.value){
// 			var xlishow = lishow[x];
// 			arr.push(xlishow);
// 		}
// 	}
	 
// 	var t = $('#example').DataTable( {
// 		"data": arr,
// 		"columns": [
// 			{ "data":"", "title": "No"  },
// 			{ "data":"terminal_id", "title": "Terminal ID"},
// 			{ "data":"trx", "title": "Transaksi" , render: function(data){
// 				return "Rp." + rubah(data);
// 			}},
// 			{ "data":"waktu", "title": "Tanggal" }
// 		]
// 	} );
// 	t.on( 'order.dt search.dt', function () {
//         t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
//             cell.innerHTML = i+1;
//         } );
// 	} ).draw();
// 	console.log('arr',arr);

// 	grafikchart(arr);
// }

// function listdataONE(datashow){
// 	var tbodyall = document.getElementById('trbodyisiall');
// 	var lishow = data['lunari'][datashow];
// 	var vmsatu = document.getElementById('vm_satu');
// 	var vmsatuoption = vmsatu.options[vmsatu.selectedIndex].text;

// 	for(x=0; x<lishow.length; x++){
// 		if(vmsatu.selectedIndex == 0){
// 			tbodyall.innerHTML += '<tr>'+
// 				'<td>'+(x+1)+'</td>'+
// 				'<td>'+lishow[x]['terminal_id']+'</td>'+
// 				'<td>'+lishow[x]['trx']+'</td>'+
// 				'<td>'+lishow[x]['waktu']+'</td>'+
// 			'</tr>';
// 		}
// 	}
// }

// function displayHistoriTransaksi(){
// 	var divTampilan = document.getElementById('tampilkan');
// 	var vmgroup = document.getElementById('vm_group');
// 	var vmsatu = document.getElementById('vm_satu');
// 	var vmtransaksi = document.getElementById('vm_transaksi');
// 	$('#tampilkan').html('<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered table-sm" id="example"></table>');

// 	divTampilan.style.display = 'block';
// 	// var y = 1;
	/* divTampilan.innerHTML = '<table id="table-data" class="table"  style="width:100%">'+
		'<thead id="trhead">'+
			'<tr>'+
				'<th>No</th>'+
				'<th>Terminal ID</th>'+
				'<th>Transaksi</th>'+
				'<th>Tanggal</th>'+
			'</tr>'+
		'</thead>'+
		'<tbody id="trbodyisiall">'+
		// td untuk ditampilkan
		'</tbody>'+
	'</table>'; */
// 	if(vmtransaksi.options[vmtransaksi.selectedIndex].text == 'TRX'){
// 		if(vmgroup.options[vmgroup.selectedIndex].text == 'Bluebird' ){
// 			listdataALL2('bluebird');
// 		}else if(vmgroup.options[vmgroup.selectedIndex].text == 'Bank Mandiri'){
// 			listdataALL2('mandiri');
// 		}else if(vmgroup.options[vmgroup.selectedIndex].text == 'PVJ'){
// 			listdataALL2('pvj');
// 		}else if(vmgroup.options[vmgroup.selectedIndex].text == 'Artha Gading'){
// 			listdataALL2('mag');
// 		}else if(vmgroup.options[vmgroup.selectedIndex].text == 'KAI'){
// 			listdataALL2('kai');
// 		}else if(vmgroup.options[vmgroup.selectedIndex].text == 'All' && vmsatu.options[vmsatu.selectedIndex].text =='All'){
// 			var t = $('#example').DataTable( {
// 				"data": temp_all,
// 				"columns": [
// 					{ "data":"", "title": "No"  },
// 					{ "data":"terminal_id", "title": "name"  },
// 					{ "data":"trx", "title": "position", render: function(data){
// 						return "Rp." + rubah(data); 
// 					}},
// 					{ "data":"waktu", "title": "salary" }
// 				]
// 			});
// 			t.on( 'order.dt search.dt', function () {
// 				t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
// 					cell.innerHTML = i+1;
// 				} );
// 			} ).draw();

// 			grafikchart(temp_all);
// 		}
// 	}else{
// 		divTampilan.style.display = 'none';
// 	}
	
// }



// function showVMgroup(){
// 	var selectVMowner = document.getElementById('vm_owner');
// 	var selectVMgroup = document.getElementById('tr_vmgroup');



// 	if(selectVMowner.value == 'lunari'){
// 		selectVMgroup.style.display = 'block';
// 	}
// 	else{
// 		selectVMgroup.style.display = 'none';
// 	}
// 	// var tr_vmgroup = document.getElementById('tr_vmgroup')
// }
// function showVMproduct(){
// 	var selectVMgroup = document.getElementById('vm_group');
// 	var selectVMproduct = document.getElementById('tr_vmproduct');

// 	if(selectVMgroup.value == 'bankmandiri'){
// 		selectVMproduct.style.display = 'block';
// 	}else if(selectVMgroup.value == 'bb'){
// 		selectVMproduct.style.display = 'block';
// 	}else if(selectVMgroup.value == 'pvj'){
// 		selectVMproduct.style.display = 'block';
// 	}else if(selectVMgroup.value == 'mag'){
// 		selectVMproduct.style.display = 'block';
// 	}else if(selectVMgroup.value == 'kai'){
// 		selectVMproduct.style.display = 'block';
// 	}else if(selectVMgroup.value == 'semua'){
// 		selectVMproduct.style.display = 'none';
// 	}
// }
// function showVMsatuan(){
// 	var selectVMproduct = document.getElementById('vm_product');
// 	var selectVMvmsatu = document.getElementById('tr_vmsatu');

// 	if(selectVMproduct.value == 'prepaidemoney'){
// 		selectVMvmsatu.style.display = 'block';
// 	}else if(selectVMproduct.value == 'topupemoney'){
// 		selectVMvmsatu.style.display = 'block';
// 	}else if(selectVMproduct.value == 'tiketkai'){
// 		selectVMvmsatu.style.display = 'block';
// 	}else if(selectVMproduct.value == 'semua'){
// 		selectVMvmsatu.style.display = 'none';
// 	}
// }













// function showVM
// var pushemoney = [];
// var pushemoneycard = [];
// var pushkai = []

// for(l=0; l<historiTransaksi['emoney'].length; l++){
// 	var f = historiTransaksi['emoney'][l];
// 	pushemoney.push(
// 		f
// 	)
	
// }
// for(m=0; m<historiTransaksi['emoney_card'].length; m++){
// 	var fi = historiTransaksi['emoney_card'][m];
// 	pushemoneycard.push(
// 		fi
// 	)
// 	// console.log('cel',fi);
// }
// for(n=0; n<historiTransaksi['kai'].length; n++){
// 	var fia = historiTransaksi['kai'][n];
// 	pushkai.push(
// 		fia
// 	)
// 	// console.log('cel',fi);
// }
// var pushall = [...pushemoney, ...pushemoneycard, ...pushkai];

// var uniqueArray = removeDuplicates(pushall, "terminal_id");
// console.log('duplicate',uniqueArray);
// // pushall.push();
// // console.log('aa',pushall.sort(compare));
// // console.log(historiTransaksi.sort(compare))

// // filter
// const BB0001 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0001');
// const BB0002 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0002');
// const BB0003 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0003');
// const BB0004 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0004');
// const BB0005 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0005');
// const BB0006 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0006');
// const BB0007 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0007');
// const BB0008 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0008');
// const BB0009 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0009');
// const BB0010 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0010');
// const BB0011 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0011');
// const BB0012 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0012');
// const BB0013 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0013');
// const BB0014 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0014');
// const BB0015 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0015');
// const BB0016 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0016');
// const BB0017 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0017');
// const BB0018 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0018');
// const BB0019 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0019');
// const BB0020 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0020');
// const BB0021 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0021');
// const BB0022 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0022');
// const BB0023 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0023');
// const BB0024 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0024');
// const BB0025 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0025');
// const BB0026 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0026');
// const BB0027 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0027');
// const BB0028 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0028');
// const BB0029 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'BB0029');

// // PVJ
// const PVJ001 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'PVJ001');
// const PVJ002 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'PVJ002');
// const PVJ003 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'PVJ003');
// const PVJ004 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'PVJ004');
// const PVJ005 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'PVJ005');
// const PVJ006 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'PVJ006');
// const PVJ007 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'PVJ007');
// const PVJ008 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'PVJ008');
// const PVJ009 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'PVJ009');
// const PVJ010 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'PVJ010');
// const PVJ011 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'PVJ011');
// const PVJ012 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'PVJ012');

// // MAG
// const MAG01 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'MAG-001');
// const MAG02 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'MAG-002');

// // MANDIRI
// const mandiri01 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'Bapindo-01');
// const mandiri02 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === 'Bapindo-02');
// const mandiri03 = historiTransaksi['emoney'].filter(city => city['terminal_id'] === '210-00-GIIAS-001');

// // KAI
// const KA1001 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA1001');
// const KA1002 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA1002');
// const KA1003 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA1003');
// const KA1004 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA1004');
// const KA1005 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA1005');
// const KA1006 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA1006');
// const KA1007 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA1007');
// const KA1008 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA1008');
// const KA1009 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA1009');
// const KA1010 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA1010');
// const KA1011 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA1011');
// const KA1012 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA1012');
// const KA1013 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA1013');
// const KA1014 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA1014');
// const KA1015 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA1015');
// const KA8001 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA8001');
// const KA8002 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA8002');
// const KA8003 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA8003');
// const KA8004 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA8004');
// const KA8005 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA8005');
// const KA8007 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA8007');
// const KA8008 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA8008');
// const KA2001 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA2001');
// const KA2002 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA2002');
// const KA2003 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA2003');
// const KA2004 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA2004');
// const KA6001 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA6001');
// const KA6002 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA6002');
// const KA6003 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA6003');
// const KA6004 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA6004');
// const KA6005 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA6005');
// const KA6006 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA6006');
// const KA6007 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA6007');
// const KA6008 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA6008');
// const KA6009 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA6009');
// const KA6010 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA6010');
// const KA6011 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA6011');
// const KA6012 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA6012');
// const KA6013 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA6013');
// const KA6014 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA6014');
// const KA8009 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA8009');
// const KA8010 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA8010');
// const KA3001 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA3001');
// const KA3002 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA3002');
// const KA3003 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA3003');
// const KA3004 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA3005');
// const KA3005 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA3005');
// const KA4001 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA4001');
// const KA4002 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA4002');
// const KA4003 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA4003');
// const KA4004 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA4004');
// const KA4005 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA4005');
// const KA4006 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA4006');
// const KA4007 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA4007');
// const KA4008 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA4008');
// const KA4009 = historiTransaksi['kai'].filter(city => city['terminal_id'] === 'KA4009');



// // const pool_grab = historiTransaksi['emoney'].filter(city => city['terminal_id'] === '210-00-GIIAS-001');





// // var x;
// // for(x in )
// var vm_groupbb = [
// 	...BB0001, ...BB0002, ...BB0003,...BB0004,...BB0005,
// 	...BB0006,...BB0007,...BB0008,...BB0009,...BB0010,
// 	...BB0011,...BB0012,...BB0013,...BB0014,...BB0015,
// 	...BB0016,...BB0017,...BB0018,...BB0019,...BB0020,
// 	...BB0021,...BB0022,...BB0023,...BB0024,...BB0025,
// 	...BB0026,...BB0027,...BB0028,...	BB0029
// ];

// var vm_grouppvj = [
// 	...PVJ001,...PVJ002,...PVJ003,...PVJ004,...PVJ005,
// 	...PVJ006,...PVJ007,...PVJ008,...PVJ009,...PVJ010,
// 	...PVJ011,...PVJ012
// ];

// var vm_groupmandiri = [
// 	...mandiri01,...mandiri02,...mandiri03
// ];

// var vm_groupmag = [
// 	...MAG01,...MAG02
// ];

// var vm_groupkai = [
// 	...KA1001,...KA1002,...KA1003,...KA1004,...KA1005,...KA1006,...KA1007,...KA1008,...KA1009,...KA1010,...KA1011,...KA1012,...KA1013,...KA1014,...KA1015,
// 	...KA8001,...KA8002,...KA8003,...KA8004,...KA8005,...KA8007,...KA8008,...KA8009,...KA8010,
// 	...KA2001,...KA2002,...KA2003,...KA2004,
// 	...KA6001,...KA6002,...KA6003,...KA6004,...KA6005,...KA6006,...KA6007,...KA6008,...KA6009,...KA6010,...KA6011,...KA6012,...KA6013,...KA6014,
// 	...KA3001,...KA3002,...KA3003,...KA3004,...KA3005,
// 	...KA4001,...KA4002,...KA4003,...KA4004,...KA4005,...KA4006,...KA4007,...KA4008,...KA4009
// ];

// vm_groupfinal = {
// 	bb:vm_groupbb,
// 	pvj:vm_grouppvj,
// 	mag:vm_groupmag,
// 	mandiri:vm_groupmandiri,
// 	kai: vm_groupkai
// }

// console.log('vm_groupfinal',vm_groupfinal);

// function showcomboVMgroup(){
	
// 	var selectedLunari = document.getElementById('vm_owner').value == '1';
// 	// $("#vm_owner").prop("selectedIndex", -1);
// 	// document.getElementById('vm_owner').value = '1';
// 	if(selectedLunari){
// 		// document.getElementById('tr_vmgroup').style.width = "0px";
// 		/* var temp="Semua"; 
//     	$("#vm_owner").val(temp); */
// 		document.getElementById('tr_vmgroup').style.display = "block";
// 		document.getElementById('tr_vmproduct').style.display = "block";
// 	}else{
// 		document.getElementById('tr_vmgroup').style.display = "none";
// 		document.getElementById('tr_vmproduct').style.display = "none";
// 	}
// }
// // function showcomboVNproduct(){
// // 	var select
// // }
// var historiTransaksi1 = [];
// historiTransaksi1.push({
// 	'emoney' :historitrxmandiri,
// 	'emoney_card' : historitrxmandiricard,
// 	'kai' : historitrxkai
// })
// // console.log(historiTransaksi1);
			
		
// // for(z=0; z<historiTransaksi.length; z++){
// 	// console.log('zzzz',historiTransaksi1[0]['emoney'][5]['terminal_id']);
// // }
// $(document).ready(function(){
// 	// var tampilkan = $('#tampilkan');
// 	// var tampilkan2 = $('#tampilkan2');

// 	var tableall1 = $('#trbodyisiall');
// 	var tableall2 = $('#trbodyisiall2');
// 	var tableall3 = $('#trbodyisiall3');
// 	var tableall4 = $('#trbodyisiall4');
// 	var tableall5 = $('#trbodyisiall5');
// 	var tableall6 = $('#trbodyisiall6');
// 	var tableall7 = $('#trbodyisiall7');
// 	for(a=0; a< pushall.length; a++){
// 		var vmowner =  pushall[a];
// 		// console.log(vmowner.terminal_id);
// 		tableall1.innnerHTML +=
// 			'<tr>'+
// 				'<td>'+a+'</td>'+
// 				'<td>'+vmowner.terminal_id+'</td>'+
// 				'<td>'+vmowner.trx+'</td>'+
// 				'<td>'+vmowner.datetimee+'</td>'+
// 			'</tr>'
// 		;
// 		tableall2.append(
// 			'<tr>'+
// 				'<td>'+a+'</td>'+
// 				'<td>'+vmowner.terminal_id+'</td>'+
// 				'<td>'+vmowner.trx+'</td>'+
// 				'<td>'+vmowner.datetimee+'</td>'+
// 			'</tr>'
// 		);
// 	}

// 	for(b=0; b<vm_groupfinal['bb'].sort(compare).length; b++){
// 		// console.log('asdasda',vm_groupfinal['bb'][b]);
// 		tableall3.append(
// 			'<tr>'+
// 				'<td>'+b+'</td>'+
// 				'<td>'+vm_groupfinal['bb'][b]['terminal_id']+'</td>'+
// 				'<td>'+vm_groupfinal['bb'][b]['trx']+'</td>'+
// 				'<td>'+vm_groupfinal['bb'][b]['datetimee']+'</td>'+
// 			'</tr>'
// 		);
// 	}
// 	for(c=0; c<vm_groupfinal['pvj'].sort(compare).length; c++){
// 		tableall4.append(
// 			'<tr>'+
// 				'<td>'+c+'</td>'+
// 				'<td>'+vm_groupfinal['pvj'][c]['terminal_id']+'</td>'+
// 				'<td>'+vm_groupfinal['pvj'][c]['trx']+'</td>'+
// 				'<td>'+vm_groupfinal['pvj'][c]['datetimee']+'</td>'+
// 			'</tr>'
// 		);
// 	}
// 	for(d=0; d<vm_groupfinal['mag'].sort(compare).length; d++){
// 		tableall5.append(
// 			'<tr>'+
// 				'<td>'+d+'</td>'+
// 				'<td>'+vm_groupfinal['mag'][d]['terminal_id']+'</td>'+
// 				'<td>'+vm_groupfinal['mag'][d]['trx']+'</td>'+
// 				'<td>'+vm_groupfinal['mag'][d]['datetimee']+'</td>'+
// 			'</tr>'
// 		);
// 	}
// 	for(e=0; e<vm_groupfinal['mandiri'].sort(compare).length; e++){
// 		tableall6.append(
// 			'<tr>'+
// 				'<td>'+e+'</td>'+
// 				'<td>'+vm_groupfinal['mandiri'][e]['terminal_id']+'</td>'+
// 				'<td>'+vm_groupfinal['mandiri'][e]['trx']+'</td>'+
// 				'<td>'+vm_groupfinal['mandiri'][e]['datetimee']+'</td>'+
// 			'</tr>'
// 		);
// 	}
// 	for(f=0; f<vm_groupfinal['kai'].sort(compare).length; f++){
// 		tableall7.append(
// 			'<tr>'+
// 				'<td>'+f+'</td>'+
// 				'<td>'+vm_groupfinal['kai'][f]['terminal_id']+'</td>'+
// 				'<td>'+vm_groupfinal['kai'][f]['trx']+'</td>'+
// 				'<td>'+vm_groupfinal['kai'][f]['datetimee']+'</td>'+
// 			'</tr>'
// 		);
// 	}
	
// });
$(document).ready(function() {
    $('#tampilkan').DataTable( {
		"pageLength": 10
	} );
});
// 	$('#example2').DataTable( {
// 		"pageLength": 10
// 	} );
	
// 	$('#example3').DataTable( {
// 		"pageLength": 10
// 	} );

// 	$('#example4').DataTable( {
// 		"pageLength": 10
// 	} );

// 	$('#example5').DataTable( {
// 		"pageLength": 10
// 	} );

// 	$('#example6').DataTable( {
// 		"pageLength": 10
// 	} );
// 	$('#example7').DataTable( {
// 		"pageLength": 10
// 	} );
// } );
// function showSubmit(){
// 	// $('#tampilkan').remove();
// 	var selectVMowner = document.getElementById('vm_owner').selectedIndex;
// 	var selectVMgroup = document.getElementById('vm_group').selectedIndex;
// 	var selectVMproduct = document.getElementById('vm_product').selectedIndex;
// 	var selectVMsatu = document.getElementById('vm_satu').selectedIndex;
	
// 	var tampilkan = $('#tampilkan');
// 	var tableall1 = $('#trbodyisiall');
// 	var tableall2 = $('#trbodyisiall2');
// 	var tampilkan2 = $('#tampilkan2');
// 	var tampilkan3 = $('#tampilkan3');
// 	var tampilkan4 = $('#tampilkan4');
// 	var tampilkan5 = $('#tampilkan5');
// 	var tampilkan6 = $('#tampilkan6');
// 	var tampilkan7 = $('#tampilkan7');
// 	// var x =  $('#tampilkan #example #trbodyisiall');
// 	// tampilkan.show();
// 	// var table = $('#example').DataTable();
// 	// tampilkan.show();
// 	// tampilkan.show();
// 	// tampilkan.reset();
// 	// tampilkan.show();
// 	// tableall2.show();
// 	if(selectVMowner == '0'){
// 		if(selectVMgroup=='0' && selectVMproduct=='0' && selectVMsatu=='0'){
// 			tampilkan.show();
// 			tampilkan2.hide();
// 			tampilkan3.hide();
// 			tampilkan4.hide();
// 			tampilkan5.hide();
// 			tampilkan6.hide();
// 			tampilkan7.hide();
// 		}else{
// 			tampilkan.show();
// 			tampilkan2.hide();
// 			tampilkan3.hide();
// 			tampilkan4.hide();
// 			tampilkan5.hide();
// 			tampilkan6.hide();
// 			tampilkan7.hide();
// 		}
// 	}
// 	else if(selectVMowner == '1'){
// 		if(selectVMroup=='0'){
			
// 			tampilkan.hide();
// 			tampilkan2.show();
// 			tampilkan3.hide();
// 			tampilkan4.hide();
// 			tampilkan5.hide();
// 			tampilkan6.hide();
// 			tampilkan7.hide();
// 		}else if(selectVMroup == '1'){
// 			tampilkan.hide();
// 			tampilkan2.hide();
// 			tampilkan3.show();
// 			tampilkan4.hide();
// 			tampilkan5.hide();
// 			tampilkan6.hide();
// 			tampilkan7.hide();
// 		}else if(selectVMroup == '2'){
// 			tampilkan.hide();
// 			tampilkan2.hide();
// 			tampilkan3.hide();
// 			tampilkan4.show();
// 			tampilkan5.hide();
// 			tampilkan6.hide();
// 			tampilkan7.hide();
// 		}else if(selectVMroup == '3'){
// 			tampilkan.hide();
// 			tampilkan2.hide();
// 			tampilkan3.hide();
// 			tampilkan4.hide();
// 			tampilkan5.show();
// 			tampilkan6.hide();
// 			tampilkan7.hide();
// 		}else if(selectVMroup == '4'){
// 			tampilkan.hide();
// 			tampilkan2.hide();
// 			tampilkan3.hide();
// 			tampilkan4.hide();
// 			tampilkan5.hide();
// 			tampilkan6.show();
// 			tampilkan7.hide();
// 		}else if(selectVMroup == '5'){
// 			tampilkan.hide();
// 			tampilkan2.hide();
// 			tampilkan3.hide();
// 			tampilkan4.hide();
// 			tampilkan5.hide();
// 			tampilkan6.hide();
// 			tampilkan7.show();
// 		}

// 	}
// }

// function showcomboVMsatu(group){
// 	var selectVMgroup = document.getElementById('vm_group');
// 	var selectVMsatu = document.getElementById('vm_satu');
// 	document.getElementById('tr_vmsatu').style.display = "block";
// 	// var
// 	// if(selectVMgroup.selectedIndex == '1'){
// 		// selectVMsatu.style.display = "block";
// 		for(list1=0; list1<vm_groupfinal['bb'].length; list1++){
// 			selectVMsatu.innerHTML += '<option value="">'+vm_groupfinal['bb'][list1]['terminal_id']+'</option>'
// 		}
// 	// }
// }

// // vm_group.push(
// // 	BB0002
// // )

// // function buttonShowAction(param1,param2){
// // $('#linkcombo').on('submit', function(e){
// // 	e.preventDefault();
// // 	var $form = $(this),
// // 		$select = $form.find('select')
// // });
// // $(document).ready(function() { 
// // 	var sam = document.getElementById('vm_owner').value;
// // 	var tampilkan = document.getElementById('#tampilkan');
// // 	$("#submit").click(function() { 
// // 		// for()
// // 		if(sam == '2'){
// // 			tampilkan.append(
// // 				'<br>'++
// // 			);
// // 		}
// // 	}); 
// // });

// console.log(vm_groupfinal);
// $(document).ready(function(){	
	
// 	document.getElementById('tr_vmgroup').value == "1";
// 	if(Object.keys(vm_groupfinal)[0] === 'bb'){
// 		var writebb = 'Bluebird';
// 	}
// 	if(Object.keys(vm_groupfinal)[1] === 'pvj'){
// 		var writepvj = 'PVJ';
// 	}
// 	if(Object.keys(vm_groupfinal)[2] === 'mag'){
// 		var writemag = 'Artha Gading';
// 	}
// 	if(Object.keys(vm_groupfinal)[3] === 'mandiri'){
// 		var writeman = 'Mandiri';
// 	}
// 	if(Object.keys(vm_groupfinal)[4] === 'kai'){
// 		var writekai = 'KAI';
// 	}
// 	// var kategori = $('#kategori');
// 	// document.getElementById('vm_owner').style.display = "block";
// 	var vm_group = $('#vm_group');
// 	// console.log(Object.keys(vm_groupfinal)[0]);
// 	vm_group.append(
// 		'<option value="2">'+writebb+'</option>'+
// 		'<option value="3">'+writepvj+'</option>'+
// 		'<option value="4">'+writemag+'</option>'+
// 		'<option value="5">'+writeman+'</option>'+
// 		'<option value="6">'+writekai+'</option>'
// 	);

// 	var vm_product = $('#vm_product');
// 	vm_product.append(
// 		'<option value="1">Prepaid Emoney</option>'+
// 		'<option value="2">Topup Emoney - Bank Mandiri</option>'+
// 		'<option value="3">Tiket KAI</option>'
// 	);

	
// 	/* for(rowKategori = 0; rowKategori < newArrayKategori.length; rowKategori++){
// 		kategori.append(
// 			'<option value="'+newArrayKategori[rowKategori].kategori+'">'+newArrayKategori[rowKategori].kategori+'</option>'
// 		);
// 	} */
	
	
// });
// $(document).ready(function() {
    
// } );


// // percobaan
// // $(document).ready(function(){
// // $("#mytable #checkall").click(function () {
// // 		if ($("#mytable #checkall").is(':checked')) {
// // 			$("#mytable input[type=checkbox]").each(function () {
// // 				$(this).prop("checked", true);
// // 			});

// // 		} else {
// // 			$("#mytable input[type=checkbox]").each(function () {
// // 				$(this).prop("checked", false);
// // 			});
// // 		}
// // 	});
	
// // 	$("[data-toggle=tooltip]").tooltip();
// // });
