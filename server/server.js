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
    // Validation arrays
    let potentialPermits = ['sPass', 'ePass', 'pPass', 'tPass', 'uPass'];
    let potentialUsers = ['Student', 'Visitor', 'Faculty'];

    // Save all parameters
    let permitType = request.params.permitType;
    let userType = request.params.permitType;
    let timeIn = new Date(request.params.timeIn);
    let timeOut = new Date(request.params.timeOut);
    let dateArg = new Date(request.params.date);

    // Set user type to student if they have a permit
    if (potentialPermits.includes(permitType)) {
      userType = 'Student';
    }

    let query = undefined;

    const checkIfWeekend = (dateOf, timeInOf, timeOutOf) => {
      if (dateOf.getDay() == 0 || dateOf.getDay() == 6) {
        return true;
      }
      if (dateOf.getDay() == 5) {
        if (timeInOf.getHours() >= 17) {
          return true;
        }
      }
      if (dateOf.getDay() == 1) {
        if (timeOutOf.getHours() <= 9) {
          return true;
        }
      }
      return false;
    };

    // If the duration of the park will be on the weekend, build the query
    // accordingly
    if (checkIfWeekend(dateArg, timeIn, timeOut)) {
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
    }
    // Otherwise, abide by the weekday rules
    else {
      if (userType == 'Student') {
        if (potentialPermits.includes(permitType)) {
          query = { 'properties.permits': permitType };
        }
        query = { 'properties.permits': { $exists: true, $ne: [] } };
      }
      if (userType == 'Faculty') {
        query = {
          $or: [{ 'properties.f/s': 'true' }, { 'properties.f/s_r': 'true' }]
        };
      }
      if (userType == 'Visitor') {
        query = { 'properties.visitor': 'true' };
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
