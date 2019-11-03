const { app } = require('./server');

test('Server "smoke" test', () => {
  expect(app).toBeDefined();
});

test('dotenv configured', () => {
  expect(process.env.MY_SECRET).toBeDefined();
});

test('Mapbox API key configured', () => {
  expect(process.env.MAPBOX_KEY).toBeDefined();
});
