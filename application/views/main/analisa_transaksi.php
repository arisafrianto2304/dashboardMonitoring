<?php $this->load->view('Template/menu');?>

<div class="container-fluid" id="MainDashboard" style="padding-top:0px;">
	<div class="row mb-3">
		<div style="width:500px;padding-left:15px;">
		<!-- <form id="linkcombo" name="linkcombo"> -->
			<table>
			<tr>
				<th></th>
				<th></th>
				<th></th>
			</tr>
			<tr><td>Analisa Transaksi</td></tr>
			<tr><td>VM 1</td></tr>
			<tr id="tr_vmowner1" style="display:block;">
				<td width="200px">Vending Machine Owner</td>
				<td>&nbsp : &nbsp
					<select name="vm_owner1" id="vm_owner1" onChange="">
						<!-- <option value="0" >All</option> -->
						<option value="1" selected="selected" disabled>Lunari</option>
						<!-- <option value="2">Lain-lain</option> -->
					</select>
				</td>
			</tr>
			<tr id="tr_vmgroup1" style="display:block;">
				<td width="200px">Vending Machine Group</td>
				<td >&nbsp : &nbsp
					<select name="vm_group1" id="vm_group1" onChange="trx_show1()">
						<option value="0" selected="selected">All</option>
						<!-- <option value="1">Bank Mandiri</option>
						<option value="BB">Bluebird</option>
						<option value="PVJ">PVJ</option>
						<option value="MAG">Artha Gading</option>
						<option value="KAI">KAI</option> -->
					</select>
				</td>
			</tr>

			<tr id="tr_vmproduct1" style="display:block;">
				<td width="200px" >Vending Machine Product</td>
				<td >&nbsp : &nbsp
					<select name="vm_product1" id="vm_product1" onChange="">
						<option value="0" >All</option>
						<option value="1"  disabled>Prepaid Emoney</option>
						<option value="2" disabled>Topup E-Money - Bank Mandiri</option>
						<option value="3" disabled>Tiket KAI</option>
					</select>
				</td>
			</tr>

			<!-- <tr id="tr_vmsatu" style="display:block;"> -->
				<!-- <td width="200px">Per Vending Machine</td> -->
				<!-- <td >&nbsp : &nbsp -->
					<!-- <select name="vm_satu" id="vm_satu"> -->
						<!-- <option value="0" >All</option> -->
						<!-- <option value="bb0001" >BB0001</option>
						<option value="bb0002" >BB0002</option>
						<option value="bb0003" >BB0003</option> -->
					<!-- </select> -->
				<!-- </td> -->
			<!-- </tr> -->

			<tr id="tr_vmlocation1" style="display:none;">
					<td width="200px" >Vending location</td>
					<td >&nbsp : &nbsp
						<select name="vm_location1" id="vm_location1" onChange="perVM_KAI1()">
							<option value="0" >All</option>
						</select>
					</td>
				</tr>

				<tr id="tr_vmsatu1" style="display:block;">
					<td width="200px">Per Vending Machine</td>
					<td >&nbsp : &nbsp
						<select name="vm_satu1" id="vm_satu1" >
							<option value="0" >All</option>
							<!-- <option value="bb0001" >BB0001</option>
							<option value="bb0002" >BB0002</option>
							<option value="bb0003" >BB0003</option> -->
						</select>
					</td>
				</tr>

				<tr id="tr_transaksi1" style="display:block;"> 
					<td width="200px">Transaksi Vending Machine</td>
					<td >&nbsp : &nbsp
						<select name="vm_transaksi1" id="vm_transaksi1">
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

			<!-- <tr id="tr_status" style="display:none;">
				<td width="200px">Status Vending Machine</td>
				<td >&nbsp : &nbsp
					<select name="vm_status" id="vm_status">
						<option value="all" >All</option>
						<option value="ckd" >CKD</option>
						<option value="vmon" >VM-Online</option>
						<option value="vmoff" >VM-Offline</option>
					</select>
				</td>
			</tr> -->
			</table>
		</div>

		<div style="width:540px;padding-left:15px;">
			<table>
			<tr>
				<th></th>
				<th></th>
				<th></th>
			  </tr>
			  <tr><span>&nbsp;</span></tr>
			<tr><td>VM 2</td></tr>
			<tr id="tr_vmowner2" style="display:block;">
				<td width="200px">Vending Machine Owner</td>
				<td>&nbsp : &nbsp
					<select name="vm_owner2" id="vm_owner2" onChange="">
						<!-- <option value="0" >All</option> -->
						<option value="1" selected="selected" disabled>Lunari</option>
						<!-- <option value="2">Lain-lain</option> -->
					</select>
				</td>
			</tr>

			<tr id="tr_vmgroup2" style="display:block;">
				<td width="200px">Vending Machine Group</td>
				<td >&nbsp : &nbsp
					<select name="vm_group2" id="vm_group2" onChange="trx_show2()">
						<option value="0" selected="selected">All</option>
						<!-- <option value="1">Bank Mandiri</option>
						<option value="BB">Bluebird</option>
						<option value="PVJ">PVJ</option>
						<option value="MAG">Artha Gading</option>
						<option value="KAI">KAI</option> -->
					</select>
				</td>
			</tr>

			<tr id="tr_vmproduct2" style="display:block;">
				<td width="200px" >Vending Machine Product</td>
				<td >&nbsp : &nbsp
					<select name="vm_product2" id="vm_product2" onChange="">
						<option value="0" >All</option>
						<option value="1"  disabled>Prepaid Emoney</option>
						<option value="2" disabled>Topup E-Money - Bank Mandiri</option>
						<option value="3" disabled>Tiket KAI</option>
					</select>
				</td>
			</tr>

			<tr id="tr_vmlocation2" style="display:none;">
				<td width="200px" >Vending location</td>
				<td >&nbsp : &nbsp
					<select name="vm_location2" id="vm_location2" onChange="perVM_KAI2()">
						<option value="0" >All</option>
					</select>
				</td>
			</tr>

			<tr id="tr_vmsatu2" style="display:block;">
				<td width="200px">Per Vending Machine</td>
				<td >&nbsp : &nbsp
					<select name="vm_satu2" id="vm_satu2" >
						<option value="0" >All</option>
						<!-- <option value="bb0001" >BB0001</option>
						<option value="bb0002" >BB0002</option>
						<option value="bb0003" >BB0003</option> -->
					</select>
				</td>
			</tr>

			<tr id="tr_transaksi2" style="display:block;"> 
				<td width="200px">Transaksi Vending Machine</td>
				<td >&nbsp : &nbsp
					<select name="vm_transaksi2" id="vm_transaksi2">
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

			<!-- <tr id="tr_status" style="display:none;">
				<td width="200px">Status Vending Machine</td>
				<td >&nbsp : &nbsp
					<select name="vm_status2" id="vm_status2">
						<option value="all" >All</option>
						<option value="ckd" >CKD</option>
						<option value="vmon" >VM-Online</option>
						<option value="vmoff" >VM-Offline</option>
					</select>
				</td>
			</tr> -->
			<!-- <tr> -->
				<!-- <td></td> -->
				<td></td>
				
			<!-- </tr> -->
			</table>

			<table class="float-right mt-4">
				<tr>
				<td class="float-right"><span>Tanggal Akhir</span><input placeholder="Tanggal Akhir" id="datepicker2" name="datepicker2" width="180" /></td>
				<td class="pr-2 float-right"><span>Tanggal Awal</span><input placeholder="Tanggal Awal" id="datepicker1" name="datepicker1" width="180" /></td>
				<td class="pl-2 m-0"><input id="submit" class="btncs" type="submit" onClick="testingbutton()" value="Submit" style="float:right;"></td>
				</tr>
			</table>
			
					
			<!-- </form> -->
			
		</div>
	</div>

	<div class="row">
		<div class="col-md-6" id="analisaTransaksivm1" style="display:none;">
			<!-- asd -->
		</div>
		<div class="col-md-6" id="analisaTransaksivm2" style="display:none;">
			<!-- asd -->
		</div>
	</div>
	<div class="row mt-2">
		<div class="col-md-12" id="grafikChart" style="display:none;"></div>
	</div>
	
</div>

</div>
</div>

<?php
?>

<!-- <script type="text/javascript" src="<?php echo base_url(); ?>assets/js/tablehistoris.js"></script> -->
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/analisisTransaksi.js"></script>
<!-- <script type="text/javascript" src="<?php echo base_url(); ?>assets/js/chart.js"></script> -->
<!-- <script type="text/javascript" src="<?php echo base_url(); ?>assets/js/google_maps.js"></script> -->
<script type="text/javascript" src="<?php echo base_url(); ?>assets/js/navbar.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/1.10.21/js/dataTables.bootstrap4.min.js"></script>
<script>

</script>
</body>
</html>
