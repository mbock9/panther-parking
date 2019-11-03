import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import ParkingMap from './components/ParkingMap';

/* eslint-disable react/prefer-stateless-function */

function App() {
  const [geoData, setData] = useState('');

  // Use an effect hook to get the geojson data
  useEffect(() => {
    fetch('/api/map')
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        //setData(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to your CS312 Project</h1>
      </header>
      <p className="App-intro">
        To get started, edit <code>src/App.js</code> and save to reload.
      </p>
      <div id="map">
        <ParkingMap dataSet={geoData} />
      </div>
    </div>
  );
}

export default App;
