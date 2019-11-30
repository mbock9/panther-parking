const request = require('supertest');
const { app } = require('./server');
const MongodbMemoryServer = require('mongodb-memory-server').default;
const { MongoClient } = require('mongodb');

let mongoServer;
let db;

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
  }
];

beforeAll(() => {
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
      db.collection('parkingLots').createIndex({ type: 1 }, { unique: true });
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
  test('GET /api/filter/:userType/:timeIn/:timeOut timeOut must be after timeIn', () => {
    const firstDate =
      'Fri-Nov-29-2019-21:57:51-GMT-0500-(Eastern-Standard-Time)';
    const secondDate =
      'Fri-Nov-29-2019-22:57:51-GMT-0500-(Eastern-Standard-Time)';
    const userType = 'Visitor';
    return request(app)
      .get(`/api/map/filter/${userType}/${secondDate}/${firstDate}`)
      .expect(400);
  });
  test('GET /api/filter/:userType/:timeIn/:timeOut should return json object.', () => {
    const firstDate =
      'Fri-Nov-29-2019-21:57:51-GMT-0500-(Eastern-Standard-Time)';
    const secondDate =
      'Fri-Nov-29-2019-22:57:51-GMT-0500-(Eastern-Standard-Time)';
    const userType = 'Student-sPass';
    return request(app)
      .get(`/api/map/filter/${userType}/${firstDate}/${secondDate}`)
      .expect(200);
  });
});
