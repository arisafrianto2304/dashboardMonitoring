// cHART kondisi VM
// var tempKondisivm = chartKondisimesin;
// var seriesKondisiVMD = [];
// for(a = 0; a < tempKondisivm.length; a++){
// 	seriesKondisiVMD.push({
// 		name: tempKondisivm[a].kode_statusmesin,
// 		y: Number(tempKondisivm[a].jumlah_kondisi)
// 	});
// }
// console.log('cek',seriesKondisiVMD);



// // console.log('testing', tempAnalisisEmoney1);
// // console.log('testing2',tempAnalisisKE);

// Highcharts.chart('chartdiv', {
//     chart: {
//         plotBackgroundColor:'#fff',
//         plotBorderWidth: null,
//         plotShadow: false,
// 		type: 'pie',
// 		backgroundColor:null
// 	},
// 	exporting: { 
// 		enabled: false 
// 	},
	
// 	mapNavigation: {
// 		enableMouseWheelZoom: true
// 	},
// 	rangeSelector: {
// 		selected: 1
// 	},
// 	credits: {
// 		enabled: false
// 	  },
//     title: {
//         text: ''
//     },
//     tooltip: {
//         pointFormat: '<b>{point.percentage:.1f}%</b>'
//     },
//     accessibility: {
//         point: {
//             valueSuffix: '%'
//         }
// 	},
// 	xAxis:{
// 		categories: ['00', 'B7', 'FF'],
// 		labels: {
// 			style: {
// 			  color: '#000'
// 			}
// 		  }
// 	},
// 	legend:{
// 		itemStyle: {
// 			color: '#000'
// 		  }
// 	},
//     plotOptions: {
//         pie: {
//             allowPointSelect: true,
//             cursor: 'pointer',
//             dataLabels: {
//                 enabled: false
//             },
// 			showInLegend: true,
// 			borderWidth: 0
//         }
//     },
//     series: [{
// 		colors: ['#2ac0ca', '#e1ac0b', '#811411'],
// 		colorByPoint: true,
// 		data: seriesKondisiVMD
// 	}]
// });




// $(function () {
//     $(document).ready(function() {
//         Highcharts.chart('chartLine', {

// 			title: {
// 				text: 'Percobaan',
// 				verticalAlign: 'bottom',
// 			},
		
// 			subtitle: {
// 				text: 'Vending Machine'
// 			},
			
// 			yAxis: {
// 				//menghilangkan garis grid tengah
// 				gridLineWidth: 0,
//                 minorGridLineWidth: 0,
				
// 			},
// 			credits: {
// 				enabled: false
// 			  },
// 			xAxis: {
// 				accessibility: {
// 					rangeDescription: 'Range: 2010 to 2017'
// 				}
// 			},
		
// 			legend: {
// 				layout: 'vertical',
// 				align: 'right',
// 				verticalAlign: 'middle'
// 			},
		
// 			plotOptions: {
// 				series: {
// 					label: {
// 						connectorAllowed: false
// 					},
// 					pointStart: 2010
// 				}
// 			},
		
// 			series: [{
// 				name: 'Vending Machine',
// 				data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175, 154175]
// 			}, {
// 				name: 'Pool',
// 				data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
// 			}],
		
// 			responsive: {
// 				rules: [{
// 					condition: {
// 						maxWidth: 500
// 					},
// 					chartOptions: {
// 						legend: {
// 							layout: 'horizontal',
// 							align: 'center',
// 							verticalAlign: 'bottom'
// 						}
// 					}
// 				}]
// 			}
		
// 		});
//     });
 
// });

// urlInput.value = defaultData;

// We recreate instead of using chart update to make sure the loaded CSV
// and such is completely gone.
// pollingCheckbox.onchange = urlInput.onchange = pollingInput.onchange = createChart;

// Create the chart
// createChart();
$(function(){
	var chartanalisisEmoney = datanalisisDemoney;
	// var LengthKE = chartanalisisKai.length + chartanalisisEmoney.length;
	console.log('asd',chartanalisisEmoney);
	// console.log('asd',chartanalisisKai);
	var tempAnalisisEmoney1 = [];
	for(b = 0; b < chartanalisisEmoney.length; b++){
		tempAnalisisEmoney1.push(
			[new Date(chartanalisisEmoney[b].waktu_transaksi).getTime(), Number(chartanalisisEmoney[b].jumlah_transaksi)],
		);
	}
	console.log('asda',tempAnalisisEmoney1);

	var chartanalisisKai = datanalisisDkai;
	var tempAnalisisKai1 = [];
	for(c = 0; c < chartanalisisKai.length; c++){
		tempAnalisisKai1.push(
			[new Date(chartanalisisKai[c].waktu_transaksi).getTime(), Number(chartanalisisKai[c].jumlah_transaksi)]
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
			series: [{
				name: 'E-Money',
				data: tempAnalisisKE.emoney,
				type: 'areaspline',
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
			},{
				name: 'KAI',
				data: tempAnalisisKE.kai,
				type: 'areaspline',
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

$(function(){
	var tempKondisivm = chartKondisimesin;
	var totalE = 0;
	var totalN = 0;
	var tempjum = []
	for(x=0; x<tempKondisivm.length; x++){
		if(tempKondisivm[x].kode_statusmesin != 'Normal'){
				totalE += Number(tempKondisivm[x].jumlah_kondisi)
		}
	}
	var seriesKondisiVMD = [];
	for(a = 0; a < tempKondisivm.length; a++){
		if((tempKondisivm[a].kode_statusmesin)='Normal'){
			seriesKondisiVMD.push({
			name: tempKondisivm[a].kode_statusmesin,
			y: Number(tempKondisivm[a].jumlah_kondisi)
		});
		}
		
	}
	console.log('cobadulku',seriesKondisiVMD);
	$(document).ready(function(){
		Highcharts.chart('chartdiv', {
			chart: {
				spacingLeft: 10,
       			spacingRight: 10,
				plotBackgroundColor: null,
				plotBorderWidth: null,
				plotShadow: false,
				type: 'pie'
			},credits: {
						enabled: false
					  },
			title: {
				text: ''
			},
			exporting: { 
				enabled: false 
			},
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
								y: Number(tempKondisivm[0].jumlah_kondisi)
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
