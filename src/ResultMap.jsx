import React from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';

// import Leaflet's CSS
import 'leaflet/dist/leaflet.css';
import './ResultMap.css';

const redIcon = L.icon({
  iconUrl: 'marker-icon-red.png',
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 40], // point of the icon which will correspond to marker's location
});

function MyLayer(props) {
  return (
    <div>
      {props.response.results &&
        props.response.results.map((e, i) => (
          <Marker key={i} position={e.geometry}>
            <Popup>
              {i + 1} - {e.formatted}
            </Popup>
          </Marker>
        ))}
    </div>
  );
}

function ResultMap(props) {
  const position = [40, 0];

  return (
    <MapContainer id="map" center={position} zoom={2}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MyLayer response={props.response} />
    </MapContainer>
  );
}

export default ResultMap;
