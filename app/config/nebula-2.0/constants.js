myApp.constant("constants", {
  login: {
    "background": '<img src="//s3.amazonaws.com/scriptr-cdn/smart-kitchens/images/kitchen-bg.jpg" />',
    "smallImage": '<img src="//s3.amazonaws.com/scriptr-cdn/smart-kitchens/images/oven.png">'
      
  },
  sources : {
    "nebula20": {
   	  "mapMarker": {
          url: "//s3.amazonaws.com/scriptr-cdn/smart-kitchens/images/marker-kitchen.png"
   	  }
    }
  },
  sourcesLabels: {
    "nebula20": "Nebula 2.0"
  },
  infoWindows: {
    "icons": {
         "id": '<img  src="//s3.amazonaws.com/scriptr-cdn/smart-kitchens/images/icon-kitchen.png">',
         "temperature": '<img alt="Embedded Image"  width="17" height="30" src="//s3.amazonaws.com/scriptr-cdn/common/images/temperature.png"/>',
         "humidity": '<img alt="Embedded Image"  src="//s3.amazonaws.com/scriptr-cdn/common/images/humidity.png" />',
         "pressure": '<img alt="Embedded Image"  src="//s3.amazonaws.com/scriptr-cdn/common/images/pressure.png" />',
         "building": '<img alt="Embedded Image"  src="//s3.amazonaws.com/scriptr-cdn/common/images/building.png" />',
         "locationType": '<img alt="Embedded Image"    src="//s3.amazonaws.com/scriptr-cdn/common/images/industrial.png" />',
         "time": '<img  alt="Embedded Image"    src="//s3.amazonaws.com/scriptr-cdn/common/images/time.png" />',
         "dmp": ' <img   alt="Embedded Image" src="//s3.amazonaws.com/scriptr-cdn/common/images/dmp.png">',
         "proximity": '<img alt="Embedded Image"  src="//s3.amazonaws.com/scriptr-cdn/common/images/proximity.png" />',
         "accelerometer": '<img alt="Embedded Image"  src="//s3.amazonaws.com/scriptr-cdn/common/images/accelerometer.png" />',
         "gyroscope": '<img alt="Embedded Image" src="//s3.amazonaws.com/scriptr-cdn/common/images/gyroscope.png" />',
         "magnetic": '<img alt="Embedded Image"  src="//s3.amazonaws.com/scriptr-cdn/common/images/magnetic.png" />'
     }
  },
  alertsGrid: [
      {headerName: "Temperature", field: "temperature", cellRenderer: function(params){return params.value + " " + params.data.temperature_unit}},
      {headerName: "Humidity", field: "humidity", cellRenderer: function(params){return params.value  + " " + params.data.humidity_unit}},
      {headerName: "Pressure", field: "pressure", cellRenderer: function(params){return params.value + " " + params.data.pressure_unit}},
      {headerName: "Timestamp", field: "creationDate"},
      {headerName: "Temperature Unit", field: "temperature_unit", hide: true},
      {headerName: "Humidity Unit", field: "humidity_unit", hide: true},
      {headerName: "Pressure Unit", field: "pressure_unit", hide: true},
      {headerName: "Alerts", field: "alert_type", cellStyle: {'white-space': 'normal', 'word-break': 'break-all'}},
  ]
})