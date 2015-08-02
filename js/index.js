
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

        app.TrackingEvent();

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

        //var receivedElement = parentElement.querySelector('.received');



         listeningElement.setAttribute('style', 'display:none;');

         //receivedElement.setAttribute('style', 'display:block;');



	document.getElementById('DevicePlatform').value = device.platform;
	document.getElementById('DeviceModel').value = device.model;
	document.getElementById('DeviceID').value = device.uuid;
	document.getElementById('DeviceVersion').value = device.version;
	document.getElementById('ConnectionType').value = navigator.connection.type;

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
    //alert('code: '    + error.code    + '\n' +
    //      'message: ' + error.message + '\n');
};

















