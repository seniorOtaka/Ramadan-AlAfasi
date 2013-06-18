//var applicationName = "Gebril";
//var userName = document.getElementById("txtUserName").value;
//var password = document.getElementById("txtPassword").value;

function Register(userName,password) {
	var RegisterUrl = "http://192.168.3.47:98/AdMainService.svc/Register?username="+userName+"&password="
	+password+"&applicationName="+widget.preferences["applicationName"];	
}