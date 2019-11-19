import React, { useState, useEffect } from 'react';
import './App.css';
import ParkingMap from './components/ParkingMap';
import Form from './components/Form';
import Sidebar from './components/Sidebar';
//import { styled } from '@material-ui/styles';
import styled from 'styled-components';
import logoLanding from './logo4.png';

import carTop from './carTop.png';
import carMiddle from './carMiddle.png';
import carLeft from './carLeft.png';
import carRight from './carRight.png';
/* eslint-disable react/prefer-stateless-function */

function App() {
  const [permitType, setPermit] = useState('initial');
  const [userType, setUser] = useState('initial');
  const [timeIn, setTimeIn] = useState(new Date());
  const [timeOut, setTimeOut] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [landingPage, changeLandingPage] = useState(true);
  // Set the data
  const [geoData, setData] = useState({});
  const [updated, setUpdate] = useState(false);
  // Use an effect hook to get the geojson data
  useEffect(() => {
    fetch(`/api/map/`)
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

  const Wrapper = styled.div`
    margin-top: -1%;
  `;

  const LandingPage = styled.section`
    padding: 0;
    background: #5e1a54;
    overflow-x: hidden;
    width: 100vw;
    height: 100vh;
  `;

  console.log(geoData);
  if (landingPage) {
    return (
      <LandingPage>
        <img
          src={carTop}
          alt="car"
          style={{ position: 'fixed', top: '0px', width: '10%' }}
        />
        <h1
          style={{
            color: 'white',
            marginTop: '19%',
            marginLeft: '35%',
            position: 'absolute'
          }}
        >
          Making parking at Middlebury easier!
        </h1>
        <img
          src={logoLanding}
          alt="logo"
          style={{
            width: '25%',
            height: '45%',
            marginLeft: '40%',
            marginTop: '2%'
          }}
        />

        <Wrapper>
          <Form
            permitType={permitType}
            setPermit={setPermit}
            userType={userType}
            setUser={setUser}
            timeIn={timeIn}
            setTimeIn={setTimeIn}
            timeOut={timeOut}
            setTimeOut={setTimeOut}
            landing={landingPage}
            update={setUpdate}
            setDate={setDate}
            date={date}
          />
          <button
            style={{
              borderRadius: '5px',
              background: 'orange',
              color: 'white',
              height: '30px',
              width: '150px',
              marginLeft: '45%',
              marginTop: '2%'
            }}
            onClick={() => {
              changeLandingPage(false);
            }}
          >
            Search
          </button>
        </Wrapper>
        <img
          src={carLeft}
          alt="car"
          style={{ position: 'fixed', bottom: '0px', width: '13%' }}
        />
        <img
          src={carRight}
          alt="car"
          style={{
            position: 'fixed',
            bottom: '0px',
            right: '0px',
            width: '20%'
          }}
        />
        <img
          src={carMiddle}
          alt="car"
          style={{
            position: 'fixed',
            bottom: '0px',
            left: '45%',
            width: '15%'
          }}
        />
      </LandingPage>
    );
  }
  if (updated) {
    return (
      <div className="App">
        <Sidebar />
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
          update={setUpdate}
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
        update={setUpdate}
      />
      <Sidebar
        permitType={permitType}
        userType={userType}
        timeIn={timeIn}
        timeOut={timeOut}
        date={date}
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
