
var app = {

    initialize: function() {

        this.bindEvents();

    },

    // 'load', 'deviceready', 'offline', and 'online'.

    bindEvents: function() {

        document.addEventListener('deviceready', this.onDeviceReady, false);

        //document.addEventListener('offline', onOffline, false);
        //document.addEventListener('online', onOnline, false);
    },

    onDeviceReady: function() {

        app.receivedEvent('deviceready');

    },


    //onOffline: function(){
    //	document.getElementById('ConnectionStatus').value = "Offline";
    //},
    //onOnline: function(){
    //	document.getElementById('ConnectionStatus').value = "Online";
    //},


    receivedEvent: function(id) {

        var parentElement = document.getElementById(id);

        var listeningElement = parentElement.querySelector('.listening');

        var receivedElement = parentElement.querySelector('.received');


        listeningElement.setAttribute('style', 'display:none;');

        //receivedElement.setAttribute('style', 'display:block;');


	document.getElementById('LoadScreen').setAttribute('style', 'display:none;');


	document.getElementById('DevicePlatform').value = device.platform;
	document.getElementById('DeviceModel').value = device.model;
	document.getElementById('DeviceID').value = device.uuid;
	document.getElementById('DeviceVersion').value = device.version;
	document.getElementById('ConnectionType').value = navigator.connection.type;
        app.CheckLogIn();

    },

    CheckLogIn: function(){
	if(document.getElementById('UID').value == "")
	{
	 document.getElementById('HomeScreen').className = "loadhidden";
	 document.getElementById('LoginDiv').className = "ShowSection";
	 document.getElementById('BottomAppMenu').setAttribute('style', 'display:none;');
	}

	if(document.getElementById('UID').value != "")
	{
	 document.getElementById('LoginDiv').className = "loadhidden";
	 document.getElementById('HomeScreen').className = "ShowSection";
	 document.getElementById('BottomAppMenu').setAttribute('style', 'display:block;');
         app.TrackingEvent();

	}
    },

    TrackingEvent: function(){
	var TrackLocation = navigator.geolocation.watchPosition(onCurLocSuccess, onCurLocError, { maximumAge: 3000, enableHighAccuracy: true });
    }
};



function onCurLocSuccess(position) {
 document.getElementById('Longitude').value = position.coords.longitude;
 document.getElementById('Latitude').value = position.coords.latitude;
 document.getElementById('Altitude').value = position.coords.altitude;
 document.getElementById('Accuracy').value = position.coords.accuracy;
 document.getElementById('AltitudeAccuracy').value = position.coords.altitudeAccuracy;
 document.getElementById('Heading').value = position.coords.heading;
 document.getElementById('Speed').value = position.coords.speed;
 document.getElementById('Timestamp').value = position.timestamp;
};

function onCurLocError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
};


function LogIn(){
 errorc = "";
 if (document.getElementById('UserName').value == "")
 {
   errorc += "1";
   document.getElementById('UserName').style.backgroundColor="yellow ";
 }
 else
 {
   document.getElementById('UserName').style.backgroundColor="white ";
 }

 if (document.getElementById('Password').value == "")
 {
   errorc += "1";
   document.getElementById('Password').style.backgroundColor="yellow ";
 }
 else
 {
   document.getElementById('Password').style.backgroundColor="white ";
 }
if (errorc == ""){

	 var http = new XMLHttpRequest();
	 var url = "http://www.loadstatus.com/App/Login.asp";
	 var params = "DeviceID="+document.getElementById('DeviceID').value;
	 var params = params+"&UserName="+document.getElementById('UserName').value;
	 var params = params+"&Password="+document.getElementById('Password').value;
	 var params = params+"&Longitude="+document.getElementById('Longitude').value;
	 var params = params+"&Latitude="+document.getElementById('Latitude').value;
	 http.open("POST", url, true);
	 http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	 http.setRequestHeader("Content-length", params.length);
	 http.setRequestHeader("Connection", "close");
	 http.onreadystatechange = function() {
	    if(http.readyState == 4) {
		var strresults = http.responseText;
			var actionressults = strresults.split("|~|")

			 if (actionressults[0] === "Success")
			  {
				document.getElementById('UID').value = actionressults[1];

			 	//document.getElementById('HomeScreen').setAttribute('style', 'display:block;');


			 	//document.getElementById('LoginDiv').setAttribute('style', 'display:none;');

				document.getElementById('HomeScreen').className = "ShowSection";
				document.getElementById('LoginDiv').className = "HideSection";
			 	document.getElementById('eMessErr').setAttribute('style', 'display:none;');
			 	document.getElementById('eMessErr').innerHTML = "";
				document.getElementById('BottomAppMenu').setAttribute('style', 'display:block;');
			  }
			 if (actionressults[0] === "Fail")
			  {
				document.getElementById('UID').value = "";
			 	document.getElementById('eMessErr').innerHTML = actionressults[1];
			 	document.getElementById('eMessErr').setAttribute('style', 'display:block;');
			  }

			 if (actionressults[0] != "Fail" && actionressults[0] != "Success")
			  {
				var networkState = navigator.connection.type;

				if(networkState == "NONE" || networkState == "none")
				{
					document.getElementById('UID').value = "";
					navigator.notification.alert('Could not connect to network', alertCallback, 'Error', 'Ok')
				}else{
					document.getElementById('UID').value = "";
					navigator.notification.alert('Something wrong with log in', alertCallback, 'Error', 'Ok')
				}
			  }

	    }
	 }
	 http.send(params);
}
}


function alertCallback(){


}




function LogInTest(){

 errorc = "";
 if (document.getElementById('UserName').value == "")
 {
   errorc += "1";
   document.getElementById('UserName').style.backgroundColor="yellow ";
 }
 else
 {
   document.getElementById('UserName').style.backgroundColor="white ";
 }

 if (document.getElementById('Password').value == "")
 {
   errorc += "1";
   document.getElementById('Password').style.backgroundColor="yellow ";
 }
 else
 {
   document.getElementById('Password').style.backgroundColor="white ";
 }

 if (errorc == ""){

 document.getElementById('UserName').value = "1";
 document.getElementById('UFirstName').value = "Brian";
 document.getElementById('ULastName').value = "Atherton";
 //document.getElementById('MainDiv').setAttribute('style', 'display:block;');


 //document.getElementById('LoginDiv').setAttribute('style', 'display:none;');


	 document.getElementById('LoginDiv').className = "loadhidden";
	 document.getElementById('HomeScreen').className = "ShowSection";
	 document.getElementById('BottomAppMenu').setAttribute('style', 'display:block;')
 }
}

function ShowCustomer(){
 document.getElementById('Customer').className = "ShowSection";
 document.getElementById('HomeScreen').className = "HideSection";
}

function CloseCustomer(){
 document.getElementById('HomeScreen').className = "ShowSection";
 document.getElementById('Customer').className = "HideSection";
}



function GetAPic(){
 navigator.camera.getPicture(onPicSuccess, onPicFail, { quality: 100,destinationType: Camera.DestinationType.FILE_URI,saveToPhotoAlbum: true,  targetWidth: 600,  targetHeight: 600, });

 function onPicSuccess(imageURI) {
alert(imageURI);
document.getElementById('myImage').src = imageURI;
    //var image = document.getElementById('myImage');
    //image.src = imageURI;
   // document.getElementById('myImageDiv').innerHTML = imageURI;

 };

 function onPicFail(message) {
    alert('Failed because: ' + message);
 };

}








