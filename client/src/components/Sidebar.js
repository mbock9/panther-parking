import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import LocalParkingIcon from '@material-ui/icons/LocalParking';

const drawerWidth = 300;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  toolbar: theme.mixins.toolbar
}));

export default function Sidebar(props) {
  const classes = useStyles();

  const [parkable, setParkable] = useState({});

  useEffect(() => {
    const timeIn = props.timeIn.toString().replace(/\s+/g, '-');
    const timeOut = props.timeOut.toString().replace(/\s+/g, '-');
    fetch(`/api/lots/basicInfo/${props.userType}/${timeIn}/${timeOut}`)
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
  }, [props.userType, props.timeIn, props.timeOut]);

  // if (parkable.features) {
  //   const infoList = parkable.features.map(element => (
  //     <div>
  //       <h3> Lot name: </h3>
  //       <p>{element.properties.name}</p>
  //       <h3> Description: </h3>
  //       <p>{element.properties.description}</p>
  //       <h3>Permits allowed: </h3>
  //       <p>{element.properties.permits.join(' ')}</p>
  //       <br />
  //     </div>
  //   ));
  //   return (
  //     <Side>
  //       <Item>{infoList}</Item>
  //     </Side>
  //   );
  // }
  // return (
  //   <Side>
  //     <Item />
  //   </Side>
  // );

  if (parkable.features) {
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.toolbar} />
          <List>
            {parkable.features.map(element => (
              <ListItem button key={element.properties.description}>
                <ListItemIcon>
                  {element.properties.index % 2 === 0 ? (
                    <InboxIcon />
                  ) : (
                    <LocalParkingIcon />
                  )}
                </ListItemIcon>
                <ListItemText
                  primary={element.properties.name}
                  secondary={element.properties.description}
                />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    );
  } else {
    return <div></div>;
  }
}
