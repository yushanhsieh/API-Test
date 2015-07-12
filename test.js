var access_token;
var refresh_token;
var ip;
var port;
var FB_token;
var hardware_id;
var history_id;
$(document).ready(function() {
	$("#testForm").submit(function(event){
		event.preventDefault();
		ip = $("#inputIP").val();
		port = $("#inputPort").val();
		FB_token = $("#inputToken").val();
		ip = "210.200.13.224";
		port = "10001";
		FB_token = "CAAWaCNd8vigBAFlAGVEdIMV8o731fjBfy1QpxmFpBM70GwnO9uVjXiPvVPZCuC5NaX7Pql4kBMJF0ON67xw5I0FRhCqXGqqTyCBimimZBvWFL3P1woffCBJ7g6c0kO7qCvIYOvvOIgamNCjKAnviRzEqvIZC4y52iakeZAPy377ny6YPU9lsXkAK0t546wZBllhR0qqW9LBhyvtIuAZCOy";
		TestAPI(ip, port, FB_token);
		$("#inputIP").val("");
		$("#inputPort").val("");
		$("#inputToken").val("");
	});
});

function TestAPI(){
	Login();
	Logout();
	Login();
	Refresh();
	GetProfile();
	PutProfile();
	CreateDevice();
	GetDeviceList();
	GetUserHistoryList();
	//GetUserHistoryDetail();
	//DeleteUserHistoryList();
	LogoutAllUser();
}
function Login (){
	data = JSON.stringify({
			"FB_token": FB_token
		});
	$.ajax({
		url: 'http://'+ ip + ':' + port + '/api/v2/login',
		type: 'POST',                   
		data: data,
	    dataType: 'json',
		async: false,
		success: function (data, statusText, xhr){
			access_token =  data.access_token;
			refresh_token = data.refresh_token;
			SetResult("Login", data, xhr);
			// $("#result").append("<h2>Login</h2>");
			// $("#result").append("<h4>Status Code:</h4> " + "<p style='color:red'>" + xhr.status + "</p>" );
			// $("#result").append("<h4>Response:</h4> " + "<pre style='color:blue'>" + JSON.stringify(data, null, 4) + "</pre>");	
			// console.log(JSON.stringify(data, null, 4));
			// console.log(xhr.status);
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log(jqXHR, textStatus, errorThrown);
		}
	});
}
function Logout(){
	data = JSON.stringify({
			"refresh_token": refresh_token 
		});
	$.ajax({
		url: 'http://'+ ip + ':' + port + '/api/v2/logout',
		type: 'POST',      
		beforeSend: function(xhr) { 
			xhr.setRequestHeader("X-API-TOKEN", access_token); 
		},		
		data: data,
		async: false,
		success: function (data, statusText, xhr){
			SetResult("Logout", data, xhr);
			// $("#result").append("<h2>Logout</h2>");
			// $("#result").append("<h4>Status Code:</h4> " + "<p style='color:red'>" + xhr.status + "</p>" );
			// $("#result").append("<h4>Response:</h4> " + "<pre style='color:blue'>" + JSON.stringify(data, null, 4) + "</pre>");
			// console.log(xhr.status);
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log(jqXHR, textStatus, errorThrown);
		}
	});
}
function Refresh(){
	data = JSON.stringify({
			"refresh_token": refresh_token 
		});
	$.ajax({
		url: 'http://'+ ip + ':' + port + '/api/v2/refresh',
		type: 'POST',      		
		data: data,
		async: false,
		success: function (data, statusText, xhr){
			access_token =  data.access_token;
			refresh_token = data.refresh_token;
			SetResult("Refresh", data, xhr);
			// $("#result").append("<h2>Refresh</h2>");
			// $("#result").append("<h4>Status Code:</h4> " + "<p style='color:red'>" + xhr.status + "</p>" );
			// $("#result").append("<h4>Response:</h4> " + "<pre style='color:blue'>" + JSON.stringify(data, null, 4) + "</pre>");
			// console.log(xhr.status);
			// console.log(data);
			// console.log(xhr.status);
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log(jqXHR, textStatus, errorThrown);
		}
	});
}
function GetProfile(){
	$.ajax({
		url: 'http://'+ ip + ':' + port + '/api/v2/profile',
		type: 'GET', 
		beforeSend: function(xhr) { 
			xhr.setRequestHeader("X-API-TOKEN", access_token); 
		},
		async: false,
		success: function (data, statusText, xhr){
			SetResult("Get Profile", data, xhr);
			// $("#result").append("<h2>Get Profile</h2>");
			// $("#result").append("<h4>Status Code:</h4> " + "<p style='color:red'>" + xhr.status + "</p>" );
			// $("#result").append("<h4>Response:</h4> " + "<pre style='color:blue'>" + JSON.stringify(data, null, 4) + "</pre>");
			// console.log(data);
			// console.log(xhr.status);
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log(jqXHR, textStatus, errorThrown);
		}
	});
}
function PutProfile(){
	data = JSON.stringify({
		"name": "Susan",
		"gender": "female",
		"weight": 58,
		"height": 164,
		"birthday": "1989-01-28"
	});
	$.ajax({
		url: 'http://'+ ip + ':' + port + '/api/v2/profile',
		type: 'PUT', 
		beforeSend: function(xhr) { 
			xhr.setRequestHeader("X-API-TOKEN", access_token); 
		},
		data: data,
		async: false,
		success: function (data, statusText, xhr){
			SetResult("Modify Profile", data, xhr);
			// $("#result").append("<h2>Modify Profile</h2>");
			// $("#result").append("<h4>Status Code:</h4> " + "<p style='color:red'>" + xhr.status + "</p>" );
			// $("#result").append("<h4>Response:</h4> " + "<pre style='color:blue'>" + JSON.stringify(data, null, 4) + "</pre>");
			// console.log(xhr.status);
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log(jqXHR, textStatus, errorThrown);
		}
	});
}
function CreateDevice(){
	var d = new Date();
	hardware_id = d.getTime().toString();
	data = JSON.stringify({
		"hardware_id": hardware_id
	});
	$.ajax({
		url: 'http://'+ ip + ':' + port + '/api/v2/device',
		type: 'POST', 
		beforeSend: function(xhr) { 
			xhr.setRequestHeader("X-API-TOKEN", access_token); 
		},
		data: data,
		async: false,
		success: function (data, statusText, xhr){
			SetResult("Create Device", data, xhr);
			// $("#result").append("<h2>Create Device</h2>");
			// $("#result").append("<h4>Status Code:</h4> " + "<p style='color:red'>" + xhr.status + "</p>" );
			// $("#result").append("<h4>Response:</h4> " + "<pre style='color:blue'>" + JSON.stringify(data) + "</pre>");
			// console.log(data);
			// console.log(xhr.status);
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log(jqXHR, textStatus, errorThrown);
		}
	});
}
function GetDeviceList(){
	$.ajax({
		url: 'http://'+ ip + ':' + port + '/api/v2/device',
		type: 'GET', 
		beforeSend: function(xhr) { 
			xhr.setRequestHeader("X-API-TOKEN", access_token); 
		},
		async: false,
		success: function (data, statusText, xhr){
			SetResult("Get Device List", data, xhr);
			// $("#result").append("<h2>Get Device List</h2>");
			// $("#result").append("<h4>Status Code:</h4> " + "<p style='color:red'>" + xhr.status + "</p>" );
			// $("#result").append("<h4>Response:</h4> " + "<pre style='color:blue'>" + JSON.stringify(data) + "</pre>");
			// console.log(data);
			// console.log(xhr.status);
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log(jqXHR, textStatus, errorThrown);
		}
	});
}
function GetUserHistoryList(){
	$.ajax({
		url: 'http://'+ ip + ':' + port + '/api/v2/history_list/'+hardware_id,
		type: 'GET', 
		beforeSend: function(xhr) { 
			xhr.setRequestHeader("X-API-TOKEN", access_token); 
		},
		async: false,
		success: function (data, statusText, xhr){
			SetResult("Get User History List", data, xhr);
			// $("#result").append("<h2>Get User History List</h2>");
			// $("#result").append("<h4>Status Code:</h4> " + "<p style='color:red'>" + xhr.status + "</p>" );
			// $("#result").append("<h4>Response:</h4> " + "<pre style='color:blue'>" + JSON.stringify(data) + "</pre>");
			// console.log(data);
			// console.log(xhr.status);
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log(jqXHR, textStatus, errorThrown);
		}
	});
}
function GetUserHistoryDetail(){
	$.ajax({
		url: 'http://'+ ip + ':' + port + '/api/v2/history_detail/5588c636e4b034996f5c75f9',
		type: 'GET', 
		beforeSend: function(xhr) { 
			xhr.setRequestHeader("X-API-TOKEN", access_token); 
		},
		async: false,
		success: function (data, statusText, xhr){
			SetResult("Get User History Detail", data, xhr);
			// $("#result").append("<h2>Get User History Detail</h2>");
			// $("#result").append("<h4>Status Code:</h4> " + "<p style='color:red'>" + xhr.status + "</p>" );
			// $("#result").append("<h4>Response:</h4> " + "<pre style='color:blue'>" + JSON.stringify(data) + "</pre>");
			// console.log(data);
			// console.log(xhr.status);
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log(jqXHR, textStatus, errorThrown);
		}
	});
}
function DeleteUserHistoryList(){}
function LogoutAllUser(){
	data = JSON.stringify({
			"refresh_token": refresh_token 
		});
	$.ajax({
		url: 'http://'+ ip + ':' + port + '/api/v2/logout_all',
		type: 'POST',      
		beforeSend: function(xhr) { 
			xhr.setRequestHeader("X-API-TOKEN", access_token); 
		},		
		data: data,
		async: false,
		success: function (data, statusText, xhr){
			SetResult("Logout All User", data, xhr);
			// $("#result").append("<h2>Logout All User</h2>");
			// $("#result").append("<h4>Status Code:</h4> " + "<p style='color:red'>" + xhr.status + "</p>" );
			// $("#result").append("<h4>Response:</h4> " + "<pre style='color:blue'>" + JSON.stringify(data) + "</pre>");
			// console.log(xhr.status);
		},
		error: function(jqXHR, textStatus, errorThrown){
			console.log(jqXHR, textStatus, errorThrown);
		}
	});
}
function SetResult(name, data, xhr) {
	$("#result").append("<h2>"+name+"</h2>");
	$("#result").append("<h4>Status Code:</h4> " + "<p style='color:red'>" + xhr.status + "</p>" );
	$("#result").append("<h4>Response:</h4> " + "<pre style='color:blue'>" + JSON.stringify(data, null, 4) + "</pre>");	
}