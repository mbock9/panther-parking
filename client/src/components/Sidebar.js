import React, { useState } from 'react';
import Styled from 'styled-components';
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

const Sidebar = () => {
  //const [summary, setSummary] = useState(List());

  // Fetch and use 'name', 'description' and 'permits_allowed'
  // fetch('/api/lots/basicInfo')
  //   .then(response => response.text())
  //   .then(body => {
  //     setSummary(List(body));
  //   })
  //   .catch(err => console.log(err));

  //dummy values until API works.
  const summary = {
    parkable_lots: [
      {
        name: 'Lot 1',
        description: 'Next to Narnia',
        permits_allowed: ['PermitA', 'PermitB', 'PermitC', 'permitD']
      },
      {
        name: 'Lot 2',
        description: 'Next To Beverly Hills and Manhattan',
        permits_allowed: ['PermitC', 'PermitD', 'PermitB', 'permitD']
      }
    ]
  };

  let info = '';
  summary.parkable_lots.forEach(element => {
    //console.log(element.name);
    info += 'Lot name: ' + element.name + '\n';
    info += '\nDescription: ' + element.description + '\n';
    info += '\n' + '\nPermits allowed' + element.permits_allowed + '\n' + '\n';
  });

  return (
    <Side>
      <Item>{info}</Item>
    </Side>
  );
};

export default Sidebar;
