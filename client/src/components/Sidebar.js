import React, { useState } from 'react';
import Styled from 'styled-components';

// style for components
const Side = Styled.div`
height: 100%; 
width: 18%; 
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
  const [summary, setSummary] = useState();

  // Fetch and use 'name', 'description' and 'permits_allowed'
  fetch('/api/lots/basicInfo')
    .then(response => response.text())
    .then(body => {
      setSummary(body);
    })
    .catch(err => console.log(err));

  const Info = () => {
    summary.parkable -
      lots.forEach(element => {
        const name = element.name;
        const desc = element.description;
        const allowed = element.permits_allowed;
        const firstLot = data.parkable - lots[0];
        const secondLot = data.parkable - lots[1];

        return (
          <div>
            <text>Other Available Maps</text>
            <text>{desc}</text>
            <text>{name}</text>
            <text>{desc}</text>
          </div>
        );
      });
  };

  return (
    <Side>
      <Info />
      <Item>MAP 2</Item>
      <Item>MAP 3</Item>
      <Item>MAP 4</Item>
    </Side>
  );
};

export default Sidebar;
