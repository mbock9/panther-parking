import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

//first have to create all the props we have created
const [permitType, setpermit] = useState(false);
//const [userType, setUser] = useState(false);
//const [timeIn, setTimeIn] = useState(false);
//const [timeOut, setTimeOut] = useState(false);

const dropDownSelect = styled.select`
  font-size: 12px;
`;

const dropDown = (
  <dropDownSelect
    value={permitType}
    onChange={event => {
      setType(event.target.value);
    }}
  >
    <option value="x">PermitX</option>
    <option value="y">PermitY</option>
    <option value="z">PermitZ</option>
  </dropDownSelect>
);
