import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './components/Form';
import ParkingMap from './components/ParkingMap';
/* eslint-disable react/prefer-stateless-function */

function App() {
  const [permitType, setPermit] = useState('x');
  const [userType, setUser] = useState('student');
  const [timeIn, setTimeIn] = useState('1:00AM');
  // Don't need an initial time out
  // timeOut can automatically be set to 30 mins after timeIn provided by the user in the form component
  const [timeOut, setTimeOut] = useState('');

  // state instantiations need to happen inside of the exported component
  // might want to define these in App.js, and then pass them as props to this component.
  //first have to create all the props we have created

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
      <Form
        permitType={permitType}
        setPermit={setPermit}
        userType={userType}
        setUser={setUser}
        timeIn={timeIn}
        setTimeIn={setTimeIn}
        timeOut={timeOut}
        setTimeOut={setTimeOut}
      />

      <div id="map">
        <ParkingMap
          dataSet={geoData}
          permitType={permitType}
          userType={userType}
          timeIn={timeIn}
          timeOut={timeOut}
        />
      </div>
    </div>
  );
}

export default App;
