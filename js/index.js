//create the map
var map = L.map('map', {
	zoomControl:true, maxZoom:17, minZoom:14,
});
var hash = new L.Hash(map);
map.attributionControl.addAttribution('Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>');
var bounds_group = new L.featureGroup([]);
L.esri.basemapLayer('ImageryClarity').addTo(map);

// create the geocoding control and add it to the map
var searchControl = L.esri.Geocoding.geosearch().addTo(map);

// create an empty layer group to store the results and add it to the map
var results = L.layerGroup().addTo(map);

// listen for the results event and add every result to the map
searchControl.on("results", function(data) {
	results.clearLayers();
	for (var i = data.results.length - 1; i >= 0; i--) {
		results.addLayer(L.marker(data.results[i].latlng));
	}
});
	
//add file upload
L.easyButton( 'fa-upload', function(){
	$('#csv').click();
},
"Upload Address File"
).addTo(map);
		
var addresses;

var fileInput = document.getElementById("csv"),

	readFile = function () {
		var reader = new FileReader();
		reader.onload = function () {
			addresses = $.csv.toArrays(reader.result);
			updatedPolys = join();
			//layer_Cadastre_1.clearLayers();
			layer_Cadastre_1.addData(updatedPolys);					
			//overlay_StamenTonerLabels_2.bringToFront();
			//overlay_esriLabels.bringToFront();
			
		};
		// start reading the file. When it is done, calls the onload event defined above.
		reader.readAsText(fileInput.files[0]);
	};

fileInput.addEventListener('change', readFile);		

function join() {
	var i;
	var paid_idx;
	var lat_idx;
	var lon_idx;
	var num_idx;
	var name_idx;
	var type_idx;
	var points = [];
	var polygons = layer_Cadastre_1.toGeoJSON();
	for (i = 0; i < addresses.length; i++) { 
		var j;
		for (j = 0; j < addresses[i].length; j++) { 
			//get the field indices
			if (i == 0){
				if (addresses[i][j] == 'LAT'){
					lat_idx = j;
				}
				if (addresses[i][j] == 'LON'){
					lon_idx = j;
				}						
				if (addresses[i][j] == 'PAID'){
					paid_idx = j;
				}
				if (addresses[i][j] == 'STR_NUM'){
					num_idx = j;
				}
				if (addresses[i][j] == 'STREET'){
					name_idx = j;
				}
				if (addresses[i][j] == 'STR_TYPE'){
					type_idx = j;
				}
			}
			}
		if (i > 0){
			var k;
			for (k=0; k< polygons.features.length; k++){
				if (inside([addresses[i][lon_idx], addresses[i][lat_idx]], polygons.features[k].geometry.coordinates[0][0])){
					if (polygons.features[k].properties.paid != 'YES'){
						polygons.features[k].properties.paid = addresses[i][paid_idx]
					}
					if (polygons.features[k].properties.hasOwnProperty('NO')){
						polygons.features[k].properties.NO2 = addresses[i][num_idx]
						polygons.features[k].properties.NAME2 = addresses[i][name_idx]
						polygons.features[k].properties.TYPE2 = addresses[i][type_idx]							
					}else{
						polygons.features[k].properties.NO = addresses[i][num_idx]
						polygons.features[k].properties.NAME = addresses[i][name_idx]
						polygons.features[k].properties.TYPE = addresses[i][type_idx]
					}
				}
				}
			}
	}
	
	console.log(polygons);
	
	return polygons

}

function inside(point, vs) {
	// ray-casting algorithm based on
	// http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html

	var x = point[0], y = point[1];

	var inside = false;
	for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
		var xi = vs[i][0], yi = vs[i][1];
		var xj = vs[j][0], yj = vs[j][1];

		var intersect = ((yi > y) != (yj > y))
			&& (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
		if (intersect) inside = !inside;
	}

	return inside;
};		

function setBounds() {
	map.fitBounds(layer_Cadastre_1.getBounds());
}


function style_Cadastre_1_0(feature) {
	switch(String(feature.properties['paid'])) {
		default:
			return {
		pane: 'pane_Cadastre_1',
		opacity: 1,
		color: 'rgba(255,255,255,0.2)',
		dashArray: '',
		lineCap: 'butt',
		lineJoin: 'miter',
		weight: 1, 
		fill: true,
		fillOpacity: 0.7,
		fillColor: 'rgba(70,79,154,0.2)',
	}
		case 'NO':
			return {
		pane: 'pane_Cadastre_1',
		opacity: 1,
		color: 'rgba(255,255,255,0.2)',
		dashArray: '',
		lineCap: 'butt',
		lineJoin: 'miter',
		weight: 1, 
		fill: true,
		fillOpacity: 0.7,
		fillColor: 'rgba(180,50,50,0.8)',
	}
			break;
		case 'YES':
			return {
		pane: 'pane_Cadastre_1',
		opacity: 1,
		color: 'rgba(255,255,255,0.2)',
		dashArray: '',
		lineCap: 'butt',
		lineJoin: 'miter',
		weight: 1, 
		fill: true,
		fillOpacity: 0.7,
		fillColor: 'rgba(50,180,50,0.8)',
	}
			break;
	}
}

function pop_Cadastre_1(feature, layer) {

	var popupContent = '';
	//popupContent += (feature.properties.paid) ? '<b>PAID:</b> ' + feature.properties.paid : '';
	

	popupContent += '<table>\
			<tr>\
				<td colspan="2">' + (feature.properties['paid'] == null ? Autolinker.link('<b>Please load the address data file using the upload button on the left</b>') : '') + '</td>\
			</tr>\
			<tr>\
				<td colspan="2">' + (feature.properties['paid'] != null ? Autolinker.link('<b>PAID:</b> '+String(feature.properties['paid'])) : '') + '</td>\
			</tr>\
			<tr>\
				<td colspan="2">' + (feature.properties['NO'] != null ? Autolinker.link('<b>ADDRESS:</b> '+ String(feature.properties['NO'])) : '') + ' '
								  + (feature.properties['NAME'] != null ? Autolinker.link(String(feature.properties['NAME'])) : '') + ' '
								  + (feature.properties['TYPE'] != null ? Autolinker.link(String(feature.properties['TYPE'])) : '') + '</td>\
			</tr>\
				<td colspan="2">' + (feature.properties['NO2'] != null ? Autolinker.link('<b>ALT ADDRESS:</b> ' + String(feature.properties['NO2'])) : '') + ' '
								  + (feature.properties['NAME2'] != null ? Autolinker.link(String(feature.properties['NAME2'])) : '') + ' '
								  + (feature.properties['TYPE2'] != null ? Autolinker.link(String(feature.properties['TYPE2'])) : '') + '</td>\
			</tr>\
		</table>';
	layer.bindPopup(popupContent, {width: 400});
}

map.createPane('pane_Cadastre_1');
map.getPane('pane_Cadastre_1').style.zIndex = 401;
map.getPane('pane_Cadastre_1').style['mix-blend-mode'] = 'normal';
var layer_Cadastre_1 = new L.geoJson(json_Cadastre_1, {
	attribution: '<a href=""></a>',
	pane: 'pane_Cadastre_1',
	onEachFeature: pop_Cadastre_1,
	style: style_Cadastre_1_0,
});
bounds_group.addLayer(layer_Cadastre_1);
map.addLayer(layer_Cadastre_1);
		
//label layer
var topPane = map.createPane('labels');
map.getPane('labels').style.zIndex = 650;
map.getPane('labels').style.pointerEvents = 'none';
 L.esri.basemapLayer('ImageryTransportation',{
	pane: 'labels'
 }).addTo(map);
setBounds();

//add printer
L.control.browserPrint({
	documentTitle: "Home Owners' Association",
	closePopupsOnPrint: true
}).addTo(map);

var toggler = 0;
//add label toggle
L.easyButton( 'fa-home', function(){
	if (toggler == 0){
		addLabels();
		toggler += 1;
	}else{
		removeLabels();
		toggler -=1;
	}
},
"Toggle House Numbers"
).addTo(map);

function addLabels(){
	layer_Cadastre_1.eachLayer(function(layer) {
	  //console.log(layer.feature.properties.NO);
	  layer.bindTooltip(layer.feature.properties.NO, {permanent: true,
													  direction: 'center',
													  opacity: 1,
													  className: 'label_class'}).openTooltip();
	});
};

function removeLabels(){
	map.eachLayer(function(layer) {
		if(layer.options.pane === "tooltipPane") layer.removeFrom(map);
	});
};	