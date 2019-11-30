import React, { useState } from 'react';
import './App.css';
import ParkingMap from './components/ParkingMap';
import Form from './components/Form';
import LandingPage from './components/LandingPage';
import styled from 'styled-components';
/* eslint-disable react/prefer-stateless-function */

function App() {
  const [userType, setUser] = useState('initial');
  const [timeIn, setTimeIn] = useState(new Date());
  const [timeOut, setTimeOut] = useState(new Date());
  const [landingPage, changeLandingPage] = useState(true);
  const [parkable, setParkable] = useState({});
  const [nonparkable, setNonparkable] = useState({});
  const [updated, setUpdate] = useState(false);
  // State to enable sidebar reactivity
  const [mobileOpen, setMobileOpen] = useState(false);
  if (landingPage) {
    return (
      <LandingPage
        userType={userType}
        setUser={setUser}
        timeIn={timeIn}
        setTimeIn={setTimeIn}
        timeOut={timeOut}
        setTimeOut={setTimeOut}
        landing={landingPage}
        changeLandingPage={changeLandingPage}
      />
    );
  }
  if (updated) {
    return (
      <div className="App">
        <Form
          userType={userType}
          setUser={setUser}
          timeIn={timeIn}
          setTimeIn={setTimeIn}
          timeOut={timeOut}
          setTimeOut={setTimeOut}
          update={setUpdate}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
        />
        <div id="map">
          <ParkingMap
            parkable={parkable}
            setParkable={setParkable}
            nonparkable={nonparkable}
            setNonparkable={setNonparkable}
            userType={userType}
            timeIn={timeIn}
            timeOut={timeOut}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <Form
        userType={userType}
        setUser={setUser}
        timeIn={timeIn}
        setTimeIn={setTimeIn}
        timeOut={timeOut}
        setTimeOut={setTimeOut}
        update={setUpdate}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div id="map">
        <ParkingMap
          parkable={parkable}
          setParkable={setParkable}
          nonparkable={nonparkable}
          setNonparkable={setNonparkable}
          userType={userType}
          timeIn={timeIn}
          timeOut={timeOut}
        />
      </div>
    </div>
  );
}

export default App;
