import React, { useEffect, useState } from 'react';
import legend from './../static/legend.png';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Hidden from '@material-ui/core/Hidden';
import InfoIcon from '@material-ui/icons/Info';
import DriveEtaIcon from '@material-ui/icons/DriveEta';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import PropTypes from 'prop-types';
import LayersClearIcon from '@material-ui/icons/LayersClear';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  clearFilter: {
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
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
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  closeMenuButton: {
    marginRight: 'auto',
    marginLeft: 0
  }
}));

const Sidebar = ({
  userType,
  timeIn,
  timeOut,
  mobileOpen,
  setMobileOpen,
  lotSelected,
  setLotSelected,
  setUser,
  info,
  showInfo
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const [parkable, setParkable] = useState({});
  //const [info, showInfo] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useEffect(() => {
    const timeInConverted = timeIn.toString().replace(/\s+/g, '-');
    const timeOutConverted = timeOut.toString().replace(/\s+/g, '-');
    fetch(`/api/map/filter/${userType}/${timeInConverted}/${timeOutConverted}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        setParkable(data.parkable);
      })
      .catch(err => console.log(err));
  }, [userType, timeIn, timeOut]);

  if (info) {
    const infoBar = (
      <div
        className={classes.list}
        role="presentation"
        //onClick={handleInfoToggle}
      >
        <List>
          <ListItem>
            <img
              src={legend}
              style={{
                width: '70%',
                marginTop: '20%'
              }}
              alt={'Legend'}
            />
          </ListItem>
          <Divider />
          <p
            className={classes.list}
            style={{
              marginTop: '5%',
              marginLeft: '5%',
              marginBottom: '5%'
            }}
          >
            Enter your desired date and time, and we will find you where you can
            park
          </p>
        </List>
        <Divider />
        <List>
          <ListItem
            key="go/Parking"
            onClick={() => {
              //changeLandingPage(!landing);
              if (mobileOpen) {
                setMobileOpen(!mobileOpen);
              }
              window.open(
                'http://www.middlebury.edu/offices/health/publicsafety/parking'
              );
            }}
          >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="go/Parking" />
          </ListItem>
          <ListItem
            onClick={() => {
              //changeLandingPage(!landing);
              showInfo(!info);
            }}
          >
            <ListItemIcon>
              <KeyboardBackspaceIcon />
            </ListItemIcon>

            <ListItemText primary="Back" />
          </ListItem>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              <IconButton
                onClick={handleDrawerToggle}
                className={classes.closeMenuButton}
              >
                <CloseIcon />
              </IconButton>
              {infoBar}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {infoBar}
            </Drawer>
          </Hidden>
        </nav>
        <div className={classes.content} />
      </div>
    );
  }

  if (parkable.features && mobileOpen !== undefined) {
    const selectedLots = [];
    parkable.features.forEach(lot => {
      if (lotSelected === 'false') {
        selectedLots.push(lot);
      } else if (lotSelected === lot._id) {
        selectedLots.push(lot);
      }
    });

    const drawer = (
      <div>
        <div className={classes.toolbar} />
        <Divider />
        <ListItem
          button
          onClick={() => {
            setUser('default');
          }}
          className={classes.clearFilter}
        >
          <ListItemIcon>
            <LayersClearIcon />
          </ListItemIcon>
          <ListItemText primary={'Clear filters'} />
        </ListItem>
        <Divider className={classes.clearFilter} />
        <List>
          {selectedLots.map(element => (
            <ListItem
              button
              key={element.properties._id}
              onClick={() => {
                setLotSelected(
                  lotSelected === element._id ? 'false' : element._id
                );
              }}
            >
              <ListItemIcon>
                <DriveEtaIcon />
              </ListItemIcon>
              <ListItemText
                primary={element.properties.name}
                secondary={element.properties.description}
              />
            </ListItem>
          ))}
          <Divider />
          <ListItem
            button
            onClick={() => {
              //changeLandingPage(!landing);

              showInfo(!info);
            }}
          >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary={'More information'} />
          </ListItem>
          <Divider />
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <CssBaseline />
        <nav className={classes.drawer}>
          <Hidden smUp implementation="css">
            <Drawer
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true // Better open performance on mobile.
              }}
            >
              <IconButton
                onClick={handleDrawerToggle}
                className={classes.closeMenuButton}
              >
                <CloseIcon />
              </IconButton>
              {drawer}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              className={classes.drawer}
              variant="permanent"
              classes={{
                paper: classes.drawerPaper
              }}
            >
              {drawer}
            </Drawer>
          </Hidden>
        </nav>
        <div className={classes.content} />
      </div>
    );
  } else {
    return <div />;
  }
};

Sidebar.propTypes = {
  userType: PropTypes.string.isRequired,
  timeIn: PropTypes.instanceOf(Date).isRequired,
  timeOut: PropTypes.instanceOf(Date).isRequired,
  mobileOpen: PropTypes.bool.isRequired,
  setMobileOpen: PropTypes.func.isRequired,
  lotSelected: PropTypes.string.isRequired,
  setLotSelected: PropTypes.func.isRequired,
  landing: PropTypes.bool.isRequired,
  changeLandingPage: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
};

export default Sidebar;
