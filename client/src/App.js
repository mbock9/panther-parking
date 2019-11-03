import React, { useState } from 'react';
//import React from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form';

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

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome to beta Panther Parking 1.0</h1>
      </header>
      <p className="App-intro">Ready to find parking?</p>
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
    </div>
  );
}

export default App;
