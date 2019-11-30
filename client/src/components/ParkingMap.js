import React, { useState, useEffect } from 'react';
import ReactMapGL, { Source, Layer, Popup } from 'react-map-gl';
import PropTypes from 'prop-types';

const ParkingMap = props => {
  // Represent the viewport for the map as a state. Pass the setting function
  // to Mapbox as the callback for changes to viewport
  const [mapState, setMapState] = useState({
    viewport: {
      width: '100vw',
      height: '100vh',
      longitude: -73.1783,
      latitude: 44.0086,
      zoom: 15
    }
  });

  const [key, setKey] = useState(''); // Represent MapBox API Key as state

  // Fetch and set the API key from server (saved in the .env)
  useEffect(() => {
    fetch('/api/map/key')
      .then(response => response.text())
      .then(body => {
        setKey(body);
      })
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const timeIn = props.timeIn.toString().replace(/\s+/g, '-');
    const timeOut = props.timeOut.toString().replace(/\s+/g, '-');
    fetch(`/api/map/filter/${props.userType}/${timeIn}/${timeOut}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        props.setParkable(data.parkable);
        props.setNonparkable(data.nonparkable);
      })
      .catch(err => console.log(err));
  }, [props.userType, props.timeIn, props.timeOut]);

  // Input is a list of 4 lists, each with a longitude and a latitude as elements
  const findCenter = coordinates => {
    let x1 = 180; // Placeholder for lowest longitude
    let x2 = -180; // Placeholder for highest longitude
    let y1 = 90; // Placeholder for lowest latitude
    let y2 = -90; // Placeholder for highest latitude

    coordinates.forEach(coordinate => {
      if (coordinate[0] < x1) {
        x1 = coordinate[0];
      }
      if (coordinate[0] > x2) {
        x2 = coordinate[0];
      }
      if (coordinate[1] < y1) {
        y1 = coordinate[1];
      }
      if (coordinate[1] > y2) {
        y2 = coordinate[1];
      }
    });
    const centerX = x1 + (x2 - x1) / 2;
    const centerY = y1 + (y2 - y1) / 2;
    return [centerX, centerY];
  };

  const drawPopup = feature => {
    const center = findCenter(feature.geometry.coordinates[0]);
    return (
      <Popup
        tipSize={3}
        anchor="top"
        longitude={center[0]}
        latitude={center[1]}
        closeOnClick={false}
      >
        {feature.properties.name}
      </Popup>
    );
  };

  if (key !== '' && props.parkable.features) {
    return (
      <ReactMapGL
        {...mapState.viewport}
        mapboxApiAccessToken={key}
        onViewportChange={viewport => setMapState({ viewport })}
        mapStyle="mapbox://styles/mapbox/outdoors-v11"
      >
        <Source id="parkable-regions" type="geojson" data={props.parkable}>
          <Layer
            id="parkable"
            type="fill"
            paint={{
              'fill-outline-color': '#105e01',
              'fill-color': '#4800b3',
              'fill-opacity': 0.75
            }}
          />
        </Source>
        <Source
          id="nonparkable-regions"
          type="geojson"
          data={props.nonparkable}
        >
          <Layer
            id="nonparkable"
            type="fill"
            paint={{
              'fill-outline-color': '#a10003',
              'fill-color': '#ff3d41',
              'fill-opacity': 0.75
            }}
          />
        </Source>

        {props.parkable.features.map(drawPopup)}
      </ReactMapGL>
    );
  } else {
    return <p>Loading...</p>;
  }
};

ParkingMap.propTypes = {
  userType: PropTypes.string.isRequired,
  timeIn: PropTypes.instanceOf(Date).isRequired,
  timeOut: PropTypes.instanceOf(Date).isRequired,
  parkable: PropTypes.object.isRequired,
  nonparkable: PropTypes.object.isRequired,
  setParkable: PropTypes.func.isRequired,
  setNonparkable: PropTypes.func.isRequired
};

export default ParkingMap;
