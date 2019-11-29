const request = require('supertest');
const { app } = require('./server');

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

test('GET /api/filter/:userType/:timeIn/:timeOut timeOut must be after timeIn', () => {
  const firstDate = new Date('2019-11-29T22:39:37+0000');
  const secondDate = new Date('2019-11-30T22:40:51+0000');
  const userType = 'Visitor';
  return request(app)
    .get(`api/filter/${userType}/${secondDate}/${firstDate}`)
    .expect(400);
});
