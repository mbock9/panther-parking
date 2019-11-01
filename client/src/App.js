import React, { useState } from 'react';
//import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form';

/* eslint-disable react/prefer-stateless-function */
function App() {
  const [permitType, setPermit] = useState(false);
  const [userType, setUser] = useState(false);
  const [timeIn, setTimeIn] = useState(false);
  const [timeOut, setTimeOut] = useState(false);
  const [map, createMap] = useState(false);
  // state instantiations need to happen inside of the exported component
  // might want to define these in App.js, and then pass them as props to this component.
  //first have to create all the props we have created

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome beta Panther Parking</h1>
      </header>
      <p className="App-intro">Ready to find parking?</p>
      <Form
        permitType={setPermit}
        userType={setUser}
        timeIn={setTimeIn}
        timeOut={setTimeOut}
      />
    </div>
  );
}

export default App;
