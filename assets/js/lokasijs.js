// FUNCTION
// fungsi select combobox
function showCombox(){
	var semua = "Semua";
	var selectkat = document.getElementById('kategori').value == semua;
	var selectKategori = document.getElementById('kategori').value;
	var selectlok = document.getElementById('lokasi').value;
	if(selectkat) {
		document.getElementById('comboboxLokasi').style.display = "none";
		document.getElementById('filtershowsemualokasi').style.display = "block";
		document.getElementById('filtershowlokasi').style.display = "none";
		document.getElementById('filtershowlokasiKAI').style.display = "none";
		document.getElementById('kok').style.display = "none";
	}else if(selectKategori == "E-MONEY" && selectlok == semua){
		document.getElementById('comboboxLokasi').style.display = "block";
		document.getElementById('filtershowsemualokasi').style.display = "none";
		document.getElementById('filtershowlokasi').style.display = "block";
		document.getElementById('filtershowlokasiKAI').style.display = "none";
		document.getElementById('kok').style.display = "none";
	}else if(selectKategori == "KAI"){
		if(selectKategori == "KAI" && selectlok == semua){
			document.getElementById('comboboxLokasi').style.display = "block";
			document.getElementById('filtershowsemualokasi').style.display = "none";
			document.getElementById('filtershowlokasi').style.display = "none";
			document.getElementById('filtershowlokasiKAI').style.display = "block";
			document.getElementById('kok').style.display = "none";
		}if(selectKategori == "KAI" && selectlok !== semua){
			document.getElementById('comboboxLokasi').style.display = "block";
			document.getElementById('filtershowsemualokasi').style.display = "none";
			document.getElementById('filtershowlokasi').style.display = "none";
			document.getElementById('filtershowlokasiKAI').style.display = "none";
			document.getElementById('kok').style.display = "none";
		}
		
	}
	// else if(selectKategori === 'KAI'){
	// 	document.getElementById('comboboxLokasi').style.display = "block";
	// 	document.getElementById('filtershowsemualokasi').style.display = "none";
	// 	document.getElementById('filtershowlokasi').style.display = "none";
	// 	document.getElementById('filtershowlokasiKAI').style.display = "block";
	// 	document.getElementById('kok').style.display = "none";
		
	// }
	// else if(selectKategori === 'KAI' && selectlok !== 'Semua'){
	// 	document.getElementById('comboboxLokasi').style.display = "block";
	// 	document.getElementById('filtershowsemualokasi').style.display = "none";
	// 	document.getElementById('filtershowlokasi').style.display = "none";
	// 	document.getElementById('filtershowlokasiKAI').style.display = "none";
	// 	document.getElementById('kok').style.display = "block";
	// }
}
// function combox2(){
// 		var nama_kota=document.getElementById("form1").kategori.value;
// 		if (nama_kota=="makanan")
// 		  {
// 			  document.getElementById("tampil").innerHTML="<option value='Nasi Goreng'>Nasi Goreng</option><option value='Bakso'>Bakso</option>";
// 		  }
// 		else if (nama_kota=="minuman")
// 		  {
// 			  document.getElementById("tampil").innerHTML="<option value='Teh'>Teh</option><option value='Copy'>Copy</option>";
// 		  }
// }

// fungsi sorting berdasarkan kategori
function compare( a, b) {
if ( a.kategori < b.kategori || a.nama_lokasi < b.nama_lokasi ){
	return -1;
}
if ( a.kategori > b.kategori || a.nama_lokasi > b.nama_lokasi ){
	return 1;
}
return 0;
}

// Main
let tempKategori = [];
for(a=0;a < markerLokasi.length; a++){
	tempKategori.push({kategori:markerLokasi[a].kategori});
}
console.log(tempKategori);

// fillter Duplicate data
let newArrayKategori = [];
let obj = {};
for(let b in tempKategori){
	objTitle = tempKategori[b].kategori;
	obj[objTitle] = tempKategori[b];
}
for(b in obj){
	newArrayKategori.push(obj[b]);
}
console.log('ceks', newArrayKategori);


let TempLokasi = [];
for(c=0; c < markerLokasi.length; c++){
	TempLokasi.push({nama_lokasi:markerLokasi[c].nama_lokasi});
}
console.log('lokasi',TempLokasi);

let newArrayLokasi = [];
let objLok = {};
for(let d in TempLokasi){
	objTitleLokasi = TempLokasi[d].nama_lokasi;
	objLok[objTitleLokasi] = TempLokasi[d];
}
for(d in objLok){
	newArrayLokasi.push(objLok[d]);
}
console.log('lokbaru', newArrayLokasi);
newArrayKategori = newArrayKategori.sort(compare);
newArrayLokasi = newArrayLokasi.sort(compare);

// var coba = compare(a,b, "kategori")
console.log(newArrayLokasi.sort(compare));
var kategori = $('#kategori');
var lokasi = $('#lokasi');
$(document).ready(function(){	
	// var kategori = $('#kategori');
	document.getElementById('filtershowsemualokasi').style.display = "block";
	for(rowKategori = 0; rowKategori < newArrayKategori.length; rowKategori++){
		kategori.append(
			'<option value="'+newArrayKategori[rowKategori].kategori+'">'+newArrayKategori[rowKategori].kategori+'</option>'
		);
	}
	for(rowLokasi = 0; rowLokasi < newArrayLokasi.length; rowLokasi++){
		lokasi.append(
			'<option value="'+newArrayLokasi[rowLokasi].nama_lokasi+'">'+newArrayLokasi[rowLokasi].nama_lokasi+'</option>'
		);
	}
});





var markers = markerLokasi;
function initialize() {
	console.log('dawdas',markers);
	var mapCanvas = document.getElementById('googlemapsDashboardAll');
	var mapOptions = {
		// center:new google.maps.LatLng(-7.8510156,109.042112),
		// zoom:7,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
	}     
	var map = new google.maps.Map(mapCanvas, mapOptions)

	var infowindow = new google.maps.InfoWindow(), marker, i;
	var bounds = new google.maps.LatLngBounds(); // diluar looping
	for (i = 0; i < markers.length; i++) { 
		// console.log(markers[i].kode_statusmesin);
		pos = new google.maps.LatLng(markers[i].latitude, markers[i].longtitude);
		bounds.extend(pos);
		id=false;
		for(j=0; j<markerTodays.length; j++){
			if(markers[i].kode_mesin == markerTodays[j].kode_mesin){
				id=true;
				var lbr = markerTodays[j];
			}
		}
		// console.log('lbr',lbr);
		
		if(markers[i].status_online === "normal"){
			var st_on = '<span class="ml-1 st_on color_greenM"></span>';
		}else{
			var st_on = '<span class="ml-1 st_on color_redM"></span>';
		}
		if(markers[i].check_ckd === "normal"){
			var ckd_on = '<span class="ml-1 st_on color_greencosta"></span>';
		}else{
			var ckd_on = '<span class="ml-1 st_on color_redM"></span>';
		}
		if(markers[i].device_status === "normal"){
			var device_on = '<span class="ml-1 st_on color_greenM"></span>';
		}else{
			var device_on = '<span class="ml-1 st_on color_redM"></span>';
		}
		
		// tinggal tergantung kondisi
		const batasan = 3;
		if(markers[i].lembar <= batasan){
			var lembar_on = '<span class="ml-1 st_on color_greenM"></span>';
		}else if(markers[i].lembar > batasan){
			var lembar_on = '<span class="ml-1 st_on color_redM"></span>';
		}
		
		// console.log('lbr',lbr);
		if(id){

			var cobahtml =
			'<div id="tempLabel">'+
				'<div style="background-color:#34495e" class="textLabel borderAKK">'+
					'<span class="labelNamadaerah">'+markers[i].kode_mesin+'</span>'+st_on+ckd_on+device_on+lembar_on+'<br>'+
					'<div id="lembar" class="txtdisini"><span style="color:#f2ea07;">'+lbr.lembar+'</span>/<span style="color:#f2ea07;">'+lbr.jumlah_transaksi+'</span></div>'+
				'</div>'+
				'<div class="segitigaLabel segBirutua"></div>'+
			'</div>';
		}else{
			var cobahtml =
			'<div id="tempLabel">'+
				'<div style="background-color:#34495e" class="textLabel borderAKK">'+
				'<span class="labelNamadaerah">'+markers[i].kode_mesin+'</span>'+st_on+ckd_on+device_on+lembar_on+'<br>'+
					'<span id="lembar"></span>'+
				'</div>'+
				'<div class="segitigaLabel segBirutua"></div>'+
			'</div>';
		}
		
		 // di dalam looping
		var marker = new MarkerWithLabel({
			position: pos,
			map: map,
			
			icon:{
				url:''
			},
			labelContent: cobahtml,
			labelAnchor: new google.maps.Point(61, 48),
			abelInBackground: false,
			labelVisible: true,
			// zIndex: 1,
			labelInBackground: false
			// labelStyle: {position}

		});
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				infowindow.setContent(markers[i].kode_mesin);
				infowindow.open(map, marker);
			}
		}(marker,i)));
		map.fitBounds(bounds);
	}
}
google.maps.event.addDomListener(window, 'load', initialize);


// let newwArray = [];
// let objo = {};
// for(let b in tempKategori){
// 	objTitle = tempKategori[b].kategori;
// 	objo[objTitle] = tempKategori[b];
// }
// for(b in objo){
// 	newwArray.push(objo[b]);
// }
// var a = newwArray
// console.log(newwArray);

// var filterKate = new Set(tempKategori);
// console.log(filterLokasi);
