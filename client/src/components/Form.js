import React, { useState, useEffect } from 'react';
//import PropTypes from 'prop-types';
import styled from 'styled-components';

const DropDownSelect = styled.select`
  font-size: 12px;
`;

const DropDown = ({
  permitType,
  setPermit,
  userType,
  setUser,
  timeIn,
  setTimeIn,
  timeOut,
  setTimeOut,
  clicked,
  setButton
}) => {
  return (
    <div>
      <h3>Please select your permit type:</h3>

      <DropDownSelect
        value={permitType}
        onChange={event => {
          setPermit(event.target.value);
          console.log(permitType); // just to test it. Change this to whatever you want.
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
          console.log(userType); // just to test it. Change this to whatever you want.
        }}
      >
        <option value="admin">Aministration</option>
        <option value="student">Student</option>
        <option value="visitor">Visitor</option>
      </DropDownSelect>

      <h3>Please select time you wish to park:</h3>

      <DropDownSelect
        value={timeIn}
        onChange={event => {
          setTimeIn(event.target.value);
          console.log(timeIn); // just to test it. Change this to whatever you want.
        }}
      >
        <option value="1:00AM">1:00AM</option>
        <option value="1:30AM">1:30AM</option>
        <option value="12:00AM">12:00AM</option>
      </DropDownSelect>

      <h3>Please select a time you wish to leave:</h3>

      <DropDownSelect
        value={timeOut}
        onChange={event => {
          setTimeOut(event.target.value);
          console.log(timeOut); // just to test it. Change this to whatever you want.
        }}
      >
        <option value="1:00AM">1:00AM</option>
        <option value="1:30AM">1:30AM</option>
        <option value="12:00AM">12:00AM</option>
      </DropDownSelect>

      <h3></h3>

      <button onclick={() => setButton(true)}>FIND PARKING!</button>
    </div>
  );
};

export default DropDown;
