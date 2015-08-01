
var app = {

    initialize: function() {

        this.bindEvents();

    },

    // 'load', 'deviceready', 'offline', and 'online'.

    bindEvents: function() {

        document.addEventListener('deviceready', this.onDeviceReady, false);

       // document.addEventListener("offline", onOffline, false);
       // document.addEventListener("online", onOnline, false);
    },

    onDeviceReady: function() {

        app.receivedEvent('deviceready');

        app.TrackingEvent();

    },


    onOffline: function(){
	//document.getElementById('NetworkConnectionType').value = "No network connection";
    },
    onOnline: function(){
	//document.getElementById('NetworkConnectionType').value = "Online";
    },

    receivedEvent: function(id) {

        var parentElement = document.getElementById(id);

        var listeningElement = parentElement.querySelector('.listening');

        var receivedElement = parentElement.querySelector('.received');


         listeningElement.setAttribute('style', 'display:none;');

         receivedElement.setAttribute('style', 'display:block;');


	  document.getElementById('DeviceInfo').innerHTML = device.model+' '+device.platform+'<br> '+device.version+'<br>'+device.uuid+'<br>connection: '+navigator.connection.type;
    },
    TrackingEvent: function(){
	var TrackLocation = navigator.geolocation.watchPosition(onCurLocSuccess, onCurLocError, { maximumAge: 3000, enableHighAccuracy: true });
    }
};



//var watchID = navigator.geolocation.getCurrentPosition(onCurLocSuccess, onCurLocError, { maximumAge: 3000, enableHighAccuracy: true });

//function SetTrackLocation{
//var TrackLocation = navigator.geolocation.watchPosition(onCurLocSuccess, onCurLocError, { maximumAge: 3000, enableHighAccuracy: true });
//};

function onCurLocSuccess(position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br/>' +
                        'Longitude: ' + position.coords.longitude     + '<br/>' +
		        'Altitude: '          + position.coords.altitude          + '<br/>' +
		        'Accuracy: '          + position.coords.accuracy          + '<br/>' +
        		'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '<br/>' +
        		'Heading: '           + position.coords.heading           + '<br/>' +
        		'Speed: '             + position.coords.speed             + '<br/>' +
        		'Timestamp: '         + position.timestamp                + '<br/>'
                       // '<hr />'      + element.innerHTML;
};

function onCurLocError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
};

















