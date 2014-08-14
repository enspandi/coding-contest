ContestApp.GoogleMapsComponent = Ember.Component.extend({
  didInsertElement: function () {
    var emberCanvas = this.$(),
        encodedPath = this.get('encodedPath');
    if (encodedPath) {
      this.loadGoogleMaps(encodedPath, emberCanvas.children(".map-canvas"), { width: this.get('width'), height: this.get('height')});
    }
  },
  loadGoogleMaps: function (encodedPath, canvas, mapDim) {
    canvas.css(mapDim);
    var runCoords = google.maps.geometry.encoding.decodePath(encodedPath),
        runPath = new google.maps.Polyline({
                    path: runCoords,
                    strokeColor: "#FF0000",
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                  }),
        bounds = new google.maps.LatLngBounds(),
        googleMap;
    runCoords.forEach(function (coord) { bounds.extend(coord); });
    googleMap = new google.maps.Map(canvas.get(0), {
      zoom: this.getBoundsZoomLevel(bounds, mapDim),
      center: new google.maps.LatLng(0, -180),
      mapTypeId: google.maps.MapTypeId.TERRAIN
    });
    googleMap.fitBounds(bounds);
    runPath.setMap(googleMap);
  },
  getBoundsZoomLevel: function (bounds, mapDim) {
    function latRad(lat) {
      var sin = Math.sin(lat * Math.PI / 180),
          radX2 = Math.log((1 + sin) / (1 - sin)) / 2;
      return Math.max(Math.min(radX2, Math.PI), -Math.PI) / 2;
    }

    function zoom(mapPx, worldPx, fraction) {
      return Math.floor(Math.log(mapPx / worldPx / fraction) / Math.LN2);
    }
    var WORLD_DIM = { height: 256, width: 256 },
        ZOOM_MAX = 21,
        ne = bounds.getNorthEast(),
        sw = bounds.getSouthWest(),
        latFraction = (latRad(ne.lat()) - latRad(sw.lat())) / Math.PI,
        lngDiff = ne.lng() - sw.lng(),
        lngFraction = ((lngDiff < 0) ? (lngDiff + 360) : lngDiff) / 360,
        latZoom = zoom(mapDim.height, WORLD_DIM.height, latFraction),
        lngZoom = zoom(mapDim.width, WORLD_DIM.width, lngFraction);
    return Math.min(latZoom, lngZoom, ZOOM_MAX);
  }
});

