import React, { useState, useEffect } from 'react';
import Styled from 'styled-components';

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

const Sidebar = props => {
  return (
    <Side>
      <Item>MAP 1</Item>
      <Item>MAP 2</Item>
      <Item>MAP 3</Item>
      <Item>MAP 4</Item>
    </Side>
  );
};

export default Sidebar;
