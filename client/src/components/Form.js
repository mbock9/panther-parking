import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DropDownSelect = styled.select`
  font-size: 12px;
`;

const Container = styled.div`
  width: 100%;
  height: 500px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 10px;
  padding-right: 10px;
  color: white;
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
    times[i] =
      ('' + (hours === 12 || hours === 0 ? 12 : hours % 12)).slice(-2) +
      ':' +
      ('0' + minutes).slice(-2) +
      ap[Math.floor(hours / 12)]; // pushing data in array in [00:00 - 12:00 AM/PM format]
    startTime = startTime + interval;
  }

  // Create option elements for each time in the array
  const timeOptions = times.map(time => (
    <option key={time} value={time}>
      {time}
    </option>
  ));

  return (
    <Container>
      <h3>Please select your permit type:</h3>

      <DropDownSelect
        value={permitType}
        onChange={event => {
          setPermit(event.target.value);
        }}
      >
        <option value="x">PermitX</option>
        <option value="y">PermitY</option>
        <option value="z">PermitZ</option>
      </DropDownSelect>

      <h3>Please select your user type:</h3>

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

      <h3>Please select a time you wish to park:</h3>

      <DropDownSelect
        value={timeIn}
        onChange={event => {
          setTimeIn(event.target.value);
        }}
      >
        {timeOptions}
      </DropDownSelect>

      <h3>Please select a time you wish to leave:</h3>

      <DropDownSelect
        value={timeOut}
        onChange={event => {
          setTimeOut(event.target.value);
        }}
      >
        {timeOptions}
      </DropDownSelect>
    </Container>
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
