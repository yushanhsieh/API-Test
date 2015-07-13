var access_token;
var refresh_token;
var ip;
var port;
var FB_token;
var hardware_id;
var history_id;
$(document).ready(function() {
	$("#testForm").submit(function(event){
		$("#result").html("");
		event.preventDefault();
		ip = $("#inputIP").val();
		port = $("#inputPort").val();
		FB_token = $("#inputToken").val();
		TestAPI(ip, port, FB_token);
		// $("#inputIP").val("");
		// $("#inputPort").val("");
		// $("#inputToken").val("");
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
	PostDatatoSitewhere();
	GetUserHistoryList();
	GetUserHistoryDetail();
	DeleteUserHistoryList();
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
			$("#result").append("<h2>Login Fail</h2>");
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
			$("#result").append("<h2>Logout Fail</h2>");
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
			$("#result").append("<h2>Refresh Fail</h2>");
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
			$("#result").append("<h2>Get Profile Fail</h2>");
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
			$("#result").append("<h2>Modify Profile Fail</h2>");
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
			$("#result").append("<h2>Create Device Fail</h2>");
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
			$("#result").append("<h2>Get Device List Fail</h2>");
			console.log(jqXHR, textStatus, errorThrown);
		}
	});
}
function PostDatatoSitewhere(){
	data = JSON.stringify({
  "locations":[
    {
      "latitude":25.0605492,
      "longitude":121.6473738,
      "elevation":5,
      "eventDate":"2015-06-18T16:50:11.000+0800",
      "metadata":{
        "date":"2015-06-18_16:50:11"
      }
    },
    {
      "latitude":25.0605492,
      "longitude":121.6473738,
      "elevation":5,
      "eventDate":"2015-06-18T16:50:12.000+0800",
      "metadata":{
        "date":"2015-06-18_16:50:11"
      }
    },
    {
      "latitude":25.0605492,
      "longitude":121.6473738,
      "elevation":5,
      "eventDate":"2015-06-18T16:50:13.000+0800",
      "metadata":{
        "date":"2015-06-18_16:50:11"
      }
    },
    {
      "latitude":25.0605492,
      "longitude":121.6473738,
      "elevation":5,
      "eventDate":"2015-06-18T16:50:14.000+0800",
      "metadata":{
        "date":"2015-06-18_16:50:11"
      }
    },
    {
      "latitude":25.0605492,
      "longitude":121.6473738,
      "elevation":5,
      "eventDate":"2015-06-18T16:50:15.000+0800",
      "metadata":{
        "date":"2015-06-18_16:50:11"
      }
    },
    {
      "latitude":25.0605492,
      "longitude":121.6473738,
      "elevation":5,
      "eventDate":"2015-06-18T16:50:16.000+0800",
      "metadata":{
        "date":"2015-06-18_16:50:11"
      }
    },
    {
      "latitude":25.0605492,
      "longitude":121.6473738,
      "elevation":5,
      "eventDate":"2015-06-18T16:50:17.000+0800",
      "metadata":{
        "date":"2015-06-18_16:50:11"
      }
    },
    {
      "latitude":25.0605492,
      "longitude":121.6473738,
      "elevation":5,
      "eventDate":"2015-06-18T16:50:18.000+0800",
      "metadata":{
        "date":"2015-06-18_16:50:11"
      }
    }
  ],
  "measurements":[
    {
      "measurements":{
        "Distance":0,
        "Calories":0,
        "Speed":0,
        "BPS":0,
        "Cadence":0
      },
      "eventDate":"2015-06-18T16:50:11.000+0800",
      "metadata":{
        "date":"2015-06-18_16:50:11"
      }
    },
    {
      "measurements":{
        "Distance":0,
        "Calories":0,
        "Speed":0,
        "BPS":0,
        "Cadence":0
      },
      "eventDate":"2015-06-18T16:50:12.000+0800",
      "metadata":{
        "date":"2015-06-18_16:50:11"
      }
    },
    {
      "measurements":{
        "Distance":0,
        "Calories":0,
        "Speed":0,
        "BPS":0,
        "Cadence":0
      },
      "eventDate":"2015-06-18T16:50:13.000+0800",
      "metadata":{
        "date":"2015-06-18_16:50:11"
      }
    },
    {
      "measurements":{
        "Distance":0,
        "Calories":0,
        "Speed":0,
        "BPS":0,
        "Cadence":0
      },
      "eventDate":"2015-06-18T16:50:14.000+0800",
      "metadata":{
        "date":"2015-06-18_16:50:11"
      }
    },
    {
      "measurements":{
        "Distance":0,
        "Calories":0,
        "Speed":0,
        "BPS":0,
        "Cadence":0
      },
      "eventDate":"2015-06-18T16:50:15.000+0800",
      "metadata":{
        "date":"2015-06-18_16:50:11"
      }
    },
    {
      "measurements":{
        "Distance":0,
        "Calories":0,
        "Speed":0,
        "BPS":0,
        "Cadence":0
      },
      "eventDate":"2015-06-18T16:50:16.000+0800",
      "metadata":{
        "date":"2015-06-18_16:50:11"
      }
    },
    {
      "measurements":{
        "Distance":0,
        "Calories":0,
        "Speed":0,
        "BPS":0,
        "Cadence":0
      },
      "eventDate":"2015-06-18T16:50:17.000+0800",
      "metadata":{
        "date":"2015-06-18_16:50:11"
      }
    },
    {
      "measurements":{
        "Distance":0,
        "Calories":0,
        "Speed":0,
        "BPS":0,
        "Cadence":0
      },
      "eventDate":"2015-06-18T16:50:18.000+0800",
      "metadata":{
        "date":"2015-06-18_16:50:11"
      }
    }
	],
  "alerts":[
	  {
      "eventDate":"2015-06-18T16:50:11.000+0800",
			"type":"summary",
      "metadata":{
        "Duration":7,
        "TotalDistance":0,
        "TotalCalories":0,
        "AvgSpeed":0,
        "AvgBps":0,
        "AvgCadence":0,
        "AvgAltitude":5
      }
    }
  ],
  "hardwareId":"leo-hwid-test"
});
	$.ajax({
		url: 'https://api.iot.openlab.tw/sitewhere/api/devices/'+hardware_id+'/batch',
		type: 'POST', 
		beforeSend: function(xhr) { 
			xhr.setRequestHeader("Authorization", "Basic YWRtaW46TVJEIykpbXJkMzAw");
			xhr.setRequestHeader("Content-Type", "application/json");
		},
		data: data,
		async: false,
		success: function (data, statusText, xhr){	
			SetResult("Post Data to Sitewhere", data, xhr);
			history_id = data.createdAlerts[0].id;
		},
		error: function(jqXHR, textStatus, errorThrown){
			$("#result").append("<h2>Post Data to Sitewhere Fail</h2>");
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
			$("#result").append("<h2>Get User History List Fail</h2>");
			console.log(jqXHR, textStatus, errorThrown);
		}
	});
}
function GetUserHistoryDetail(){
	$.ajax({
		url: 'http://'+ ip + ':' + port + '/api/v2/history_detail/'+history_id,
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
			$("#result").append("<h2>Get User History Detail Fail</h2>");
			console.log(jqXHR, textStatus, errorThrown);
		}
	});
}
function DeleteUserHistoryList(){
	$.ajax({
		url: 'http://'+ ip + ':' + port + '/api/v2/history_list/'+history_id,
		type: 'DELETE', 
		beforeSend: function(xhr) { 
			xhr.setRequestHeader("X-API-TOKEN", access_token); 
		},
		async: false,
		success: function (data, statusText, xhr){
			SetResult("Delete User History List", data, xhr);
			// $("#result").append("<h2>Get User History Detail</h2>");
			// $("#result").append("<h4>Status Code:</h4> " + "<p style='color:red'>" + xhr.status + "</p>" );
			// $("#result").append("<h4>Response:</h4> " + "<pre style='color:blue'>" + JSON.stringify(data) + "</pre>");
			// console.log(data);
			// console.log(xhr.status);
		},
		error: function(jqXHR, textStatus, errorThrown){
			$("#result").append("<h2>Delete User History List Fail</h2>");
			console.log(jqXHR, textStatus, errorThrown);
		}
	});
}
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
			$("#result").append("<h2>Logout All User Fail</h2>");
			console.log(jqXHR, textStatus, errorThrown);
		}
	});
}
function SetResult(name, data, xhr) {
	$("#result").append("<h2>"+name+"</h2>");
	$("#result").append("<h4>Status Code:</h4> " + "<p style='color:red'>" + xhr.status + "</p>" );
	$("#result").append("<h4>Response:</h4> " + "<pre style='color:blue'>" + JSON.stringify(data, null, 4) + "</pre>");	
}
