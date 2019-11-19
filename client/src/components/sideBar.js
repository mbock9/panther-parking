import React from 'react';
import styled from 'styled-components';
//import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";

const StyledSideNav = styled.div`
  position: fixed; /* Fixed Sidebar (stay in place on scroll and position relative to viewport) */
  height: 100%;
  width: 22%; /* Set the width of the sidebar */
  z-index: 1000; /* Stay on top of everything */
  top: 10%; /* Stay at the top */
  background-color: #5e1a54; /* Black */
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 10px;
`;

const sideBar = props => {
  return <StyledSideNav />;
};
export default sideBar;
