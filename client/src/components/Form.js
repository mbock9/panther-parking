import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import logo from '../Panther_Parking_logo-removebg-preview.png';
const moment = require('moment');

const DropDownSelect = styled.select`
  font-size: 12px;
`;

const Container = styled.div`
  margin-left: 70px
  width: 90%;
  height: 40px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  color: white;
  background: rgb(10, 100, 100);
  display: flex;
  justify-content: space-around;
  flex-items: margin-left;
  text-align: center;
`;

const View = styled.div`
  background: rgb(10, 100, 100);
`;

const Form = ({
  permitType,
  setPermit,
  userType,
  setUser,
  timeIn,
  setTimeIn,
  timeOut,
  setTimeOut
}) => {
  /*
  For testing purposes
  console.log("permit type:", permitType);
  console.log("user type:", userType);
  console.log("timein:", timeIn);
  console.log("timeout:", timeOut);
  */

  // Generate an array of times
  const interval = 30; // minutes interval
  const times = []; // time array
  let startTime = 0; // start time
  const ap = ['AM', 'PM']; // AM-PM

  // Loop to increment the time and push results in array
  for (let i = 0; startTime < 24 * 60; i++) {
    const hours = Math.floor(startTime / 60); // getting hours of day in 0-24 format
    const minutes = startTime % 60; // getting minutes of the hour in 0-55 format
    times[i] = `${`${hours === 12 || hours === 0 ? 12 : hours % 12}`.slice(
      -2
    )}:${`0${minutes}`.slice(-2)}${ap[Math.floor(hours / 12)]}`; // pushing data in array in [00:00 - 12:00 AM/PM format]
    startTime = startTime + interval;
  }

  // Create option elements for each time in the array
  const timeInOptions = times.map(time => (
    <option key={time} value={time}>
      {time}
    </option>
  ));

  // Filter times array based on timeIn
  // Edge case: if timeIn is 11:30PM, then filtered array is empty.
  const timesOutArr = times.filter(
    time =>
      Date.parse(moment(time, 'hh:mm A')) >
      Date.parse(moment(timeIn, 'hh:mm A'))
  );

  // Create timeout options
  const timeOutOptions = timesOutArr.map(time => (
    <option key={time} value={time}>
      {time}
    </option>
  ));

  return (
    <View>
      <Container>
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          style={{ height: '80px', marginTop: '-15px' }}
        />
        <h4
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '15px',
            marginRight: '-20px'
          }}
        >
          Permit type:
        </h4>
        <DropDownSelect
          value={permitType}
          onChange={event => {
            setPermit(event.target.value);
          }}
        >
          <option value="sPass">PermitS</option>
          <option value="pPass">PermitP</option>
          <option value="uPass">PermitU</option>
          <option value="ePass">PermitE</option>
          <option value="tPass">PermitT</option>
        </DropDownSelect>

        <h4
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '15px',
            marginRight: '-20px'
          }}
        >
          User type:
        </h4>

        <DropDownSelect
          value={userType}
          onChange={event => {
            setUser(event.target.value);
          }}
        >
          <option value="admin">Admin</option>
          <option value="student">Student</option>
          <option value="visitor">Visitor</option>
        </DropDownSelect>

        <h4
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '15px',
            marginRight: '-20px'
          }}
        >
          Time in:
        </h4>

        <DropDownSelect
          value={timeIn}
          onChange={event => {
            setTimeIn(event.target.value);
          }}
        >
          {timeInOptions}
        </DropDownSelect>

        <h4
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '15px',
            marginRight: '-20px'
          }}
        >
          Time out:
        </h4>

        <DropDownSelect
          value={timeOut}
          onChange={event => {
            setTimeOut(event.target.value);
          }}
        >
          {timeOutOptions}
        </DropDownSelect>
      </Container>
    </View>
  );
};

Form.propTypes = {
  permitType: PropTypes.string.isRequired,
  setPermit: PropTypes.func.isRequired,
  userType: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
  timeIn: PropTypes.string.isRequired,
  setTimeIn: PropTypes.func.isRequired,
  timeOut: PropTypes.string.isRequired,
  setTimeOut: PropTypes.func.isRequired
};

export default Form;
