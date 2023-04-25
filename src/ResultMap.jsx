import React, { useEffect, useRef } from 'react';
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  FeatureGroup,
} from 'react-leaflet';

// import Leaflet's CSS
import 'leaflet/dist/leaflet.css';
import './ResultMap.css';

const redIcon = L.icon({
  iconUrl: 'marker-icon-red.png',
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 40], // point of the icon which will correspond to marker's location
});

function ResultMap(props) {
  const mapRef = useRef(null);
  const groupRef = useRef(null);

  const position = [40, 0];

  useEffect(() => {
    const map = mapRef.current;
    const group = groupRef.current;
    if (map && group) {
      map.fitBounds(group.getBounds());
    }
  }, [props]);

  return (
    <MapContainer ref={mapRef} id="map" center={position} zoom={2}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FeatureGroup ref={groupRef}>
        {props.response.results &&
          props.response.results.map((e, i) => (
            <Marker key={i} position={e.geometry}>
              <Popup>
                {i + 1} - {e.formatted}
              </Popup>
            </Marker>
          ))}
      </FeatureGroup>
    </MapContainer>
  );
}

export default ResultMap;
