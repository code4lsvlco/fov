extends ../layout/layout

block content
  script(src="/javascripts/leaflet.js")
  link(rel="stylesheet" href="/stylesheets/leaflet.css")
  script(src="https://cdn.jsdelivr.net/lodash/4.16.3/lodash.min.js")
  script(src="https://npmcdn.com/@turf/turf@3.5.1/turf.min.js")
  script(src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.15.1/moment.min.js")
  script(src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js")
  script(src="https://d3js.org/d3.v3.min.js")
  script(src="https://unpkg.com/esri-leaflet@2.1.0/dist/esri-leaflet.js")
  script(src="https://unpkg.com/esri-leaflet-vector")
  script(src="/javascripts/daterangepicker.js")
  script(src='https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/Leaflet.fullscreen.min.js')
  script(src="/javascripts/easyprint.js")
  
  link(rel="stylesheet" href="/stylesheets/fleet_map_one.css")
  link(rel="stylesheet" href="/stylesheets/daterangepicker.css")
  link(rel="stylesheet" href="https://api.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v1.0.1/leaflet.fullscreen.css")
  
  .container#mapContainer
    .row
      div &nbsp;
      #reportrange.pull-right(style="font-size: 2em; background: #fff; cursor: pointer; padding: 5px 10px; width: 100%; border-radius: 5px;")
        i.glyphicon.glyphicon-calendar.fa.fa-calendar(style="padding-right: 10px;")
        | &nbsp;
        span(style="padding-right: 10px;")
        b.fa.fa-caret-down  

    .row
      .col-md-8(style="padding-top: 25px;")
        #map(style="height: 500px; width: ; padding-top: 100px; border-radius: 20px; z-index: 0;")
        
        #basemaps-wrapper.leaflet-bar
          select#basemaps(name="basemaps" onChange="changeBasemap(basemaps)")
            option(value="Newspaper" selected=true) Newspaper
            option(value="ModernAntique") ModernAntique
            option(value="BlackAndWhite") BlackAndWhite
            option(value="Spring") Spring
            option(value="MidCentury") Mid-Century
            option(value="Topographic") Topographic
            option(value="Gray") Gray
            option(value="DarkGray") Dark Gray
            option(value="Navigation") Navigation
            option(value="Streets") Streets
            option(value="StreetsNight") Streets Night
            option(value="StreetsRelief") Streets Relief

        #chart
      .col-md-4 
        h1= title
        ul.list-group#segmentInformation
        
  script.
    var vehicleSegments = !{vehicleSegments};
    console.log(vehicleSegments);
    //- var vehicleJSON = !{vehicleToMap};
    //- console.log(vehicleJSON);
    //- var vehicleTrips = !{vehicleTrips};
    
    var url = new URL(window.location.href);
    var start = url.searchParams.get("from");
    var end = url.searchParams.get("to");
    start = moment(start);
    end = end ? moment(end) : moment(start);

    function cb(start, end) {
      $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
      window.location="http://localhost:3000/fleet/map/" + vehicleSegments[0].AssetID + "?range=days&from=" + start.format('YYYY-MM-DD') + "T00:00:00Z&to=" + end.format('YYYY-MM-DD') + "T00:00:00Z";
    }
    
    $('#reportrange').daterangepicker({
        startDate: start,
        endDate: end,
        ranges: {
           'Today': [moment(), moment()],
           'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
           'Last 7 Days': [moment().subtract(6, 'days'), moment()],
           'Last 30 Days': [moment().subtract(29, 'days'), moment()],
           'This Month': [moment().startOf('month'), moment().endOf('month')],
           'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
           'This Year': [moment().startOf('year'), moment()],
           'Last Year': [moment().subtract(1, 'year').startOf('year'), moment().subtract(1, 'year').endOf('year')]
        }
    }, cb);
    
    $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
    
    var latlonCheck = new RegExp("^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,6}");
    //- var vehicleString = unescape("#{vehicleToMap}");
    //- var vehicleJSON = JSON.parse(vehicleString);
    //- console.log(vehicleJSON);
    
    var map = new L.Map('map');
    //- var osmUrl = "http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
    // Mapquest Aerial
    //- var osmUrl = "http://otile1.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg"
    // Open Map Black and White
    //- var osmUrl = "http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
    // Cloudmade Grayscale
    //- var osmUrl = 'http://{s}.tile.cloudmade.com/91e9a402338a459ea47a305f917d85d0/256/{z}/{x}/{y}.png'
    //- http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png
    // COL Mapbox Account
    osmUrl = 'https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3VydGtjb2wiLCJhIjoiY2l1aDc2MDhhMDB6bTJ5bXBwZHk4dWRwZiJ9.6TSVEifI6kTz0i9QOMl8sA'
    //- osmUrl = 'https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3VydGtjb2wiLCJhIjoiY2l1aDc2MDhhMDB6bTJ5bXBwZHk4dWRwZiJ9.6TSVEifI6kTz0i9QOMl8sA'
    //- osmUrl = 'https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/256/{level}/{col}/{row}@2x?access_token=pk.eyJ1Ijoia3VydGtjb2wiLCJhIjoiY2l1aDc2MDhhMDB6bTJ5bXBwZHk4dWRwZiJ9.6TSVEifI6kTz0i9QOMl8sA'
    var osmAttrib='Mapbox';
    var osm = new L.TileLayer(osmUrl, {minZoom: 8, maxZoom: 20, attribution: osmAttrib}); 
    
    map.setView(new L.LatLng(39.97407, -105.14901),14);
    map.addLayer(osm);
    
    // Esri Vector Background
    //- var map = L.map('map').setView([40, -4], 6);
    //- var layer = L.esri.Vector.basemap('Newspaper').addTo(map);
    
    map.addControl(new L.Control.Fullscreen());
    L.easyPrint({
    	title: 'My awesome print button',
    	position: 'bottomright',
    	sizeModes: ['A4Portrait', 'A4Landscape']
    }).addTo(map);

    function setBasemap(basemap) {
      if (layer) {
        map.removeLayer(layer);
      }

      layer = L.esri.Vector.basemap(basemap);
      map.addLayer(layer);
    };

    function changeBasemap(basemaps){
      var basemap = basemaps.value;
      setBasemap(basemap);
    };
    
    function get_random_color() {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
         color += letters[Math.round(Math.random() * 15)];
      };
      return color;
    };
    var segmentInformation = "";
    //- var geoJsonPoints = {
    //-   "type": "FeatureCollection",
    //-   "features": []
    //- };
    _.each(vehicleSegments,function(segment){
      var color = get_random_color();
      //- allPoints = allPoints.concat(segment.feature_collections.base.features.coordinates)
      //- vehicleGeoJsonTripPoints.features.push({
      //-   "type": "Feature",
      //-   "properties": { 
      //-     RecordType: trip.RecordType,
      //-     RecordTypeName: trip.RecordTypeName,
      //-     TripData: trip.TripData,
      //-     Latitude: trip.Latitude,
      //-     Longitude: trip.Longitude,
      //-     Heading: trip.Heading,
      //-     Speed: trip.Speed,
      //-     RecordDateTime: trip.RecordDateTime,
      //-     Misc: trip.Misc,
      //-     InputOnStatus: trip.InputOnStatus,
      //-     ReportDateTime: trip.ReportDateTime,
      //-     UniqueID: trip.UniqueID },
      //-   "geometry": {
      //-     "type": "Point",
      //-     "coordinates": [trip.Longitude, trip.Latitude]
      //-   }
      //- });
      L.geoJson(segment.feature_collections.base.features, {
        style: function(feature,i) {
            return {
                      color: color,
                      "weight": 4,
                      "opacity": 1,
                      "dashArray": "1,10"
                    };
            }
      }).addTo(map);
      console.log(segment.feature_collections.base);
      var p = segment
      segmentInformation = segmentInformation + 
                           "<li class='list-group-item' style='padding-bottom: 10px;'>" + 
                             "<div>"+ 
                                 "<i class='fa fa-circle' aria-hidden='true' style='color: " + color + "; padding-right: 10px;'></i>" +
                                 moment(p.startDateTime).format("dddd, MMMM Do YYYY") + 
                                 "<div>" + moment(p.startDateTime).format("h:mm a") + " - " + moment(p.endDateTime).format("h:mm a") + "</div>" +
                                 "<div>" + p.duration_to_string + "</div>" +
                                 "<div>" + p.length + " miles<div>" +
                                //-  "<input type='hidden' value='" + timestamp + "'>"
                                 "<div>" + "(<a href='/fleet/map/" + segment.AssetID + "?range=hours&from=" + moment(p.startDateTime).toJSON() + "&to=" + moment(p.endDateTime).toJSON() + "'>View</a>)" + "</div>" +
                              "</div>" +
                           "</li>"
                          //-  .format("h:mm a")
      
    });
    
    $("#segmentInformation").html(segmentInformation);
    
    //- var bbox = turf.bbox(allPoints);
    //- console.log(bbox);
    //- map.fitBounds([
    //-   [bbox[1],bbox[0]],
    //-   [bbox[3],bbox[2]]
    //- ]);
    
    
    
