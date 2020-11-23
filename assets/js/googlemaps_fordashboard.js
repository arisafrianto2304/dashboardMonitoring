// markersAll
// vmKai, vmKai_dvc, vmKai_lbr
// vmEmoney, vmEmoney_dvc, vmEmoney_lbr

function sendMyAjax(URL_address){
	$.ajax({
		 type: 'POST',
		 url: URL_address,
		 success: function (result) {
		 }
	 });
};

var coba = [];
var temp_emoney = [];
for(hmm1 in markersAll){
	for(hmm2 in vmEmoney){
		for(hmm3 in vmEmoney_dvc){
			if(markersAll[hmm1]['terminal_id'] === vmEmoney_dvc[hmm3]['terminal_id'] && markersAll[hmm1]['terminal_id'] === vmEmoney[hmm2]['terminal_id']){
				if(vmEmoney[hmm2]['name_group'] === 'BB' && vmEmoney[hmm2]['device_cd'] === '0' && vmEmoney_dvc[hmm3]['status_cd1'] === 'FF'){
					temp_emoney.push({
						terminal_id : (markersAll[hmm1]['terminal_id']),
						online_status : (vmEmoney[hmm2]['online_status']),
						terminal_name : (vmEmoney[hmm2]['terminal_name']),
						latitude : (markersAll[hmm1]['latitude']),
						longtitude : (markersAll[hmm1]['longtitude']),
	
						status_printer : (vmEmoney_dvc[hmm3]['status_printer']),
						status_ba : (vmEmoney_dvc[hmm3]['status_ba']),
						
						status_cd1: '00',
	
						status_ups: '00',
						status_reader : (vmEmoney_dvc[hmm3]['status_reader']),
	
						device_cd : (vmEmoney[hmm2]['device_cd']),
					})
				}else{
					temp_emoney.push({
						terminal_id : (markersAll[hmm1]['terminal_id']),
						online_status : (vmEmoney[hmm2]['online_status']),
						terminal_name : (vmEmoney[hmm2]['terminal_name']),
						latitude : (markersAll[hmm1]['latitude']),
						longtitude : (markersAll[hmm1]['longtitude']),
	
						status_printer : (vmEmoney_dvc[hmm3]['status_printer']),
						status_ba : (vmEmoney_dvc[hmm3]['status_ba']),
						
						status_cd1: '00',
	
						status_ups: '00',
						status_reader : (vmEmoney_dvc[hmm3]['status_reader']),
	
						device_cd : (vmEmoney[hmm2]['device_cd']),
					})
				}
			}
		}
	}
	for(allk1=0; allk1<vmKai.length; allk1++){
		for(allk2=0; allk2<vmKai_dvc.length; allk2++){
			// for(allk3=0; allk3<vmKai_lbr.length; allk3++){
				if(markersAll[hmm1]['terminal_id'] === vmKai[allk1]['terminal_id'] && markersAll[hmm1]['terminal_id'] === vmKai_dvc[allk2]['vmid']){
					temp_emoney.push({
						terminal_id : (markersAll[hmm1]['terminal_id']),
						terminal_name : (vmKai[allk1]['terminal_name']),
						online_status : (vmKai[allk1]['online_status']),
						latitude : (markersAll[hmm1]['latitude']),
						longtitude : (markersAll[hmm1]['longtitude']),
						
						status_printer : (vmKai_dvc[allk2]['stPrinter']),
						status_ba : (vmKai_dvc[allk2]['stBA']),

						status_cd1 : '00',

						status_ups: (vmKai_dvc[allk2]['stUPS']),
						status_reader : '00',
						
						device_cd : (vmKai[allk1]['device_cd']),
					})
				// }
			}
		}
	}
}
console.log('cobacoba',coba);

// emoney

// var temp_kai = [];
// var temp_kai = [];
// for(all0=0; all0<markersAll.length; all0++){
// 	for(alle1=0; alle1<vmEmoney.length; alle1++){
// 		for(alle2=0; alle2<vmEmoney_dvc.length; alle2++){
// 			// for(alle3=0; alle3<vmEmoney_lbr.length; alle3++){
// 				if(markersAll[all0]['terminal_id'] === vmEmoney_dvc[alle2]['terminal_id'] && markersAll[all0]['terminal_id'] === vmEmoney[alle1]['terminal_id']){
// 					temp_emoney.push({
// 						terminal_id : (markersAll[all0]['terminal_id']),
// 						// terminal_name : (markersAll[all0]['terminal_name']),
// 						online_status : (vmEmoney[alle1]['online_status']),
// 						terminal_name : (vmEmoney[alle1]['terminal_name']),
// 						latitude : (markersAll[all0]['latitude']),
// 						longtitude : (markersAll[all0]['longtitude']),

// 						status_printer : (vmEmoney_dvc[alle2]['status_printer']),
// 						status_ba : (vmEmoney_dvc[alle2]['status_ba']),


// 						// status_ba : (vmEmoney_dvc[alle2]['status_ba']),
// 						status_cd1 : (vmEmoney_dvc[alle2]['status_cd1']),
// 						status_printer : (vmEmoney_dvc[alle2]['status_printer']),
// 						status_reader : (vmEmoney_dvc[alle2]['status_reader']),
						
// 						device_cd : (vmEmoney[alle1]['device_cd']),
// 						// lbrcashbox : (vmEmoney_lbr[alle3]['lbrcashbox']),
// 					})
// 				}
// 				else if(markersAll[all0]['terminal_id'] === vmEmoney_dvc[alle2]['terminal_id'] && markersAll[all0]['terminal_id'] === vmEmoney[alle1]['terminal_id'] && vmEmoney[alle1]['device_cd']){

// 				}
// 			// }
// 		}
// 	}
// 	for(allk1=0; allk1<vmKai.length; allk1++){
// 		for(allk2=0; allk2<vmKai_dvc.length; allk2++){
// 			// for(allk3=0; allk3<vmKai_lbr.length; allk3++){
// 				if(markersAll[all0]['terminal_id'] === vmKai[allk1]['terminal_id'] && markersAll[all0]['terminal_id'] === vmKai_dvc[allk2]['vmid']){
// 					temp_emoney.push({
// 						terminal_id : (markersAll[all0]['terminal_id']),
// 						terminal_name : (vmKai[allk1]['terminal_name']),
// 						online_status : (vmKai[allk1]['online_status']),
// 						latitude : (markersAll[all0]['latitude']),
// 						longtitude : (markersAll[all0]['longtitude']),
						
// 						status_ba : (vmKai_dvc[allk2]['stBA']),
// 						status_printer : (vmKai_dvc[allk2]['stPrinter']),


// 						// status_ba : (vmKai_dvc[allk2]['stBA']),
// 						// status_cd1 : (vmEmoney_dvc[alle2]['status_cd1']),
// 						status_printer : (vmKai_dvc[allk2]['stPrinter']),
// 						status_reader : 00,
// 						status_cd1 : (vmKai_dvc[allk2]['stUPS']),
						
// 						device_cd : (vmKai[allk1]['device_cd']),
// 						// lbrcashbox : (vmKai_lbr[allk3]['lbrcashbox']),
// 					})
// 				// }
// 			}
// 		}
// 	}
// }
console.log('emoney',temp_emoney);
// console.log('kai',temp_kai);

// var temp_all = temp_all.push(
// 	temp_emoney,
// 	temp_kai
// );
console.log('tempall', temp_emoney);
// vmKai
var temp_emoneylisttc = [];
for(tc1 = 0; tc1<vmEmoney_topup.length; tc1++){
	for(tc2 = 0; tc2<vmEmoney_card.length; tc2++){
		if(vmEmoney_topup[tc1]['terminal_id'] === vmEmoney_card[tc2]['terminal_id']){
			temp_emoneylisttc.push({
				terminal_id : vmEmoney_topup[tc1]['terminal_id'],
				trx : (Number(vmEmoney_topup[tc1]['trx'])) + (Number(vmEmoney_card[tc2]['trx']))
			})
		}
	}
}
// temp_emoneylisttc.push(vmKai_topup);
console.log('temp_emoneylisttc',temp_emoneylisttc);
var temp_listtc = []
for(tcc1=0; tcc1<vmKai_topup.length; tcc1++){
	temp_listtc.push({
		terminal_id : vmKai_topup[tcc1]['terminal_id'],
		trx : vmKai_topup[tcc1]['trx']
	})
}
for(tcc2=0; tcc2<temp_emoneylisttc.length; tcc2++){
	temp_listtc.push({
		terminal_id : temp_emoneylisttc[tcc2]['terminal_id'],
		trx : temp_emoneylisttc[tcc2]['trx']
	})
}
console.log('all tc', temp_listtc);


// vmEmoney
// var vending_machine = [];
// for(i=0; i< vmKai.length; i++){
// 	vending_machine.push(
// 		vmKai[i]
// 	);
// }
// for(i=0; i< vmEmoney.length; i++){
// 	vending_machine.push(
// 		vmEmoney[i]
// 	);
// }
// console.log(vending_machine);

const markers = temp_emoney;
// console.log('markers',markers);
function initialize() {
	var mapCanvas = document.getElementById('googlemapsDashboardAll');
	var mapOptions = {
		center:new google.maps.LatLng(-6.147393, 106.702603),
		zoom:7,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
	}
	var map = new google.maps.Map(mapCanvas, mapOptions)
	
	var infowindow = new google.maps.InfoWindow({
		// content:'',
		maxWidth:900,
	}), marker, i;

	var bounds = new google.maps.LatLngBounds(); // diluar looping
	for (i = 0; i<markers.length; i++) {
		if(markers[i]['online_status'] === "1"){
			// var st_on = '<span class="ml-1 st_on color_greenM"></span>';
			var st_on = '<span class="ml-1 st_on color_greenM color_whiteM"> Normal </span>';
		}else{
			var st_on = '<span class="ml-1 st_on color_redM color_whiteM"> Error </span>';
		}

		
		if(markers[i].status_ba === '00' && markers[i].status_printer === '00' && markers[i].status_cd1 === '00' && markers[i].status_reader === '00'){
			var device_on = '<span class="ml-1 st_on color_greenM color_whiteM"> Normal </span>';
		}else{
			var device_on = '<span class="ml-1 st_on color_redM color_whiteM"> Error </span>';
		}

		var lembar_on;
		for(m=0; m<vmKai_lbr.length; m++){
			if(markers[i].terminal_id === vmKai_lbr[m].vmid){
				if(Number(vmKai_lbr[m]['lbrcashbox']) <= 500){
					lembar_on = '<span class="ml-1 st_on color_greenM color_whiteM">'+vmKai_lbr[m]['lbrcashbox']+'</span>';
				}else if(Number(vmKai_lbr[m]['lbrcashbox']) > 500){
					lembar_on = '<span class="ml-1 st_on color_redM color_whiteM">'+vmKai_lbr[m]['lbrcashbox']+'</span>';
				}
				else if(typeof vmKai_lbr[m]['lbrcashbox'] === undefined){
					lembar_on = '<span>asd</span>';
				}
			}
		}
		for(k=0; k<vmEmoney_lbr.length; k++){
			if(markers[i].terminal_id == vmEmoney_lbr[k].terminal_id){
				let batasan = 500;
				if(Number(vmEmoney_lbr[k]['lbrcashbox']) <= batasan){
					lembar_on = '<span class="ml-1 st_on color_greenM color_whiteM">'+vmEmoney_lbr[k]['lbrcashbox']+'</span>';
				}else if((Number(vmEmoney_lbr[k]['lbrcashbox']) > batasan)){
					lembar_on = '<span class="ml-1 st_on color_redM color_whiteM">'+vmEmoney_lbr[k]['lbrcashbox']+'</span>';
				}else if(typeof vmEmoney_lbr[k]['lbrcashbox'] === undefined){
					lembar_on = '<span>asd</span>';
				}
			}
		}
		
		for(list=0; list<temp_listtc.length; list++){
			var trx;
			if(markers[i]['terminal_id'] === temp_listtc[list]['terminal_id']){
				trx = temp_listtc[list]['trx'];
			}
		}
		// for(j=0; j<vending_machine.length; j++){
			// console.log('vending_machine[j].terminal_id',vending_machine[j].terminal_id)
			/* if(markers[i].terminal_id === vending_machine[j].terminal_id){
				var data_vmAPI = vending_machine[j];
				// console.log('data_vmAPI',data_vmAPI.terminal);
			} */
			/* var lembar_on;
			for(k=0; k<vmEmoney_lbr.length; k++){
				// tinggal tergantung kondisi
				
				if(markers[i].terminal_id === vmEmoney_lbr[k].terminal_id){
					let batasan = 500;
					if(Number(vmEmoney_lbr[k].lbrcashbox) <= batasan){
						lembar_on = '<span class="ml-1 st_on color_greenM color_whiteM">'+vmEmoney_lbr[k].lbrcashbox+'</span>';
					}else if((Number(vmEmoney_lbr[k].lbrcashbox) > batasan)){
						lembar_on = '<span class="ml-1 st_on color_redM color_whiteM">'+vmEmoney_lbr[k].lbrcashbox+'</span>';
					}else if(vmEmoney_lbr[k].lbrcashbox === undefined || vmEmoney_lbr[k].lbrcashbox == null){
						lembar_on = '<span>asd</span>';
					}
					/* else if(vmEmoney_lbr[k].lbrcashbox == null || vmEmoney_lbr[k].lbrcashbox === typeof undefined){
						var lembar_on = '<span class="ml-1 st_on color_redM color_whiteM">asd</span>';
					} */
					// var data_LBR = 
				// }
			// } */
			/* for(l=0; l<vmEmoney_dvc.length; l++){
				if(markers[i].terminal_id === vmEmoney_dvc[l].terminal_id){
					if(vmEmoney_dvc[l].status_ba === '00' && vmEmoney_dvc[l].status_cd1 === '00' && vmEmoney_dvc[l].status_reader === '00'){
						var device_on = '<span class="ml-1 st_on color_greenM color_whiteM"> Normal </span>';
					}else{
						var device_on = '<span class="ml-1 st_on color_redM color_whiteM"> Error </span>';
					}
				}
			} */

			/* for(m=0; m<vmKai_lbr.length; m++){
				if(markers[i].terminal_id === vmKai_lbr[m].vmid){
					if(Number(vmKai_lbr[m].lbrcashbox) <= 500){
						lembar_on = '<span class="ml-1 st_on color_greenM color_whiteM">'+vmKai_lbr[m].lbrcashbox+'</span>';
					}else if(Number(vmKai_lbr[m].lbrcashbox) > 500){
						lembar_on = '<span class="ml-1 st_on color_redM color_whiteM">'+vmKai_lbr[m].lbrcashbox+'</span>';
					}else if(vmKai_lbr[m].lbrcashbox === undefined || vmKai_lbr[m].lbrcashbox == null){
						lembar_on = '<span>asd</span>';
					}
				}
			} */
			/* for(o=0; o<vmKai_dvc.length; o++){
				if(markers[i].terminal_id === vmKai_dvc[o].vmid){
					if(vmKai_dvc[o].stPrinter === '00' && vmKai_dvc[o].stBA === '00' && vmKai_dvc[o].stUPS === '00'){
						var device_on = '<span class="ml-1 st_on color_greenM color_whiteM"> Normal </span>';
					}else{
						var device_on = '<span class="ml-1 st_on color_redM color_whiteM"> Error </span>';
					}
				}
				
			} */
			// transfersi RUPIAH

			
			
		// }
		// console.log(markers[i].kode_statusmesin);
		position = new google.maps.LatLng(markers[i].latitude, markers[i].longtitude);
		bounds.extend(position);
		/* id=false; */
		
		 // di dalam looping
		var marker = new MarkerWithLabel({
			position: position,
			map: map,
			

			// icon:{
			// 	url:''
			// },
			// labelContent: data_vmAPI['terminal_id'],
			// labelAnchor: new google.maps.Point(61, 48),
			abelInBackground: false,
			labelVisible: true,
			// zIndex: 1,
			labelInBackground: false
			// labelStyle: {position}

		});
		
		
		google.maps.event.addListener(marker, 'mouseover', (function(marker, i) {
			



			var infowindowCustom = 
			"<div class='content-wrapper'>"+
					"<div class='col p-0' id='wrapperLok-background'>"+
						"<span id='nameLocation'>"+markers[i]['terminal_name']+" - </span><span class='fontSize12'>"+markers[i]['terminal_id']+"</span>"+
					"</div>"+
					"<div class='col p-0'>"+
						"<span>Trx :"+trx+"</span>"+
					"</div>"+
					// "<div class='col p-0'>"+
						// "<span>Amount :"+0+"</span>"+
					// "</div>"+


					"<div class='col p-0' id='wrapperchild'>"+
						"<div class='font12' id='lh'>"+
							"<span>Status Mesin</span>"+
						"</div>"+

						"<div>"+
							"<table id='tabinmarker'>"+
								"<tr>"+
									"<td>Online</td>"+
									"<td> : </td>"+
									"<td>" + st_on + "</td>"+
								"</tr>"+
								"<tr>"+
									"<td>Ckd</td>"+
									"<td> : </td>"+
									"<td>" + device_on + "</td>"+
								"</tr>"+
								// "<tr>"+
									// "<td>Device</td>"+
									// "<td> : </td>"+
									// "<td>" + /* device_on */ + "</td>"+
								// "</tr>"+
								"<tr>"+
									"<td>Lembar</td>"+
									"<td> : </td>"+
									"<td>" + lembar_on + "</td>"+
								"</tr>"+
							"</table>"+
						"</div>"+

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
					//	"</div>"+
			"</div>"
			;


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




// vmKai, vmKai_lbr, vmKai_dvc
// let totalError = 0;
// let totalBener = 0;
// for(condia0=0; condia0<markersAll.length; condia0++){
// 	for(condiaA=0; condiaA<vmKai.length; condiaA++){
// 		if(markersAll[condia0].terminal_id === vmKai[condiaA].terminal_id && vmKai[condiaA].online_status != '1'){
// 			// totalError +=1;
// 			for(condiaB=0; condiaB<vmKai_dvc.length; condiaB++){
// 				if(vmKai[condiaA].terminal_id === vmKai_dvc[condiaB].vmid && vmKai_dvc[condiaB].stBA !== '00' && vmKai_dvc[condiaC].stPrinter !== '00' && vmKai_dvc[condiaC].stUPS !== '00'){
// 					for(condiaC=0; condiaC<vmKai_lbr.length; condiaC++){
// 						if(vmKai_lbr[condiaC].vmid === vmKai_dvc[condiaB].vmid && Number(vmKai_lbr[condiaC].lbrcashbox) >= 500){
// 							totalError+=1;							
// 						}
// 					}
// 				}
// 			}
// 		}
// 	}
// }
// for(condia0=0; condia0<markersAll.length; condia0++){
// 	for(condiaA=0; condiaA<vmKai.length; condiaA++){
// 		if(markersAll[condia0].terminal_id === vmKai[condiaA].terminal_id && vmKai[condiaA].online_status === '1'){
			
// 			for(condiaB=0; condiaB<vmKai_dvc.length; condiaB++){
// 				if(vmKai[condiaA].terminal_id === vmKai_dvc[condiaB].vmid && vmKai_dvc[condiaB].stBA === '00' && vmKai_dvc[condiaB].stPrinter === '00' && vmKai_dvc[condiaB].stUPS === '00'){
					
// 					for(condiaC=0; condiaC<vmKai_lbr.length; condiaC++){
// 						if(vmKai_lbr[condiaC].vmid === vmKai_dvc[condiaB].vmid && Number(vmKai_lbr[condiaC].lbrcashbox) < 500){
// 							totalBener +=1;
// 						}
// 					}
// 					// for(condiaC=0; condiaC<vmKai_lbr.length; condiac++)
// 				}
// 			}
// 		}
// 	}
// }


// vmEmoney, vmEmoney_lbr, vmEmoney_dvc
// for(condia0=0; condia0<markersAll.length; condia0++){
// 	for(condiA=0; condiA<vmEmoney.length; condiA++ ){
// 		if(markersAll[condia0].terminal_id === vmEmoney[condiA].terminal_id && vmEmoney[condiA].online_status != '1'){
// 			for(condiB=0; condiB<vmEmoney_dvc.length; condiB++){
// 				if(vmEmoney[condiA].terminal_id === vmEmoney_dvc[condiB].terminal_id && vmEmoney_dvc[condiB].status_ba != '00' && vmEmoney_dvc[condiB].status_cd1 != '00' && vmEmoney_dvc[condiB].status_printer != '00'){
// 					for(condiC=0; condiC< vmEmoney_lbr; condiC++){
// 						if(vmEmoney_dvc[condiB].terminal_id === vmEmoney_lbr[condiC].terminal_id && Number(vmEmoney_lbr[condiC].lbrcashbox) < 500){
// 							totalError +=1;
// 						}
// 					}
					
// 				}
// 			}
			
// 		}
// 	}
// }
// console.log('error', totalError);
// console.log('bener', totalBener);



$(function(){
	var tempKondisivm = temp_emoney;
	console.log('tempKondisivm',tempKondisivm);
	var totalE = 0;
	var totalN = 0;
	var tempjum = []
	// for(x=0; x<tempKondisivm.length; x++){
	// 	if(tempKondisivm[x]['status_ba'] != '00' && tempKondisivm[x]['status_cd1'] != '00' && tempKondisivm[x]['status_printer'] != '00'){
	// 		totalE += Number(x++)
	// 	}
	// }
	// var seriesKondisiVMD = [];
	for(a = 0; a < tempKondisivm.length; a++){
		if(tempKondisivm[a]['status_ba'] === '00' /* && tempKondisivm[a]['status_cd1'] === '00' */ && tempKondisivm[a]['status_printer'] === '00'){
			totalN = totalN+1;
		}else{
			totalE = totalE+1;
		}
	}
	console.log('cobadulku',totalE);
	console.log('cobadulku',totalN);
	$(document).ready(function(){
		Highcharts.chart('chartdiv', {
			chart: {
				spacingLeft: 10,
       			spacingRight: 10,
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie',
				value: 22000
			},credits: {
						enabled: false
					  },
			title: {
				text: ''
			},
			exporting: { 
				enabled: false 
			},
			/* condition:{
				maxWidth:5000
			}, */
			tooltip: {
				pointFormat: ''
			},
			accessibility: {
				point: {
					valueSuffix: '%'
				}
			},
			plotOptions: {
				pie: {
					allowPointSelect: true,
					cursor: 'pointer',
					dataLabels: {
						enabled: true,
						format: '<b>{point.name}</b>: {point.percentage:.1f} %'
					}
				}
			},
			series: [{
						colors: ['#2ac0ca','#811411'],
						colorByPoint: true,
						data: [
							{
								name: 'Normal',
								y: totalN
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
	var chartanalisisEmoney = vmEmoney_Analisisharian;

	// var LengthKE = chartanalisisKai.length + chartanalisisEmoney.length;
	console.log('asd',chartanalisisEmoney);
	// console.log('asd',chartanalisisKai);
	var tempAnalisisEmoney1 = []
	


	for(b = 0; b < chartanalisisEmoney.length; b++){
		for(cardanal = 0; cardanal< vmEmoney_Analisishariancard.length; cardanal++)
			if(chartanalisisEmoney[b].tanggal === vmEmoney_Analisishariancard[cardanal].tanggal){
				tempAnalisisEmoney1.push(
					[
						new Date(chartanalisisEmoney[b].tanggal).getTime(),
						(Number(chartanalisisEmoney[b]['jumlah_transaksi'])+Number(vmEmoney_Analisishariancard[cardanal]['jumlah_transaksi']))
					],
				);
			}
		
	}
	console.log('asda',tempAnalisisEmoney1);

	var chartanalisisKai = vmKai_Analisisharian;
	var tempAnalisisKai1 = [];
	for(c = 0; c < chartanalisisKai.length; c++){
		tempAnalisisKai1.push(
			[new Date(chartanalisisKai[c].tanggal).getTime(), Number(chartanalisisKai[c].jumlah_transaksi)]
		);
	}
	var tempAnalisisKE = {
		"emoney":tempAnalisisEmoney1,
		"kai":tempAnalisisKai1
	}
	$(document).ready(function(){
		Highcharts.stockChart('chartAnalisisPenjualan', {
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
				// ordinal: false,
				// ...
			},
			title: {
				text: ''
			},
			exporting: { 
				enabled: false 
			},
			series: [
				{
				name: 'E-Money',
				data: tempAnalisisKE.emoney,
				type: 'area',
				threshold: null,
				tooltip: {
					// valueDecimals: 2
				},
				fillColor: {
					linearGradient: {
						x1: 0,
						y1: 0,
						x2: 0,
						y2: 1
					},
					stops: [
						[0, Highcharts.getOptions().colors[0]],
						[1, Highcharts.color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
					]
				}
				},
			{
				name: 'KAI',
				data: tempAnalisisKE.kai,
				type: 'area',
				threshold: null,
				tooltip: {
					
					// valueDecimals: 2
				},
				fillColor: {
					linearGradient: {
						x1: 0,
						y1: 0,
						x2: 0,
						y2: 1
					},
					stops: [
						[0, Highcharts.getOptions().colors[7]],
						[1, Highcharts.color(Highcharts.getOptions().colors[7]).setOpacity(0).get('rgba')]
					]
				}
			}]
		});
		
	// 	Highcharts.chart('chartAnalisisPenjualan', {
	// 		chart: {
	// 			type: 'areaspline',
	// 			zoomType: 'x'
	// 		},
	// 		title: {
	// 			text: ''
	// 		},
	// 		exporting: { 
	// 			enabled: false 
	// 		},
	// 		xAxis: {
	// 			gridLineWidth: 0,
    //             minorGridLineWidth: 0,
	// 		   // }]
	// 		//    type: 'datetime',
	// 		},

	// 		yAxis: {
	// 			title: {
	// 				text: 'Jumlah Transaksi'
	// 			},
				
	// 		},
	// 		tooltip: {
	// 			shared: true,
	// 			valueSuffix: ''

	// 		},
	// 		credits: {
	// 			enabled: false
	// 		},
	// 		plotOptions: {
	// 			areaspline: {
	// 				fillOpacity: 0.5
	// 			}
	// 		},
	// 		series: [{
	// 			name: 'KAI',
	// 			data: tempAnalisisKE.emoney,
	// 			turboTreshold:5000,
	// 		},{
	// 			name: 'E-Money',
	// 			data: tempAnalisisKE.kai,
	// 			turboTreshold:5000,
	// 		},

	// 		// {
	// 		// 	name: 'E-Money',
	// 		// 	data: [1, 3, 4, 3, 3, 5, 4,5,123,51]
	// 		// }
	// 		]
	// 	});
	});
});
