var markerKAI = MarkersKAI;
function initallKAI() {
	var mapCanvas = document.getElementById('markersallKAI');
	var mapOptions = {
		center:new google.maps.LatLng(-7.8510156,109.042112),
		zoom:7,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}     
	var map = new google.maps.Map(mapCanvas, mapOptions)

	var infowindow = new google.maps.InfoWindow(), marker, i;
	var bounds = new google.maps.LatLngBounds(); // diluar looping
	for (i = 0; i < markerKAI.length; i++) { 
		// console.log(markerKAI[i].kode_statusmesin);
		pos = new google.maps.LatLng(markerKAI[i].latitude, markerKAI[i].longtitude);
		bounds.extend(pos);


		id=false;
		for(j=0; j<markerTodays.length; j++){
			if(markerKAI[i].kode_mesin == markerTodays[j].kode_mesin){
				id=true;
				var lbr = markerTodays[j];
			}
		}
		
		if(markerKAI[i].status_online === "normal"){
			var st_on = '<span class="ml-1 st_on color_greenM"></span>'
		}else{
			var st_on = '<span class="ml-1 st_on color_redM"></span>'
		}
		if(markerKAI[i].check_ckd === "normal"){
			var ckd_on = '<span class="ml-1 st_on color_greencosta"></span>'
		}else{
			var ckd_on = '<span class="ml-1 st_on color_redM"></span>'
		}
		if(markerKAI[i].device_status === "normal"){
			var device_on = '<span class="ml-1 st_on color_greenM"></span>'
		}else{
			var device_on = '<span class="ml-1 st_on color_redM"></span>'
		}
		
		// tinggal tergantung kondisi
		const batasan = 3;
		if(markerKAI[i].lembar <= batasan){
			var lembar_on = '<span class="ml-1 st_on color_greenM"></span>'
		}else if(markerKAI[i].lembar > batasan){
			var lembar_on = '<span class="ml-1 st_on color_redM"></span>'
		}
		// console.log('checkcug',lbr);
		// if(typeof markersToday[i] !== 'undefined'){
		// 	if(markers[i].kode_mesin === markersToday[i].kode_mesin){
		// 		var lbr = markers[i].kode_mesin.filter(function(obj){
		// 			return obj.markers[i].kode_mesin
		// 		});	
		// 	}
		// 	// else{
		// 	// 	var lbr = ' ';
		// 	// }
			
		// 	// if(markersToday[i].kode_mesin === markers[i].kode_mesin){
		// 	// 	var lbr = markersToday[i].lembar;
		// 	// }else if(markersToday[i].kode_mesin != markers[i].kode_mesin){
		// 	// 	var lbr = ' ';
		// 	// }
			
		// }else{
		// 	var lbr = ' ';
		// }
		console.log('lbr',lbr);
		if(id){

			var cobahtml =
			'<div id="tempLabel">'+
				'<div style="background-color:#34495e" class="textLabel borderAKK">'+
					'<span class="labelNamadaerah">'+markerKAI[i].kode_mesin+'</span>'+st_on+ckd_on+device_on+lembar_on+'<br>'+
					'<div id="lembar" class="txtdisini"><span style="color:#f2ea07;">'+lbr.lembar+'</span>/<span style="color:#f2ea07;">'+lbr.jumlah_transaksi+'</span></div>'+
					// if(markers[i].kode_mesin = markerTodays[i].kode_mesin){
					// 	'<span>'+ markerTodays[i].lembar+'</span>';
					// }
					// '</span> <i class="fa fa-chevron-right" id="lognext" aria-hidden="true"></i>'+
				'</div>'+
				'<div class="segitigaLabel segBirutua"></div>'+
			'</div>';
		}else{
			var cobahtml =
			'<div id="tempLabel">'+
				'<div style="background-color:#34495e" class="textLabel borderAKK">'+
				'<span class="labelNamadaerah">'+markerKAI[i].kode_mesin+'</span>'+st_on+ckd_on+device_on+lembar_on+'<br>'+
					'<span id="lembar"></span>'+
					// if(markers[i].kode_mesin = markerTodays[i].kode_mesin){
					// 	'<span>'+ markerTodays[i].lembar+'</span>';
					// }
					// '</span> <i class="fa fa-chevron-right" id="lognext" aria-hidden="true"></i>'+
				'</div>'+
				'<div class="segitigaLabel segBirutua"></div>'+
			'</div>';
		}



		// if(markerKAI[i].kode_statusmesin === '00'){
		// 	var cobahtml = 
		// 	'<div id="tempLabel">'+
		// 		'<div style="background-color:#028d5d;z-index=10;position:relative;" class="textLabel borderAKK">'+
		// 		'<span class="labelNamadaerah">'+markerKAI[i].kode_mesin+' - '+markerKAI[i].nama_lokasi+'</span> <i class="fa fa-chevron-right" id="lognext" aria-hidden="true"></i>'+
		// 		'</div>'+
		// 		'<div class="segitigaLabel segHijau"></div>'+
		// 	'</div>'
		// 	;
		// }else if(markerKAI[i].kode_statusmesin === 'FF' || markerKAI[i].kode_statusmesin === 'B7'){
		// 	var cobahtml=
		// 	'<div id="tempLabel">'+
		// 		'<div style="background-color:#811411;z-index=1;position:relative;" class="textLabel borderAKK">'+
		// 		'<span class="labelNamadaerah">'+markerKAI[i].kode_mesin+' - '+markerKAI[i].nama_lokasi+'</span> <i class="fa fa-chevron-right" id="lognext" aria-hidden="true"></i>'+
		// 		'</div>'+
		// 		'<div class="segitigaLabel segMerah"></div>'+
		// 	'</div>';
		// }
		
		// setTimeout(function(){

		// },i*500);
		
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
				infowindow.setContent(markerKAI[i].kode_mesin);
				infowindow.open(map, marker);
			}
		}(marker,i)));
		map.fitBounds(bounds); // setelah looping
	}
}
google.maps.event.addDomListener(window, 'load', initallKAI);



$(function(){
	var tempKondisivmKAI = conditionVMKAI;
	var totalE = 0;
	var totalN = 0;
	var tempjum = []
	for(x=0; x<tempKondisivmKAI.length; x++){
		if(tempKondisivmKAI[x].kode_statusmesin != 'Normal'){
				totalE += Number(tempKondisivmKAI[x].jumlah_kondisi)
		}
	}
	console.log('oi',tempKondisivmKAI[0].jumlah_kondisi);

	var seriesKondisiVMD = [];
	for(a = 0; a < tempKondisivmKAI.length; a++){
		seriesKondisiVMD.push({
			name: (tempKondisivmKAI[a].kode_statusmesin),
			y: Number(tempKondisivmKAI[a].jumlah_kondisi)
		});
	}
	console.log('cek',seriesKondisiVMD);
	$(document).ready(function(){
		Highcharts.chart('chartPieConditionKAI', {
			chart: {
				plotBackgroundColor:'#fff',
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie',
				backgroundColor:null
			},
			exporting: { 
				enabled: false 
			},
			
			mapNavigation: {
				enableMouseWheelZoom: true
			},
			rangeSelector: {
				selected: 1
			},
			credits: {
				enabled: false
			  },
			title: {
				text: ''
			},
			tooltip: {
				pointFormat: '<b>{point.percentage:.1f}%</b>'
			},
			accessibility: {
				point: {
					valueSuffix: '%'
				}
			},
			xAxis:{
				categories: ['00', 'B7', 'FF'],
				labels: {
					style: {
					  color: '#000'
					}
				  }
			},
			legend:{
				itemStyle: {
					color: '#000'
				  }
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: false
					},
					showInLegend: true,
					borderWidth: 0
				}
			},
			series: [{
				colors: ['#2ac0ca','#811411'],
				colorByPoint: true,
				data: [
					{
						name: 'Normal',
						y: Number(tempKondisivmKAI[0].jumlah_kondisi)
					},
					{
						name: 'Error',
						y: totalE
					}
				]
			}]
		});
	});
});

$(function(){
	var data_traffickai = data_trafficKAI;
	var seriesTrafficKAI = [];
	for(i = 0; i < data_traffickai.length; i++){
		seriesTrafficKAI.push(
			[new Date(data_traffickai[i].tanggal_transaksi).getTime(), Number(data_traffickai[i].total_transaksi)]
		)
	}
	console.log(seriesTrafficKAI);
	$(document).ready(function(){
		Highcharts.stockChart('pengunjungKai', {
			chart: {
				alignTicks: false
			},
	
			credits: {
				enabled: false
			  },
			  rangeSelector: {
				buttons: [{
					type: 'month',
					count: 1,
					text: '1b',
					
				},{
					type: 'all',
					text: 'All'
				}],
				selected:0,
				inputEnabled:false
			},
			exporting: { 
				enabled: false,
			},
			title: {
				text: ''
			},
	
			series: [{
				type: 'column',
				name: 'Total Trx KAI',
				data: seriesTrafficKAI,
				dataGrouping: {
					units: [[
						'week', // unit name
						[1] // allowed multiples
					], [
						'month',
						[1, 2, 3, 4, 6]
					]]
				}
			}]
		});
	});
});
