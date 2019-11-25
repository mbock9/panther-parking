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
