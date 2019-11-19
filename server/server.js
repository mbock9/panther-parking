const express = require('express');
const path = require('path'); // eslint-disable-line global-require

// Resolve client build directory as absolute path to avoid errors in express
const buildPath = path.resolve(__dirname, '../client/build');
const app = express();

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  // Serve any static files as first priority
  app.use(express.static(buildPath));
}

// TODO: Add any middleware here

// Return map with all lots available
app.get('/api/map', (request, response, next) => {
  app.locals.db
    .collection('parkingLots')
    .find()
    .toArray()
    .then(documents => {
      const geoJsonData = { features: documents, type: 'FeatureCollection' };
      response.send(geoJsonData);
    }, next); // use "next" as rejection handler
});

// Get the mapbox API key from environment
app.get('/api/map/:key', (request, response) => {
  response.send(process.env.MAPBOX_KEY);
});

// Return a list of parkable/non-parkable lots based on filter criteria
app.get(
  '/api/map/filter/:permitType/:userType/:timeIn/:timeOut/:date',
  (request, response, next) => {
    console.log('entering filter endpoint');

    // Validation arrays
    const potentialPermits = ['sPass', 'ePass', 'pPass', 'tPass', 'uPass'];

    console.log(request.params.timeIn);
    console.log(request.params.timeOut);
    console.log(request.params.date);

    let timeInHour = parseInt(request.params.timeIn);
    let timeOutHour = parseInt(request.params.timeOut);
    let dateDay = parseInt(request.params.date);
    let userType = request.params.userType;
    let permitType = request.params.permitType;

    // Declare a function to check if it is the weekend (on the right day or
    // before/after the right time)
    const checkIfWeekend = (day, hourIn, hourOut) => {
      console.log(day);
      if (day == 0 || day == 6) {
        return true;
      }
      if (day == 5) {
        if (hourIn >= 17) {
          return true;
        }
      }
      if (day == 1) {
        if (hourOut <= 9) {
          return true;
        }
      }
      return false;
    };

    let query = undefined;

    // Automatically set user type to student if permit is selected
    if (permitType && permitType != 'initial' && userType == 'initial') {
      userType = 'Student';
    }

    if (checkIfWeekend(dateDay, timeInHour, timeOutHour)) {
      if (userType == 'Student') {
        query = {
          $or: [
            { 'properties.permits': permitType },
            { 'properties.f/s': 'true' }
          ]
        };
      } else if (userType == 'Faculty') {
        query = {
          $or: [{ 'properties.f/s': 'true' }, { 'properties.f/s_r': 'true' }]
        };
      } else if (userType == 'Visitor') {
        query = {
          $or: [{ 'properties.f/s': 'true' }, { 'properties.visitor': 'true' }]
        };
      }
    } else {
      if (userType == 'Student') {
        if (potentialPermits.includes(permitType)) {
          query = { 'properties.permits': permitType };
        } else {
          query = { 'properties.permits': { $exists: true, $ne: [] } };
        }
      }
      if (userType == 'Faculty') {
        query = {
          $or: [{ 'properties.f/s': 'true' }, { 'properties.f/s_r': 'true' }]
        };
      }
      if (userType == 'Visitor') {
        query = { 'properties.visitors': 'true' };
      }
    }

    if (query == undefined) {
      app.locals.db
        .collection('parkingLots')
        .find()
        .toArray()
        .then(documents => {
          const geoJsonData = {
            features: documents,
            type: 'FeatureCollection'
          };
          response.send(geoJsonData);
        }, next); // Use "next" as rejection handler
    } else {
      app.locals.db
        .collection('parkingLots')
        .find(query)
        .toArray()
        .then(documents => {
          const geoJsonData = {
            features: documents,
            type: 'FeatureCollection'
          };
          response.send(geoJsonData);
        }, next); // Use "next" as rejection handler
    }
  }
);

app.get(
  '/api/lots/basicInfo/:permitType/:userType/:timeIn/:timeOut/:date',
  (request, response, next) => {
    // Validation arrays
    const potentialPermits = ['sPass', 'ePass', 'pPass', 'tPass', 'uPass'];

    let timeInHour = parseInt(request.params.timeIn);
    let timeOutHour = parseInt(request.params.timeOut);
    let dateDay = parseInt(request.params.date);
    let userType = request.params.userType;
    let permitType = request.params.permitType;

    // Declare a function to check if it is the weekend (on the right day or
    // before/after the right time)
    const checkIfWeekend = (day, hourIn, hourOut) => {
      console.log(day);
      if (day == 0 || day == 6) {
        return true;
      }
      if (day == 5) {
        if (hourIn >= 17) {
          return true;
        }
      }
      if (day == 1) {
        if (hourOut <= 9) {
          return true;
        }
      }
      return false;
    };

    let query = undefined;

    // Automatically set user type to student if permit is selected
    if (permitType && permitType != 'initial' && userType == 'initial') {
      userType = 'Student';
    }

    if (checkIfWeekend(dateDay, timeInHour, timeOutHour)) {
      if (userType == 'Student') {
        query = {
          $or: [
            { 'properties.permits': permitType },
            { 'properties.f/s': 'true' }
          ]
        };
      } else if (userType == 'Faculty') {
        query = {
          $or: [{ 'properties.f/s': 'true' }, { 'properties.f/s_r': 'true' }]
        };
      } else if (userType == 'Visitor') {
        query = {
          $or: [{ 'properties.f/s': 'true' }, { 'properties.visitor': 'true' }]
        };
      }
    } else {
      if (userType == 'Student') {
        if (potentialPermits.includes(permitType)) {
          query = { 'properties.permits': permitType };
        } else {
          query = { 'properties.permits': { $exists: true, $ne: [] } };
        }
      }
      if (userType == 'Faculty') {
        query = {
          $or: [{ 'properties.f/s': 'true' }, { 'properties.f/s_r': 'true' }]
        };
      }
      if (userType == 'Visitor') {
        query = { 'properties.visitors': 'true' };
      }
    }

    if (query == undefined) {
      app.locals.db
        .collection('parkingLots')
        .find()
        .toArray()
        .then(documents => {
          const geoJsonData = {
            features: documents,
            type: 'FeatureCollection'
          };
          response.send(geoJsonData);
        }, next); // Use "next" as rejection handler
    } else {
      app.locals.db
        .collection('parkingLots')
        .find(query)
        .toArray()
        .then(documents => {
          const geoJsonData = {
            features: documents,
            type: 'FeatureCollection'
          };
          response.send(geoJsonData);
        }, next); // Use "next" as rejection handler
    }
  }
);

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  // All remaining requests return the React app, so it can handle routing.
  app.get('*', (request, response) => {
    response.sendFile(path.join(buildPath, 'index.html'));
  });
}

module.exports = {
  app
};
