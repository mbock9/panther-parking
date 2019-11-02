import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import ReactMapGL, { Source, Layer } from 'react-map-gl';

export function ParkingMap() {
  const [mapState, setMapState] = useState({
    viewport: {
      width: 400,
      height: 400,
      latitude: 44.0082,
      longitude: -73.176,
      zoom: 15
    }
  });

  const token = 'SECRET';

  return (
    <ReactMapGL
      {...mapState.viewport}
      mapboxApiAccessToken={token}
      onViewportChange={viewport => setMapState({ viewport })}
      mapStyle="mapbox://styles/mapbox/streets-v11"
    >
      <Source
        id="my-data"
        type="geojson"
        data="https://api.mapbox.com/datasets/v1/aumitleon/ck2dh7hch0cg32qpmddggahmm/features?access_token=pk.eyJ1IjoiYXVtaXRsZW9uIiwiYSI6ImNrMjlhNW0wejBzNHozYm1zMmVhNndnb2kifQ.jek8UQQ1GROayhoYE_Xt1A"
      >
        <Layer
          id="point"
          type="fill"
          paint={{
            'fill-outline-color': '#484896',
            'fill-color': '#6e599f',
            'fill-opacity': 0.75
          }}
        />
      </Source>
    </ReactMapGL>
  );
}

export default ParkingMap;
