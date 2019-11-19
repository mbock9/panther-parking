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
    // Save all parameters
    let permitType = request.params.permitType;
    let userType = request.params.permitType;
    let timeIn = request.params.timeIn;
    let timeOut = request.params.timeOut;
    let date = request.params.date;

    // Build the filter argument that will be passed to database query
    query = {};

    // Filter by permit type
    if (
      (permitType = 'sPass') ||
      (permitType = 'ePass') ||
      (permitType = 'pPass') ||
      (permitType = 'tPass') ||
      (permitType = 'uPass')
    ) {
      query.push({ 'properties.permits': permitType });
      userType = 'Student';
    }

    console.log(request.params.permitType);
    app.locals.db
      .collection('parkingLots')
      .find({ 'properties.permits': request.params.permitType })
      .toArray()
      .then(documents => {
        const geoJsonData = { features: documents, type: 'FeatureCollection' };
        response.send(geoJsonData);
      }, next); // Use "next" as rejection handler
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
