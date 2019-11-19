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
  KeyboardTimePicker,
  KeyboardDatePicker
} from '@material-ui/pickers';
import logo from '../Panther_Parking_logo-removebg-preview.png';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

// Define styles for material-ui components
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300
  },
  root: {
    flexGrow: 1
  },
  logo: {
    maxWidth: 50,
    transform: 'rotate(-30deg)'
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

const names = ['sPass', 'ePass', 'pPass', 'tPass', 'uPass'];
const users = ['Student', 'Admin', 'Visitor', 'Faculty'];

const Form = ({
  permitType,
  setPermit,
  userType,
  setUser,
  timeIn,
  setTimeIn,
  timeOut,
  setTimeOut,
  date,
  setDate
}) => {
  // Instantiate style classes
  const classes = useStyles();
  // Testing
  // console.log("permit type:", permitType);
  // console.log("user type:", userType);
  // console.log("timein:", timeIn);
  // console.log("timeout:", timeOut);

  // Define handlers for date and timeIn and timeOut changes.
  const handleDateChange = selectedDate => {
    if (Object.prototype.toString.call(selectedDate) === '[object Date]') {
      setDate(selectedDate);
    }
  };

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
                <Toolbar>
                  <img src={logo} alt="logo" className={classes.logo} />
                </Toolbar>
                <FormControl className={classes.formControl}>
                  <InputLabel>Permit</InputLabel>
                  <Select
                    value={permitType === 'initial' ? '' : permitType}
                    onChange={event => {
                      setPermit(event.target.value);
                    }}
                    input={<Input />}
                    MenuProps={MenuProps}
                  >
                    {names.map(name => (
                      <MenuItem key={name} value={name}>
                        {name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl className={classes.formControl}>
                  <InputLabel>User type</InputLabel>
                  <Select
                    value={userType === 'intial' ? '' : userType}
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
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="MM/dd/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Date"
                  value={date}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date'
                  }}
                />
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Time In"
                  mask="__:__ _M"
                  value={timeIn}
                  onChange={handleTimeInChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change time'
                  }}
                />
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label="Time Out"
                  mask="__:__ _M"
                  value={timeOut}
                  onChange={handleTimeOutChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change time'
                  }}
                />
              </Grid>
            </MuiPickersUtilsProvider>
          </Toolbar>
        </AppBar>
      </div>
    </div>
  );
};

Form.propTypes = {
  permitType: PropTypes.string.isRequired,
  setPermit: PropTypes.func.isRequired,
  userType: PropTypes.string.isRequired,
  setUser: PropTypes.func.isRequired,
  timeIn: PropTypes.instanceOf(Date).isRequired,
  setTimeIn: PropTypes.func.isRequired,
  timeOut: PropTypes.instanceOf(Date).isRequired,
  setTimeOut: PropTypes.func.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
  setDate: PropTypes.func.isRequired
};

export default Form;
