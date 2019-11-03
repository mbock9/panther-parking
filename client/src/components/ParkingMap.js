import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import mapboxgl from 'mapbox-gl';
import ReactMapGL, { Source, Layer } from 'react-map-gl';

const ParkingMap = props => {
  const [mapState, setMapState] = useState({
    viewport: {
      width: 400,
      height: 400,
      latitude: 44.0082,
      longitude: -73.176,
      zoom: 15
    }
  });

  const [key, setKey] = useState('');
  fetch('/api/map/key')
    .then(response => response.text())
    .then(body => {
      setKey(body);
    })
    .catch(err => console.log(err));

  if (key !== '' && props.dataSet !== undefined) {
    return (
      <ReactMapGL
        {...mapState.viewport}
        mapboxApiAccessToken={key}
        onViewportChange={viewport => setMapState({ viewport })}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Source id="my-data" type="geojson" data={props.dataSet}>
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
  } else {
    return <p>Loading...</p>;
  }
};

export default ParkingMap;
