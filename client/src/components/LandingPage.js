import React from 'react';
import Form from './Form';
import logoLanding from '../static/logo4.png';
import carTop from '../static/carTop.png';
import carMiddle from '../static/carMiddle.png';
import carLeft from '../static/carLeft.png';
import carRight from '../static/carRight.png';
import styled from 'styled-components';
import { makeStyles } from '@material-ui/core/styles';

// Define styles for material-ui components
const useStyles = makeStyles(() => ({
  landingPage: {
    padding: 0,
    background: '#5e1a54',
    overflowX: 'hidden',
    width: '100vw',
    height: '100vh'
  },
  wrapper: {
    marginTop: '-1%'
  },
  heading: {
    color: 'white',
    marginTop: '19%',
    marginLeft: '35%',
    position: 'absolute'
  }
}));

const LandingPage = props => {
  const classes = useStyles();

  const ImageBottom = styled.div`
    display: flex;
  `;
  return (
    <div className={classes.landingPage}>
      <img
        src={carTop}
        alt="car"
        style={{ position: 'fixed', top: '0px', width: '10%' }}
      />
      <h1 className={classes.heading}>Making parking at Middlebury easier!</h1>
      <img
        src={logoLanding}
        alt="logo"
        style={{
          width: '25%',
          height: '45%',
          marginLeft: '40%',
          marginTop: '2%'
        }}
      />
      <div className={classes.wrapper}>
        <Form
          userType={props.userType}
          setUser={props.setUser}
          timeIn={props.timeIn}
          setTimeIn={props.setTimeIn}
          timeOut={props.timeOut}
          setTimeOut={props.setTimeOut}
          update={props.update}
          mobileOpen={props.mobileOpen}
          setMobileOpen={props.setMobileOpen}
          landing={props.landing}
          changeLandingPage={props.changeLandingPage}
          lotSelected={props.lotSelected}
          setLotSelected={props.setLotSelected}
        />
        <button
          style={{
            borderRadius: '5px',
            background: 'orange',
            color: 'white',
            height: '30px',
            width: '150px',
            marginLeft: '45%',
            marginTop: '2%'
          }}
          onClick={() => {
            props.changeLandingPage(false);
          }}
        >
          Search
        </button>
      </div>
      <ImageBottom>
        <img
          src={carLeft}
          alt="car"
          style={{ position: 'fixed', bottom: '0px', width: '13%' }}
        />
        <img
          src={carRight}
          alt="car"
          style={{
            position: 'fixed',
            bottom: '0px',
            right: '0px',
            width: '20%'
          }}
        />
        <img
          src={carMiddle}
          alt="car"
          style={{
            position: 'fixed',
            bottom: '0px',
            left: '45%',
            width: '15%'
          }}
        />
      </ImageBottom>
    </div>
  );
};

export default LandingPage;
