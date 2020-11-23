var markers = Markers1;
function initialize() {
	console.log('dawdas',markers);
	var mapCanvas = document.getElementById('googlemapsDashboardAll');
	var mapOptions = {
		center:new google.maps.LatLng(-7.8510156,109.042112),
		zoom:7,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
	}     
	var map = new google.maps.Map(mapCanvas, mapOptions)

	var infowindow = new google.maps.InfoWindow({
		// content:'',
		maxWidth:900,
	}), marker, i;

	var bounds = new google.maps.LatLngBounds(); // diluar looping
	for (i = 0; i < markers.length; i++) { 
		// console.log(markers[i].kode_statusmesin);
		pos = new google.maps.LatLng(markers[i].latitude, markers[i].longtitude);
		bounds.extend(pos);
		id=false;
		// for(j=0; j<markerTodays.length; j++){
		// 	if(markers[i].kode_mesin == markerTodays[j].kode_mesin){
		// 		id=true;
		// 		var lbr = markerTodays[j];
		// 	}
		// }
		
		// if(markers[i].status_online === "normal"){
		// 	var st_on = '<span class="ml-1 st_on color_greenM"></span>';
		// }else{
		// 	var st_on = '<span class="ml-1 st_on color_redM"></span>';
		// }
		// if(markers[i].check_ckd === "normal"){
		// 	var ckd_on = '<span class="ml-1 st_on color_greencosta"></span>';
		// }else{
		// 	var ckd_on = '<span class="ml-1 st_on color_redM"></span>';
		// }
		// if(markers[i].device_status === "normal"){
		// 	var device_on = '<span class="ml-1 st_on color_greenM"></span>';
		// }else{
		// 	var device_on = '<span class="ml-1 st_on color_redM"></span>';
		// }
		
		// // tinggal tergantung kondisi
		// const batasan = 3;
		// if(markers[i].lembar <= batasan){
		// 	var lembar_on = '<span class="ml-1 st_on color_greenM"></span>';
		// }else if(markers[i].lembar > batasan){
		// 	var lembar_on = '<span class="ml-1 st_on color_redM"></span>';
		// }
		
		// if(id){

		// 	var cobahtml =
		// 	'<div id="tempLabel">'+
		// 		'<div style="background-color:#34495e" class="textLabel borderAKK">'+
		// 			'<span class="labelNamadaerah">'+markers[i].kode_mesin+'</span>'+st_on+ckd_on+device_on+lembar_on+'<br>'+
		// 			'<div id="lembar" class="txtdisini"><span style="color:#f2ea07;">'+lbr.lembar+'</span>/<span style="color:#f2ea07;">'+lbr.jumlah_transaksi+'</span></div>'+
		// 			// if(markers[i].kode_mesin = markerTodays[i].kode_mesin){
		// 			// 	'<span>'+ markerTodays[i].lembar+'</span>';
		// 			// }
		// 			// '</span> <i class="fa fa-chevron-right" id="lognext" aria-hidden="true"></i>'+
		// 		'</div>'+
		// 		'<div class="segitigaLabel segBirutua"></div>'+
		// 	'</div>';
		// }else{
		// 	var cobahtml =
		// 	'<div id="tempLabel">'+
		// 		'<div style="background-color:#34495e" class="textLabel borderAKK">'+
		// 		'<span class="labelNamadaerah">'+markers[i].kode_mesin+'</span>'+st_on+ckd_on+device_on+lembar_on+'<br>'+
		// 			'<span id="lembar"></span>'+
		// 			// if(markers[i].kode_mesin = markerTodays[i].kode_mesin){
		// 			// 	'<span>'+ markerTodays[i].lembar+'</span>';
		// 			// }
		// 			// '</span> <i class="fa fa-chevron-right" id="lognext" aria-hidden="true"></i>'+
		// 		'</div>'+
		// 		'<div class="segitigaLabel segBirutua"></div>'+
		// 	'</div>';
		// }
		
		
		 // di dalam looping
		var marker = new MarkerWithLabel({
			position: pos,
			map: map,
			

			// icon:{
			// 	url:''
			// },
			// labelContent: cobahtml,


			// labelAnchor: new google.maps.Point(61, 48),
			abelInBackground: false,
			labelVisible: true,
			// zIndex: 1,
			labelInBackground: false
			// labelStyle: {position}

		});
		
		
		google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
			for(j=0; j<markerTodays.length; j++){
				if(markers[i].kode_mesin == markerTodays[j].kode_mesin){
					id=true;
					var lbr = markerTodays[j];
				}
			}
			if(markers[i].status_online === "normal"){
				// var st_on = '<span class="ml-1 st_on color_greenM"></span>';
				var st_on = '<span class="ml-1 st_on color_greenM color_whiteM"> Normal </span>';
			}else{
				var st_on = '<span class="ml-1 st_on color_redM color_whiteM"> Error </span>';
			}
			if(markers[i].check_ckd === "normal"){
				var ckd_on = '<span class="ml-1 st_on color_greencosta color_whiteM"> Normal </span>';
			}else{
				var ckd_on = '<span class="ml-1 st_on color_redM color_whiteM"> Error </span>';
			}
			if(markers[i].device_status === "normal"){
				var device_on = '<span class="ml-1 st_on color_greenM color_whiteM"> Normal </span>';
			}else{
				var device_on = '<span class="ml-1 st_on color_redM color_whiteM"> Error </span>';
			}
			
			// tinggal tergantung kondisi
			const batasan = 500;
			if(markers[i].lembar <= batasan){
				var lembar_on = '<span class="ml-1 st_on color_greenM color_whiteM">'+markers[i].lembar+'</span>';
			}else if(markers[i].lembar > batasan){
				var lembar_on = '<span class="ml-1 st_on color_redM color_whiteM">'+markers[i].lembar+'</span>';
			}
			if(id){
				


			
				var infowindowCustom = 
			"<div class='content-wrapper'>"+
					"<div class='col p-0' id='wrapperLok-background'>"+
						"<span id='nameLocation'>"+markers[i].nama_lokasi+" - </span><span class='fontSize12'>"+markers[i].kode_mesin+"</span>"+
					"</div>"+
					"<div class='col p-0'>"+
						"<span>Trx :"+lbr.lembar+"</span>"+
					"</div>"+
					"<div class='col p-0'>"+
						"<span>Amount :"+lbr.jumlah_transaksi+"</span>"+
					"</div>"+

					"<div class='col p-0' id='wrapperchild'>"+
						"<div class='font12' id='lh'>"+
							"<span>Status Mesin</span>"+
						"</div>"+
						"<div id='lh'>"+
							"<span>Online : </span>"+st_on+
						"</div>"+
						"<div id='lh'>"+
							"<span>Ckd : </span>"+ckd_on+
						"</div>"+
						"<div id='lh'>"+
							"<span>Device : </span>"+device_on+
						"</div>"+
						"<div id='lh-l'>"+
							"<span>Lembar : </span>"+lembar_on+
						"</div>"+
					"</div>"+
			"</div>"
			;
			}else{
				var infowindowCustom = 
			"<div class='content-wrapper'>"+
					"<div class='col p-0' id='wrapperLok-background'>"+
						"<span id='nameLocation'>"+markers[i].nama_lokasi+" - </span><span>"+markers[i].kode_mesin+"</span>"+
					"</div>"+
					"<div class='col p-0'>"+
						"<span>Trx : 0</span>"+
					"</div>"+
					"<div class='col p-0'>"+
						"<span>Amount : 0</span>"+
					"</div>"+

					

					"<div class='col p-0' id='wrapperchild'>"+
						"<div class='font12' id='lh'>"+
							"<span>Status Mesin</span>"+
						"</div>"+

						// "<div>"+
							"<table id='tabinmarker'>"+
								"<tr>"+
									"<td>Online</td>"+
									"<td> : </td>"+
									"<td>" + st_on + "</td>"+
								"</tr>"+
								"<tr>"+
									"<td>Ckd</td>"+
									"<td> : </td>"+
									"<td>" + ckd_on + "</td>"+
								"</tr>"+
								"<tr>"+
									"<td>Device</td>"+
									"<td> : </td>"+
									"<td>" + device_on + "</td>"+
								"</tr>"+
								"<tr>"+
									"<td>Lembar</td>"+
									"<td> : </td>"+
									"<td>" + lembar_on + "</td>"+
								"</tr>"+
							"</table>"+
						// "</div>"+

						// "<div id='lh'>"+
						// 	"<span>Online : </span>"+st_on+
						// "</div>"+
						// "<div id='lh'>"+
						// 	"<span>Ckd : </span>"+ckd_on+
						// "</div>"+
						// "<div id='lh'>"+
						// 	"<span>Device : </span>"+device_on+
						// "</div>"+
						// "<div id='lh-l'>"+
						// 	"<span>Lembar : </span>"+lembar_on+
						// "</div>"+
					"</div>"+
			"</div>"
			;
			}
			
			return function(){

				
				
				
				infowindow.setContent(infowindowCustom);
				infowindow.open(map, marker);
			}
		}(marker,i)));
		google.maps.event.addListener(map, 'mouseout', (function() {
				infowindow.close();
		}));


		map.fitBounds(bounds);
	}
}
google.maps.event.addDomListener(window, 'load', initialize);















// var markers = Markers1;
// function initialize() {
// 	console.log('dawdas',markers);
// 	var mapCanvas = document.getElementById('googlemapsDashboardAll');
// 	var mapOptions = {
// 		center:new google.maps.LatLng(-7.8510156,109.042112),
// 		zoom:7,
// 		mapTypeId: google.maps.MapTypeId.ROADMAP,
// 	}     
// 	var map = new google.maps.Map(mapCanvas, mapOptions)

// 	var infowindow = new google.maps.InfoWindow(), marker, i;
// 	var bounds = new google.maps.LatLngBounds(); // diluar looping
// 	for (i = 0; i < markers.length; i++) { 
// 		// console.log(markers[i].kode_statusmesin);
// 		pos = new google.maps.LatLng(markers[i].latitude, markers[i].longtitude);
// 		bounds.extend(pos);
// 		id=false;
// 		for(j=0; j<markerTodays.length; j++){
// 			if(markers[i].kode_mesin == markerTodays[j].kode_mesin){
// 				id=true;
// 				var lbr = markerTodays[j];
// 			}
// 		}
		
// 		if(markers[i].status_online === "normal"){
// 			var st_on = '<span class="ml-1 st_on color_greenM"></span>';
// 		}else{
// 			var st_on = '<span class="ml-1 st_on color_redM"></span>';
// 		}
// 		if(markers[i].check_ckd === "normal"){
// 			var ckd_on = '<span class="ml-1 st_on color_greencosta"></span>';
// 		}else{
// 			var ckd_on = '<span class="ml-1 st_on color_redM"></span>';
// 		}
// 		if(markers[i].device_status === "normal"){
// 			var device_on = '<span class="ml-1 st_on color_greenM"></span>';
// 		}else{
// 			var device_on = '<span class="ml-1 st_on color_redM"></span>';
// 		}
		
// 		// tinggal tergantung kondisi
// 		const batasan = 3;
// 		if(markers[i].lembar <= batasan){
// 			var lembar_on = '<span class="ml-1 st_on color_greenM"></span>';
// 		}else if(markers[i].lembar > batasan){
// 			var lembar_on = '<span class="ml-1 st_on color_redM"></span>';
// 		}
// 		// console.log('checkcug',lbr);
// 		// if(typeof markersToday[i] !== 'undefined'){
// 		// 	if(markers[i].kode_mesin === markersToday[i].kode_mesin){
// 		// 		var lbr = markers[i].kode_mesin.filter(function(obj){
// 		// 			return obj.markers[i].kode_mesin
// 		// 		});	
// 		// 	}
// 		// 	// else{
// 		// 	// 	var lbr = ' ';
// 		// 	// }
			
// 		// 	// if(markersToday[i].kode_mesin === markers[i].kode_mesin){
// 		// 	// 	var lbr = markersToday[i].lembar;
// 		// 	// }else if(markersToday[i].kode_mesin != markers[i].kode_mesin){
// 		// 	// 	var lbr = ' ';
// 		// 	// }
			
// 		// }else{
// 		// 	var lbr = ' ';
// 		// }
// 		// console.log('lbr',lbr);
// 		if(id){

// 			var cobahtml =
// 			'<div id="tempLabel">'+
// 				'<div style="background-color:#34495e" class="textLabel borderAKK">'+
// 					'<span class="labelNamadaerah">'+markers[i].kode_mesin+'</span>'+st_on+ckd_on+device_on+lembar_on+'<br>'+
// 					'<div id="lembar" class="txtdisini"><span style="color:#f2ea07;">'+lbr.lembar+'</span>/<span style="color:#f2ea07;">'+lbr.jumlah_transaksi+'</span></div>'+
// 					// if(markers[i].kode_mesin = markerTodays[i].kode_mesin){
// 					// 	'<span>'+ markerTodays[i].lembar+'</span>';
// 					// }
// 					// '</span> <i class="fa fa-chevron-right" id="lognext" aria-hidden="true"></i>'+
// 				'</div>'+
// 				'<div class="segitigaLabel segBirutua"></div>'+
// 			'</div>';
// 		}else{
// 			var cobahtml =
// 			'<div id="tempLabel">'+
// 				'<div style="background-color:#34495e" class="textLabel borderAKK">'+
// 				'<span class="labelNamadaerah">'+markers[i].kode_mesin+'</span>'+st_on+ckd_on+device_on+lembar_on+'<br>'+
// 					'<span id="lembar"></span>'+
// 					// if(markers[i].kode_mesin = markerTodays[i].kode_mesin){
// 					// 	'<span>'+ markerTodays[i].lembar+'</span>';
// 					// }
// 					// '</span> <i class="fa fa-chevron-right" id="lognext" aria-hidden="true"></i>'+
// 				'</div>'+
// 				'<div class="segitigaLabel segBirutua"></div>'+
// 			'</div>';
// 		}
		
// 		// var cek = document.getElementById("lembar");
// 		// cek.innerHTML = markers[i].kode_mesin;

		
// 		// if(markers[i].kode_statusmesin === '00'){
// 		// 	var cobahtml = 
// 		// 	'<div id="tempLabel">'+
// 		// 		'<div style="background-color:#028d5d;z-index=10;position:relative;" class="textLabel borderAKK">'+
// 		// 			'<span class="labelNamadaerah">'+markers[i].kode_mesin+' - '+markers[i].nama_lokasi+'</span> <i class="fa fa-chevron-right" id="lognext" aria-hidden="true"></i>'+
// 		// 		'</div>'+
// 		// 		'<div class="segitigaLabel segHijau"></div>'+
// 		// 	'</div>'
// 		// 	;
// 		// }else if(markers[i].kode_statusmesin === 'FF' || markers[i].kode_statusmesin === 'B7'){
// 		// 	var cobahtml=
// 		// 	'<div id="tempLabel">'+
// 		// 		'<div style="background-color:#811411;z-index=1;position:relative;" class="textLabel borderAKK">'+
// 		// 		'<span class="labelNamadaerah">'+markers[i].kode_mesin+' - '+markers[i].nama_lokasi+'</span><i class="fa fa-chevron-right" id="lognext" aria-hidden="true"></i>'+
// 		// 		'</div>'+
// 		// 		'<div class="segitigaLabel segMerah"></div>'+
// 		// 	'</div>';
// 		// }
		
// 		// setTimeout(function(){

// 		// },i*500);
		
// 		 // di dalam looping
// 		var marker = new MarkerWithLabel({
// 			position: pos,
// 			map: map,
			

// 			// icon:{
// 			// 	url:''
// 			// },
// 			// labelContent: cobahtml,


// 			// labelAnchor: new google.maps.Point(61, 48),
// 			abelInBackground: false,
// 			labelVisible: true,
// 			// zIndex: 1,
// 			labelInBackground: false
// 			// labelStyle: {position}

// 		});
// 		// google.maps.event.addListener(marker, 'click', (function(marker, i) {
// 		// 	return function() {
// 		// 		infowindow.setContent(markers[i].kode_mesin);
// 		// 		infowindow.open(map, marker);
// 		// 	}
// 		// }(marker,i)));
		
// 		// google.maps.event.addListener(marker, 'click', (function(marker, i) {
// 		// 	return function(){
// 		// 		infowindow.setContent(markers[i].kode_mesin);
// 		// 		infowindow.open(map, marker);
// 		// 	}
// 		// }
// 		// ));
		
// 		google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
// 			return function(){
// 				infowindow.setContent(markers[i].kode_mesin);
// 				infowindow.open(map, marker);
// 			}
// 		}(marker,i)));
// 		google.maps.event.addListener(map, 'mouseout', (function() {
// 				infowindow.close();
// 		}));

// 		// google.maps.event.addListener(marker, 'mouseover', function() {        
// 		// 	infowindow.close();
// 		// 	});
// 		// google.maps.event.addListener(marker, 'mouseout', function() {        
// 		// 	infowindow.setContent(markers[i].kode_mesin);
// 		// 	infowindow.close();
// 		// });

// 		map.fitBounds(bounds);
// 	}
// }
// google.maps.event.addDomListener(window, 'load', initialize);
function button1marker(late,lang){
	// googlemapsDashboardAll
	var markers2 = Markers1;
	console.log(markers2);
	document.body.scrollTop = 0;
	document.documentElement.scrollTop = 0;
	var allmarker = document.getElementById('googlemapsDashboardAll');
	var onemarker = document.getElementById('googlemapsEvClick');
	allmarker.style.display = "none";
	onemarker.style.display = "block";
	
	
	initMap(late,lang);
}


function initMap(langi,longi) {
	var latlng = new google.maps.LatLng(langi,longi);

    var options = {  
        zoom: 16,  
        center: latlng,  
        mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
	var map = new google.maps.Map(document.getElementById('googlemapsEvClick'), options);

	marker1 = new google.maps.Marker({  
		position: new google.maps.LatLng(langi,longi),
		map: map
	});
	console.log('cobain aja',langi,longi);
	
  }


// function oneMarker(lang,long) {
// 	// console.log('dawdas',markers);
// 	var mapCanvas = document.getElementById('googlemapsEvClick');
// 	var mapOptions = {
// 		center:new google.maps.LatLng(lang,long),
// 		zoom:7,
// 		mapTypeId: google.maps.MapTypeId.ROADMAP,
// 	}     
// 	var map = new google.maps.Map(mapCanvas, mapOptions)

// 	var infowindow = new google.maps.InfoWindow({
// 		// content:'',
// 		maxWidth:900,
// 	}), marker, i;

// 	var bounds = new google.maps.LatLngBounds(); // diluar looping
// 	for (i = 0; i < markers.length; i++) { 
// 		// console.log(markers[i].kode_statusmesin);
// 		pos = new google.maps.LatLng(markers[i].latitude, markers[i].longtitude);
// 		bounds.extend(pos);
// 		id=false;
		
// 		 // di dalam looping
// 		var marker = new MarkerWithLabel({
// 			position: pos,
// 			map: map,
			

// 			// icon:{
// 			// 	url:''
// 			// },
// 			// labelContent: cobahtml,


// 			// labelAnchor: new google.maps.Point(61, 48),
// 			abelInBackground: false,
// 			labelVisible: true,
// 			// zIndex: 1,
// 			labelInBackground: false
// 			// labelStyle: {position}

// 		});
		
		
// 		google.maps.event.addListener(marker, 'click', (function(marker, i) {
// 			for(j=0; j<markerTodays.length; j++){
// 				if(markers[i].kode_mesin == markerTodays[j].kode_mesin){
// 					id=true;
// 					var lbr = markerTodays[j];
// 				}
// 			}
// 			if(markers[i].status_online === "normal"){
// 				var st_on = '<span class="ml-1 st_on color_greenM"></span>';
// 			}else{
// 				var st_on = '<span class="ml-1 st_on color_redM"></span>';
// 			}
// 			if(markers[i].check_ckd === "normal"){
// 				var ckd_on = '<span class="ml-1 st_on color_greencosta"></span>';
// 			}else{
// 				var ckd_on = '<span class="ml-1 st_on color_redM"></span>';
// 			}
// 			if(markers[i].device_status === "normal"){
// 				var device_on = '<span class="ml-1 st_on color_greenM"></span>';
// 			}else{
// 				var device_on = '<span class="ml-1 st_on color_redM"></span>';
// 			}
			
// 			// tinggal tergantung kondisi
// 			const batasan = 3;
// 			if(markers[i].lembar <= batasan){
// 				var lembar_on = '<span class="ml-1 st_on color_greenM"></span>';
// 			}else if(markers[i].lembar > batasan){
// 				var lembar_on = '<span class="ml-1 st_on color_redM"></span>';
// 			}
// 			if(id){
				


			
// 				var infowindowCustom = 
// 			"<div class='content-wrapper'>"+
// 					"<div class='col p-0' id='wrapperLok-background'>"+
// 						"<span id='nameLocation'>"+markers[i].nama_lokasi+" - </span><span class='fontSize12'>"+markers[i].kode_mesin+"</span>"+
// 					"</div>"+
// 					"<div class='col p-0'>"+
// 						"<span>Trx :"+lbr.lembar+"</span>"+
// 					"</div>"+
// 					"<div class='col p-0'>"+
// 						"<span>Amount :"+lbr.jumlah_transaksi+"</span>"+
// 					"</div>"+

// 					"<div class='col p-0' id='wrapperchild'>"+
// 						"<div class='font12' id='lh'>"+
// 							"<span>Status Mesin</span>"+
// 						"</div>"+
// 						"<div id='lh'>"+
// 							"<span>Online : </span>"+st_on+
// 						"</div>"+
// 						"<div id='lh'>"+
// 							"<span>Ckd : </span>"+ckd_on+
// 						"</div>"+
// 						"<div id='lh'>"+
// 							"<span>Device : </span>"+device_on+
// 						"</div>"+
// 						"<div id='lh-l'>"+
// 							"<span>Lembar : </span>"+lembar_on+
// 						"</div>"+
// 					"</div>"+
// 			"</div>"
// 			;
// 			}else{
// 				var infowindowCustom = 
// 			"<div class='content-wrapper'>"+
// 					"<div class='col p-0' id='wrapperLok-background'>"+
// 						"<span id='nameLocation'>"+markers[i].nama_lokasi+" - </span><span>"+markers[i].kode_mesin+"</span>"+
// 					"</div>"+
// 					"<div class='col p-0'>"+
// 						"<span>Trx : 0</span>"+
// 					"</div>"+
// 					"<div class='col p-0'>"+
// 						"<span>Amount : 0</span>"+
// 					"</div>"+

					

// 					"<div class='col p-0' id='wrapperchild'>"+
// 						"<div class='font12' id='lh'>"+
// 							"<span>Status Mesin</span>"+
// 						"</div>"+

// 						// "<div>"+
// 							"<table id='tabinmarker'>"+
// 								"<tr >"+
// 									"<td>Online</td>"+
// 									"<td> : </td>"+
// 									"<td>"+st_on+"</td>"+
// 								"</tr>"+
// 								"<tr >"+
// 									"<td>Ckd</td>"+
// 									"<td> : </td>"+
// 									"<td>"+ckd_on+"</td>"+
// 								"</tr>"+
// 								"<tr >"+
// 									"<td>Device</td>"+
// 									"<td> : </td>"+
// 									"<td>"+device_on+"</td>"+
// 								"</tr>"+
// 								"<tr >"+
// 									"<td>Lembar</td>"+
// 									"<td> : </td>"+
// 									"<td>"+lembar_on+"</td>"+
// 								"</tr>"+
// 							"</table>"+
// 					"</div>"+
// 			"</div>"
// 			;
// 			}
			
// 			return function(){
// 				infowindow.setContent(infowindowCustom);
// 				infowindow.open(map, marker);
// 			}
// 		}(marker,i)));


// 		map.fitBounds(bounds);
// 	}
// }
// google.maps.event.addDomListener(window, 'load', oneMarker);
