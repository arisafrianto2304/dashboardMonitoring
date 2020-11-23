<?php $this->load->view('template/menu');?>

<!-- <style>
	.table01 td{
		border:1px solid red;
		padding:10px;
		/* white-space: nowrap; */
		width:300px;
	}
</style> -->
<div class="container-fluid" id="MainDashboard">
	<div class="row">
		<div style="padding-left:15px;width:500px;">

		<!-- <form id="linkcombo" name="linkcombo" method="get" > -->
			<table class="table01">
				<tr>
					<th> </th>
					<th> </th>
					<th> </th>
				</tr>
				<tr><span>Histori Transaksi</span></tr>
				<tr id="tr_vmowner" style="display:block;">
					<td width="200px">Vending Machine Owner</td>
					<td>&nbsp : &nbsp
						<select name="vm_owner" id="vm_owner" onChange="">
							<!-- <option value="0" >All</option> -->
							<option value="1" selected="selected" disabled>Lunari</option>
							<!-- <option value="2">Lain-lain</option> -->
						</select>
					</td>
				</tr>

				<tr id="tr_vmgroup" style="display:block;">
					<td width="200px">Vending Machine Group</td>
					<td >&nbsp : &nbsp
						<select name="vm_group" id="vm_group" onChange="trx_show()">
							<option value="0" selected="selected">All</option>
							<!-- <option value="1">Bank Mandiri</option>
							<option value="BB">Bluebird</option>
							<option value="PVJ">PVJ</option>
							<option value="MAG">Artha Gading</option>
							<option value="KAI">KAI</option> -->
						</select>
					</td>
				</tr>

				<tr id="tr_vmproduct" style="display:block;">
					<td width="200px" >Vending Machine Product</td>
					<td >&nbsp : &nbsp
						<select name="vm_product" id="vm_product" onChange="">
							<option value="0" >All</option>
							<option value="1"  disabled>Prepaid Emoney</option>
							<option value="2" disabled>Topup E-Money - Bank Mandiri</option>
							<option value="3" disabled>Tiket KAI</option>
						</select>
					</td>
				</tr>

				<tr id="tr_vmlocation" style="display:none;">
					<td width="200px" >Vending location</td>
					<td >&nbsp : &nbsp
						<select name="vm_location" id="vm_location" onChange="perVM_KAI()">
							<option value="0" >All</option>
						</select>
					</td>
				</tr>

				<tr id="tr_vmsatu" style="display:block;">
					<td width="200px">Per Vending Machine</td>
					<td >&nbsp : &nbsp
						<select name="vm_satu" id="vm_satu" >
							<option value="0" >All</option>
							<!-- <option value="bb0001" >BB0001</option>
							<option value="bb0002" >BB0002</option>
							<option value="bb0003" >BB0003</option> -->
						</select>
					</td>
				</tr>

				<tr id="tr_transaksi" style="display:block;"> 
					<td width="200px">Transaksi Vending Machine</td>
					<td >&nbsp : &nbsp
						<select name="vm_transaksi" id="vm_transaksi">
							<!-- <option value="all" >All</option> -->
							<option value="trx" >TRX</option>
							<!-- <option value="tbk" >TBK</option> -->
							<!-- <option value="success" >Success</option>
							<option value="failed" >Failed</option>
							<option value="pending" >Pending</option>
							<option value="decline" >Decline</option>
							<option value="cancel" >Cancel</option> -->
						</select>
					</td>
				</tr>

				<tr id="tr_status" style="display:none;">
					<td width="200px">Status Vending Machine</td>
					<td >&nbsp : &nbsp
						<select name="vm_status" id="vm_status">
							<option value="all" >All</option>
							<option value="ckd" >CKD</option>
							<option value="vmon" >VM-Online</option>
							<option value="vmoff" >VM-Offline</option>
						</select>
					</td>
				</tr>

				<tr id="tr_periode" style="display:block;">
					<td width="200px">Periode</td>
					<td >&nbsp : &nbsp
						<select name="vm_periode" id="vm_periode">
							<option value="0" selected="selected">Harian</option>
							<option value="1" >1 Bulan</option>
							<option value="2" >3 Bulan</option>
							<option value="3" >6 Bulan</option>
							<option value="4" >1 Tahun</option>
						</select>
					</td>
				</tr>

			</table> 
			<input id="submit" type="submit" onClick="displayHistoriTransaksi1()" value="Submit" >
		<!-- </form> -->
		
		
		</div>
	</div>
	<div class="row pt-3 mt-2">
		<div class="col-md-12" id="tampilkan" style="display:none;">
		<!-- <table id="example" class="table table-striped table-bordered table-sm" cellspacing="0" width="100%">
			<thead>
				<tr>
					<th>Name</th>
					<th>Position</th>
					<th>Office</th>
					
				</tr>
			</thead>
			<tbody>

			</tbody>
			<tfoot>
			</tfoot>
			</table>-->
		</div> 

		<div class="col-md-12 mt-2" id="tampilkanchart" style="display:none;">
		
		</div>
	</div>
	
	<div id="date"></div>
</div>

</div>
</div>	
<?php

	// // histori ON OFf VM
	// $url_historiOnlineKAI = file_get_contents('http://27.111.44.42/Percobaan2/get_callDB/1');//KAI
	// $url_historiOfflineKAI = file_get_contents('http://27.111.44.42/Percobaan2/get_callDB/0');//KAI
	// $url_historiOnlineMAN = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_callDB/1');//MANDIRI
	// $url_historiOfflineMAN = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_callDB/0');//MANDIRI

	// // table histori transaksi VM
	// $url_historitrxmandiri = file_get_contents('http://27.111.44.44/mobile/Percobaan/get_topupmandirihistori');//mandiri
	// $url_historitrxmandiricard = file_get_contents('http://27.111.44.44/mobile/Percobaan/get_topupmandiricardhistori');//mandiri card
	// $url_historitrxkai = file_get_contents('http://27.111.44.42/Percobaan/get_alltransaksikai');//kai

	// //  custom KAI
	// $url_trxhistorikai_KA1002 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA1002/2018/99999');//KAI
	// $url_trxhistorikai_KA1003 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA1002/2018/99999');//KAI
	// $url_trxhistorikai_KA1004 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA1003/2018/99999');//KAI
	// $url_trxhistorikai_KA1005 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA1004/2018/99999');//KAI
	// $url_trxhistorikai_KA1005 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA1005/2018/99999');//KAI
	// $url_trxhistorikai_KA1006 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA1006/2018/99999');//KAI
	// $url_trxhistorikai_KA2001 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA2001/2018/99999');//KAI
	// $url_trxhistorikai_KA2002 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA2002/2018/99999');//KAI
	// $url_trxhistorikai_KA2003 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA2003/2018/99999');//KAI
	// $url_trxhistorikai_KA3001 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA3001/2018/99999');//KAI
	// $url_trxhistorikai_KA3002 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA3002/2018/99999');//KAI
	// $url_trxhistorikai_KA3003 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA3003/2018/99999');//KAI
	// $url_trxhistorikai_KA3004 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA3004/2018/99999');//KAI
	// $url_trxhistorikai_KA3005 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA3005/2018/99999');//KAI
	// $url_trxhistorikai_KA4001 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA4001/2018/99999');//KAI
	// $url_trxhistorikai_KA4002 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA4002/2018/99999');//KAI
	// $url_trxhistorikai_KA4003 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA4003/2018/99999');//KAI
	// $url_trxhistorikai_KA4004 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA4004/2018/99999');//KAI
	// $url_trxhistorikai_KA4005 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA4005/2018/99999');//KAI
	// $url_trxhistorikai_KA4006 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA4006/2018/99999');//KAI
	// $url_trxhistorikai_KA4007 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA4007/2018/99999');//KAI
	// $url_trxhistorikai_KA4008 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA4008/2018/99999');//KAI
	// $url_trxhistorikai_KA4009 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA4009/2018/99999');//KAI
	// $url_trxhistorikai_KA6001 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA6001/2018/99999');//KAI
	// $url_trxhistorikai_KA6002 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA6002/2018/99999');//KAI
	// $url_trxhistorikai_KA6003 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA6003/2018/99999');//KAI
	// $url_trxhistorikai_KA6004 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA6004/2018/99999');//KAI
	// $url_trxhistorikai_KA6005 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA6005/2018/99999');//KAI
	// $url_trxhistorikai_KA6006 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA6006/2018/99999');//KAI
	// $url_trxhistorikai_KA6007 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA6007/2018/99999');//KAI
	// $url_trxhistorikai_KA6008 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA6008/2018/99999');//KAI
	// $url_trxhistorikai_KA6009 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA6009/2018/99999');//KAI
	// $url_trxhistorikai_KA6010 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA6010/2018/99999');//KAI
	// $url_trxhistorikai_KA6011 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA6011/2018/99999');//KAI
	// $url_trxhistorikai_KA6012 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA6012/2018/99999');//KAI
	// $url_trxhistorikai_KA6013 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA6013/2018/99999');//KAI
	// $url_trxhistorikai_KA6014 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA6014/2018/99999');//KAI
	// $url_trxhistorikai_KA8001 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA8001/2018/99999');//KAI
	// $url_trxhistorikai_KA8002 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA8002/2018/99999');//KAI
	// $url_trxhistorikai_KA8003 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA8003/2018/99999');//KAI
	// $url_trxhistorikai_KA8004 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA8004/2018/99999');//KAI
	// $url_trxhistorikai_KA8005 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA8005/2018/99999');//KAI
	// $url_trxhistorikai_KA8006 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA8006/2018/99999');//KAI
	// $url_trxhistorikai_KA8007 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA8007/2018/99999');//KAI
	// $url_trxhistorikai_KA8008 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA8008/2018/99999');//KAI
	// $url_trxhistorikai_KA8009 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA8009/2018/99999');//KAI
	// $url_trxhistorikai_KA8010 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KA8010/2018/99999');//KAI

	// $url_trxhistorikai_KAI002 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KAI002/2018/99999');//KAI
	// $url_trxhistorikai_TEST01 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/TEST01/2018/99999');//KAI
	// $url_trxhistorikai_KAI001 = file_get_contents('http://27.111.44.42/Percobaan2/get_transactionkai/KAI001/2018/99999');//KAI

	// //  custom MANDIRI topup
	// $url_historitrxmandirit_21000GIIAS001 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/210-00-GIIAS-001/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_Bapindo01 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/Bapindo-01/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_Bapindo02 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/Bapindo-02/2018/99999');// top up MANDIRI
	
	// $url_historitrxmandirit_BB0001 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0001/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0002 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0002/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0003 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0003/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0004 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0004/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0005 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0005/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0006 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0006/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0007 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0007/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0008 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0008/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0009 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0009/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0010 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0010/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0011 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0011/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0012 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0012/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0013 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0013/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0014 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0014/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0015 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0015/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0016 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0016/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0017 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0017/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0018 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0018/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0019 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0019/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0020 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0020/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0021 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0021/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0022 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0022/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0023 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0023/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0024 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0024/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0025 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0025/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0026 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0026/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0027 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0027/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0028 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0028/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_BB0029 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/BB0029/2018/99999');// top up MANDIRI

	// $url_historitrxmandirit_CentralPark = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/Central-Park/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_DKI001 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/DKI001/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_DKI002 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/DKI002/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_DKI003 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/DKI003/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_GRAB01 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/GRAB01/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_MAG001 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/MAG-001/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_MAG002 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/MAG-002/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_paksigit = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/pak-sigit/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_PlazaMandiri = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/Plaza-Mandiri/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_PVJ001 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/PVJ001/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_PVJ002 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/PVJ002/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_PVJ003 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/PVJ003/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_PVJ004 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/PVJ004/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_PVJ005 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/PVJ005/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_PVJ006 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/PVJ006/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_PVJ007 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/PVJ007/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_PVJ008 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/PVJ008/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_PVJ009 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/PVJ009/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_PVJ010 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/PVJ010/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_PVJ011 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/PVJ011/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_PVJ012 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/PVJ012/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_SALA301 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/SALA3-01/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_SALA302 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/SALA3-02/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_SysdevTest = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/Sysdev-Test/2018/99999');// top up MANDIRI
	// $url_historitrxmandirit_TixTopSysdev = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandirit/TixTop-Sysdev/2018/99999');// top up MANDIRI

	// //  custom MANDIRI CARD
	// $url_historitrxmandiric_21000GIIAS001 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/210-00-GIIAS-001/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_Bapindo01 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/Bapindo-01/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_Bapindo02 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/Bapindo-02/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_BB0001 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/BB0001/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_BB0002 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/BB0002/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_BB0003 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/BB0003/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_BB0004 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/BB0004/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_BB0005 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/BB0005/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_BB0006 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/BB0006/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_BB0009 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/BB0009/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_CentralPark = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/Central-Park/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_DKI001 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/DKI001/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_DKI002 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/DKI002/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_DKI003 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/DKI003/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_GRAB01 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/GRAB01/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_KLUM02 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/KLUM02/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_MAG001 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/MAG-001/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_MAG002 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/MAG-002/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_paksigit = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/pak-sigit/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_PlazaMandiri = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/Plaza-Mandiri/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_PVJ001 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/PVJ001/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_PVJ002 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/PVJ002/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_PVJ003 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/PVJ003/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_PVJ004 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/PVJ004/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_PVJ005 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/PVJ005/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_PVJ006 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/PVJ006/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_PVJ007 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/PVJ007/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_PVJ008 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/PVJ008/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_PVJ009 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/PVJ009/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_PVJ010 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/PVJ010/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_PVJ011 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/PVJ011/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_PVJ012 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/PVJ012/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_SALA301 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/SALA3-01/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_SALA302 = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/SALA3-02/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_SysdevTest = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/Sysdev-Test/2018/99999');// CARD MANDIRI
	// $url_historitrxmandiric_TixTopSysdev = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_transactionmandiric/TixTop-Sysdev/2018/99999');// CARD MANDIRI


	// TBK
	// $url_tbkMAN = file_get_contents('http://27.111.44.44/mobile/Percobaan2/get_callTBK/999999999');
	// $url_tbkKAI = file_get_contents('http://27.111.44.42/Percobaan2/get_callTBK/999999999');
	
	


	// file_get_contents
	/* $rest_historitrxmandiri = file_get_contents($url_historitrxmandiri);
	$rest_historitrxmandiricard = file_get_contents($url_historitrxmandiricard);
	$rest_historitrxkai = file_get_contents($url_historitrxkai); */

?>
<script type="text/javascript">


	/* var kaON = <?php echo $url_historiOnlineKAI;?>;
	var kaOF = <?php echo $url_historiOfflineKAI;?>;
	var manON = <?php echo $url_historiOnlineMAN;?>;
	var manOF = <?php echo $url_historiOfflineMAN;?>;
	console.log('kaON',kaON);
	console.log('kaOF',kaOF);
	console.log('manON',manON);
	console.log('manOF',manON);

	console.log(<?php echo $url_historitrxmandirit_PVJ002; ?>);
	
	
	var historitrxmandiri = <?php echo $url_historitrxmandiri ;?>;
	var historitrxmandiricard = <?php echo  $url_historitrxmandiricard ;?>;
	var historitrxkai = <?php echo  $url_historitrxkai;?>;
	console.log('kaOF',historitrxmandiri);
	console.log('manON',historitrxmandiricard);
	console.log('manOF',historitrxkai);


	var data2 = {
		'lunari':{
			'mandiri':{
				'topup':{
					'bapindo':[...<?php echo $url_historitrxmandirit_21000GIIAS001; ?>, ...<?php echo $url_historitrxmandirit_Bapindo01; ?>, ...<?php echo $url_historitrxmandirit_Bapindo02; ?>,],
					'bluebird':{
						'cililitan':<?php echo $url_historitrxmandirit_BB0001; ?>,
						'ciputat':<?php echo $url_historitrxmandirit_BB0002; ?>,
						'warung buncit':<?php echo $url_historitrxmandirit_BB0003; ?>,
						'kalibata':<?php echo $url_historitrxmandirit_BB0004; ?>,
						'kramat jati':<?php echo $url_historitrxmandirit_BB0005; ?>,
						'cijantung':<?php echo $url_historitrxmandirit_BB0006; ?>,
						'puri 1':<?php echo $url_historitrxmandirit_BB0007; ?>,
						'puri 2':<?php echo $url_historitrxmandirit_BB0008; ?>,
						'kelapa gading':<?php echo $url_historitrxmandirit_BB0009; ?>,
						'perigi':<?php echo $url_historitrxmandirit_BB0010; ?>,
						'japos':<?php echo $url_historitrxmandirit_BB0011; ?>,
						'bsd':<?php echo $url_historitrxmandirit_BB0012; ?>,
						'cimanggis':<?php echo $url_historitrxmandirit_BB0013; ?>,
						'pal merah':<?php echo $url_historitrxmandirit_BB0014; ?>,
						'siliwangi':<?php echo $url_historitrxmandirit_BB0015; ?>,
						'kemayoran':<?php echo $url_historitrxmandirit_BB0016; ?>,
						'cipulir':<?php echo $url_historitrxmandirit_BB0017; ?>,
						'daan mogot':<?php echo $url_historitrxmandirit_BB0018; ?>,
						'peta selatan':<?php echo $url_historitrxmandirit_BB0019; ?>,
						'cipayung':<?php echo $url_historitrxmandirit_BB0020; ?>,
						'raden inten':<?php echo $url_historitrxmandirit_BB0021; ?>,
						'pondok kopi':<?php echo $url_historitrxmandirit_BB0022; ?>,
						'penggilingan':<?php echo $url_historitrxmandirit_BB0023; ?>,
						'arus jati':<?php echo $url_historitrxmandirit_BB0024; ?>,
						'narogong':<?php echo $url_historitrxmandirit_BB0025; ?>,
						'tambun':<?php echo $url_historitrxmandirit_BB0026; ?>,
						'galaxy':<?php echo $url_historitrxmandirit_BB0027; ?>,
						'marga mulya':<?php echo $url_historitrxmandirit_BB0028; ?>,
						'ciputat 2':<?php echo $url_historitrxmandirit_BB0029; ?>,
					},
					'central park':[...<?php echo $url_historitrxmandirit_CentralPark; ?>],
					'dki':[...<?php echo $url_historitrxmandirit_DKI001; ?>, ...<?php echo $url_historitrxmandirit_DKI002; ?>, ...<?php echo $url_historitrxmandirit_DKI003; ?>],
					'grab':[...<?php echo $url_historitrxmandirit_GRAB01; ?>],
					'mag':[...<?php echo $url_historitrxmandirit_MAG001; ?>, ...<?php echo $url_historitrxmandirit_MAG002; ?>],
					
					'plaza-mandiri':[...<?php echo $url_historitrxmandirit_PlazaMandiri; ?>],
					'pvj': [...<?php echo $url_historitrxmandirit_PVJ001; ?>, ...<?php echo $url_historitrxmandirit_PVJ002; ?>, 
							...<?php echo $url_historitrxmandirit_PVJ003; ?>, ...<?php echo $url_historitrxmandirit_PVJ004; ?>, 
							...<?php echo $url_historitrxmandirit_PVJ005; ?>, ...<?php echo $url_historitrxmandirit_PVJ006; ?>, 
							...<?php echo $url_historitrxmandirit_PVJ007; ?>, ...<?php echo $url_historitrxmandirit_PVJ008; ?>, 
							...<?php echo $url_historitrxmandirit_PVJ009; ?>, ...<?php echo $url_historitrxmandirit_PVJ010; ?>, 
							...<?php echo $url_historitrxmandirit_PVJ011; ?>, ...<?php echo $url_historitrxmandirit_PVJ012; ?>],
					'pak-sigit':[...<?php echo $url_historitrxmandirit_paksigit; ?>],
					'restarea salatiga':[...<?php echo $url_historitrxmandirit_SALA301; ?>, ...<?php echo $url_historitrxmandirit_SALA302; ?>],
					'lunari office': [...<?php echo $url_historitrxmandirit_SysdevTest; ?>, ...<?php echo $url_historitrxmandirit_TixTopSysdev; ?>],
				},
				'card':{
					'bapindo':[...<?php echo $url_historitrxmandiric_21000GIIAS001; ?>, ...<?php echo $url_historitrxmandiric_Bapindo01; ?>, ...<?php echo $url_historitrxmandiric_Bapindo02; ?>],
					'bluebird':{
						'cililitan':<?php echo $url_historitrxmandiric_BB0001; ?>,
						'ciputat':<?php echo $url_historitrxmandiric_BB0002; ?>,
						'warung buncit':<?php echo $url_historitrxmandiric_BB0003; ?>,
						'kalibata':<?php echo $url_historitrxmandiric_BB0004; ?>,
						'kramat jati':<?php echo $url_historitrxmandiric_BB0005; ?>,
						'cijantung':<?php echo $url_historitrxmandiric_BB0006; ?>,
						'kelapa gading':<?php echo $url_historitrxmandiric_BB0009; ?>,
					},
					'central park':[...<?php echo $url_historitrxmandiric_CentralPark; ?>],
					'dki':[...<?php echo $url_historitrxmandiric_DKI001; ?>, ...<?php echo $url_historitrxmandiric_DKI002; ?>, ...<?php echo $url_historitrxmandiric_DKI003; ?>],
					'grab':[...<?php echo $url_historitrxmandiric_GRAB01; ?>],
					'mag':[...<?php echo $url_historitrxmandiric_MAG001; ?>, ...<?php echo $url_historitrxmandiric_MAG002; ?>],
					'pak-sigit':[...<?php echo $url_historitrxmandiric_paksigit; ?>],
					'plaza-mandiri':[...<?php echo $url_historitrxmandiric_PlazaMandiri; ?>],
					'pvj': [...<?php echo $url_historitrxmandiric_PVJ001; ?>, ...<?php echo $url_historitrxmandiric_PVJ002; ?>, 
							...<?php echo $url_historitrxmandiric_PVJ003; ?>, ...<?php echo $url_historitrxmandiric_PVJ004; ?>, 
							...<?php echo $url_historitrxmandiric_PVJ005; ?>, ...<?php echo $url_historitrxmandiric_PVJ006; ?>, 
							...<?php echo $url_historitrxmandiric_PVJ007; ?>, ...<?php echo $url_historitrxmandiric_PVJ008; ?>, 
							...<?php echo $url_historitrxmandiric_PVJ009; ?>, ...<?php echo $url_historitrxmandiric_PVJ010; ?>, 
							...<?php echo $url_historitrxmandiric_PVJ011; ?>, ...<?php echo $url_historitrxmandiric_PVJ012; ?>],
					'restarea salatiga':[...<?php echo $url_historitrxmandiric_SALA301; ?>, ...<?php echo $url_historitrxmandiric_SALA302; ?>],
					'lunari office': [...<?php echo $url_historitrxmandiric_SysdevTest; ?>, ...<?php echo $url_historitrxmandiric_TixTopSysdev; ?>],
				},
				},
				'kai':{
					'topup':{
						'gambir':[...<?php echo $url_trxhistorikai_KA1002; ?>],
						'pasarsenen':[...<?php echo $url_trxhistorikai_KA1003; ?>, ...<?php echo $url_trxhistorikai_KA1004; ?>, ...<?php echo $url_trxhistorikai_KA1005 ?>, ...<?php echo $url_trxhistorikai_KA1006; ?>],
						'bandung':[...<?php echo $url_trxhistorikai_KA2001; ?>, ...<?php echo $url_trxhistorikai_KA2002 ; ?>],
						'kiaracondong':[...<?php echo $url_trxhistorikai_KA2003; ?>],
						'cirebon':[...<?php echo $url_trxhistorikai_KA3001; ?>, ...<?php echo $url_trxhistorikai_KA3002; ?>, ...<?php echo $url_trxhistorikai_KA3003; ?>],
						'cirebon prujukan':[...<?php echo $url_trxhistorikai_KA3004; ?>, ...<?php echo $url_trxhistorikai_KA3005; ?>],
						'semarang tawang':[...<?php echo $url_trxhistorikai_KA4001; ?>, ...<?php echo $url_trxhistorikai_KA4002; ?>, ...<?php echo $url_trxhistorikai_KA4003; ?>],
						'semarang poncol':[...<?php echo $url_trxhistorikai_KA4004; ?>, ...<?php echo $url_trxhistorikai_KA4005; ?>],
						'pekalongan':[...<?php echo $url_trxhistorikai_KA4006; ?>, ...<?php echo $url_trxhistorikai_KA4007; ?>],
						'tegal':[...<?php echo $url_trxhistorikai_KA4008; ?>, ...<?php echo $url_trxhistorikai_KA4009; ?>],
						'tugu':[...<?php echo $url_trxhistorikai_KA6001; ?>, ...<?php echo $url_trxhistorikai_KA6002; ?>, ...<?php echo $url_trxhistorikai_KA6003; ?>, ...<?php echo $url_trxhistorikai_KA6004; ?>, ...<?php echo $url_trxhistorikai_KA6005; ?>],
						'lempuyangan':[...<?php echo $url_trxhistorikai_KA6006; ?>, ...<?php echo $url_trxhistorikai_KA6007; ?>, ...<?php echo $url_trxhistorikai_KA6008; ?>],
						'klaten':[...<?php echo $url_trxhistorikai_KA6009; ?>],
						'purwosari':[...<?php echo $url_trxhistorikai_KA6010; ?>, ...<?php echo $url_trxhistorikai_KA6011; ?>],
						'solo balapan':[...<?php echo $url_trxhistorikai_KA6012; ?>, ...<?php echo $url_trxhistorikai_KA6013; ?>,...<?php echo $url_trxhistorikai_KA6014; ?>],
						'gubeng':[...<?php echo $url_trxhistorikai_KA8001 ; ?>, ...<?php echo $url_trxhistorikai_KA8002; ?>, ...<?php echo $url_trxhistorikai_KA8004; ?>,...<?php echo $url_trxhistorikai_KA8005; ?>],
						'pasar turi':[...<?php echo $url_trxhistorikai_KA8003 ; ?>, ...<?php echo $url_trxhistorikai_KA8007 ; ?>, ...<?php echo $url_trxhistorikai_KA8008 ; ?>],
						'malang':[...<?php echo $url_trxhistorikai_KA8010; ?>, ...<?php echo $url_trxhistorikai_KA8009 ; ?>],
						'lunari office':[...<?php echo $url_trxhistorikai_KAI002; ?>, ...<?php echo $url_trxhistorikai_TEST01; ?>, ...<?php echo $url_trxhistorikai_KAI001; ?>],
					},
				},
		}
	};
 */

	/* var dateFrom = "02/05/2013";
	var dateTo = "02/09/2013";
	var dateCheck = "02/07/2013";

	var d1 = dateFrom.split("/");
	var d2 = dateTo.split("/");
	var c = dateCheck.split("/");

	var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
	var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
	var check = new Date(c[2], parseInt(c[1])-1, c[0]);

	console.log(check > from && check < to)


	var MyDate = new Date();
var MyDateString;

MyDate.setDate(MyDate.getDate() + 20);

MyDateString = ('0' + MyDate.getDate()).slice(-2) + '-' + ('0' + (MyDate.getMonth()+1)).slice(-2) + '-' + MyDate.getFullYear();

console.log(MyDateString); */

</script>

<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/tablehistoris.js"></script>
		<!-- <script type="text/javascript" src="<?php echo base_url(); ?>assets/js/chart.js"></script> -->
		<!-- <script type="text/javascript" src="<?php echo base_url(); ?>assets/js/google_maps.js"></script> -->
		<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/navbar.js"></script>
		<script type="text/javascript" src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
		<script type="text/javascript" src="https://cdn.datatables.net/1.10.21/js/dataTables.bootstrap4.min.js"></script>
	</body>
	<script>
	
	</script>
</html>
