# Overview

A common problem for Home Owners' Associations in South Africa is the non-payment of monthly fees. The larger the enclosed area, the more difficult it is to track. This tool aims to help solve this problem by creating an interactive tool that allows a non-GIS user to have a spatial view of the monthly payments that come in.

# Demo
![Spatial Payment Viewer Demo](https://media.giphy.com/media/4aeygRbDF4lixWXhIM/giphy.gif)

# Features

1. Interactive map
	* Zoom Control
	* Satellite Imagery Base Map (Optimised Esri World Imager)
	* Address Search (Esri World Geocoder)
	* Side load JSON cadastral land parcels
2. Print Functionality
	* Courtesy of [leaflet.browser.print](https://github.com/Igor-Vladyka/leaflet.browser.print)
3. Address File Upload (CSV)
	* Upload address file containing address details, coordinates and payment status
4. House Number Toggle
	* Turn house address street numbers on and off

# Usage

1. Launch the app
	* The app was developed using Google Chrome, but should be compatible with any modern web browser. If you get a message about allowing JavaScript to run, please allow as this is where the magic happens. An active internet connection is required for the application to work - this is for the base map and search features.
All of the controls are in the top left corner.
2. When the map loads, by default no data is present in the land parcels and they will appear grey
3. To visualize the payments, click the 'Upload address file' button and navigate to where you saved the application folder in step one. Inside here there is folder called data that contains a CSV file called 'addresses'. If you open this file the application will then translate its contents into the land parcels.
	* At the moment, the 'PAID' status is just random data I added to the file.
	* This file can be opened and manipulated in Excel. It is important that when changes are made, the updated file is always saved as a CSV as this is the format the application has been built to read. This file can be copied and moved around. If payments happen every month, then there could be an updated file for each month of the year for example.
4. Once you have loaded the data, you will see red/green land parcels depending on the payment status. Clicking on a block will produce a popup with the address (and alternative address) as per the uploaded file as well as the payment status.
	* All of this information sits in the addresses.csv file. Any updates and deletions made to the address information, coordinates and payment status in the address file will then reflect in the application when the modified file is uploaded.
5. Click on the House icon to toggle address numbers on and off as required.
6. The print button will allow you to print A4 maps. I recommend using the 'Auto' function as this will attempt to print the map covering the entire area as best as possible. If you want to print specific parts of the map, click 'Custom'. Your mouse will become a cross-hair and you can click and draw a rectangle on the map to select a specific area to print.
7. If you want to load a different file, simply refresh the web page and upload the alternative file.