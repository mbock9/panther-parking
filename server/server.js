const express = require('express');
const path = require('path'); // eslint-disable-line global-require

// Resolve client build directory as absolute path to avoid errors in express
const buildPath = path.resolve(__dirname, '../client/build');
const dataPath = path.resolve(__dirname, 'data');
const app = express();

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  // Serve any static files as first priority
  app.use(express.static(buildPath));
}

// TODO: Add any middleware here

// TODO: Add your routes here
// Notice the "next" argument to the handler
app.get('/api/map', (request, response) => {
  response.sendFile(path.join(dataPath, 'midd-lots.geojson'));
});

app.get('/api/map/:key', (request, response) => {
  response.send(process.env.MAPBOX_KEY);
});

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
