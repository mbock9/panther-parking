import React, { useState } from 'react';
import './App.css';
import ParkingMap from './components/ParkingMap';
import Form from './components/Form';
import LandingPage from './components/LandingPage';

function App() {
  const [userType, setUser] = useState('default');
  const [timeIn, setTimeIn] = useState(new Date());
  const [timeOut, setTimeOut] = useState(new Date());
  const [landingPage, changeLandingPage] = useState(true);
  const [parkable, setParkable] = useState({});
  const [nonparkable, setNonparkable] = useState({});
  const [updated, setUpdate] = useState(false);
  const [lotSelected, setLotSelected] = useState('false');
  const [info, showInfo] = useState(false);
  // State to enable sidebar reactivity on mobile.
  // Handles interacting with sidebar on mobile devices.
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
        update={setUpdate}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
        lotSelected={lotSelected}
        setLotSelected={setLotSelected}
        info={info}
        showInfo={showInfo}
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
          landing={landingPage}
          changeLandingPage={changeLandingPage}
          lotSelected={lotSelected}
          setLotSelected={setLotSelected}
          info={info}
          showInfo={showInfo}
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
            lotSelected={lotSelected}
            setLotSelected={setLotSelected}
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
        landing={landingPage}
        changeLandingPage={changeLandingPage}
        lotSelected={lotSelected}
        setLotSelected={setLotSelected}
        info={info}
        showInfo={showInfo}
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
          lotSelected={lotSelected}
          setLotSelected={setLotSelected}
        />
      </div>
    </div>
  );
}

export default App;
