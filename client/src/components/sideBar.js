import React, { useEffect, useState } from 'react';
import Styled from 'styled-components';
import PropTypes from 'prop-types';
//import { List, isImmutable } from 'immutable';

// style for components
const Side = Styled.div`
height: 100%;
width: 22%;
position: absolute;
z-index: 1000;
background-color: #111;

`;

const Item = Styled.li`
    padding: 12px 8px 8px 32px;
    font-size: 15px;
    color: #e3e3e3;
    display: block;
    transition: 0.3s;
`;

const Sidebar = props => {
  const [parkable, setParkable] = useState({});

  useEffect(() => {
    let timeInHours = props.timeIn.getHours();
    let timeOutHours = props.timeOut.getHours();
    let dateDay = props.date.getDay();
    fetch(
      `/api/lots/basicInfo/${props.permitType}/${props.userType}/${timeInHours}/${timeOutHours}/${dateDay}`
    )
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setParkable(data);
      })
      .catch(err => console.log(err));
  }, [
    props.permitType,
    props.userType,
    props.timeIn,
    props.timeOut,
    props.date
  ]);

  let info = '';
  if (parkable.features) {
    parkable.features.forEach(element => {
      //console.log(element.name);
      info += 'Lot name: ' + element.properties.name + '\n';
      info += '\nDescription: ' + element.properties.description + '\n';
      info +=
        '\n' +
        '\nPermits allowed' +
        element.properties.permits_allowed +
        '\n' +
        '\n';
    });
  }

  return (
    <Side>
      <Item>{info}</Item>
    </Side>
  );
};

Sidebar.propTypes = {
  permitType: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired,
  timeIn: PropTypes.instanceOf(Date).isRequired,
  timeOut: PropTypes.instanceOf(Date).isRequired,
  date: PropTypes.instanceOf(Date).isRequired
};

export default Sidebar;
