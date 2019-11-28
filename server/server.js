const express = require('express');
const path = require('path'); // eslint-disable-line global-require
const utils = require('./utils');

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
  '/api/map/filter/:userType/:timeIn/:timeOut',
  (request, response, next) => {
    const timeIn = new Date(request.params.timeIn.replace(/-+/g, ' '));
    const timeOut = new Date(request.params.timeOut.replace(/-+/g, ' '));

    // Account for time change from UTC to EST
    timeIn.setHours(timeIn.getHours() + 5);
    timeOut.setHours(timeOut.getHours() + 5);

    // eslint-disable-next-line prefer-destructuring
    const userType = request.params.userType;

    const query = utils.constructQuery(timeIn, timeOut, userType);

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
);

app.get(
  '/api/lots/basicInfo/:userType/:timeIn/:timeOut',
  (request, response, next) => {
    const timeIn = new Date(request.params.timeIn.replace(/-+/g, ' '));
    const timeOut = new Date(request.params.timeOut.replace(/-+/g, ' '));

    const query = utils.constructQuery(timeIn, timeOut);

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
