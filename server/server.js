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

const checkIfWeekend = (day, hourIn, hourOut) => {
  // console.log(day);
  if (day === 0 || day === 6) {
    return true;
  }
  if (day === 5) {
    if (hourIn >= 17) {
      return true;
    }
  }
  if (day === 1) {
    if (hourOut <= 9) {
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
  '/api/map/filter/:userType/:timeIn/:timeOut/:date',
  (request, response, next) => {
    // console.log('entering filter endpoint');
    // console.log(request.params.timeIn);
    // console.log(request.params.timeOut);
    // console.log(request.params.date);

    const timeInHour = parseInt(request.params.timeIn, 10);
    const timeOutHour = parseInt(request.params.timeOut, 10);
    const dateDay = parseInt(request.params.date, 10);
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
    // Declare a function to check if it is the weekend or outside of business
    // hours for faculty-staff spots. (9-5 M-F business hours)
    // const isAfterHours = (day, hourIn, hourOut) => {
    //   // On weekends return true
    //   if (day == 0 || day == 6) {
    //     return true;
    //   }
    //   // During work hours return false
    //   if (hourIn > 9 || hourIn < 5) {
    //     return false;
    //   }
    //   if (hourOut > 9 || hourOut < 5) {
    //     return false;
    //   }
    //   // Outside of work hours return true
    //   return true;
    // };

    let query;
    if (checkIfWeekend(dateDay, timeInHour, timeOutHour)) {
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

    if (query === undefined) {
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
  '/api/lots/basicInfo/:userType/:timeIn/:timeOut/:date',
  (request, response, next) => {
    const timeInHour = parseInt(request.params.timeIn, 10);
    const timeOutHour = parseInt(request.params.timeOut, 10);
    const dateDay = parseInt(request.params.date, 10);
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

    let query;
    if (checkIfWeekend(dateDay, timeInHour, timeOutHour)) {
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

    if (query === undefined) {
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
