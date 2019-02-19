myApp.constant("constants", {
  appTitle: "Livestock fitbit",
  login: {
    "background": '//s3.amazonaws.com/scriptr-cdn/livestock-fitbit/bg2.jpg',
    "smallImage": '<img src="//s3.amazonaws.com/scriptr-cdn/livestock-fitbit/login-img.png">'

  },
   sources : {
    "B-L072Z-LRWAN1": { 
   	  "mapMarker": {
          url: "//s3.amazonaws.com/scriptr-cdn/common/images/marker-cow.png"
   	  }
    }
  },
  sourcesLabels: {
    "B-L072Z-LRWAN1": "STM32L0 Discovery kit LoRa, Sigfox, low-power wireless"
  },
  infoWindows: {
    "icons": {
         "id": '<img  src="//s3.amazonaws.com/scriptr-cdn/common/images/icon-cow.png">',
         "temperature": '<img alt="Embedded Image"  width="17" height="30" src="//s3.amazonaws.com/scriptr-cdn/common/images/temperature.png" />',
         "humidity": '<img alt="Embedded Image"  src="//s3.amazonaws.com/scriptr-cdn/common/images/humidity.png" />',
         "pressure": '<img alt="Embedded Image"  src="//s3.amazonaws.com/scriptr-cdn/common/images/pressure.png" />',
         "address": '<img alt="Embedded Image"  src="//s3.amazonaws.com/scriptr-cdn/common/images/location.png" />',
         "locationType": '<img alt="Embedded Image"    src="//s3.amazonaws.com/scriptr-cdn/common/images/ranch.png" />',
         "time": '<img  alt="Embedded Image"    src="//s3.amazonaws.com/scriptr-cdn/common/images/time.png" />',
         "device": ' <img   alt="Embedded Image" src="//s3.amazonaws.com/scriptr-cdn/common/images/device.png">',
         "proximity": '<img alt="Embedded Image"  src="//s3.amazonaws.com/scriptr-cdn/common/images/proximity.png" />',
         "accelerometer": '<img alt="Embedded Image"  src="//s3.amazonaws.com/scriptr-cdn/common/images/accelerometer.png" />',
         "gyroscope": '<img alt="Embedded Image" src="//s3.amazonaws.com/scriptr-cdn/common/images/gyroscope.png" />',
         "magnetic": '<img alt="Embedded Image"  src="//s3.amazonaws.com/scriptr-cdn/common/images/magnetic.png" />'
     }
  },
  alertsGrid: [
      {headerName: "Temperature", field: "temperature", cellRenderer: function(params){return params.value + " °C"}},
      {headerName: "Humidity", field: "humidity", cellRenderer: function(params){return params.value  + " %"}},
      {headerName: "Pressure", field: "pressure", cellRenderer: function(params){return params.value + " Pa"}},
      {headerName: "Timestamp", field: "creationDate"},
      {headerName: "Alerts", field: "alert_type", cellStyle: {'white-space': 'normal', 'word-break': 'break-all'}},
  ]
})