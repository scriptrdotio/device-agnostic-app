# Device Agnostic App
The device agnostic app is meant to jump start your development with scriptr.io and any device you have. It's a complete end-to-end scenario that allows you to connect your device and view its live adn historical data as you like.
By default it ships with a list of pre-configured devices.



# Features

Devices publish data to scriptr.io, either directly or through a DMP, over an MQTT connection. The data is then consumed by the "app/api/subscription/subscriber" script, parsed and saved. The application features the following:
- Map: devices are displayed on a map. When the map's marker is clicked, the device's data are displayed in real-time.
- Dashboard: real-time and historical data from the device can be viewed on a dashboard.
- Rules Editor: rules can be created visually so that whenever a certain metric meets a certain business rule, such as exceeding a given value, an action is executed. Actions can include sending an email notification, logging the event, etc.
- Alerts View: a log of the events where sensor data meet a condition defined in the Rules Editor.

Regarding the Nebula 2.0 device, message publishing/consumption from the device to scriptr.io occurs as follow:
- The nebula-2.0 publishes the message to IBM Watson over MQTT using a specific client ID
- In scriptr.io, an MQTT endpoint that points to the IBM Watson instance is set under Settings/External Endpoints
- A bridge is created between the nebulaDigest Channel using the previous external endpoint configuration
- The API "app/api/subscription/subscriber" consumes the messages by subscribing to the nebulaDigest channel.

Note that the nebula-2.0's expected payload is as follow:
```
{"d": 
	{
    	"p":"953.72",
    	"h_unit":"%",
        "p_unit":"Pa",
        "t":"2.48",
        "h":"3.09",
        "t_unit":
        "C",
        "id":"nebula20"
	}
}
```
- Installation API "app/install/auto.install.scriptr" to install the app dependencies:
     - The channels needed by the application.
     - A default subdomain for the account, if not available.
     - Default credentials (demo/demo) to use for login.
     - External End points and bridges when needed.
     - Deploy the device type specific configuration files.

# How to view the application
The application's entry point is "app/view/html/login.html".

The installation API "app/install/auto.install.scriptr" needs to be executed once. You need to pass a setupKey parameter to the script. The setupKey can be one of the following:
	- B-L072Z-LRWAN1
	- B-L475E-IOT01A
	- nebula-2.0
     
You select the setupKey based on the device type you are connecting to the application. Each device type has set of specific configuration files to be deployed during installation. The files are available under config/<DEVICE_TYPE>/.

If you registered with scriptr.io with the a promotion code, this script should have already been executed with the device type defined by the promocode.

To visualize your device data in real-time, open the script "app/view/html/login.html" and click View, then login with the demo/demo credentials. You will land on a map with a cluster view of the device whenever it starts pushing data.

Zooming into the map and clicking on a marker will display an info window with the latest data the device has published. You can click on edit dashboard to view a detailed dashboard of a specific device.

Clicking on alerts lists all the logged events from your devices.

As your device starts pushing data the dashboard and the map will reflect the new readings from your devices automatically.

# Notes
This app provides a config file you can use to setup default info for your device. Assuming your device is of type nebula-2.0 was build and compiled with an id set to "xxx", update config/config file nebula20 object with the info you want such as latitude, longitude, etc.
```
"myDevice": {
        "lat": 45.5602805, 
        "long": -73.8521324,
        "building": "Freedom Tower",
        "city": "Montreal",
        "country": "Canada",
        "locationType": "Industrial",
        "locationSection": "kitchen",
        "physicalEnvironment": "Fridge",
        "sensor": "nebula",
        "source": "simulator"
    }
```

# Dependencies
Underscore module (if you registered with scriptr.io with a promotion code, this module should have already been installed).

Your application is deployed to your account with a package version of the [UIComponents](https://github.com/scriptrdotio/UIComponents) module which you can find under app/view/build/. If you wish to use an unpackaged version of the [UIComponents](https://github.com/scriptrdotio/UIComponents) module and modify it, replace index.html with index.unpackage.html and checkout the master branch of [UIComponents](https://github.com/scriptrdotio/UIComponents). Read more about it [here](https://github.com/scriptrdotio/https://github.com/scriptrdotio/device-agnostic-app/tree/master/app/view/build/Readme.md).

# About the code
This section gives you an overview of the structure of the application and describes the responsibilities of the different scripts and file that compose it.

## app/api folder
The api folder contains scripts that define the API of the application, i.e. they are used by clients, such as the user interface (UI) or the client application running on the devices.

- app/api/subscription/subscriber: this script is subscribed to the deviceDigest channel and would consume all the messages containing the measurements made by the device's sensors.
"app/api/subscription/subscriber" uses "entities/devicemanager" to persit the data. It uses "entities/deviceevaluator" to check for the occurrence of alerts. 
The script also uses "entities/devicePublisher" to publish the received data in real-time to the UI.
- api/getDeviceAlerts: this script is invoked by the UI to obtain the list of the alerts that were triggered for a device by the application. This list is actually obtained from "entities/deviceManager". Passing the "filter" parameter narrows the list to the alerts related to the device with and id matching the value of "filter". 
- api/getDeviceHistory: this script is invoked by the UI to obtain the list of all the events that occurred through time for a device. 
- api/getLatestDevices: this script is invoked by the UI to obtain the latest events of all devices.
- api/getLatestDevices: this script is invoked by the UI to obtain the latest event of a specific device.

## /entities folder
This folder contains the scripts that implement the business logic and business rules of the application. 

- /entities/deviceManager: this script is responsible for managing device data and persiting them in the "Default" data store of your account (**note:** to view your data stores, click on "Tools" in the scriptr.io workspace toolbar, then click on "Data Explorer").
- /entities/deviceevaluator: the deviceEvaluator receives device data and applies business rules on them to determine if an alert should be raised. Business rules are defined in a decision table ("/entities/rules/decisionTable"), which is loaded and executed by the entities/deviceevaluator script (**note:** decision tables are standalone API, i.e. you can send them requests - e.g. http requests - or you can execute them from within a script by using the **sdtLibScript.execute()** utility. Check "/entities/utils" for details)
- /entities/devicePublisher: the devicePublisher reads the latest updates from the deviceManager, transforms them into a format that suits the expectations of the charts in the UI, and broadcasts them to the latter by publishing the data into the "responseChannel"  channel (**note:** we use channels in scriptr.io to broadcast messages in real-time to other components, such as for example UI components). The charts in the UI are subscribed to the channel upon installation of the application and therefore, will automatically reflect data updates as soon as they are ingested (app/api/subscription/subscriber).
- /entities/utils: a utility script that contains utility functions, such as format(), to transform incoming device data into a structure that is expected by the UI
-/entities/rules/decisionTable: a decision table that defines the conditions to generate an alert (some threshold values). You can modify these rules visually from the scriptr.io workspace (the script opens in a decision table editor)

## /entities/actions
This folder contains two utility scripts for applying email templates.
- /entities/actions/emailOnAlert: a simple script that applies an email template to some content, before sending it using scriptr.io's  built-in "sendMail()" function
- /entities/actions/templates: simple email template definition for alerts

## /entities/mapper
This folder contains a script to cleanup the devices events data
- /cleanup/devicesEvents: a simple script that cleans up the events of all devices in order to keep the events number per device to 50 at all time on the scriptr.io free tier.

## /cleanup
This folder contains a script to cleanup the devices events data
- /cleanup/devicesEvents: a simple script that cleans up the events of all devices in order to keep the events number per device to 50 at all time on the scriptr.io free tier.

## /view folder
This folder contains the scripts that define the User Interface of the application. The scripts are distributed into three seperate sub-folders depending on their type: "/html" for the HTML pages, "/javascript" for the controllers (MVC design) and "/css" for the look and feel. Note that the UI is leveraging a subset of scriptr.io's UI component, which has been pre-packed for this demo application.

### /view/html
- /view/html/index.html: this page is the template of the application's UI: it is composed of a header, a menu on the left-side, and a content section, within which different pages will be displayed depending on the action triggered by the user of the application.
- /view/html/login.html, /view/html/logout.html: these pages are used for the login/logout process. They are part of the login component that you can install as a separate module.

#### /view/html/views/main
- view/html/views/main/main.html: the main content, composed of a map widget showing the location of the devices (assuming the devices are sending location data. If you have an mDot-Box device, switch to the GPS Survey mode to receive the location of your device)
- view/html/views/main/info_generic.html: this is an info window shown when clicking on a device marker on the map
- /html/views/main/dashboard.html:  the dashboard that displays the latest values received from the Conduit device as well as the historical data (i.e. the different values through time)

#### /view/html/views/alerts
- /view/html/views/alerts/alerts.html: grid that displays the list of alerts that were generated when receiving device data (alerts are generated depending on the business rules defined in "/entities/rules/alerts"
- Columns displayed in the alerts grid are defined in the view/javascript/constants unders alertsGrid key
```
   alertsGrid: [
      {headerName: "Temperature", field: "temperature", cellRenderer: function(params){return params.value + " °C"}},
      {headerName: "Humidity", field: "humidity", cellRenderer: function(params){return params.value  + " %"}},
      {headerName: "Pressure", field: "pressure", cellRenderer: function(params){return params.value + " Pa"}},
      {headerName: "Proximity", field: "proximity", cellRenderer: function(params){return params.value + " mm"}},
      {headerName: "Accelerometer", field: "acc_x", cellRenderer: function(params){return params.value + ", "+ params.data.acc_y+", "+params.data.acc_z}},
      {headerName: "Gyroscope", field: "gyr_x", cellRenderer: function(params){return params.value + ", "+ params.data.gyr_y+", "+params.data.gyr_z}},
      {headerName: "Magnetometer", field: "mag_x", cellRenderer: function(params){return params.value + ", "+ params.data.mag_y+", "+params.data.mag_z}},
      {headerName: "Timestamp", field: "creationDate"},
      {headerName: "Alerts", field: "alert_type", cellStyle: {'white-space': 'normal', 'word-break': 'break-all'}},
  ]
  
```
The field entry for each column definition refers to the data stored to each device event. 

### /view/javascript
The device-agnostic-app application leverages Angular.js and therefore adopts the corresponding MVC implementation. This folder contains the definition of the application's controllers.

- view/javascript/module.js: implements the routing logic of the menu
- view/javascript/controller.js: the main controller of the application
- view/javascript/layout.js: defines the items used in the header, menu and header of the application
- view/javascript/config.js: configuration of the application (http and websocket providers)

