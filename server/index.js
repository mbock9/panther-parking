/* eslint-disable no-console */
const http = require('http');
const url = require('url');
const { MongoClient } = require('mongodb');
const { app } = require('./server');

const mongoURL =
  process.env.MONGODB_URI || 'mongodb://localhost:5000/midd-lots';

const client = new MongoClient(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

client.connect((err, database) => {
  if (err) {
    console.error(err);
  } else {
    const db = database.db(url.parse(mongoURL).pathname.slice(1)); // pass the db name to the express routes
    app.locals.db = db;

    const server = http.createServer(app).listen(process.env.PORT || 3001);
    console.log('Listening on port %d', server.address().port);
  }
});
