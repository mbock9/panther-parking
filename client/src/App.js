import React, { useState } from 'react';
import './App.css';
import ParkingMap from './components/ParkingMap';
import Form from './components/Form';
import styled from 'styled-components';
import logoLanding from './static/logo4.png';
import carTop from './static/carTop.png';
import carMiddle from './static/carMiddle.png';
import carLeft from './static/carLeft.png';
import carRight from './static/carRight.png';
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
            userType={userType}
            setUser={setUser}
            timeIn={timeIn}
            setTimeIn={setTimeIn}
            timeOut={timeOut}
            setTimeOut={setTimeOut}
            landing={landingPage}
            update={setUpdate}
            mobileOpen={mobileOpen}
            setMobileOpen={setMobileOpen}
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
