import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
// import Leaflet's CSS
import 'leaflet/dist/leaflet.css';
import './ResultMap.css';

const redIcon = L.icon({
  iconUrl: 'marker-icon-red.png',
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 40], // point of the icon which will correspond to marker's location
});

function ResultMap(props) {
  const mapRef = useRef();

  useEffect(() => {
    // creates the Leaflet map object
    // it is called after the Map component mounts
    const map = L.map(mapRef, {
      center: [45, 2],
      zoom: 4,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const layer = L.featureGroup().addTo(map);

    const { results } = props.response;
    for (let i = 0; i < results.length; i++) {
      const marker = L.marker(results[i].geometry, { icon: redIcon });
      marker.addTo(layer).bindPopup(i + 1 + ' - ' + results[i].formatted);
    }

    map.fitBounds(layer.getBounds());
  }, []);

  // if (this.state.map) return;

  return <div ref={mapRef} id="map" data={props.data} />;
}

export default ResultMap;
