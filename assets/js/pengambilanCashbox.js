
// var result_Mtopup = await get('http://27.111.44.44/mobile/Percobaan2/get_trxmandiritpharterm/'+vm_group_testing+'/'+vm_satu+'/'+tgl_awal_val+'/'+tgl_akhir_val);
// KAI
// http://27.111.44.42/Percobaan2/get_alltrxKAIlembar/0/15000 // http://27.111.44.42/Percobaan2/get_alltrxKAItubuk/0/15000 // http://27.111.44.42/Percobaan/get_percobaan
// MANDIRI
// http://27.111.44.44/mobile/Percobaan/get_percobaan // http://27.111.44.44/mobile/Percobaan2/get_trxMANlembar/0/15000 // http://27.111.44.44/mobile/Percobaan2/get_petugasReplanish // http://27.111.44.44/mobile/Percobaan2/get_vmTubuk/0/10000
// 
async function loadLimitAPI(url,putaran,kelipatan){
	let limita = 0;
	let limitb = kelipatan;
	var temp_url = []
	for(nol = 0; nol<putaran; nol++){
		temp_url.push(url+limita+"/"+limitb);
		limita = limita+limitb;
	}
	
	var temp_tampungan = [];
	for(a in temp_url){
		var url = await fetch(temp_url[a]);
		var ult_json = await url.json();
		for(b in ult_json){
			temp_tampungan.push(
				ult_json[b]
			);
		}
	}
	
	return await temp_tampungan;
}

// load url seluruh
async function loadnotLimitAPI(url){
	var temp_tampungan = [];
	var url = await fetch(url);
	var ult_json = await url.json();
		
	for(a in ult_json){
		temp_tampungan.push(
			ult_json[a]
		);
	}
	return await temp_tampungan
}



// let marker;
async function mapMain(){
	var mapPC = document.getElementById('mapPC');

	var map0 = await loadnotLimitAPI("http://27.111.44.44/mobile/Percobaan2/mapVM1");
	var map_arr = [];
	for(ma in map0){
		if(Number(map0[ma]['latitude']) != 0 ){
			map_arr.push(map0[ma]);
		}
	}
	// console.log(map_arr);

	var map = new google.maps.Map(mapPC, {
		zoom: 6,
		center: new google.maps.LatLng(-7.2480381, 110.4466601),
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	var infowindow = new google.maps.InfoWindow;
	var marker, i;

	for (i = 0; i < map_arr.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(map_arr[i]['latitude'], map_arr[i]['longtitude']),
			map: map
		});

		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				var latitude = map_arr[i]['latitude'];
				var longtitude = map_arr[i]['longtitude'];
				var terminal_id = map_arr[i]['terminal_id'];
				// var latlng = latitude,longtitude;
				infowindow.setContent(
					'<span>'+map_arr[i]['terminal_id']+'-'+map_arr[i]['pinlokasi']+'</span><br>'+
					map_arr[i]['latitude']+'<br>'+
					map_arr[i]['longtitude']+'<br>'
					// '<button class="btn btn-primary" onClick="buttonMARKERMAP('+latitude+','+longtitude+')"> '+'Lihat Histori'+'</button>'
				);
				infowindow.open(map, marker);
				// if (infoWindow) infoWindow.close();
			}
		})(marker, i));
	}
	return map_arr
}
async function cKAI(){
	var url_vm_kai = await loadnotLimitAPI('http://27.111.44.42/Percobaan2/get_terminal');
	var url_lbr_kai = await loadLimitAPI('http://27.111.44.42/Percobaan2/get_alltrxKAIlembar/',1,1000);
	var url_tubuk_kai = await loadLimitAPI('http://27.111.44.42/Percobaan2/get_alltrxKAItubuk/',1,1000);

	var C_vm_kai = [];
	for(b in url_vm_kai){
		if(Number(url_vm_kai[b]['online_status']) == 1){
			C_vm_kai.push(url_vm_kai[b]);
		}
	}

	var C_lbr_kai = [];
	for(a in url_lbr_kai){
		var msg_lbrcashbox = regex_customSimbol(url_lbr_kai[a]['msgdata'], /totallembaruangmesin.*/,21,"&");
		var msg_amount = regex_customSimbol(url_lbr_kai[a]['msgdata'], /totaluangmesin.*/,15,"&");
		if(Number(url_lbr_kai[a]['paid']) != 1){
			C_lbr_kai.push({
				id: url_lbr_kai[a]['id'],
				vmid: url_lbr_kai[a]['vmid'],
				paid: url_lbr_kai[a]['paid'],
				waktu: url_lbr_kai[a]['waktu'],
				lbrcashbox: msg_lbrcashbox,
				totalamount: msg_amount,
			});
			
		}
	}
	var C_oper_lbr_kai = C_lbr_kai;
	// console.log('C_lbr_kai1',C_lbr_kai);
	C_lbr_kai = C_lbr_kai.sort(idCompareKB);
	C_lbr_kai = removeDuplicates(C_lbr_kai,'vmid');
	C_lbr_kai = C_lbr_kai.sort(idCompareBK);
	// console.log('C_oper_lbr_kai',C_oper_lbr_kai);
	// console.log('C_vm_kai',C_vm_kai)
	// belum dipakai
	C_final_kai = []
	for(c in C_lbr_kai){
		for(d in C_vm_kai){
			if(C_lbr_kai[c]['vmid'] === C_vm_kai[d]['terminal_id']){
				C_final_kai.push({

					id: '',
					date: C_lbr_kai[c]['waktu'],
					vmid: C_lbr_kai[c]['vmid'],
					tbk_date: '',
					tbk_petugas_1: '',
					tbk_petugas_2: '',
					tbk_note: '',
					tbk_take_cashbox: '',
					tbk_print_struk: '',
					tbk_confirm_petugas_1: '',
					tbk_confirm_petugas_2: '',
					tbk_begin_date:'',
					tbk_done_date: '',
					cashbox_taken_number: '',
					cashbox_replace_number:'',
					cashbox_deliver_date: '',
					cashbox_accepted_by: '',
					delivery_note:'',
					supervisor: '',
					accepted_note:'',
					status_id:'',
					lbrcashbox: C_lbr_kai[c]['lbrcashbox'],
					totalamount: C_lbr_kai[c]['totalamount'],

					tubuk_sebelumnya_tanggal: '',
					tubuk_sebelumnya_uangmasuk: '',
					tubuk_sebelumnya_totaltrx: '',
					grouping: 'kai'







					/* id: C_lbr_kai[c]['id'],
					vmid: C_lbr_kai[c]['vmid'],
					lbrcashbox: C_lbr_kai[c]['lbrcashbox'],
					totalamount: C_lbr_kai[c]['totalamount'],
					waktu: C_lbr_kai[c]['waktu'],

					terminal_name: C_vm_kai[d]['terminal_name'],
					terminal_address: C_vm_kai[d]['terminal_address'],
					googlemappinlabel: C_vm_kai[d]['googlemappinlabel'], */
				})
			}
		}
	}
	
	return [C_final_kai, C_vm_kai, C_oper_lbr_kai, url_tubuk_kai]
}

///////  cek besok
///////  cek besok
///////  cek besok
///////  cek besok
///////  cek besok

async function cMAN(){
	var url_vm_MAN = await loadnotLimitAPI('http://27.111.44.44/mobile/Percobaan/get_percobaan');
	var url_petugas_MAN = await loadnotLimitAPI('http://27.111.44.44/mobile/Percobaan2/get_petugasReplanish');
	var url_lbr_MAN = await loadLimitAPI('http://27.111.44.44/mobile/Percobaan2/get_trxMANlembar/',1,1000);
	var url_tubuk_MAN = await loadLimitAPI('http://27.111.44.44/mobile/Percobaan2/get_vmTubuk/',1,1000);
	var url_htbk_MAN = await loadLimitAPI('http://27.111.44.44/mobile/Percobaan2/get_tbkCbox/',1,1000);


	// console.log('url_tubuk_MAN',url_tubuk_MAN);

	// lembar remove type 99(ERROR)
	var C_lbr_MAN = []
	for(a in url_lbr_MAN){
		if(url_lbr_MAN[a]['type'] != '99'){
			C_lbr_MAN.push(url_lbr_MAN[a]);
		}
	}
	
	var C_htbk_MAN = []
	for(c in url_htbk_MAN){
		if(Number(url_htbk_MAN[c]['uangmasuk']) != 0){
			C_htbk_MAN.push(url_htbk_MAN[c]);
		}
	}
	C_htbk_MAN = C_htbk_MAN.sort(sortirangkaKB);
	C_htbk_MAN = removeDuplicates(C_htbk_MAN,'vmid');
	C_htbk_MAN = C_htbk_MAN.sort(sortirangkaBK);
	// console.log('C_htbk_MAN',C_htbk_MAN);


	C_lbr_MAN = C_lbr_MAN.sort(sortirangkaKB);
	C_lbr_MAN = removeDuplicates(C_lbr_MAN,'terminal_id');
	C_lbr_MAN = C_lbr_MAN.sort(sortirangkaBK);
	// console.log('C_lbr_MAN',C_lbr_MAN);
	// gabung tubuk dan nama_petugas
	var C_tubuk_MAN = []
	for(b in url_tubuk_MAN){
		var tbk_petugas_1 = url_tubuk_MAN[b]['tbk_petugas_1'];
		var tbk_petugas_2 = url_tubuk_MAN[b]['tbk_petugas_2'];
		var tbk_confirm_petugas_1 = url_tubuk_MAN[b]['tbk_confirm_petugas_1'];
		var tbk_confirm_petugas_2 = url_tubuk_MAN[b]['tbk_confirm_petugas_2'];
		var cashbox_accepted_by = url_tubuk_MAN[b]['cashbox_accepted_by'];
		var tbk_petugas1, tbk_petugas2, tbk_confirm_petugas1, tbk_confirm_petugas2, cashbox_acceptedby;
		for(c in url_petugas_MAN){
			var id_petugas = url_petugas_MAN[c]['id'];
			var nama_petugas = url_petugas_MAN[c]['nama_petugas'];
			
			if(tbk_petugas_1 == id_petugas){
				tbk_petugas1 = nama_petugas;
			}else if(!tbk_petugas_1){
				tbk_petugas1 = '';
			}

			if(tbk_petugas_2 == id_petugas){
				tbk_petugas2 = nama_petugas;
			}else if(!tbk_petugas_2 || tbk_petugas_2 == '0'){
				tbk_petugas2 = '';
			}

			if(tbk_confirm_petugas_1 == id_petugas){
				tbk_confirm_petugas1 = nama_petugas;
			}else if(!tbk_confirm_petugas_1){
				tbk_confirm_petugas1 = '';
			}

			if(tbk_confirm_petugas_2 == id_petugas){
				tbk_confirm_petugas2 = nama_petugas;
			}else if(!tbk_confirm_petugas_2){
				tbk_confirm_petugas2 = '';
			}

			if(cashbox_accepted_by == id_petugas){
				cashbox_acceptedby = nama_petugas;
			}else if(!cashbox_accepted_by){
				cashbox_acceptedby = '';
			}

			
		}
		C_tubuk_MAN.push({
			id: url_tubuk_MAN[b]['id'],
			date: url_tubuk_MAN[b]['date'],
			vmid: url_tubuk_MAN[b]['terminal_id'],
			tbk_date: url_tubuk_MAN[b]['tbk_date'],
			tbk_petugas_1: tbk_petugas1,
			tbk_petugas_2: tbk_petugas2,
			tbk_note: url_tubuk_MAN[b]['tbk_note'],
			tbk_take_cashbox: url_tubuk_MAN[b]['tbk_take_cashbox'],
			tbk_print_struk: url_tubuk_MAN[b]['tbk_print_struk'],
			tbk_confirm_petugas_1: tbk_confirm_petugas1,
			tbk_confirm_petugas_2: tbk_confirm_petugas2,
			tbk_begin_date: url_tubuk_MAN[b]['tbk_begin_date'],
			tbk_done_date: url_tubuk_MAN[b]['tbk_done_date'],
			cashbox_taken_number: url_tubuk_MAN[b]['cashbox_taken_number'],
			cashbox_replace_number: url_tubuk_MAN[b]['cashbox_replace_number'],
			cashbox_deliver_date: url_tubuk_MAN[b]['cashbox_deliver_date'],
			cashbox_accepted_by: cashbox_acceptedby,
			delivery_note: url_tubuk_MAN[b]['delivery_note'],
			supervisor: url_tubuk_MAN[b]['supervisor'],
			accepted_note: url_tubuk_MAN[b]['accepted_note'],
			status_id: url_tubuk_MAN[b]['status_id'],
		});
	}
	// console.log('C_tubuk_MAN',C_tubuk_MAN);

	// belum tbk
	var arr_blmtbk = [];
	for(blm1 in C_tubuk_MAN){
		var date_bulan = new Date().toISOString().slice(0,7);
		var date2 = C_tubuk_MAN[blm1]['date'].slice(0,7);
		 
		if(C_tubuk_MAN[blm1]['tbk_done_date'] == null && date2 == date_bulan){
			arr_blmtbk.push(C_tubuk_MAN[blm1]);
		}
	}
	arr_blmtbk = arr_blmtbk.sort(sortirangkaKB);
	arr_blmtbk = removeDuplicates(arr_blmtbk,'vmid');
	arr_blmtbk = arr_blmtbk.sort(sortirangkaBK);

	// console.log(arr_blmtbk);
	//sudah tbk
	/* var arr_sdhtbk = [];
	for(blm1 in C_tubuk_MAN){
		var date_bulan = new Date().toISOString().slice(0,7);
		var date2 = C_tubuk_MAN[blm1]['date'].slice(0,7);
		 
		if(C_tubuk_MAN[blm1]['tbk_done_date'] != null && date2 == date_bulan){
			arr_sdhtbk.push(C_tubuk_MAN[blm1]);
		}
	}
	arr_sdhtbk = arr_sdhtbk.sort(sortirangkaKB);
	arr_sdhtbk = removeDuplicates(arr_sdhtbk,'vmid');
	arr_sdhtbk = arr_sdhtbk.sort(sortirangkaBK); */

	// console.log('arr_sdhtbk',arr_sdhtbk);
	// console.log('arr_blmtbk',arr_blmtbk);
	
	var C_final_MAN = [];
	for(lb1 in arr_blmtbk){
		var vm_id =arr_blmtbk[lb1]['vmid'];
		for(lb2 in C_lbr_MAN){
			if(C_lbr_MAN[lb2]['terminal_id'] === vm_id){
				var lbrcashbox = C_lbr_MAN[lb2]['lbrcashbox'];
			}
		}
		for(lb3 in C_htbk_MAN){
			if(C_htbk_MAN[lb3]['vmid'] === vm_id){
				var tubuk_sebelumnya_dt = C_htbk_MAN[lb3]['dt']+' '+C_htbk_MAN[lb3]['tm'];
				var tubuk_sebelumnya_uangmasuk = C_htbk_MAN[lb3]['uangmasuk'];
				var tubuk_sebelumnya_totaltrx = C_htbk_MAN[lb3]['totaltrx'];
			}
		}
		C_final_MAN.push({
			id: arr_blmtbk[lb1]['id'],
			date: arr_blmtbk[lb1]['date'],
			vmid: arr_blmtbk[lb1]['vmid'],
			tbk_date: arr_blmtbk[lb1]['tbk_date'],
			tbk_petugas_1: arr_blmtbk[lb1]['tbk_petugas_1'],
			tbk_petugas_2: arr_blmtbk[lb1]['tbk_petugas_2'],
			tbk_note: arr_blmtbk[lb1]['tbk_note'],
			tbk_take_cashbox: arr_blmtbk[lb1]['tbk_take_cashbox'],
			tbk_print_struk: url_tubuk_MAN[lb1]['tbk_print_struk'],
			tbk_confirm_petugas_1: arr_blmtbk[lb1]['tbk_confirm_petugas_1'],
			tbk_confirm_petugas_2: arr_blmtbk[lb1]['tbk_confirm_petugas_2'],
			tbk_begin_date: arr_blmtbk[lb1]['tbk_begin_date'],
			tbk_done_date: arr_blmtbk[lb1]['tbk_done_date'],
			cashbox_taken_number: arr_blmtbk[lb1]['cashbox_taken_number'],
			cashbox_replace_number: arr_blmtbk[lb1]['cashbox_replace_number'],
			cashbox_deliver_date: arr_blmtbk[lb1]['cashbox_deliver_date'],
			cashbox_accepted_by: arr_blmtbk[lb1]['cashbox_accepted_by'],
			delivery_note: arr_blmtbk[lb1]['delivery_note'],
			supervisor: arr_blmtbk[lb1]['supervisor'],
			accepted_note: arr_blmtbk[lb1]['accepted_note'],
			status_id: url_tubuk_MAN[lb1]['status_id'],
			lbrcashbox: lbrcashbox,
			tubuk_sebelumnya_tanggal: tubuk_sebelumnya_dt,
			tubuk_sebelumnya_uangmasuk: tubuk_sebelumnya_uangmasuk,
			tubuk_sebelumnya_totaltrx: tubuk_sebelumnya_totaltrx,
			grouping: 'mandiri'

		})
	}


	return [C_final_MAN, C_tubuk_MAN, url_htbk_MAN];
}

async function clean(){
	
	var map_url = mapMain();
	const [C_final_kai, C_vm_kai, C_oper_lbr_kai, url_tubuk_kai] = await cKAI()
	var KAI_url = C_final_kai;
	const [C_final_MAN, C_tubuk_MAN, url_htbk_MAN] = await cMAN();
	var MAN_url = C_final_MAN;
	var MAN_url1 = C_tubuk_MAN;
	// console.log('awek', MAN_url1);

	var c_kaiulr = [];
	for(persen_kai in KAI_url){
		var lbrcashbox = KAI_url[persen_kai]['lbrcashbox'];
		if(lbrcashbox > 100){
			c_kaiulr.push(KAI_url[persen_kai]);
		}
	}
	c_manulr = [];
	for(persen_man in MAN_url){
		var lbrcashbox = MAN_url[persen_man]['lbrcashbox'];
		if(lbrcashbox > 100){
			c_manulr.push(MAN_url[persen_man]);
		}
	}
	// console.log(c_kaiulr);

	var temp_kaiman = [...c_kaiulr, ...c_manulr];
	temp_kaiman.sort(vmidCompare);
	console.log('temp_kaiman',temp_kaiman);
	
	// for(list_kaiman in temp_kaiman);
	// // var temp_kaiman = [...KAI_url, ...MAN_url];
	// console.log('temp_kaiman',temp_kaiman);

	// // console.log('MAN_url',await MAN_url);
	// // console.log('KAI_url',await KAI_url);
	var test_tablebody = document.getElementById('test-tablebody');
	test_tablebody.innerHTML = '';
	for(list1 in temp_kaiman){
		var temp_data;
		// var = MAN_url1[list2]['vmid'];
		for(list2=0; list2<MAN_url1.length; list2++ ){
			if(MAN_url1[list2]['id'] == temp_kaiman[list1]['id'] && MAN_url1[list2]['vmid'] == temp_kaiman[list1]['vmid'] && temp_kaiman[list1]['grouping'] == 'mandiri'){
				temp_data = MAN_url1[list2-1];
			}else if(temp_kaiman[list1]['grouping'] == 'kai'){
				temp_data = temp_kaiman[list1];
			}
		}
		let nour = 1+Number(list1);
		let persen = rumusPersen(temp_kaiman[list1]['lbrcashbox'],500);
		var ket,ket_style;
		if(persen <= 75.00 && persen > 0){
			ket = 'Cashbox Normal';
			ket_style = 'background-color:#00b050;';
		}else if(persen <= 85.00 && persen > 75.00 ){
			ket = 'Cashbox Mulai Penuh';
			ket_style = 'background-color:#ffff00;';
		}else if(persen > 85.00 && persen <= 100){
			ket = 'Segera Tutup Buku';
			ket_style = 'background-color:#ff0000;';
		}else if(persen >= 100){
			ket = 'Segera Tutup Buku';
			ket_style = 'background-color:#c00000;';
		}

		var tbk_petugas_2;
		if(temp_kaiman[list1]['tbk_petugas_2'] != ''){
			tbk_petugas_2 = '<div class="col">Petugas 2 : '+temp_kaiman[list1]['tbk_petugas_2']+'</div>';
		}else{
			tbk_petugas_2 = '';
		}

		var tbk_note;
		if(temp_kaiman[list1]['tbk_note'] != ''){
			tbk_note = '<div class="col" style="font-size: 12px; color:red;">* '+temp_kaiman[list1]['tbk_note']+'</div>';
		}else{
			tbk_note = '';
		}
		
		var cashbox_accepted_by;
		if(temp_kaiman[list1]['cashbox_accepted_by'] != ''){
			cashbox_accepted_by = temp_kaiman[list1]['cashbox_accepted_by'];
		}else{
			cashbox_accepted_by = '';
		}

		var tbk_datetime;
		if(temp_kaiman[list1]['tbk_begin_date'] == null){
			tbk_datetime = '<span style="text-decoration: line-through; color:red;">'+temp_kaiman[list1]['tubuk_sebelumnya_tanggal']+'</span>';
		}else{
			tbk_datetime = '<span style="color:green;">'+temp_kaiman[list1]['tbk_begin_date']+'</span>';
		}

		var tbk_begin_date;
		if(temp_kaiman[list1]['tbk_begin_date'] == null){
			tbk_begin_date = 'Gak Report'
		}else{
			tbk_begin_date = temp_kaiman[list1]['tbk_begin_date'];
		}

		var tbk_print_struk;
		if(Number(temp_kaiman[list1]['tbk_print_struk']) == 1){
			tbk_print_struk = 'Yes';
		}else if(Number(temp_kaiman[list1]['tbk_print_struk']) == 0){
			tbk_print_struk = 'No';
		}else{
			tbk_print_struk = '';
		}

		test_tablebody.innerHTML += 
			'<tr style="">'+
				'<td style="text-align:center;" class="align-middle"><div class="col">'+nour+'</div><div class="col" style="font-size:11px;">['+temp_kaiman[list1]['id']+']</div></td>'+
				'<td style="text-align:left;" class="align-middle">'+'<div class="col">'+temp_kaiman[list1]['vmid']+'</div>'+tbk_note+'</td>'+
				'<td style="text-align:center;" class="align-middle">'+temp_kaiman[list1]['tbk_date']+'</td>'+
				'<td style="text-align:center;" class="align-middle">'+temp_kaiman[list1]['lbrcashbox']+'</td>'+
				'<td style="text-align:center;" class="align-middle">'+persen+' %</td>'+
				'<td style="text-align:center;'+ket_style+'" class="align-middle">'+ket+'</td>'+
				'<td style="text-align:left;" class="align-middle"><div class="col">Petugas 1 : '+temp_kaiman[list1]['tbk_petugas_1']+'</div>'+tbk_petugas_2+'</td>'+
				'<td style="text-align:center;" class="align-middle">'+tbk_datetime+'</td>'+
				'<td style="text-align:left;" class="align-middle">'+
					'<div class="col">Berangkat : '+tbk_begin_date+'</div>'+
					'<div class="col">Print Struk : '+tbk_print_struk+'</div>'+
				'</td>'+
				'<td style="text-align:center;" class="align-middle">'+temp_kaiman[list1]['accepted_note']+'</td>'+
				'<td style="text-align:center;" class="align-middle">'+cashbox_accepted_by+'</td>'+
				// '<td style="text-align:center;" class="align-middle">'++'</td>'+
			'</tr>'
		;
	}
	
	
	/* const doj = async () => {
		
		// KAI
		// KAI
		
			console.log('kai', await KAI_url);
			console.log(await map_url);
			return [await KAI_url, await map_url]
	};
	console.log('asd',await doj()); */
}
async function histori_tbk_merge(){
	const [C_final_kai, C_vm_kai, C_oper_lbr_kai, url_tubuk_kai] = await cKAI();
	const [C_final_MAN, C_tubuk_MAN, url_htbk_MAN] = await cMAN();
	var arr_merge = [];
	var arr_cleanman = [];
	var arr_cleankai = [];
	
	//mandiri
	for(mana in C_tubuk_MAN){
		var C_tubuk_MAN1 = C_tubuk_MAN[mana];
		for(manb in url_htbk_MAN){
			var url_htbk_MAN1 = url_htbk_MAN[manb];
			var dtbk_date, dtbk_totaltrx, dtbk_uangmasuk;
			var tbk_dd = url_htbk_MAN1['dt']+' '+url_htbk_MAN1['tm'];
			if(Number(url_htbk_MAN1['totaltrx']) != 0){
				if(C_tubuk_MAN1['vmid'] == url_htbk_MAN1['vmid']){
					if(C_tubuk_MAN1['tbk_done_date'] == tbk_dd){
						dtbk_date = url_htbk_MAN1['dt']+' '+url_htbk_MAN1['tm'];
						dtbk_totaltrx = url_htbk_MAN1['totaltrx'];
						dtbk_uangmasuk = url_htbk_MAN1['uangmasuk'];
					}else if(C_tubuk_MAN1['tbk_done_date'] == null){
						dtbk_date = '';
						dtbk_totaltrx = '';
						dtbk_uangmasuk = '';
					}
				}
			}
		}
		var date_bulan = new Date().toISOString().slice(0,7);
		var date2 = C_tubuk_MAN[mana]['date'].slice(0,7);
		if(C_tubuk_MAN[mana]['tbk_done_date'] != null && date_bulan == date2){
			arr_cleanman.push({
				id : C_tubuk_MAN1['id'],
				date : C_tubuk_MAN1['date'],
				vmid : C_tubuk_MAN1['vmid'],
				tbk_date : C_tubuk_MAN1['tbk_date'],
				tbk_petugas_1 : C_tubuk_MAN1['tbk_petugas_1'],
				tbk_petugas_2 : C_tubuk_MAN1['tbk_petugas_2'],
				tbk_note : C_tubuk_MAN1['tbk_note'],
				tbk_take_cashbox : C_tubuk_MAN1['tbk_take_cashbox'],
				tbk_print_struk : C_tubuk_MAN1['tbk_print_struk'],
				tbk_confirm_petugas_1 : C_tubuk_MAN1['tbk_confirm_petugas_1'],
				tbk_confirm_petugas_2 : C_tubuk_MAN1['tbk_confirm_petugas_2'],
				tbk_begin_date : C_tubuk_MAN1['tbk_begin_date'],
				tbk_done_date : C_tubuk_MAN1['tbk_done_date'],
				cashbox_taken_number : C_tubuk_MAN1['cashbox_taken_number'],
				cashbox_replace_number : C_tubuk_MAN1['cashbox_replace_number'],
				cashbox_deliver_date : C_tubuk_MAN1['cashbox_deliver_date'],
				cashbox_accepted_by : C_tubuk_MAN1['cashbox_accepted_by'],
				delivery_note : C_tubuk_MAN1['delivery_note'],
				supervisor : C_tubuk_MAN1['supervisor'],
				accepted_note : C_tubuk_MAN1['accepted_note'],
				status_id : C_tubuk_MAN1['status_id'],
	
				dtbk_date : dtbk_date,
				dtbk_totaltrx : dtbk_totaltrx,
				dtbk_uangmasuk : dtbk_uangmasuk,
				grouping: 'mandiri'
			})
		}
		
	}
	
	console.log('arr_cleanman',arr_cleanman);

	//kai
	console.log('asdasdadas',url_tubuk_kai);
	for(kaia in url_tubuk_kai){
		var tbk_1 = regex_customSimbol(url_tubuk_kai[kaia]['msgdata'], /tbk=.*/,4,"&");
		var msg_lbrcashbox = regex_customSimbol(url_tubuk_kai[kaia]['msgdata'], /totaltrx.*/,9,"&");
		var msg_amount = regex_customSimbol(url_tubuk_kai[kaia]['msgdata'], /totalpenjualan.*/,15,"&");
		if(tbk_1 == 1){

			arr_cleankai.push({
				id: url_tubuk_kai[kaia]['id'],
				date: url_tubuk_kai[kaia]['waktu'],
				vmid: url_tubuk_kai[kaia]['vmid'],
				tbk_date: '',
				tbk_petugas_1: '',
				tbk_petugas_2: '',
				tbk_note: '',
				tbk_take_cashbox: '',
				tbk_print_struk: '',
				tbk_confirm_petugas_1: '',
				tbk_confirm_petugas_2: '',
				tbk_begin_date:'',
				tbk_done_date: '',
				cashbox_taken_number: '',
				cashbox_replace_number:'',
				cashbox_deliver_date: '',
				cashbox_accepted_by: '',
				delivery_note:'',
				supervisor: '',
				accepted_note:'',
				status_id:'',
				/* lbrcashbox: C_lbr_kai[c]['lbrcashbox'],
				totalamount: C_lbr_kai[c]['totalamount'], */

				dtbk_date: url_tubuk_kai[kaia]['waktu'],
				dtbk_totaltrx: msg_lbrcashbox,
				dtbk_uangmasuk: msg_amount,
				grouping: 'kai'
			})
		}
	}
	
	console.log('arr_cleankai',arr_cleankai);
	arr_merge = [...arr_cleanman, ...arr_cleankai];
	// var kata = "app=vm_report&action=tbk&tbk=1&dt=03/09/2020&tm=12:00:15&vmid=KA6007&lbrpayout1=20&totpayout1=100000&lbrpayout2=20&totpayout2=200000&totpayout12=300000";
	// kata.substr('tbk=1');
	// console.log(kata);
	// console.log(regex_customSimbol(kata,/tbk.*/,4,"&"))
	/* var regnum = kata.match(cari);
		regnum = String(regnum);
		regnum = regnum.split("&");
		regnum = String(regnum); */

	return [arr_cleanman, arr_cleankai, arr_merge];
}

async function histori_BUTTON(a,b,c){

}

async function url_main_histori(){
	var map0 = await loadnotLimitAPI("http://27.111.44.44/mobile/Percobaan2/mapVM1");
	const [arr_cleanman, arr_cleankai, arr_merge] = await histori_tbk_merge();
	/* var temp_cleanman = arr_cleanman;
	temp_cleanman = temp_cleanman.sort(sortirangkaKB);
	temp_cleanman = removeDuplicates(temp_cleanman,'vmid');
	temp_cleanman = temp_cleanman.sort(sortirangkaBK);
	var temp_cleankai = arr_cleankai;
	temp_cleankai = temp_cleankai.sort(sortirangkaKB);
	temp_cleankai = removeDuplicates(temp_cleankai,'vmid');
	temp_cleankai = temp_cleankai.sort(sortirangkaBK);

	console.log('22', temp_cleankai);
	console.log('22', temp_cleanman); */
	var arr_mergeori = arr_merge;
	var temp_arrmerge = arr_merge;
	temp_arrmerge = temp_arrmerge.sort(sortirangkaKB);
	temp_arrmerge = removeDuplicates(temp_arrmerge,'vmid');
	temp_arrmerge = temp_arrmerge.sort(sortirangkaBK);
	console.log('temp_arrmerge',temp_arrmerge);

	var temp_show1 = [];
	for(xa in temp_arrmerge){
		
		for(xb in map0){
			
			if(Number(map0[xb]['latitude']) != 0 && map0[xb]['vmid'] === temp_arrmerge[xa]['terminal_id'] ){
				var map01 = map0[xb];

				
			}
		}
		temp_show1.push({
			id: temp_arrmerge[xa]['id'],
			date: temp_arrmerge[xa]['date'],
			vmid: temp_arrmerge[xa]['vmid'],
			tbk_date: temp_arrmerge[xa]['tbk_date'],
			tbk_petugas_1: temp_arrmerge[xa]['tbk_petugas_1'],
			tbk_petugas_2: temp_arrmerge[xa]['tbk_petugas_2'],
			tbk_note: temp_arrmerge[xa]['tbk_note'],
			tbk_take_cashbox: temp_arrmerge[xa]['tbk_take_cashbox'],
			tbk_print_struk: temp_arrmerge[xa]['tbk_print_struk'],
			tbk_confirm_petugas_1: temp_arrmerge[xa]['tbk_confirm_petugas_1'],
			tbk_confirm_petugas_2: temp_arrmerge[xa]['tbk_confirm_petugas_2'],
			tbk_begin_date:temp_arrmerge[xa]['tbk_begin_date'],
			tbk_done_date: temp_arrmerge[xa]['tbk_done_date'],
			cashbox_taken_number: temp_arrmerge[xa]['cashbox_taken_number'],
			cashbox_replace_number: temp_arrmerge[xa]['cashbox_replace_number'],
			cashbox_deliver_date: temp_arrmerge[xa]['cashbox_deliver_date'],
			cashbox_accepted_by: temp_arrmerge[xa]['cashbox_accepted_by'],
			delivery_note:temp_arrmerge[xa]['delivery_note'],
			supervisor: temp_arrmerge[xa]['supervisor'],
			accepted_note:temp_arrmerge[xa]['accepted_note'],
			status_id:temp_arrmerge[xa]['status_id'],
			/* lbrcashbox: C_lbr_kai[c]['lbrcashbox'],
			totalamount: C_lbr_kai[c]['totalamount'], */

			dtbk_date: temp_arrmerge[xa]['dtbk_date'],
			dtbk_totaltrx: temp_arrmerge[xa]['dtbk_totaltrx'],
			dtbk_uangmasuk: temp_arrmerge[xa]['dtbk_uangmasuk'],
			grouping: temp_arrmerge[xa]['grouping'],

			latitude: map01['latitude'],
			longtitude: map01['longtitude'],
			pinlokasi: map01['pinlokasi']

		})

	}
	// console.log('temp_show1',);

	// var map_arr = [];
	/* for(ma in map0){
		if(Number(map0[ma]['latitude']) != 0 ){
			
		}
	} */
	temp_show1.sort(dateCompareBK);
	var  histori_test_tablebody = document.getElementById('histori_test_tablebody');
	histori_test_tablebody.innerHTML = '';
	for(a in temp_show1){
		let persen = rumusPersen(temp_show1[a]['dtbk_totaltrx'],500);
		var ket_style;
		if(persen <= 75.00 && persen > 0){
			// ket = 'Cashbox Normal';
			ket_style = 'background-color:#00b050;';
		}else if(persen <= 85.00 && persen > 75.00 ){
			// ket = 'Cashbox Mulai Penuh';
			ket_style = 'background-color:#ffff00;';
		}else if(persen > 85.00 && persen <= 100){
			// ket = 'Segera Tutup Buku';
			ket_style = 'background-color:#ff0000;';
		}else if(persen >= 100){
			// ket = 'Segera Tutup Buku';
			ket_style = 'background-color:#c00000;';
		}

		let nour = 1+Number(a);
		var tbk_petugas_2;
		if(temp_show1[a]['tbk_petugas_2'] != ''){
			tbk_petugas_2 = '<div class="col">Petugas 2 : '+temp_show1[a]['tbk_petugas_2']+'</div>';
		}else{
			tbk_petugas_2 = '';
		}

		var tbk_note;
		if(temp_show1[a]['tbk_note'] != ''){
			tbk_note = '<div class="col" style="font-size: 12px; color:red;">* '+temp_show1[a]['tbk_note']+'</div>';
		}else{
			tbk_note = '';
		}

		var tbk_begin_date;
		if(temp_show1[a]['tbk_begin_date'] == null){
			tbk_begin_date = 'Gak Report'
		}else{
			tbk_begin_date = temp_show1[a]['tbk_begin_date'];
		}

		var tbk_print_struk;
		if(Number(temp_show1[a]['tbk_print_struk']) == 1){
			tbk_print_struk = 'Yes';
		}else if(Number(temp_show1[a]['tbk_print_struk']) == 0){
			tbk_print_struk = 'No';
		}else{
			tbk_print_struk = '';
		}
		
		let vmid = temp_show1[a]['vmid'];
		// console.log(vmid);
		var latitude = temp_show1[a]['latitude'];
		var longtitude = temp_show1[a]['longtitude'];
		var pinlokasi = temp_show1[a]['pinlokasi'];

		var temp_loaddata = []
		for(b in arr_mergeori){
			if(arr_mergeori[b]['vmid'] == vmid){
				temp_loaddata.push(arr_mergeori[b]);
			}
		}


		histori_test_tablebody.innerHTML += 
			'<td style="text-align:center;" class="align-middle">'+nour+'</td>'+
			'<td style="text-align:center;" class="align-middle"><div class="col">'+temp_show1[a]['vmid']+'</div>'+tbk_note+'</td>'+
			'<td style="text-align:center;" class="align-middle">'+temp_show1[a]['dtbk_date']+'</td>'+
			'<td style="text-align:center;" class="align-middle">'+temp_show1[a]['dtbk_totaltrx']+'</td>'+
			'<td style="text-align:center;'+ket_style+'" class="align-middle">'+persen+'</td>'+
			// '<td style="text-align:center;">loading...</td>'+
			'<td style="text-align:left;" class="align-middle">'+'<div class="col">Petugas 1 : '+temp_show1[a]['tbk_petugas_1']+'</div>'+tbk_petugas_2+'</td>'+
			// '<td style="text-align:center;">loading...</td>'+
			// '<td style="text-align:center;">loading...</td>'+
			'<td style="text-align:left;" class="align-middle">'+
					'<div class="col">Berangkat : '+tbk_begin_date+'</div>'+
					'<div class="col">Print Struk : '+tbk_print_struk+'</div>'+
			'</td>'+
			'<td style="text-align:center;" class="align-middle">'+temp_show1[a]['accepted_note']+'</td>'+
			'<td style="text-align:center;" class="align-middle">'+temp_show1[a]['cashbox_accepted_by']+'</td>'+
			'<td style="text-align:center;" class="align-middle">'+
			// ,[\''+temp_loaddata+'\']
				'<button type="button" class="col btn btn-primary" onClick="showModal('+latitude+','+longtitude+',\''+vmid+'\',\''+pinlokasi+'\')" style="border-radius: 0;" data-toggle="modal" data-target="#myModal">'+
					'Cek Rincian'+
				'</button>'+
				// '<button class="btn btn-primary" onClick="()">lokasi</button>'+
			'</td>'
		;
	}
	
	console.log('temp_show1',temp_show1);
	
}

function map_inmodal(lat,lng,vm){
	const myLatLng = { lat: lat, lng: lng };
	const map = new google.maps.Map(document.getElementById("map_modal"), {
		zoom: 17,
		center: myLatLng,
	});
	new google.maps.Marker({
		position: myLatLng,
		map,
		title: vm,
	});
}
async function showModal(latitude,longtitude,vmid,pinlokasi){
	// console.log(btn_vmid);
	// console.log('arr',arr_merge);
	var btn_latitude = latitude;
	var btn_longtitude = longtitude;
	var btn_vmid = vmid;
	var btn_pinlokasi = pinlokasi;

	var modal_pengambilancashbox = document.getElementById('modal_pengambilancashbox');
	modal_pengambilancashbox.innerHTML = '';

	var table_in_modal = 
	'<div class="table-responsive-lg pcb-form1 p-2 col-md-12" id="histori_2">'+
			'<table id="t-table" class="table table-bordered" style="width:100%">'+
			'<thead id="test-tablehead" style="background-color:#2ac0ca;">'+
				'<tr>'+
					'<th scope="col"  style="vertical-align : middle;text-align:center; font-size:12px;">No</th>'+
					// '<th scope="col"  style="vertical-align : middle;text-align:center;">VM-ID</th>'+
					'<th scope="col"  style="vertical-align : middle;text-align:center; font-size:12px;">TBK-Terakhir</th>'+
					'<th scope="col"  style="vertical-align : middle;text-align:center; font-size:12px;">Volume Cashbox</th>'+
					'<th scope="col"  style="vertical-align : middle;text-align:center; font-size:12px;">%</th>'+
					// '<th scope="col"  style="vertical-align : middle;text-align:center;">Keterangan</th>'+
					'<th scope="col"  style="vertical-align : middle;text-align:center; font-size:12px;">Petugas</th>'+
					// '<th scope="col"  style="vertical-align : middle;text-align:center;">TBK Datetime</th>'+
					// '<th scope="col"  style="vertical-align : middle;text-align:center;">TBK Amount</th>'+
					'<th scope="col"  style="vertical-align : middle;text-align:center; font-size:12px;">TBK Status</th>'+
					'<th scope="col"  style="vertical-align : middle;text-align:center; font-size:12px;">Cashbox Diserahkan</th>'+
					'<th scope="col"  style="vertical-align : middle;text-align:center; font-size:12px;">Cashbox Diterima</th>'+
					// '<th class="ml-2 border-0" scope="col" style="vertical-align : middle;border: none;text-align:center; background-color:#ffffff; color:#007bff;">Histori</th>'+

				'</tr>'+
			'</thead>'+
			'<tbody id="histori_test_tablebody1">'+
				'<tr>'+
					'<td style="text-align:center; font-size:12px;">loading...</td>'+
					// '<td style="text-align:center;">loading...</td>'+
					'<td style="text-align:center; font-size:12px;">loading...</td>'+
					'<td style="text-align:center; font-size:12px;">loading...</td>'+
					'<td style="text-align:center; font-size:12px;">loading...</td>'+
					// '<td style="text-align:center;">loading...</td>'+
					'<td style="text-align:center; font-size:12px;">loading...</td>'+
					// '<td style="text-align:center;">loading...</td>'+
					// '<td style="text-align:center;">loading...</td>'+
					'<td style="text-align:center; font-size:12px;">loading...</td>'+
					'<td style="text-align:center; font-size:12px;">loading...</td>'+
					'<td style="text-align:center; font-size:12px;">loading...</td>'+
					// '<td style="text-align:center;">Loading...'+
						/* '<button type="button" class="col btn btn-primary" onClick="" style="border-radius: 0;" data-toggle="modal" data-target="#myModal">'+
							'Cek Rincian'+
						'</button>'+ */
						// '<button class="btn btn-primary" onClick="()">lokasi</button>'+
					// '</td>'+
				'</tr>'+
			'</tbody>'+
			'<tfoot id="histori_test_tablefoot">'+
			'</tfoot>'+
			'</table>'+
		'</div>'
		;

	modal_pengambilancashbox.innerHTML += 
	'<div class="modal fade" id="myModal">'+
		'<div class="modal-dialog modal-lg " role="document">'+
			'<div class="modal-content" >'+
			
				// <!-- Modal Header -->
				'<div class="modal-header">'+
					'<div class="col p-0">'+
						'<h4 class="modal-title">'+btn_vmid+'</h4>'+
						'<span class="">Rincian Tubuk Bulan ini</span>'+
					'</div>'+
					'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
				'</div>'+
				
				// <!-- Modal body -->
				'<div class="modal-body">'+
					'<div class="clearfix mb-3">'+
						'<div class="col-6 float-left p-0" id="map_modal" style="height:250px;"></div>'+
						'<div class="col-6 float-right">'+
							'<div><span><b>'+btn_pinlokasi+'</b></span></div>'+
							'<div><span><a href="https://www.google.com/maps/search/google+map/@'+btn_latitude+','+btn_longtitude+',17z" target="_blank">'+btn_latitude+','+btn_longtitude+'</a></span></div>'+
							// '<div><span>123</span></div>'+
						'</div>'+
					'</div>'+
					table_in_modal+

					/* '<div class="col-md-12 p-0">'+
						'<div class="col-md-12 p-0"></div>'+
					'</div>'+
					
					// '<div class="col-md-12 p-0">'+
						table_in_modal+
					// '</div>'+ */
				'</div>'+
				
				// <!-- Modal footer -->
				/* '<div class="modal-footer">'+
					'<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>'+
				'</div>'+ */
				
			'</div>'+
		'</div>'+
	'</div>'
	;

	
	var map0 = await loadnotLimitAPI("http://27.111.44.44/mobile/Percobaan2/mapVM1");
	const [arr_cleanman, arr_cleankai, arr_merge] = await histori_tbk_merge();

	var histori_test_tablebody1 = document.getElementById('histori_test_tablebody1');
	histori_test_tablebody1.innerHTML = ' ';
	let nour = 0;
	for(la=0; la<arr_merge.length; la++){
		
		let persen = rumusPersen(arr_merge[la]['dtbk_totaltrx'],500);

		if(persen <= 75.00 && persen > 0){
			// ket = 'Cashbox Normal';
			ket_style = 'background-color:#00b050;';
		}else if(persen <= 85.00 && persen > 75.00 ){
			// ket = 'Cashbox Mulai Penuh';
			ket_style = 'background-color:#ffff00;';
		}else if(persen > 85.00 && persen <= 100){
			// ket = 'Segera Tutup Buku';
			ket_style = 'background-color:#ff0000;';
		}else if(persen >= 100){
			// ket = 'Segera Tutup Buku';
			ket_style = 'background-color:#c00000;';
		}

		var tbk_petugas_2;
		if(arr_merge[la]['tbk_petugas_2'] != ''){
			tbk_petugas_2 = '<div class="col">Petugas 2 : '+arr_merge[la]['tbk_petugas_2']+'</div>';
		}else{
			tbk_petugas_2 = '';
		}

		var tbk_note;
		if(arr_merge[la]['tbk_note'] != ''){
			tbk_note = '<div class="col" style="font-size: 12px; color:red;">Catatan : * '+arr_merge[la]['tbk_note']+'</div>';
		}else{
			tbk_note = '';
		}

		var tbk_begin_date;
		if(arr_merge[la]['tbk_begin_date'] == null){
			tbk_begin_date = 'Gak Report'
		}else{
			tbk_begin_date = arr_merge[la]['tbk_begin_date'];
		}

		var tbk_print_struk;
		if(Number(arr_merge[la]['tbk_print_struk']) == 1){
			tbk_print_struk = 'Yes';
		}else if(Number(arr_merge[la]['tbk_print_struk']) == 0){
			tbk_print_struk = 'No';
		}else{
			tbk_print_struk = '';
		}


		if(btn_vmid == arr_merge[la]['vmid']){
			nour = nour+1;
			histori_test_tablebody1.innerHTML += 
			'<tr>'+
				'<td  scope="row" style="text-align:center; font-size:12px;">'+nour+'</td>'+
				// '<td style="text-align:center;">'+arr_merge[la]['vmid']+'</td>'+
				'<td style="text-align:left; font-size:12px;" >'+arr_merge[la]['date']+'</td>'+
				'<td style="text-align:center; font-size:12px;">'+arr_merge[la]['dtbk_totaltrx']+'</td>'+
				'<td style="text-align:center; font-size:12px;">'+persen+'</td>'+
				// '<td style="text-align:center;">loading...</td>'+
				'<td style="text-align:left; font-size:12px;">'+'<div class="col" style="font-size:12px;">Petugas 1 : '+arr_merge[la]['tbk_petugas_1']+'</div>'+tbk_petugas_2+'</td>'+
				// '<td style="text-align:center;">loading...</td>'+
				// '<td style="text-align:center;">loading...</td>'+
				'<td style="text-align:left; font-size:12px;" class="align-middle">'+
					'<div class="col">Berangkat : '+tbk_begin_date+'</div>'+
					'<div class="col">Print Struk : '+tbk_print_struk+'</div>'+
					tbk_note+
				'</td>'+
				'<td style="text-align:left; font-size:12px;">'+arr_merge[la]['accepted_note']+'</td>'+
				'<td style="text-align:left; font-size:12px;">'+arr_merge[la]['cashbox_accepted_by']+'</td>'+
				// '<td style="text-align:center;">Loading...'+
					/* '<button type="button" class="col btn btn-primary" onClick="" style="border-radius: 0;" data-toggle="modal" data-target="#myModal">'+
						'Cek Rincian'+
					'</button>'+ */
					// '<button class="btn btn-primary" onClick="()">lokasi</button>'+
				// '</td>'+
			'</tr>'
			;
			
		}
		
	}
	map_inmodal(btn_latitude,btn_longtitude,btn_vmid);
	console.log('vmid',arr_merge);

}

function mainHistori(){
	url_main_histori();

	var template_table = document.getElementById('letakTabel');
	template_table.innerHTML = 
		'<div class="col-sm-12 float-left pl-0 pr-0 mb-1" id="bodymain_left">'
		+'</div>'
	;
	
	var bodymain_left = document.getElementById('bodymain_left');
	bodymain_left.innerHTML = 
	'<div class="" id="histori_1">'+
		'<h5 class="col-md-3 pl-2 " style="color:#2ac0ca; ">Vending Machine Last  <span class="badge badge-secondary badge-danger"></span></h5>'+
		'<div class="table-responsive-lg pcb-form1 p-2" id="histori_2">'+
			'<table id="t-table" class="table table-bordered" style="width:100%">'+
			'<thead id="test-tablehead" style="background-color:#2ac0ca;">'+
				'<tr>'+
					'<th scope="col"  style="vertical-align : middle;text-align:center;">No</th>'+
					'<th scope="col"  style="vertical-align : middle;text-align:center;">VM-ID</th>'+
					'<th scope="col"  style="vertical-align : middle;text-align:center;">TBK-Terakhir</th>'+
					'<th scope="col"  style="vertical-align : middle;text-align:center;">Volume Cashbox</th>'+
					'<th scope="col"  style="vertical-align : middle;text-align:center;">%</th>'+
					// '<th scope="col"  style="vertical-align : middle;text-align:center;">Keterangan</th>'+
					'<th scope="col"  style="vertical-align : middle;text-align:center;">Petugas</th>'+
					// '<th scope="col"  style="vertical-align : middle;text-align:center;">TBK Datetime</th>'+
					// '<th scope="col"  style="vertical-align : middle;text-align:center;">TBK Amount</th>'+
					'<th scope="col"  style="vertical-align : middle;text-align:center;">TBK Status</th>'+
					'<th scope="col"  style="vertical-align : middle;text-align:center;">Cashbox Diserahkan</th>'+
					'<th scope="col"  style="vertical-align : middle;text-align:center;">Cashbox Diterima</th>'+
					'<th class="ml-2 border-0" scope="col" style="vertical-align : middle;border: none;text-align:center; background-color:#ffffff; color:#007bff;">Histori</th>'+

				'</tr>'+
			'</thead>'+
			'<tbody id="histori_test_tablebody">'+
				'<tr>'+
					'<td style="text-align:center;">loading...</td>'+
					'<td style="text-align:center;">loading...</td>'+
					'<td style="text-align:center;">loading...</td>'+
					'<td style="text-align:center;">loading...</td>'+
					'<td style="text-align:center;">loading...</td>'+
					// '<td style="text-align:center;">loading...</td>'+
					'<td style="text-align:center;">loading...</td>'+
					// '<td style="text-align:center;">loading...</td>'+
					// '<td style="text-align:center;">loading...</td>'+
					'<td style="text-align:center;">loading...</td>'+
					'<td style="text-align:center;">loading...</td>'+
					'<td style="text-align:center;">loading...</td>'+
					'<td style="text-align:center;">Loading...'+
						/* '<button type="button" class="col btn btn-primary" onClick="" style="border-radius: 0;" data-toggle="modal" data-target="#myModal">'+
							'Cek Rincian'+
						'</button>'+ */
						// '<button class="btn btn-primary" onClick="()">lokasi</button>'+
					'</td>'+
				'</tr>'+
			'</tbody>'+
			'<tfoot id="histori_test_tablefoot">'+
			'</tfoot>'+
			'</table>'+
		'</div>'+

		// <!-- The Modal -->
		'<div class="col-md" id="modal_pengambilancashbox">'+
			/* '<div class="modal fade" id="myModal">'+
				'<div class="modal-dialog modal-xl mw-100 w-75 pl-5 pr-5">'+
					'<div class="modal-content" >'+
					
						// <!-- Modal Header -->
						'<div class="modal-header">'+
							'<h4 class="modal-title">Modal Heading</h4>'+
							'<button type="button" class="close" data-dismiss="modal">&times;</button>'+
						'</div>'+
						
						// <!-- Modal body -->
						'<div class="modal-body">'+
							'Modal body..'+
						'</div>'+
						
						// <!-- Modal footer -->
						'<div class="modal-footer">'+
							'<button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>'+
						'</div>'+
						
					'</div>'+
				'</div>'+
			'</div>'+ */
		'</div>'+
		

	'</div>'
	;
}




async function tablePageOn(){
	clean();
	/* var testing = await clean()[0];
	console.log('testing',testing); */
	// var clean = await clean();
	
	var template_table = document.getElementById('letakTabel');
	var template_table2 = document.getElementById('letakTabel2');
	template_table.innerHTML = 
		'<div class="col-sm-12 float-left pl-0 pr-0 mb-1" id="bodymain_left">'
		+'</div>'
	;

	template_table2.innerHTML = 
		'<div class="col-sm-12 float-left pl-0 pr-0 mb-1" id="bodymain_left">'
		+'</div>'
	;

	var bodymain_left = document.getElementById('bodymain_left');
	bodymain_left.innerHTML = 
	
	'<div class="" id="#">'+
		'<h5 class="col-md-3 pl-2 " style="color:#2ac0ca; ">Daftar VM Tutup Buku <span class="badge badge-secondary badge-danger">!</span></h5>'+
		'<div class="table-responsive-lg pcb-form1 p-2" id="">'+
			'<table id="t-table" class="table table-bordered" style="width:100%">'+
				'<thead id="test-tablehead" style="background-color:#2ac0ca;">'+
					'<tr>'+
						'<th scope="col"  style="vertical-align : middle;text-align:center;">No</th>'+
						'<th scope="col"  style="vertical-align : middle;text-align:center;">VM-ID</th>'+
						'<th scope="col"  style="vertical-align : middle;text-align:center;">TBK-Tanggal</th>'+
						'<th scope="col"  style="vertical-align : middle;text-align:center;">Volume Cashbox</th>'+
						'<th scope="col"  style="vertical-align : middle;text-align:center;">%</th>'+
						'<th scope="col"  style="vertical-align : middle;text-align:center;">Keterangan</th>'+
						'<th scope="col"  style="vertical-align : middle;text-align:center;">Petugas</th>'+
						'<th scope="col"  style="vertical-align : middle;text-align:center;">TBK Datetime</th>'+
						// '<th scope="col"  style="vertical-align : middle;text-align:center;">TBK Amount</th>'+
						'<th scope="col"  style="vertical-align : middle;text-align:center;">TBK Status</th>'+
						'<th scope="col"  style="vertical-align : middle;text-align:center;">Cashbox Diserahkan</th>'+
						'<th scope="col"  style="vertical-align : middle;text-align:center;">Cashbox Diterima</th>'+
						// '<th class="ml-2" scope="col" style="vertical-align : middle;text-align:center; background-color:#ffffff; color:#449cd8;">Lokasi</th>'+

					'</tr>'+
				'</thead>'+
				'<tbody id="test-tablebody">'+
					'<tr>'+
						'<td style="text-align:center;">loading...</td>'+
						'<td style="text-align:center;">loading...</td>'+
						'<td style="text-align:center;">loading...</td>'+
						'<td style="text-align:center;">loading...</td>'+
						'<td style="text-align:center;">loading...</td>'+
						'<td style="text-align:center;">loading...</td>'+
						'<td style="text-align:center;">loading...</td>'+
						// '<td style="text-align:center;">loading...</td>'+
						'<td style="text-align:center;">loading...</td>'+
						'<td style="text-align:center;">loading...</td>'+
						'<td style="text-align:center;">loading...</td>'+
						'<td style="text-align:center;">loading...</td>'+
						// '<td style="text-align:center;">lokasi</td>'+
					'</tr>'+
				'</tbody>'+
				'<tfoot id="test-tablefoot">'+
				'</tfoot>'+
			'</table>'+
		'</div>'+
	'</div>'
	;

	
	// clean()
	// console.log('clean',clean);
	// bodymain_right.innerHTML = '<div>asds</div>';
	// console.log(mapMain());
}
//  temp MainProgram
function mainProgram(){
	// mapMain();
	// tableLoad1();
	tablePageOn();

}

// MAIN PROGRAM
$(document).ready(function() {
	
	/* var testing = (async () => {
		return await loadnotLimitAPI("http://27.111.44.44/mobile/Percobaan2/mapVM1");
	})();
	
		
	  
	(async () => {
		console.log(await testing);
	})(); */
	
	mainProgram();

});



// page first load

function showharian_bulan(){
	var waktu = document.getElementById('vmwaktu');
	var show_harian = document.getElementById('show_harian');
	var show_bulan = document.getElementById('show_bulan');

	var v_waktu = waktu.options[waktu.selectedIndex].value;
	if(v_waktu === 'harian'){
		show_bulan.style.display = 'none';
		show_harian.style.display = 'block';
	}else if(v_waktu === 'bulan'){
		show_bulan.style.display = 'block';
		show_harian.style.display = 'none';
	}
}

$('#datepicker1').datepicker({
	uiLibrary: 'bootstrap4',
	format: "yyyy-mm-dd",

});



$('#datepicker2').datepicker({
	uiLibrary: 'bootstrap4',
	format: "yyyy-mm-dd"
});
