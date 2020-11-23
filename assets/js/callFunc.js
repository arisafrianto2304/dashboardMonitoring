// regex
function regex_time2date(waktu){
	var today = new Date(String(waktu));
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today = yyyy + '-' + mm + '-' + dd;
	return today;
}

function waktuCompare(a,b) {
	if( a.waktu < b.waktu){
		return -1;
	}
	if( a.waktu > b.waktu){
		return 1;
	}
	return 0;
}

function dateCompareKB(a,b) {
	if( a.date < b.date){
		return -1;
	}
	if( a.date > b.date){
		return 1;
	}
	return 0;
}

function dateCompareBK(a,b) {
	if( a.date > b.date){
		return -1;
	}
	if( a.date < b.date){
		return 1;
	}
	return 0;
}

function rumusPersen(a,b){
	var hasil = ((Number(a)/Number(b))*100);
	return hasil.toFixed(2);
}

function sortirangkaKB(a,b){
	if( Number(a.id) < Number(b.id)){
		return -1;
	}
	if( Number(a.id) > Number(b.id)){
		return 1;
	}
	return 0;
}
function sortirangkaBK(a,b){
	if( Number(a.id) > Number(b.id)){
		return -1;
	}
	if( Number(a.id) < Number(b.id)){
		return 1;
	}
	return 0;
}

function idCompareKB(a,b) {
	if( a.id < b.id){
		return -1;
	}
	if( a.id > b.id){
		return 1;
	}
	return 0;
}
function idCompareBK(a,b) {
	if( a.id > b.id){
		return -1;
	}
	if( a.id < b.id){
		return 1;
	}
	return 0;
}

// remove duplikat data
// ex: data = [{id='1'},{id='2'},{id='1'}]
// maka menjadi data = [{id='1'},{id='2'}] getUnique(array,'id')
function getUnique(arr, comp) {
	// store the comparison  values in array
	const unique =  arr.map(e => e[comp])
	// store the indexes of the unique objects
	.map((e, i, final) => final.indexOf(e) === i && i)
	// eliminate the false indexes & return unique objects
	.filter((e) => arr[e]).map(e => arr[e]);
	return unique;
}

// tanggal hari ini
function today(){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today = yyyy + '-' + mm + '-' + dd;
	return today;
}

function regex_number(kata,cari,jumlahkata){
	var regnum = kata.match(cari);
	regnum = String(regnum);
	regnum = regnum.split("&");
	regnum = String(regnum);
	var start = regnum.split(",", 1);
	start = String(start).substr(jumlahkata);
	start = start.replace(".", "");
	return start;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function regex_customSimbol(kata,cari,jumlahkata,simbol){
	var regnum = kata.match(cari);
	regnum = String(regnum);
	regnum = regnum.split(simbol);
	regnum = String(regnum);
	var start = regnum.split(",", 1);
	start = String(start).substr(jumlahkata);
	start = start.replace(".", "");
	return start;
}

// mengurutkan waktu dari terbaru - ke terdahulu
function vmidCompare(a,b) {
	if( a.vmid < b.vmid){
		return -1;
	}
	if( a.vmid > b.vmid){
		return 1;
	}
	return 0;
}
function waktuCompare(a,b) {
	if( a.waktu < b.waktu){
		return -1;
	}
	if( a.waktu > b.waktu){
		return 1;
	}
	return 0;
}

// mengubah angka menjadi ribuan (rupiah) ex: 1000 = 1.000
function rubah(angka){
	var reverse = angka.toString().split('').reverse().join(''),
	ribuan = reverse.match(/\d{1,3}/g);
	ribuan = ribuan.join('.').split('').reverse().join('');
	return ribuan;
}

// mengubah angka ribuan menjadi tanpa titik (.) ex: 1.0000 = 10000
function rubahkenol(angka){
	var hilang = angka.replace(/[^\w\s]/gi, '');
	return hilang;
}

// menghilangkan data duplicate
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

// select data hari ini
function new_today(){
	var today = new Date();
	var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	today = yyyy + '-' + mm + '-' + dd;
	return today;
}
