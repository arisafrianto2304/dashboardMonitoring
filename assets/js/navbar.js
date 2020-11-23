function opencloseSidebar() {
	// var mysidear = document.getElementById("mySidenav");
	if(mySidebar.style.width == "0px"){
		document.getElementById("mySidebar").style.width = "250px";
		document.getElementById("main").style.marginLeft = "250px";
		document.getElementById("containerDashboard").style.marginLeft = "250px";
		document.getElementById("MainDashboard").style.marginLeft = "250px";
		document.getElementById("SKVM_bg2").style.width = "680px";
		
		// document.getElementById("Geserb").style.marginLeft = "250px";
		
	}else{
		
		document.getElementById("mySidebar").style.width = "0px";
		document.getElementById("main").style.marginLeft= "0px";
		document.getElementById("containerDashboard").style.marginLeft = "0px";
		document.getElementById("MainDashboard").style.marginLeft = "0px";
		document.getElementById("SKVM_bg2").style.width = "930px";
		// document.getElementById("Geserb").style.marginLeft = "0px";
	}
}

var dropdown = document.getElementsByClassName("dropdown-btn");
var i;
for (i = 0; i < dropdown.length; i++) {
  dropdown[i].addEventListener("click", function() {
  this.classList.toggle("active");
  var dropdownContent = this.nextElementSibling;
  if (dropdownContent.style.display === "block") {
  	dropdownContent.style.display = "none";
  } else {
  	dropdownContent.style.display = "block";
  }
  });
}
