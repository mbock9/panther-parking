import React, { useState, useEffect } from 'react';
import './App.css';
import ParkingMap from './components/ParkingMap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './components/Form';

/* eslint-disable react/prefer-stateless-function */

function App() {
  const [permitType, setPermit] = useState('');
  const [userType, setUser] = useState('');
  const [timeIn, setTimeIn] = useState(new Date());
  const [timeOut, setTimeOut] = useState(new Date());
  const [date, setDate] = useState(new Date());

  // Set the data
  const [geoData, setData] = useState({});

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
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
      <Form
        permitType={permitType}
        setPermit={setPermit}
        userType={userType}
        setUser={setUser}
        timeIn={timeIn}
        setTimeIn={setTimeIn}
        timeOut={timeOut}
        setTimeOut={setTimeOut}
        date={date}
        setDate={setDate}
      />
      <div id="map">
        <ParkingMap
          dataSet={geoData}
          permitType={permitType}
          userType={userType}
          timeIn={timeIn}
          timeOut={timeOut}
          date={date}
        />
      </div>
    </div>
  );
}

export default App;
