import React from 'react';
import 'date-fns';
import PropTypes from 'prop-types';

// Material-ui imports
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDateTimePicker
} from '@material-ui/pickers';
import logo from '../static/Panther_Parking_logo-removebg-preview.png';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import InfoIcon from '@material-ui/icons/Info';
import Button from '@material-ui/core/Button';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Sidebar from './Sidebar';

// Define styles for material-ui components
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  logo: {
    maxWidth: 40,
    transform: 'rotate(-30deg)',
    cursor: 'pointer',
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  logoToolbar: {
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  button: {
    margin: theme.spacing(1),
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  }
}));

// Dropdown Menu styling
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

const users = [
  'Visitor',
  'Faculty',
  'Student-sPass',
  'Student-ePass',
  'Student-pPass',
  'Student-tPass',
  'Student-uPass'
];

const Form = ({
  userType,
  setUser,
  timeIn,
  setTimeIn,
  timeOut,
  setTimeOut,
  update,
  mobileOpen,
  setMobileOpen,
  lotSelected,
  setLotSelected,
  landing,
  changeLandingPage
}) => {
  // Instantiate style classes
  const classes = useStyles();
  // const [mobileOpen, setMobileOpen] = React.useState(false);

  // For mobile, hide sidebar on smalle screens
  // This is used to conditionally hide the sidebar behind the hamburger menu
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  /*
   *  Define handlers for date and timeIn and timeOut changes.
   *  Replace spaces in string representation of date so they can be passed
   *  as params in GET request
   */
  const handleTimeInChange = time => {
    if (Object.prototype.toString.call(time) === '[object Date]') {
      setTimeIn(time);
    }
  };

  const handleTimeOutChange = time => {
    if (Object.prototype.toString.call(time) === '[object Date]') {
      setTimeOut(time);
    }
  };

  // Set the break point properly
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.up('sm'));
  const formGridProps = {
    justify: isSmallScreen ? 'space-evenly' : 'flex-start'
  };
  /*
   * Build the HTML
   */
  if (landing) {
    return (
      <div>
        <div className={classes.root}>
          <AppBar position="static" color="inherit">
            <Toolbar variant="dense">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
              />
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around" spacing={1}>
                  <FormControl className={classes.formControl}>
                    <InputLabel>User type</InputLabel>
                    <Select
                      value={userType === 'default' ? '' : userType}
                      onChange={event => {
                        setUser(event.target.value);
                        update(true);
                      }}
                      input={<Input />}
                      MenuProps={MenuProps}
                    >
                      {users.map(name => (
                        <MenuItem key={name} value={name}>
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <KeyboardDateTimePicker
                    disableToolbar
                    disablePast
                    variant="inline"
                    format="MM/dd/yyyy hh:mm a"
                    margin="normal"
                    label="TimeIn"
                    value={timeIn}
                    onChange={handleTimeInChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                  <KeyboardDateTimePicker
                    disableToolbar
                    disablePast
                    variant="inline"
                    format="MM/dd/yyyy hh:mm a"
                    margin="normal"
                    label="Time Out"
                    value={timeOut}
                    onChange={handleTimeOutChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date'
                    }}
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Toolbar>
          </AppBar>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" color="inherit" className={classes.appBar}>
          <Toolbar variant="dense">
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Toolbar className={classes.logoToolbar}>
                <img
                  src={logo}
                  alt="logo"
                  onClick={() => {
                    setUser('default');
                  }}
                  className={classes.logo}
                />
              </Toolbar>
              <Grid container {...formGridProps}>
                {/* <Grid container justify="flex-start">  */}
                <FormControl className={classes.formControl}>
                  <InputLabel>User type</InputLabel>
                  <Select
                    value={userType === 'default' ? '' : userType}
                    onChange={event => {
                      setUser(event.target.value);
                    }}
                    input={<Input />}
                    MenuProps={MenuProps}
                  >
                    {users.map(name => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <KeyboardDateTimePicker
                  disablePast
                  variant="inline"
                  format="MM/dd/yyyy hh:mm a"
                  margin="normal"
                  label="Time In"
                  value={timeIn}
                  onChange={handleTimeInChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
                <KeyboardDateTimePicker
                  disablePast
                  variant="inline"
                  format="MM/dd/yyyy hh:mm a"
                  margin="normal"
                  label="Time Out"
                  value={timeOut}
                  onChange={handleTimeOutChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
              </Grid>
              <Button
                color="inherit"
                className={classes.button}
                startIcon={<InfoIcon />}
                size="large"
                onClick={() => {
                  changeLandingPage(!landing);
                }}
              >
                Info
              </Button>
            </MuiPickersUtilsProvider>
          </Toolbar>
        </AppBar>
        <Sidebar
          userType={userType}
          timeIn={timeIn}
          timeOut={timeOut}
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          lotSelected={lotSelected}
          setLotSelected={setLotSelected}
          landing={landing}
          changeLandingPage={changeLandingPage}
          setUser={setUser}
        />
      </div>
    </div>
  );
};

Form.propTypes = {
  userType: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
  timeIn: PropTypes.instanceOf(Date).isRequired,
  setTimeIn: PropTypes.func.isRequired,
  timeOut: PropTypes.instanceOf(Date).isRequired,
  setTimeOut: PropTypes.func.isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  setMobileOpen: PropTypes.func.isRequired,
  lotSelected: PropTypes.string.isRequired,
  setLotSelected: PropTypes.func.isRequired,
  landing: PropTypes.bool.isRequired,
  changeLandingPage: PropTypes.func.isRequired
};

export default Form;
