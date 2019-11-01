import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const DropDownSelect = styled.select`
  font-size: 12px;
`;

const DropDown = props => {
  // state instantiations need to happen inside of the exported component
  // might want to define these in App.js, and then pass them as props to this component.
  //first have to create all the props we have created
  const [permitType, setpermit] = useState(false);
  //const [userType, setUser] = useState(false);
  //const [timeIn, setTimeIn] = useState(false);
  //const [timeOut, setTimeOut] = useState(false);
  return (
    <DropDownSelect
      value={permitType}
      onChange={event => {
        alert(event.target.value); // just to test it. Change this to whatever you want.
      }}
    >
      <option value="x">PermitX</option>
      <option value="y">PermitY</option>
      <option value="z">PermitZ</option>
    </DropDownSelect>
  );
};

export default DropDown;
