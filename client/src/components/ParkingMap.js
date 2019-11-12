import React, { useState } from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';

const ParkingMap = props => {
  // Represent the viewport for the map as a state. Pass the setting function
  // to Mapbox as the callback for changes to viewport
  const [mapState, setMapState] = useState({
    viewport: {
      width: '100vw',
      height: '100vh',
      latitude: 44.0082,
      longitude: -73.176,
      zoom: 14
    }
  });

  const [key, setKey] = useState(''); // Represent MapBox API Key as state

  // Fetch and set the API key from server (saved in the .env)
  fetch('/api/map/key')
    .then(response => response.text())
    .then(body => {
      setKey(body);
    })
    .catch(err => console.log(err));

  // Grab the permitType from props (and adjust if value not currently valid)
  let permType = '';

  if (props.permitType !== 'x' && props.permitType !== 'uPermit') {
    permType = props.permitType;
  }

  // Create geojson skeletons for lots that match/don't match filter criteria
  let parkable = { features: [], type: 'FeatureCollection' };
  const nonParkable = { features: [], type: 'FeatureCollection' };

  // Iterate through lot data and update lists accordingly
  if (props.dataSet !== undefined) {
    let geoJsonData = { features: props.dataSet, type: 'FeatureCollection' };

    if (permType) {
      geoJsonData.features.forEach(feature => {
        if (feature.properties[permType].toUpperCase() === 'TRUE') {
          parkable.features.push(feature);
        } else {
          nonParkable.features.push(feature);
        }
      });
    }
    // If no filters are defined, render all lots as parkable
    else {
      parkable = geoJsonData;
    }
  }

  if (key !== '' && props.dataSet !== undefined) {
    // console.log("parkable lots")
    // console.log(parkable.features);
    return (
      <ReactMapGL
        {...mapState.viewport}
        mapboxApiAccessToken={key}
        onViewportChange={viewport => setMapState({ viewport })}
        mapStyle="mapbox://styles/mapbox/streets-v11"
      >
        <Source id="parkable-regions" type="geojson" data={parkable}>
          <Layer
            id="parkable"
            type="fill"
            paint={{
              'fill-outline-color': '#105e01',
              'fill-color': '#1fb302',
              'fill-opacity': 0.75
            }}
          />
        </Source>
        <Source id="nonparkable-regions" type="geojson" data={nonParkable}>
          <Layer
            id="non-parkable"
            type="fill"
            paint={{
              'fill-outline-color': '#960014',
              'fill-color': '#f51836',
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
