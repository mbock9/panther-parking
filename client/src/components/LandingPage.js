import React from 'react';
import Form from './Form';
import logoLanding from '../static/logo4.png';
import carTop from '../static/carTop.png';
import carMiddle from '../static/carMiddle.png';
import carLeft from '../static/carLeft.png';
import carRight from '../static/carRight.png';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

// Define styles for material-ui components
const useStyles = makeStyles(() => ({
  landingPage: {
    padding: 0,
    background: '#013c66;',
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
            justifyContent: 'center',
            position: 'absolute',
            bottom: '0px',
            left: '45%',
            width: '15%'
          }}
        />
      </ImageBottom>

      <img
        src={carTop}
        alt="car"
        style={{ position: 'fixed', top: '0px', width: '10%' }}
      />
      <img
        src={logoLanding}
        alt="logo"
        style={{
          maxWidth: '35%',
          height: 'auto',
          marginLeft: 'auto',
          marginRight: 'auto',
          marginBottom: '0%',
          display: 'flex',
          justifyContent: 'center',
          overflow: 'hidden'
        }}
      />
      <div
        style={{
          textAlign: 'center',
          flexDirection: 'row'
        }}
      >
        <h1
          style={{
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            width: 'inherit',
            overflow: 'hidden',
            fontFamily: 'Gill Sans, sans-serif',
            flex: '1',
            flexDirection: 'column'
          }}
        >
          Making parking at Middlebury easy!
        </h1>
      </div>

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
        <Button
          style={{
            borderRadius: '5px',
            background: 'orange',
            color: 'white',
            height: '40px',
            //width: '150px',
            flex: '1',
            alignItems: 'center',
            width: 'inherit',
            overflow: 'hidden',

            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'flex',
            marginTop: '2%'
          }}
          onClick={() => {
            props.changeLandingPage(false);
          }}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
