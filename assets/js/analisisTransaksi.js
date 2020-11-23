$('#datepicker1').datepicker({
	uiLibrary: 'bootstrap4',
	format: "yyyy-mm-dd",

});

$('#datepicker2').datepicker({
	uiLibrary: 'bootstrap4',
	format: "yyyy-mm-dd"
});

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

function trx_show1(){
	var vm_group_testing1 = document.getElementById('vm_group1');
	var vm_location_testing1 = document.getElementById('vm_location1');
	var vm_locationtr_testing1 = document.getElementById('tr_vmlocation1');
	var vm_satu_testing1 = document.getElementById('vm_satu1');



	// var vm_satu_testing = document.getElementById('vm_satu');
	if(vm_group_testing1.options[vm_group_testing1.selectedIndex].text == 'KAI'){
		vm_locationtr_testing1.style.display = 'block';
		vm_satu_testing1.innerHTML = '<option value="All">All</option>';
		var vm_satu_kai1 = vm_location_testing1.options[vm_location_testing1.selectedIndex].text;
		$.ajax({
			url: "http://27.111.44.42/Percobaan2/get_vmlokasi",
			success: function (jdata) {
				jsonData=jdata;
				vm_location_testing1.innerHTML = '<option value="All">All</option>';
				for(a in jsonData ){
					vm_location_testing1.innerHTML += '<option value="'+jsonData[a]['location_name']+'">'+jsonData[a]['location_name']+'</option>';
				}
				
			}
		});
	}
	else if(vm_group_testing1.options[vm_group_testing1.selectedIndex].text != 'KAI'){
		var valueselainkai1 = vm_group_testing1.options[vm_group_testing1.selectedIndex].text;
		vm_locationtr_testing1.style.display = 'none';
		vm_location_testing1.innerHTML = '<option value="Null" selected>Null</option>';
		$.ajax({
			method: "get",
			dataType: "json",
			url: "http://27.111.44.44/mobile/Percobaan2/get_vmlokasinamegroup/"+valueselainkai1,
			success: function (jdata) {
				jsonData=jdata;
				vm_satu_testing1.innerHTML = '<option value="All">All</option>';
				for(a in jsonData ){
					vm_satu_testing1.innerHTML += '<option value="'+jsonData[a]['terminal_id']+'">'+jsonData[a]['terminal_id']+'</option>';
				}
			}
		});
		//vm_location_testing.innerHTML = '<option value="'+jsonData[a]['location_name']+'">'+jsonData[a]['location_name']+'</option>';
	}
}

function trx_show2(){
	var vm_group_testing2 = document.getElementById('vm_group2');
	var vm_location_testing2 = document.getElementById('vm_location2');
	var vm_locationtr_testing2 = document.getElementById('tr_vmlocation2');
	var vm_satu_testing2 = document.getElementById('vm_satu2');


	// var vm_satu_testing = document.getElementById('vm_satu');
	
	if(vm_group_testing2.options[vm_group_testing2.selectedIndex].text == 'KAI'){
		vm_locationtr_testing2.style.display = 'block';
		vm_satu_testing2.innerHTML = '<option value="All">All</option>';
		var vm_satu_kai2 = vm_location_testing2.options[vm_location_testing2.selectedIndex].text;
		$.ajax({
			url: "http://27.111.44.42/Percobaan2/get_vmlokasi",
			success: function (jdata) {
				jsonData=jdata;
				vm_location_testing2.innerHTML = '<option value="All">All</option>';
				for(a in jsonData ){
					vm_location_testing2.innerHTML += '<option value="'+jsonData[a]['location_name']+'">'+jsonData[a]['location_name']+'</option>';
				}
				
			}
		});
	} else if(vm_group_testing2.options[vm_group_testing2.selectedIndex].text != 'KAI'){
		var valueselainkai2 = vm_group_testing2.options[vm_group_testing2.selectedIndex].text;
		vm_locationtr_testing2.style.display = 'none';
		vm_location_testing2.innerHTML = '<option value="Null" selected>Null</option>';
		$.ajax({
			method: "get",
			dataType: "json",
			url: "http://27.111.44.44/mobile/Percobaan2/get_vmlokasinamegroup/"+valueselainkai2,
			success: function (jdata) {
				jsonData=jdata;
				vm_satu_testing2.innerHTML = '<option value="All">All</option>';
				for(a in jsonData ){
					vm_satu_testing2.innerHTML += '<option value="'+jsonData[a]['terminal_id']+'">'+jsonData[a]['terminal_id']+'</option>';
				}
			}
		});
		//vm_location_testing.innerHTML = '<option value="'+jsonData[a]['location_name']+'">'+jsonData[a]['location_name']+'</option>';
	}
}

function perVM_KAI1(){

	// vm2
	var vm_location_testing2 = document.getElementById('vm_location2');
	var vm_satu_testing2 = document.getElementById('vm_satu2');
	var valuelocation2 = vm_location_testing2.options[vm_location_testing2.selectedIndex].text;
	$.ajax({
		method: "get",
		dataType: "json",
		url: "http://27.111.44.42/Percobaan2/get_vmlokasi_vmname/"+valuelocation2,
		success: function (jdata) {
			jsonData=jdata;
			vm_satu_testing2.innerHTML = '<option value="All">All</option>';
			// console.log(jsonData);
			for(a in jsonData ){
				// if(jsonData[a]['location_name'] == vmsatu ){
					vm_satu_testing2.innerHTML += '<option value="'+jsonData[a]['terminal_id']+'">'+jsonData[a]['terminal_id']+'</option>';
				// }
				
			}
		}
	});
}
function perVM_KAI2(){

	// vm2
	var vm_location_testing2 = document.getElementById('vm_location2');
	var vm_satu_testing2 = document.getElementById('vm_satu2');
	var valuelocation2 = vm_location_testing2.options[vm_location_testing2.selectedIndex].text;
	$.ajax({
		method: "get",
		dataType: "json",
		url: "http://27.111.44.42/Percobaan2/get_vmlokasi_vmname/"+valuelocation2,
		success: function (jdata) {
			jsonData=jdata;
			vm_satu_testing2.innerHTML = '<option value="All">All</option>';
			// console.log(jsonData);
			for(a in jsonData ){
				// if(jsonData[a]['location_name'] == vmsatu ){
					vm_satu_testing2.innerHTML += '<option value="'+jsonData[a]['terminal_id']+'">'+jsonData[a]['terminal_id']+'</option>';
				// }
				
			}
		}
	});
}

// fungsi grafikchart
// function grafikchart(datashow1, datashow2){
	
// 	var lishow = datashow;
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
	
// 	// var zoomButton;
// 	Highcharts.stockChart('tampilkanchart', {
		
// 		chart:{
			
// 			// type:'line',
// 			// zoomType: 'x',
// 			event:{
// 				load:function(){
					
// 				}
// 			},
// 		},
		
		
// 		credits: {
// 			enabled: false
// 		  },
// 		  rangeSelector: {
// 			buttons: [/* {
// 				type: 'day',
// 				count: 1,
// 				text: '1D',
				
// 			}, */
// 			{
// 				type: 'week',
// 				count: 1,
// 				text: '1B'
// 			},
// 			{
// 				type: 'month',
// 				count: 3,
// 				text: '3B'
// 			},
// 			{
// 				type: 'month',
// 				count: 6,
// 				text: '6B'
// 			},
// 			{
// 				type: 'year',
// 				count: 1,
// 				text: '1T'
// 			},
// 			{
// 				type: 'all',
// 				text: 'Semua'
// 			}],
// 			selected:2,
// 			inputEnabled:false
// 		},
// 		xAxis: {
// 			type: 'datetime'
// 		  },
		  
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
// 			dataGrouping: {
// 				enabled: false
// 			}
// 		}]
// 	});
// }
function grafikchart(datashow1,datashow2){
	

	var lishow1 =  datashow1;
	var lishow2 =  datashow2;

	console.log('lishow1',lishow1);
	console.log('lishow2',lishow2);
	
	var temp1 = [];
	var temp2 = [];

	var reduced1 = datashow1.reduce(function(allDates, date) {
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

	var reduced2 = datashow2.reduce(function(allDates, date) {
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

	
	
	for(list1 in reduced1){
		temp1.push(
			[new Date(reduced1[list1]['waktu']).getTime(), Number(reduced1[list1]['trx'])]
		);
	}

	for(list2 in reduced2){
		temp2.push(
			[new Date(reduced2[list2]['waktu']).getTime(), Number(reduced2[list2]['trx'])]
		)
	}

	console.log('lishow1',temp1);
	console.log('lishow2',temp2);

	grouped = function (array) {
        var r = [], o = {};
        array.forEach(function (a) {
            var date = new Date(a[0]),
                month = date.getMonth() + 1,
                key = date.getFullYear() + '-' + (month < 10 ? '0' : '') + month;
            if (!o[key]) {
                o[key] = [key, 0];
                r.push(o[key]);
            }
            o[key][1] += a[1];
        });
        return r;
	}(temp1);
	console.log('grouped 1',grouped, 0, 4);

	groupede = function (array) {
        var r = [], o = {};
        array.forEach(function (a) {
            var date = new Date(a[0]),
                month = date.getMonth() + 1,
                key = date.getFullYear() + '-' + (month < 10 ? '0' : '') + month;
            if (!o[key]) {
                o[key] = [key, 0];
                r.push(o[key]);
            }
            o[key][1] += a[1];
        });
        return r;
	}(temp1);
	console.log('groupede 3',groupede, 0, 4);

	return Highcharts.stockChart('grafikChart', {
		chart:{
			event:{
				load:function(){
					
				}
			},
		},
		credits: {
			enabled: false
		  },
		  rangeSelector: {
			buttons: [{
				type: 'day',
				count: 1,
				text: '1D',
				
			},{
				type: 'week',
				count: 1,
				text: '1W'
			},
			{
				type: 'month',
				count: 1,
				text: '1M'
			},
			{
				type: 'all',
				text: 'All'
			}],
			selected:0,
			inputEnabled:false
		},
		xAxis: {
		},
		title: {
			text: ''
		},
		exporting: { 
			enabled: false 
		},
		series: [
			{
				name: 'VM 1',
				data: temp1,
				type: 'area',
				
			},{
				name: 'VM 2',
				data: temp2,
				type: 'area',
				
				
			}
		]
	});
}

// fungsi ambil API
function sendMyAjax(URL_address){
	$.ajax({
		 type: 'POST',
		 url: URL_address,
		 success: function (result) {
		 }
	 });
};

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




// function buttonActiondisplay(){
// 	var vm_group_testing1 = document.getElementById('vm_group1');
// 	var vm_group_testing2 = document.getElementById('vm_group2');

// 	var vm_location_testing1 = document.getElementById('vm_location1');
// 	var vm_location_testing2 = document.getElementById('vm_location2');

// 	var vm_satu_testing1 = document.getElementById('vm_satu1');
// 	var vm_satu_testing2 = document.getElementById('vm_satu2');

// 	var tgl_awal = document.getElementById('datepicker1');
// 	var tgl_akhir = document.getElementById('datepicker2');
// 	tgl_awal_val = tgl_awal.value;
// 	tgl_akhir_val = tgl_akhir.value;

// 	var grafikChart1 = document.getElementById('grafikChart');
// 	grafikChart1.style.display = 'block';

// 	var tempt1 ;
// 	var tempt2;

// 	var tampilkan1 = document.getElementById('analisaTransaksivm1');
// 	var tampilkan2 = document.getElementById('analisaTransaksivm2');
// 	var tampilkanchart = document.getElementById('grafikChart');
// 	var lokasi1 = vm_location_testing1.options[vm_location_testing1.selectedIndex].text;
// 	var lokasi2 = vm_location_testing2.options[vm_location_testing2.selectedIndex].text;
// 	var vm_satu1 = vm_satu_testing1.options[vm_satu_testing1.selectedIndex].text;
// 	var vm_satu2 = vm_satu_testing2.options[vm_satu_testing2.selectedIndex].text;
// 				// var llokasi = vm_location_testing.options[vm_location_testing.selectedIndex].value;
// 	// console.log('test',vm_satu1);
	
// 	if(vm_group_testing1.options[vm_group_testing1.selectedIndex].text == 'KAI' || vm_group_testing2.options[vm_group_testing2.selectedIndex].text == 'KAI'){
// 		if(vm_location_testing1.options[vm_location_testing1.selectedIndex].text == 'All' || vm_location_testing2.options[vm_location_testing2.selectedIndex].text == 'All'){
// 			tampilkan1.innerHTML = '<table id="table-data1" class="table"  style="width:100%">'+
// 				'</table>';
// 			tampilkan2.innerHTML = '<table id="table-data2" class="table"  style="width:100%">'+
// 				'</table>';	
// 			tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);

// 			(async () => {

// 				var kai_all1 = await get('http://27.111.44.42/Percobaan2/get_trxallkai/'+tgl_awal_val+'/'+tgl_akhir_val);
// 				var kai_all2 = await get('http://27.111.44.42/Percobaan2/get_trxallkai/'+tgl_awal_val+'/'+tgl_akhir_val);
// 				/* console.log('result_topup',result_topup);
// 				console.log('result_card',result_card);
// 				console.log('result',result); */
				

// 				// var jsonData2r = result.sort(waktuCompare);
// 				tampilkan1.style.display = 'block';
// 				var jsonData1 = kai_all1.sort(waktuCompare);
// 				console.log('jsonData1',jsonData1);
// 				var t = $('#table-data1').DataTable( {
// 					"data": jsonData1,
// 					"bFilter": false,
// 					"columns": [
// 						{ "data":"", "title": "No"  },
// 						{ "data":"terminal_id", "title": "Terminal ID"},
// 						{ "data":"name_group", "title": "Lokasi"},
// 						{ "data":"trx", "title": "Transaksi" },
// 						{ "data":"waktu", "title": "Tanggal" }
// 					]
// 				} );
// 				t.on( 'order.dt search.dt', function () {
// 					t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
// 						cell.innerHTML = i+1;
// 					} );
// 				} ).draw();


// 				tampilkan2.style.display = 'block';
// 				var jsonData2 = kai_all2.sort(waktuCompare);
// 				console.log('jsonData2',jsonData2);
// 				var t = $('#table-data2').DataTable( {
// 					"data": jsonData2,
// 					"bFilter": false,
// 					"columns": [
// 						{ "data":"", "title": "No"  },
// 						{ "data":"terminal_id", "title": "Terminal ID"},
// 						{ "data":"name_group", "title": "Lokasi"},
// 						{ "data":"trx", "title": "Transaksi" },
// 						{ "data":"waktu", "title": "Tanggal" }
// 					]
// 				} );
// 				t.on( 'order.dt search.dt', function () {
// 					t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
// 						cell.innerHTML = i+1;
// 					} );
// 				} ).draw();


// 				grafikchart(jsonData1,jsonData2);
			
// 			})();
// 		}else if(vm_location_testing1.options[vm_location_testing1.selectedIndex].text != 'All' && vm_location_testing2.options[vm_location_testing2.selectedIndex].text != 'All'){
// 			if(vm_satu_testing1.options[vm_satu_testing1.selectedIndex].text == 'All' && vm_satu_testing2.options[vm_satu_testing2.selectedIndex].text == 'All'){
// 				tampilkan1.innerHTML = '<table id="table-data1" class="table"  style="width:100%">'+
// 					'</table>';
// 				tampilkan2.innerHTML = '<table id="table-data2" class="table"  style="width:100%">'+
// 					'</table>';	
// 				tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);

// 				(async () => {
// 					var kai_all1 = await get("http://27.111.44.42/Percobaan2/get_trxallockai/"+lokasi1+'/'+tgl_awal_val+'/'+tgl_akhir_val);
// 					var kai_all2 = await get("http://27.111.44.42/Percobaan2/get_trxallockai/"+lokasi2+'/'+tgl_awal_val+'/'+tgl_akhir_val);
// 					tampilkan1.style.display = 'block';
// 					var jsonData1 = kai_all1.sort(waktuCompare);
// 					console.log('jsonData1',jsonData1);
// 					var t = $('#table-data1').DataTable( {
// 						"data": jsonData1,
// 						"bFilter": false,
// 						"columns": [
// 							{ "data":"", "title": "No"  },
// 							{ "data":"terminal_id", "title": "Terminal ID"},
// 							{ "data":"name_group", "title": "Lokasi"},
// 							{ "data":"trx", "title": "Transaksi" },
// 							{ "data":"waktu", "title": "Tanggal" }
// 						]
// 					} );
// 					t.on( 'order.dt search.dt', function () {
// 						t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
// 							cell.innerHTML = i+1;
// 						} );
// 					} ).draw();

// 					tampilkan2.style.display = 'block';
// 					var jsonData2 = kai_all2.sort(waktuCompare);
// 					console.log('jsonData2',jsonData2);
// 					var t = $('#table-data2').DataTable( {
// 						"data": jsonData2,
// 						"bFilter": false,
// 						"columns": [
// 							{ "data":"", "title": "No"  },
// 							{ "data":"terminal_id", "title": "Terminal ID"},
// 							{ "data":"name_group", "title": "Lokasi"},
// 							{ "data":"trx", "title": "Transaksi" },
// 							{ "data":"waktu", "title": "Tanggal" }
// 						]
// 					} );
// 					t.on( 'order.dt search.dt', function () {
// 						t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
// 							cell.innerHTML = i+1;
// 						} );
// 					} ).draw();
// 					grafikchart(jsonData1,jsonData2);
// 				})();
// 			}else if(vm_satu_testing1.options[vm_satu_testing1.selectedIndex].text != 'All' && vm_satu_testing2.options[vm_satu_testing2.selectedIndex].text != 'All'){
// 				var llokasi1=lokasi1;
// 				var llokasi2=lokasi2;

// 				tampilkan1.innerHTML = '<table id="table-data1" class="table"  style="width:100%">'+
// 					'</table>';
// 				tampilkan2.innerHTML = '<table id="table-data2" class="table"  style="width:100%">'+
// 					'</table>';	
// 				tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);

// 				(async () => {
// 					var kai_all1 = await get("http://27.111.44.42/Percobaan2/get_trxkai/"+llokasi1+'/'+vm_satu1+'/'+tgl_awal_val+'/'+tgl_akhir_val);
// 					var kai_all2 = await get("http://27.111.44.42/Percobaan2/get_trxkai/"+llokasi2+'/'+vm_satu2+'/'+tgl_awal_val+'/'+tgl_akhir_val);

// 					tampilkan1.style.display = 'block';
// 					var jsonData1 = kai_all1.sort(waktuCompare);
// 					console.log('jsonData1',jsonData1);
// 					var t = $('#table-data1').DataTable( {
// 						"data": jsonData1,
// 						"bFilter": false,
// 						"columns": [
// 							{ "data":"", "title": "No"  },
// 							{ "data":"terminal_id", "title": "Terminal ID"},
// 							{ "data":"name_group", "title": "Lokasi"},
// 							{ "data":"trx", "title": "Transaksi" },
// 							{ "data":"waktu", "title": "Tanggal" }
// 						]
// 					} );
// 					t.on( 'order.dt search.dt', function () {
// 						t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
// 							cell.innerHTML = i+1;
// 						} );
// 					} ).draw();

// 					tampilkan2.style.display = 'block';
// 					var jsonData2 = kai_all2.sort(waktuCompare);
// 					console.log('jsonData2',jsonData2);
// 					var t = $('#table-data2').DataTable( {
// 						"data": jsonData2,
// 						"bFilter": false,
// 						"columns": [
// 							{ "data":"", "title": "No"  },
// 							{ "data":"terminal_id", "title": "Terminal ID"},
// 							{ "data":"name_group", "title": "Lokasi"},
// 							{ "data":"trx", "title": "Transaksi" },
// 							{ "data":"waktu", "title": "Tanggal" }
// 						]
// 					} );
// 					t.on( 'order.dt search.dt', function () {
// 						t.column(0, {search:'applied', order:'applied'}).nodes().each( function (cell, i) {
// 							cell.innerHTML = i+1;
// 						} );
// 					} ).draw();
// 					grafikchart(jsonData1,jsonData2);
// 				})();

// 			}
// 		}
// 	}
	
// }













async function testingVM1(){
	var vm_group_testing1 = document.getElementById('vm_group1');
	var vm_group_testing2 = document.getElementById('vm_group2');

	var vm_location_testing1 = document.getElementById('vm_location1');
	var vm_location_testing2 = document.getElementById('vm_location2');

	var vm_satu_testing1 = document.getElementById('vm_satu1');
	var vm_satu_testing2 = document.getElementById('vm_satu2');

	var tgl_awal = document.getElementById('datepicker1');
	var tgl_akhir = document.getElementById('datepicker2');
	tgl_awal_val = tgl_awal.value;
	tgl_akhir_val = tgl_akhir.value;

	var grafikChart1 = document.getElementById('grafikChart');
	grafikChart1.style.display = 'block';

	var tempt1 ;
	var tempt2;

	var tampilkan1 = document.getElementById('analisaTransaksivm1');
	var tampilkan2 = document.getElementById('analisaTransaksivm2');
	var tampilkanchart = document.getElementById('grafikChart');
	var lokasi1 = vm_location_testing1.options[vm_location_testing1.selectedIndex].text;
	var lokasi2 = vm_location_testing2.options[vm_location_testing2.selectedIndex].text;
	var vm_satu1 = vm_satu_testing1.options[vm_satu_testing1.selectedIndex].text;
	var vm_satu2 = vm_satu_testing2.options[vm_satu_testing2.selectedIndex].text;
				// var llokasi = vm_location_testing.options[vm_location_testing.selectedIndex].value;
	// console.log('test',vm_satu1);
	
	var hasil;

	if(vm_group_testing1.options[vm_group_testing1.selectedIndex].text == 'KAI' /* || vm_group_testing2.options[vm_group_testing2.selectedIndex].text == 'KAI' */){
		if(vm_location_testing1.options[vm_location_testing1.selectedIndex].text == 'All' /* || vm_location_testing2.options[vm_location_testing2.selectedIndex].text == 'All' */){
			tampilkan1.innerHTML = '<table id="table-data1" class="table"  style="width:100%">'+
				'</table>';
			/* tampilkan2.innerHTML = '<table id="table-data2" class="table"  style="width:100%">'+
				'</table>';	 */
			tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);

			// (async () => {

				var kai_all1 = await get('http://27.111.44.42/Percobaan2/get_trxallkai/'+tgl_awal_val+'/'+tgl_akhir_val);
				/* var kai_all2 = await get('http://27.111.44.42/Percobaan2/get_trxallkai/'+tgl_awal_val+'/'+tgl_akhir_val); */
				/* console.log('result_topup',result_topup);
				console.log('result_card',result_card);
				console.log('result',result); */
				

				// var jsonData2r = result.sort(waktuCompare);
				tampilkan1.style.display = 'block';
				var jsonData1 = kai_all1.sort(waktuCompare);
				hasil = jsonData1;
				console.log('jsonData1',jsonData1);

				var t = $('#table-data1').DataTable( {
					"data": jsonData1,
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
			// })();
			
		}else if(vm_location_testing1.options[vm_location_testing1.selectedIndex].text != 'All'){
			if(vm_satu_testing1.options[vm_satu_testing1.selectedIndex].text == 'All'){
				
				
				tampilkan1.innerHTML = '<table id="table-data1" class="table"  style="width:100%">'+
				'</table>';
				tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);

				
					var kai_all1 = await get("http://27.111.44.42/Percobaan2/get_trxallockai/"+lokasi1+'/'+tgl_awal_val+'/'+tgl_akhir_val);
					
						jsonData=kai_all1.sort(waktuCompare);
						hasil = jsonData
						console.log(jsonData);
						tampilkan1.style.display = 'block';

						var t = $('#table-data1').DataTable( {
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
						
			}else if(vm_satu_testing1.options[vm_satu_testing1.selectedIndex].text != 'All'){
				var llokasi=lokasi1;
				
				console.log('a',llokasi1);
				tampilkan1.innerHTML = '<table id="table-data1" class="table"  style="width:100%">'+
				'</table>';
				tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);
				
				var kai_all1 = await get("http://27.111.44.42/Percobaan2/get_trxkai/"+llokasi+'/'+vm_satu1+'/'+tgl_awal_val+'/'+tgl_akhir_val);
					
						jsonData1=kai_all1.sort(waktuCompare);
						console.log(jsonData);
						hasil = jsonData1;
						tampilkan1.style.display = 'block';

						var t = $('#table-data1').DataTable( {
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
			}
		}
	}else if(vm_group_testing1.options[vm_group_testing1.selectedIndex].text == 'All'){
		tampilkan1.innerHTML = '<table id="table-data1" class="table"  style="width:100%">'+
			'</table>';
		tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);

		var result_KAI = await get('http://27.111.44.42/Percobaan2/get_trxallkai/'+tgl_awal_val+'/'+tgl_akhir_val);
		var result_Mtopup = await get('http://27.111.44.44/mobile/Percobaan2/get_trxalltopup/'+tgl_awal_val+'/'+tgl_akhir_val);
		var result_Mcard = await get('http://27.111.44.44/mobile/Percobaan2/get_trxallcard/'+tgl_awal_val+'/'+tgl_akhir_val);
			
		var result = [...result_KAI, ...result_Mtopup, ...result_Mcard];

		tampilkan1.style.display = 'block';
		var jsonData2r = result.sort(waktuCompare);
		hasil = jsonData2r;
		console.log('jsonData2',jsonData2r);
		var t = $('#table-data1').DataTable( {
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
	}else{
		if(vm_satu_testing1.options[vm_satu_testing1.selectedIndex].value == 'All'){
			tampilkan1.innerHTML = '<table id="table-data1" class="table"  style="width:100%">'+
			'</table>';
			vm_group_testing1 = vm_group_testing1.options[vm_group_testing1.selectedIndex].text;
			tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);

			var result_topup = await get('http://27.111.44.44/mobile/Percobaan2/get_trxmandiritp/'+vm_group_testing1+'/'+tgl_awal_val+'/'+tgl_akhir_val);
			var result_card = await get('http://27.111.44.44/mobile/Percobaan2/get_trxmandiricard/'+vm_group_testing1+'/'+tgl_awal_val+'/'+tgl_akhir_val);
			
			var result = [...result_card, ...result_topup];
			


			console.log('result_topup',result_topup);
			console.log('result_card',result_card);
			console.log('result',result);
			
			tampilkan1.style.display = 'block';
			var jsonData2 = result.sort(waktuCompare);
			hasil = jsonData2;
			console.log('jsonData2',jsonData2);
			var t = $('#table-data1').DataTable( {
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
		}else{
			tampilkan1.innerHTML = '<table id="table-data1" class="table"  style="width:100%">'+
			'</table>';
			vm_group_ = vm_group_testing1.options[vm_group_testing1.selectedIndex].text;
			vm_satu_ = vm_satu_testing1.options[vm_satu_testing1.selectedIndex].text;
			tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);

			var result_topup = await get('http://27.111.44.44/mobile/Percobaan2/get_trxmandiritpterminaltopup/'+vm_group_+'/'+vm_satu_+'/'+tgl_awal_val+'/'+tgl_akhir_val);
			var result_card = await get('http://27.111.44.44/mobile/Percobaan2/get_trxmandiritpterminalcard/'+vm_group_+'/'+vm_satu_+'/'+tgl_awal_val+'/'+tgl_akhir_val);
			
			var result = [...result_card, ...result_topup];


			console.log('result_topup',result_topup);
			console.log('result_card',result_card);
			console.log('result',result);


			tampilkan1.style.display = 'block';
			var jsonData3 = result.sort(waktuCompare);
			hasil = jsonData3;
			console.log('jsonData2',jsonData3);
			var t = $('#table-data1').DataTable( {
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
		}
	}
	return hasil
}

async function testingVM2(){
	var vm_group_testing1 = document.getElementById('vm_group1');
	var vm_group_testing2 = document.getElementById('vm_group2');

	var vm_location_testing1 = document.getElementById('vm_location1');
	var vm_location_testing2 = document.getElementById('vm_location2');

	var vm_satu_testing1 = document.getElementById('vm_satu1');
	var vm_satu_testing2 = document.getElementById('vm_satu2');

	var tgl_awal = document.getElementById('datepicker1');
	var tgl_akhir = document.getElementById('datepicker2');
	tgl_awal_val = tgl_awal.value;
	tgl_akhir_val = tgl_akhir.value;

	var grafikChart1 = document.getElementById('grafikChart');
	grafikChart1.style.display = 'block';

	var tempt1 ;
	var tempt2;

	var tampilkan1 = document.getElementById('analisaTransaksivm1');
	var tampilkan2 = document.getElementById('analisaTransaksivm2');
	var tampilkanchart = document.getElementById('grafikChart');
	var lokasi1 = vm_location_testing1.options[vm_location_testing1.selectedIndex].text;
	var lokasi2 = vm_location_testing2.options[vm_location_testing2.selectedIndex].text;
	var vm_satu1 = vm_satu_testing1.options[vm_satu_testing1.selectedIndex].text;
	var vm_satu2 = vm_satu_testing2.options[vm_satu_testing2.selectedIndex].text;
				// var llokasi = vm_location_testing.options[vm_location_testing.selectedIndex].value;
	// console.log('test',vm_satu1);
	
	var hasil;

	if(vm_group_testing2.options[vm_group_testing2.selectedIndex].text == 'KAI' /* || vm_group_testing2.options[vm_group_testing2.selectedIndex].text == 'KAI' */){
		if(vm_location_testing2.options[vm_location_testing2.selectedIndex].text == 'All' /* || vm_location_testing2.options[vm_location_testing2.selectedIndex].text == 'All' */){
			tampilkan2.innerHTML = '<table id="table-data2" class="table"  style="width:100%">'+
				'</table>';
			/* tampilkan2.innerHTML = '<table id="table-data2" class="table"  style="width:100%">'+
				'</table>';	 */
			tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);

			// (async () => {

				var kai_all2 = await get('http://27.111.44.42/Percobaan2/get_trxallkai/'+tgl_awal_val+'/'+tgl_akhir_val);
				/* var kai_all2 = await get('http://27.111.44.42/Percobaan2/get_trxallkai/'+tgl_awal_val+'/'+tgl_akhir_val); */
				/* console.log('result_topup',result_topup);
				console.log('result_card',result_card);
				console.log('result',result); */
				

				// var jsonData2r = result.sort(waktuCompare);
				tampilkan2.style.display = 'block';
				var jsonData2 = kai_all2.sort(waktuCompare);
				hasil = jsonData2;
				console.log('jsonData2',jsonData2);

				var t = $('#table-data2').DataTable( {
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
			// })();
			
		}else if(vm_location_testing2.options[vm_location_testing2.selectedIndex].text != 'All'){
			if(vm_satu_testing2.options[vm_satu_testing2.selectedIndex].text == 'All'){
				
				
				tampilkan2.innerHTML = '<table id="table-data2" class="table"  style="width:100%">'+
				'</table>';
				tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);

				
					var kai_all2 = await get("http://27.111.44.42/Percobaan2/get_trxallockai/"+lokasi2+'/'+tgl_awal_val+'/'+tgl_akhir_val);
					
						jsonData=kai_all2.sort(waktuCompare);
						hasil = jsonData
						console.log(jsonData);
						tampilkan2.style.display = 'block';

						var t = $('#table-data2').DataTable( {
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
						
			}else if(vm_satu_testing2.options[vm_satu_testing2.selectedIndex].text != 'All'){
				var llokasi=lokasi2;
				
				console.log('a',llokasi);
				tampilkan2.innerHTML = '<table id="table-data2" class="table"  style="width:100%">'+
				'</table>';
				tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);
				
				var kai_all2 = await get("http://27.111.44.42/Percobaan2/get_trxkai/"+llokasi+'/'+vm_satu2+'/'+tgl_awal_val+'/'+tgl_akhir_val);
					
						jsonData2=kai_all2.sort(waktuCompare);
						console.log(jsonData);
						hasil = jsonData2;
						tampilkan2.style.display = 'block';

						var t = $('#table-data2').DataTable( {
							"data": jsonData2,
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
			}
		}
	}else if(vm_group_testing2.options[vm_group_testing2.selectedIndex].text == 'All'){
		tampilkan2.innerHTML = '<table id="table-data2" class="table"  style="width:100%">'+
			'</table>';
		tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);

		var result_KAI = await get('http://27.111.44.42/Percobaan2/get_trxallkai/'+tgl_awal_val+'/'+tgl_akhir_val);
		var result_Mtopup = await get('http://27.111.44.44/mobile/Percobaan2/get_trxalltopup/'+tgl_awal_val+'/'+tgl_akhir_val);
		var result_Mcard = await get('http://27.111.44.44/mobile/Percobaan2/get_trxallcard/'+tgl_awal_val+'/'+tgl_akhir_val);
			
		var result = [...result_KAI, ...result_Mtopup, ...result_Mcard];

		tampilkan2.style.display = 'block';
		var jsonData2r = result.sort(waktuCompare);
		hasil = jsonData2r;
		console.log('jsonData2',jsonData2r);
		var t = $('#table-data2').DataTable( {
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
	}else{
		if(vm_satu_testing2.options[vm_satu_testing2.selectedIndex].value == 'All'){
			tampilkan2.innerHTML = '<table id="table-data2" class="table"  style="width:100%">'+
			'</table>';
			vm_group_testing2 = vm_group_testing2.options[vm_group_testing2.selectedIndex].text;
			tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);

			var result_topup = await get('http://27.111.44.44/mobile/Percobaan2/get_trxmandiritp/'+vm_group_testing2+'/'+tgl_awal_val+'/'+tgl_akhir_val);
			var result_card = await get('http://27.111.44.44/mobile/Percobaan2/get_trxmandiricard/'+vm_group_testing2+'/'+tgl_awal_val+'/'+tgl_akhir_val);
			
			var result = [...result_card, ...result_topup];
			


			console.log('result_topup',result_topup);
			console.log('result_card',result_card);
			console.log('result',result);
			
			tampilkan2.style.display = 'block';
			var jsonData2 = result.sort(waktuCompare);
			hasil = jsonData2;
			console.log('jsonData2',jsonData2);
			var t = $('#table-data2').DataTable( {
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
		}else{
			tampilkan2.innerHTML = '<table id="table-data2" class="table"  style="width:100%">'+
			'</table>';
			vm_group_ = vm_group_testing2.options[vm_group_testing2.selectedIndex].text;
			vm_satu_ = vm_satu_testing2.options[vm_satu_testing2.selectedIndex].text;
			tgl_akhir_val = today(tgl_awal_val,tgl_akhir_val);

			var result_topup = await get('http://27.111.44.44/mobile/Percobaan2/get_trxmandiritpterminaltopup/'+vm_group_+'/'+vm_satu_+'/'+tgl_awal_val+'/'+tgl_akhir_val);
			var result_card = await get('http://27.111.44.44/mobile/Percobaan2/get_trxmandiritpterminalcard/'+vm_group_+'/'+vm_satu_+'/'+tgl_awal_val+'/'+tgl_akhir_val);
			
			var result = [...result_card, ...result_topup];


			console.log('result_topup',result_topup);
			console.log('result_card',result_card);
			console.log('result',result);


			tampilkan2.style.display = 'block';
			var jsonData3 = result.sort(waktuCompare);
			hasil = jsonData3;
			console.log('jsonData2',jsonData3);
			var t = $('#table-data2').DataTable( {
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
		}
	}
	return hasil
}

function testingbutton(){
	(async () => {
		var sample1 = await testingVM1();
		var sample2 = await testingVM2();

	grafikchart(sample1,sample2);
	})();
	

}





























function convertDate(date) {
	var yyyy = date.getFullYear().toString();
	var mm = (date.getMonth()+1).toString();
	var dd  = date.getDate().toString();
  
	var mmChars = mm.split('');
	var ddChars = dd.split('');
  
	return yyyy + '-' + (mmChars[1]?mm:"0"+mmChars[0]) + '-' + (ddChars[1]?dd:"0"+ddChars[0]);
  }
$(document).ready(function() {
	var vm_group_testing1 = document.getElementById('vm_group1');
	var vm_group_testing2 = document.getElementById('vm_group2');
	var datepicker1 = document.getElementById('datepicker1');
	var datepicker2 = document.getElementById('datepicker2')

	datepicker1.value = convertDate(new Date());
	datepicker2.value = convertDate(new Date());

	$.ajax({
		url: "http://27.111.44.44/mobile/Percobaan2/get_vmlokasigroup",
		success: function (jdata) {
			jsonMandiri=jdata;
			
			for(a in jsonMandiri ){
				vm_group_testing1.innerHTML += '<option value="'+jsonMandiri[a]['name_group']+'">'+jsonMandiri[a]['name_group']+'</option>';
				vm_group_testing2.innerHTML += '<option value="'+jsonMandiri[a]['name_group']+'">'+jsonMandiri[a]['name_group']+'</option>';
			}
			vm_group_testing1.innerHTML += '<option value="KAI">KAI</option>';
			vm_group_testing2.innerHTML += '<option value="KAI">KAI</option>';
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
// 		'mandiri':[
// 			{'terminal_id':'MA0001', 'trx':'100', 'waktu':'2020-07-25'},
// 			{'terminal_id':'MA0002', 'trx':'3100', 'waktu':'2020-07-25'},
// 			{'terminal_id':'MA0002', 'trx':'2500', 'waktu':'2020-07-26'},
// 			{'terminal_id':'MA0001', 'trx':'1200', 'waktu':'2020-07-27'}
// 		],
// 		'kai':[
// 			{'terminal_id':'KA0001', 'trx':'201', 'waktu':'2020-07-25'},
// 			{'terminal_id':'KA0002', 'trx':'3002', 'waktu':'2020-07-25'},
// 			{'terminal_id':'KA0002', 'trx':'2090', 'waktu':'2020-07-26'},
// 			{'terminal_id':'KA0001', 'trx':'1020', 'waktu':'2020-07-27'}
// 		],
// 	}
// };

// $.ajax({
// 	url: "http://27.111.44.42/Percobaan2/get_transactionkai/KA1002/2018/99999",
// 	/* method: "get",
// 	dataType: "json", */
// 	success: function (jdata) {
// 		jsonData=jdata;
// 		console.log(jsonData);
// 	}
// });
// // console.log('ajax',jdata);


// // read data
// function loadData(datashow){
// 	var temp = [];
// 	for(list in datashow){
// 		temp.push(
// 			datashow[list]
// 		);
// 	}
// 	return temp;
// }

// // Huruf Pertama Huruf Besar
// function firstUpcase(string){
// 	return string.charAt(0).toUpperCase() + string.slice(1);
// }

// function loadData1(datashow1){
// 	var lishow1 = data['lunari'][datashow1];
// 	var temp1 = [];
// 	for(dat1 in lishow1){
// 			temp1.push(lishow1[dat1]);
// 	}
// 	console.log('temp1',temp1);

// 	return temp1;

// }

// function rubah(angka){
// 	var reverse = angka.toString().split('').reverse().join(''),
// 	ribuan = reverse.match(/\d{1,3}/g);
// 	ribuan = ribuan.join('.').split('').reverse().join('');
// 	return ribuan;
// }




// // var lishow = data['lunari']['mandiri'];
	
// // 	console.log('reduced',reduced);





// // grafikChart('bluebird', 'mandiri');









// function buttonActiondisplay(){
// 	var analisaTransaksivm1 = document.getElementById('analisaTransaksivm1');
// 	var analisaTransaksivm2 = document.getElementById('analisaTransaksivm2');
// 	analisaTransaksivm1.style.display = 'block';
// 	analisaTransaksivm2.style.display = 'block';

// 	var vm_owner1 = document.getElementById('vm_owner1');
// 	var vm_owner2 = document.getElementById('vm_owner2');

// 	var vm_group1 = document.getElementById('vm_group1');
// 	var vm_group2 = document.getElementById('vm_group2');
	
// 	var vm_product1 = document.getElementById('vm_product1');
// 	var vm_product2 = document.getElementById('vm_product2');
// 	var vm_transaksi1 = document.getElementById('vm_transaksi1');
// 	var vm_transaksi1 = document.getElementById('vm_transaksi1');

	
// 	var grafikChart1 = document.getElementById('grafikChart');
// 	grafikChart1.style.display = 'block';

// 	var tempA;
// 	var tempB;

// 	var loadDataA = loadData1(vm_group1.options[vm_group1.selectedIndex].value);
// 	var loadDataB = loadData1(vm_group2.options[vm_group2.selectedIndex].value);

// 	$('#analisaTransaksivm1').html('<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered table-sm" id="example1"></table>');
// 	$('#analisaTransaksivm2').html('<table cellpadding="0" cellspacing="0" border="0" class="table table-striped table-bordered table-sm" id="example2"></table>');

// 	var reduced2 = loadDataA.reduce(function(allDates, date) {
// 		if (allDates.some(function(e) {
// 			return e.waktu === date.waktu && e.terminal_id === date.terminal_id
// 		})) {
// 		allDates.filter(function(e) {
// 			return e.waktu === date.waktu && e.terminal_id === date.terminal_id
// 		})[0].trx += +date.trx
// 		} else {
// 		allDates.push({
// 			terminal_id: date.terminal_id,
// 			waktu: date.waktu,
// 			trx: +date.trx
// 		})
// 		}
// 		return allDates
// 	}, []);

// 	console.log('reduced2 haha',reduced2);

// 	if(vm_owner1.options[vm_owner1.selectedIndex].value == 1){
		
// 		// a;
// 		console.log('loadDataA',loadDataA);
// 		var tableA = $('#example1').DataTable( {
// 			"searching": false,
// 			"data": loadDataA,
// 			"columns": [
// 				// { "data":"", "title": "No"  },
// 				{ "data":"terminal_id", "title": "Terminal ID"},
// 				{ "data":"trx", "title": "Transaksi" , render: function(data){
// 					return "Rp." + rubah(data);
// 				} },
// 				{ "data":"waktu", "title": "Tanggal" }
// 			]
// 		});
// 	}
	
// 	// vm2
// 	if(vm_owner2.options[vm_owner2.selectedIndex].value == 1){
		
// 		console.log('loadDataB',loadDataB);
// 		var tableB = $('#example2').DataTable({
// 			"searching": false,
// 			"data": loadDataB,
// 			"columns": [
// 				// { "data":"", "title": "No"  },
// 				{ "data":"terminal_id", "title": "Terminal ID"},
// 				{ "data":"trx", "title": "Transaksi", render: function(data){
// 					return "Rp." + rubah(data);
// 				} },
// 				{ "data":"waktu", "title": "Tanggal" },
// 			]
// 		});
// 	}

// 	var ab1 = vm_group1.options[vm_group1.selectedIndex].value;
// 	var ab2 = vm_group2.options[vm_group2.selectedIndex].value;

// 	grafikChart(ab1,ab2);
// }

// $(document).ready(function() {
// 	var a = loadData(Object.keys(data['lunari']));
// 	a.sort();
// 	console.log(a);

// 	var vmgroup1  = document.getElementById('vm_group1');
// 	var vmgroup2 = document.getElementById('vm_group2');
	
// 	for(listGroup in a){
// 		vmgroup1.innerHTML += '<option value="'+a[listGroup]+'">'+firstUpcase(a[listGroup])+'</option>';
// 	    vmgroup2.innerHTML += '<option value="'+a[listGroup]+'">'+firstUpcase(a[listGroup])+'</option>';
// 	}
	
// });
$(document).ready(function() {
    $('#tampilkan').DataTable( {
		"pageLength": 10
	} );
});
$(document).ready(function() {
	$.fn.dataTable.ext.errMode = 'none'; //REMOVE alert WARNING
});
