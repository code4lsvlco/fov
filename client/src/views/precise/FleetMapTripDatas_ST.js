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
    var vehicleJSON = !{vehicleToMap};
    console.log(vehicleJSON);
    var vehicleTrips = !{vehicleTrips};
    
    var url = new URL(window.location.href);
    var start = url.searchParams.get("from");
    var end = url.searchParams.get("to");
    start = moment(start);
    end = end ? moment(end) : moment(start);

    function cb(start, end) {
      $('#reportrange span').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
      window.location="http://localhost:3000/fleet/map/" + vehicleJSON.AssetID + "?range=days&from=" + start.format('YYYY-MM-DD') + "T00:00:00Z&to=" + end.format('YYYY-MM-DD') + "T00:00:00Z";
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
    
    // Leaflet Popup Information HTML
    function onEachFeature(feature, layer) {
      var popupContent = "<ul>" + 
                          "<li>Record Type Name: " + feature.properties.RecordTypeName + "</li>" +
                          "<li>Speed: " + feature.properties.Speed + "</li>" +
                          "<li>Heading: " + feature.properties.Heading + "</li>" +
                          "<li>Time: " + moment(new Date(feature.properties.RecordDateTime)).format("dddd, MMMM Do YYYY, h:mm a") + "</li>" +
                          "<li>Input Status: " + feature.properties.InputOnStatus + "</li>" +
                          "</ul>";
                          //- format("dddd, MMMM Do YYYY") + 
                          //- "<br>" + start.format("h:mm a") + 
      if (feature.properties && feature.properties.popupContent) {
        popupContent += feature.properties.popupContent;
      }

      layer.bindPopup(popupContent);
    };
    
    var vehicleGeoJsonTripPoints = {
      "type": "FeatureCollection",
      "features": []
    };
    
    var validateLatLon = function (lat,lon){
      if (!((lat > -90.0) && (lat < 90.0))) return false;
      if (!((lon > -180.0) && (lon < 180.0))) return false;
      return true;
    };
    var vehicleSpeedSeries = [];
    //- console.log(vehicleTrips);
    console.log("Original Vehicle Trips: " + vehicleTrips.length);
    var validateVehicleTrips = _.filter(vehicleTrips,function(trip){return validateLatLon(trip.Latitude,trip.Longitude);});
    var badVehicleTrips = _.filter(vehicleTrips,function(trip){return !validateLatLon(trip.Latitude,trip.Longitude);});
    console.log("valLatLon Vehicle Trips: " + validateVehicleTrips.length);
    console.log("Bad Vehicle Trips: " + badVehicleTrips.length);
    console.log(_.map(badVehicleTrips,function(trip){return trip.ReportDateTime + ": " + trip.RecordTypeName;}));
    //- console.log(validateVehicleTrips);
    vehicleTrips = validateVehicleTrips;
    //- console.log(vehicleTrips);
    //- console.log(vehicleTrips[0]);
    //- console.log(vehicleTrips[0].RecordTypeName);
    //- console.log(vehicleTrips[0].Heading);
    _.each(vehicleTrips, function(trip){
      if ($.isNumeric(trip.Speed)) vehicleSpeedSeries.push({date: trip.RecordDateTime, speed: parseFloat(trip.Speed)});

      //- console.log(trip);
      vehicleGeoJsonTripPoints.features.push({
        "type": "Feature",
        "properties": { 
          RecordType: trip.RecordType,
          RecordTypeName: trip.RecordTypeName,
          TripData: trip.TripData,
          Latitude: trip.Latitude,
          Longitude: trip.Longitude,
          Heading: trip.Heading,
          Speed: trip.Speed,
          RecordDateTime: trip.RecordDateTime,
          Misc: trip.Misc,
          InputOnStatus: trip.InputOnStatus,
          ReportDateTime: trip.ReportDateTime,
          UniqueID: trip.UniqueID },
        "geometry": {
          "type": "Point",
          "coordinates": [trip.Longitude, trip.Latitude]
        }
      });

    });
    
    var vehicleGeoJsonSystemOffPoints = {
      "type": "FeatureCollection",
      "features": []
    };
    
    console.log("Trip Off Times:");
    var TripOffTimes = _.map(vehicleJSON.tripSystemOffRecords,function(trip){return moment(new Date(trip.RecordDateTime)).format("hh:mm:ss A")});
    console.log(TripOffTimes);
    
    _.each(vehicleJSON.tripSystemOffRecords, function(trip){
      vehicleGeoJsonSystemOffPoints.features.push({
        "type": "Feature",
        "properties": { 
          RecordType: trip.RecordType,
          RecordTypeName: trip.RecordTypeName,
          TripData: trip.TripData,
          Latitude: trip.Latitude,
          Longitude: trip.Longitude,
          Heading: trip.Heading,
          Speed: trip.Speed,
          RecordDateTime: trip.RecordDateTime,
          Misc: trip.Misc,
          InputOnStatus: trip.InputOnStatus,
          ReportDateTime: trip.ReportDateTime,
          UniqueID: trip.UniqueID },
        "geometry": {
          "type": "Point",
          "coordinates": [trip.Longitude, trip.Latitude]
        }
      });
    });
    
    
    var segments = [];
    var segmentInformation = "";
    var segmentsInputOneOn = [];
    var inputOneOn = false;
    var igOffTR = vehicleJSON.tripSystemOffRecords;
    _.each(igOffTR, function(trip, i){
      //- console.log("");
      console.log("Trip #: " + (i + 1));
      //- console.log(trip);
      console.log(moment(new Date(trip.RecordDateTime)).format("hh:mm:ss A"));
      
      
      if (i == 0) {
        var beforeTrips = _.filter(vehicleTrips, function(tf){ return (new Date(tf.RecordDateTime) <= new Date(igOffTR[i].RecordDateTime)); });
      } else {
        var beforeTrips = _.filter(vehicleTrips, function(tf){
          return ((new Date(tf.RecordDateTime) > new Date(igOffTR[i-1].RecordDateTime)) && (new Date(tf.RecordDateTime) <= new Date(igOffTR[i].RecordDateTime))); 
        });
      };
      var sortedBeforeTrips = _.sortBy(beforeTrips, function(trip){return new Date(trip.RecordDateTime)});
      if (sortedBeforeTrips.length == 0) return;
      
      //- console.log(sortedBeforeTrips.length);
      //- //- console.log(sortedBeforeTrips[0]);
      //- console.log(moment(new Date(sortedBeforeTrips[0].RecordDateTime)).format("hh:mm:ss A"));
      //- console.log(_.map(sortedBeforeTrips.slice(0,5),function(trip){return trip.RecordTypeName;}));
      //- console.log(_.map(sortedBeforeTrips.slice(sortedBeforeTrips.length-5,sortedBeforeTrips.length),function(trip){return trip.RecordTypeName;}));
      //- console.log(moment(new Date(sortedBeforeTrips[sortedBeforeTrips.length-1].RecordDateTime)).format("hh:mm:ss A"));

      
      // TODO: create a duration to hours/minutes string module.
      var start = moment(new Date(sortedBeforeTrips[0].RecordDateTime)); //todays date
      var finish = moment(new Date(sortedBeforeTrips[sortedBeforeTrips.length-1].RecordDateTime)); // another date
      var duration = moment.duration(finish.diff(start));
      var hours = duration.asHours();
      var strTime = ""
      if (hours < 1) {
        var minutes = Math.round(hours * 60);
        if (minutes == 60) {
          strTime = "1 hour";
        } else {
          strTime = Math.round(hours * 60) + " minutes";
        };
        
      } else {
        var minutes = hours % 1;
        minutes = Math.round(minutes * 60);
        hours = Math.floor(hours);
        if (hours == 1) {
          strTime = hours + " hour " + minutes + " minutes";
        } else {
          strTime = hours + " hours " + minutes + " minutes";
        };
      };
      
      
      var segment = {"type": "LineString", "coordinates": []};
      //- var segmentInputOneOn = {"type": "LineString", "coordinates": []};
      var coordInputOneOn = [];
      _.each(beforeTrips, function(trip){
        
          segment.coordinates.push([trip.Longitude,trip.Latitude])
          
          if (trip.RecordType == "rDF21" && !inputOneOn) inputOneOn = true; // Input One Turned On
          if (inputOneOn) {
            coordInputOneOn.push([trip.Longitude,trip.Latitude]);
            console.log("Input #1 On");
          };
          if (trip.RecordType == "rDF20" && inputOneOn) inputOneOn = false; // Input One Turned Off
          if (trip.RecordType == "rDF0D" && inputOneOn) inputOneOn = false; // Power Turned Off
          if (!inputOneOn) {
            if (coordInputOneOn.length > 0) {
              segmentsInputOneOn.push({"type": "LineString", "coordinates": coordInputOneOn});
              coordInputOneOn = [];
              console.log("Input #1 Off");
            };
          };
          
      });
      segments.push(segment);
      
      var lineSegment = {
        "type": "Feature",
        "properties": {},
        "geometry": segment
      };
      
      try {
        var length = turf.lineDistance(lineSegment, 'miles').toFixed(2);
      }
      catch(err) {
        var length = 0;
      };

      segmentInformation = segmentInformation + 
                           "<li class='list-group-item' style='padding-bottom: 10px;'>" + 
                             "<div>"+
                                 start.format("dddd, MMMM Do YYYY") + 
                                 "<div>" + start.format("h:mm a") + " - " + finish.format("h:mm a") + "</div>" +
                                 "<div>" + strTime + "</div>" +
                                 "<div>" + length + " miles<div>" +
                                //-  "<input type='hidden' value='" + timestamp + "'>"
                                 "<div>" + "(<a href='/fleet/map/" + trip.AssetID + "?range=hours&from=" + start.toJSON() + "&to=" + finish.toJSON() + "'>View</a>)" + "</div>" +
                              "</div>" +
                           "</li>"
    });
        
    var vehicleGeoJsonTripSegments = {
      "type": "FeatureCollection",
      "features": segments
    };
    
    var vehicleGeoJsonInputOneOnSegments = {
      "type": "FeatureCollection",
      "features": segmentsInputOneOn
    };
    
    var bbox = turf.bbox(vehicleGeoJsonTripPoints);
    //- console.log(bbox);
    map.fitBounds([
      [bbox[1],bbox[0]],
      [bbox[3],bbox[2]]
    ]);
    
    function get_random_color() {
      var letters = '0123456789ABCDEF'.split('');
      var color = '#';
      for (var i = 0; i < 6; i++ ) {
         color += letters[Math.round(Math.random() * 15)];
      };
      return color;
    };
    
    var sweepOnMarker = {
        radius: 10,
        fillColor: "green",
        color: "green",
        weight: 3,
        opacity: 1,
        fillOpacity: 0.8
    };
    
    var sweepOffMarker = {
        radius: 4,
        fillColor: "",
        color: "",
        weight: 2,
        opacity: 0,
        fillOpacity: 0
    };
    
    var sweepSwitchOffMarker = {
        radius: 10,
        fillColor: "deeppink",
        color: "deeppink",
        weight: 3,
        opacity: 1,
        fillOpacity: 1
    };
    
    var ignitionOffMarker = {
        radius: 10,
        fillColor: "red",
        color: "",
        weight: 3,
        opacity: 1,
        fillOpacity: 1
    };
    
    var myStyle = {
      "color": get_random_color(),
      "weight": 3,
      "opacity": 1
    };

    L.geoJson(vehicleGeoJsonTripSegments, {
      style: function(feature,i) {
               return {
                        color: get_random_color(),
                        "weight": 4,
                        "opacity": 1,
                        "dashArray": "1,10"
                      };
                //- switch (feature.properties.party) {
                //-     case 'Republican': return {color: "#ff0000"};
                //-     case 'Democrat':   return {color: "#0000ff"};
                //- }
             }
    }).addTo(map);
    
    console.log(vehicleGeoJsonInputOneOnSegments);
    L.geoJson(vehicleGeoJsonInputOneOnSegments, {style: function(feature,i) {return {color: "green","weight": 4,"opacity": 1};}}).addTo(map);
    
    
    //- L.geoJson(vehicleGeoJsonTripPoints, {
    //-     pointToLayer: function (feature, latlng) {
    //-       switch (feature.properties.RecordType) {
    //-         case 'rDF20': return L.circleMarker(latlng, sweepSwitchOffMarker);
    //-         case 'rDF21':   return L.circleMarker(latlng, sweepOnMarker);
    //-         default: return L.circleMarker(latlng, sweepOffMarker);
    //-       }
    //-       //- if (feature.properties.InputOnStatus[0].toString() == "false") {
    //-       //-   return L.circleMarker(latlng, sweepOffMarker);
    //-       //- } else {
    //-       //-   return L.circleMarker(latlng, sweepOnMarker);
    //-       //- };
    //-     },
    //-     onEachFeature: onEachFeature
    //- }).addTo(map);
    
    L.geoJson(vehicleGeoJsonSystemOffPoints, {
        pointToLayer: function (feature, latlng) {
          //- if (feature.properties.InputOnStatus[0].toString() == "False") {
          //-   return L.circleMarker(latlng, sweepOffMarker);
          //- } else {
          //-   return L.circleMarker(latlng, sweepOnMarker);
          //- };
          return L.circleMarker(latlng, ignitionOffMarker);
        },
        onEachFeature: onEachFeature
    }).addTo(map);
    
    $("#segmentInformation").html(segmentInformation);
    
    var margin = {top: 20, right: 20, bottom: 20, left: 30},
    width = $("#map").width() - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;
    
    //- var formatDate = d3.time.format("%d-%b-%y");
    // display date format
    var  time_format = d3.time.format("%I:%M");

    var x = d3.time.scale()
        .range([0, width]);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")
        //- .ticks(24)
        .tickFormat(time_format);

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

    var line = d3.svg.line()
        .x(function(d) { return x(new Date(d.date)); })
        .y(function(d) { return y(d.speed); });
        //- .interpolate("linear");

    var svg = d3.select("#chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
        var data = vehicleSpeedSeries;
        //- console.log(data);
        x.domain(d3.extent(data, function(d) { return new Date(d.date); }));
        y.domain(d3.extent(data, function(d) { return d.speed; }));

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis);

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("mph");

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);
            
      //-       var svg = d3.select("#map").append("svg")
      //-             .attr("width", width)
      //-             .attr("height", height);
      //- 
      //- svg.append("g")
      //-             .selectAll("path")
      //-             .data(geoJsonObj.features)
      //-             .enter().append("path")
      //-             .attr("d", path);
      //- 
