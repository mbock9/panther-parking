/* eslint no-underscore-dangle: 0 */
const request = require('supertest');
const { app } = require('./server');
const MongodbMemoryServer = require('mongodb-memory-server').default;
const { MongoClient } = require('mongodb');

let mongoServer;
let db;

// Convert ObjectID type to string (as would occur in toJSON method)
const lotToJSON = localLot =>
  Object.assign({}, localLot, { _id: localLot._id.toHexString() });

const parkingLots = [
  {
    type: 'Feature',
    properties: {
      lot_type: 'U',
      name: 'Fitness Center',
      description:
        'Non-restricted faculty and staff lot outside of the fitness center and indoor tennis courts.',
      permits: ['f/s']
    },
    geometry: {
      coordinates: [
        [
          [-73.178348, 44.004339],
          [-73.17822, 44.004277],
          [-73.177428, 44.004985],
          [-73.177557, 44.005047],
          [-73.178348, 44.004339]
        ]
      ],
      type: 'Polygon'
    },
    id: '0ac36e0587f719548969bfe77c7839b0'
  },
  {
    type: 'Feature',
    properties: {
      lot_type: 'T',
      name: 'Field House Lot',
      description:
        'Multi-purpose lot positioned at the end of the Peterson Family Athletics Complex.',
      permits: [
        'sPass',
        'pPass',
        'uPass',
        'ePass',
        'tPass',
        'visitors',
        'f/s',
        'f/s_r'
      ]
    },
    geometry: {
      coordinates: [
        [
          [-73.180101, 44.00249],
          [-73.179423, 44.00306],
          [-73.178643, 44.002628],
          [-73.178816, 44.00248],
          [-73.180101, 44.00249]
        ]
      ],
      type: 'Polygon'
    },
    id: '0e4b8a62b0830fe988fef86e62713e34'
  },
  {
    type: 'Feature',
    properties: {
      lot_type: 'N',
      name: 'Proctor Hall',
      permits: ['f/s_r'],
      description:
        'Restricted faculty and staff spaces in between Proctor Hall and the Hillcrest Environmental Center.'
    },
    geometry: {
      coordinates: [
        [
          [-73.18069, 44.009515],
          [-73.180677, 44.009788],
          [-73.180227, 44.00982],
          [-73.180224, 44.009626],
          [-73.179803, 44.009655],
          [-73.179791, 44.009565],
          [-73.18069, 44.009515]
        ]
      ],
      type: 'Polygon'
    },
    id: '4b9f1714295703b4ec6d7e1a64629f8b'
  },
  {
    type: 'Feature',
    properties: {
      lot_type: 'R',
      name: 'Ridgeline',
      description:
        'Student parking lot for non-freshman located below the Ridgeline buildings and adjacent to Homer Harris House. Access via College Street.',
      permits: ['sPass', 'pPass', 'ePass']
    },
    geometry: {
      coordinates: [
        [
          [-73.180101, 44.00249],
          [-73.179423, 44.00306],
          [-73.178643, 44.002628],
          [-73.178816, 44.00248],
          [-73.180101, 44.00249]
        ]
      ],
      type: 'Polygon'
    },
    id: '0e20f2cada86a006171c3a31e15ff7ce'
  }
];

// Convert ObjectID type to string (as would occur in toJSON method)
// const lotToJSON = localParkingLot =>
//   Object.assign({}, localParkingLot, { id: localParkingLot._id.toHexString() });
let firstDate;
let secondDate;
beforeAll(() => {
  firstDate = 'Thu-Nov-28-2019-12:57:51-GMT-0500-(Eastern-Standard-Time)';
  secondDate = 'Fri-Nov-29-2019-01:57:51-GMT-0500-(Eastern-Standard-Time)';
  mongoServer = new MongodbMemoryServer();
  // By return a Promise, Jest won't proceed with tests until the Promise
  // resolves
  return mongoServer
    .getConnectionString()
    .then(mongoURL => {
      return Promise.all([
        MongoClient.connect(mongoURL, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }),
        mongoServer.getDbName()
      ]);
    })
    .then(([connection, dbName]) => {
      db = connection.db(dbName);
      app.locals.db = db; // Set db in app.js
    })
    .then(() => {
      db.collection('parkingLots').createIndex({ properties: 1 });
    });
});

afterAll(() => {
  mongoServer.stop();
});

test('Server "smoke" test', () => {
  expect(app).toBeDefined();
});

test('Mapbox API key configured', () => {
  expect(process.env.MAPBOX_KEY).toBeDefined();
});

test('GET /api/map/keys should return the key to the client', () => {
  return request(app)
    .get('/api/map/key')
    .then(response => {
      expect(response.statusCode).toBe(200);
      expect(response.headers['content-type']).toEqual(
        expect.stringContaining('text/html; charset=utf-8')
      );
    });
});

describe('Filtering endpoint', () => {
  beforeEach(() => {
    return db.collection('parkingLots').insertMany(parkingLots);
  });

  afterEach(() => {
    return db.collection('parkingLots').deleteMany({});
  });

  describe('Endpoint smoke tests', () => {
    test('Endpoint should return json object.', () => {
      const userType = 'Student-sPass';
      return request(app)
        .get(`/api/map/filter/${userType}/${firstDate}/${secondDate}`)
        .expect(200)
        .expect('Content-Type', /json/);
    });

    test('All lots should be returned when default userType is selected', () => {
      const userType = 'default';
      return request(app)
        .get(`/api/map/filter/${userType}/${firstDate}/${secondDate}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .then(response => {
          expect(response.body.parkable.features).toMatchObject(
            parkingLots.map(lotToJSON)
          );
        });
    });
  });

  describe('Filtering by user type', () => {
    test('sPass: userType filtering works properly during school hours', () => {
      const userType = 'Student-sPass';
      return request(app)
        .get(`/api/map/filter/${userType}/${firstDate}/${secondDate}`)
        .then(response => {
          expect(response.body.parkable.features).toMatchObject([
            parkingLots.map(lotToJSON)[1],
            parkingLots.map(lotToJSON)[3]
          ]);
        });
    });

    test('pPass: userType filtering works properly during school hours', () => {
      const userType = 'Student-pPass';
      return request(app)
        .get(`/api/map/filter/${userType}/${firstDate}/${secondDate}`)
        .then(response => {
          expect(response.body.parkable.features).toMatchObject([
            parkingLots.map(lotToJSON)[1],
            parkingLots.map(lotToJSON)[3]
          ]);
        });
    });

    test('uPass: userType filtering works properly during school hours', () => {
      const userType = 'Student-uPass';
      return request(app)
        .get(`/api/map/filter/${userType}/${firstDate}/${secondDate}`)
        .then(response => {
          expect(response.body.parkable.features).toMatchObject([
            parkingLots.map(lotToJSON)[1],
            parkingLots.map(lotToJSON)[3]
          ]);
        });
    });

    test('ePass: userType filtering works properly during school hours', () => {
      const userType = 'Student-ePass';
      return request(app)
        .get(`/api/map/filter/${userType}/${firstDate}/${secondDate}`)
        .then(response => {
          expect(response.body.parkable.features).toMatchObject([
            parkingLots.map(lotToJSON)[1],
            parkingLots.map(lotToJSON)[3]
          ]);
        });
    });

    test('tPass: userType filtering works properly during school hours', () => {
      const userType = 'Student-tPass';
      return request(app)
        .get(`/api/map/filter/${userType}/${firstDate}/${secondDate}`)
        .then(response => {
          expect(response.body.parkable.features).toMatchObject([
            parkingLots.map(lotToJSON)[1],
            parkingLots.map(lotToJSON)[3]
          ]);
        });
    });
  });

  describe('Test argument validation', () => {
    // Test that endpoints return 400 when invalid input is received
    test('timeOut must be after timeIn', () => {
      const userType = 'Visitor';
      return request(app)
        .get(`/api/map/filter/${userType}/${secondDate}/${firstDate}`)
        .expect(400);
    });

    test('userType must be one of the accepted states', () => {
      const userType = 'not-a-type';
      return request(app)
        .get(`/api/map/filter/${userType}/${firstDate}/${secondDate}`)
        .expect(400);
    });

    test('timeIn must be a date object', () => {
      const userType = 'Visitor';
      const fakeDate = 'not-a-date';
      return request(app)
        .get(`/api/map/filter/${userType}/${fakeDate}/${secondDate}`)
        .expect(400);
    });

    test('timeOut must be a date object', () => {
      const userType = 'Visitor';
      const fakeDate = 'not-a-date';
      return request(app)
        .get(`/api/map/filter/${userType}/${firstDate}/${fakeDate}`)
        .expect(400);
    });
  });
});
