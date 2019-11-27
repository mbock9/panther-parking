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

const checkIfWeekend = (day, hourIn) => {
  // Saturday == 6 && Sunday == 0 && Friday == 5
  if (day === 0 || day === 6) {
    return true;
  }
  if (day === 5) {
    if (hourIn >= 17) {
      return true;
    }
  }
  return false;
};

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

    // Get the time in and time out.
    const timeInHour = timeIn.getHours();
    const timeInDay = timeIn.getDay();
    const timeOutHour = timeOut.getHours();
    const timeOutDay = timeOut.getDay();

    // eslint-disable-next-line prefer-destructuring
    const userType = request.params.userType;

    // If student, userType will be one of the below
    const potentialStudentPermits = [
      'Student-sPass',
      'Student-ePass',
      'Student-pPass',
      'Student-tPass',
      'Student-uPass'
    ];

    // Check permit type of the student
    let studentPermitType;
    if (potentialStudentPermits.includes(userType)) {
      // eslint-disable-next-line prefer-destructuring
      studentPermitType = userType.split('-')[1];
    }

    let query = { type: 'Feature' };
    if (
      checkIfWeekend(timeInDay, timeInHour) &&
      checkIfWeekend(timeOutDay, timeOutHour)
    ) {
      if (potentialStudentPermits.includes(userType)) {
        query = {
          $or: [
            { 'properties.permits': studentPermitType },
            { 'properties.f/s': 'true' }
          ]
        };
      } else if (userType === 'Faculty') {
        query = {
          $or: [{ 'properties.f/s': 'true' }, { 'properties.f/s_r': 'true' }]
        };
      } else if (userType === 'Visitor') {
        query = {
          $or: [{ 'properties.f/s': 'true' }, { 'properties.visitor': 'true' }]
        };
      }
    } else {
      if (potentialStudentPermits.includes(userType)) {
        if (studentPermitType) {
          query = { 'properties.permits': studentPermitType };
        } else {
          query = { 'properties.permits': { $exists: true, $ne: [] } };
        }
      }
      if (userType === 'Faculty') {
        query = {
          $or: [{ 'properties.f/s': 'true' }, { 'properties.f/s_r': 'true' }]
        };
      }
      if (userType === 'Visitor') {
        query = { 'properties.visitors': 'true' };
      }
    }

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

    // Get the time in and time out.
    const timeInHour = timeIn.getHours();
    const timeInDay = timeIn.getDay();
    const timeOutHour = timeOut.getHours();
    const timeOutDay = timeOut.getDay();

    // eslint-disable-next-line prefer-destructuring
    const userType = request.params.userType;

    const potentialStudentPermits = [
      'Student-sPass',
      'Student-ePass',
      'Student-pPass',
      'Student-tPass',
      'Student-uPass'
    ];

    // Check permit type of user
    let studentPermitType;
    if (potentialStudentPermits.includes(userType)) {
      // eslint-disable-next-line prefer-destructuring
      studentPermitType = userType.split('-')[1];
    }

    let query = { type: 'Feature' };
    if (
      checkIfWeekend(timeInDay, timeInHour) &&
      checkIfWeekend(timeOutDay, timeOutHour)
    ) {
      if (potentialStudentPermits.includes(userType)) {
        query = {
          $or: [
            { 'properties.permits': studentPermitType },
            { 'properties.f/s': 'true' }
          ]
        };
      } else if (userType === 'Faculty') {
        query = {
          $or: [{ 'properties.f/s': 'true' }, { 'properties.f/s_r': 'true' }]
        };
      } else if (userType === 'Visitor') {
        query = {
          $or: [{ 'properties.f/s': 'true' }, { 'properties.visitor': 'true' }]
        };
      }
    } else {
      if (potentialStudentPermits.includes(userType)) {
        if (studentPermitType) {
          query = { 'properties.permits': studentPermitType };
        } else {
          query = { 'properties.permits': { $exists: true, $ne: [] } };
        }
      }
      if (userType === 'Faculty') {
        query = {
          $or: [{ 'properties.f/s': 'true' }, { 'properties.f/s_r': 'true' }]
        };
      }
      if (userType === 'Visitor') {
        query = { 'properties.visitors': 'true' };
      }
    }

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
