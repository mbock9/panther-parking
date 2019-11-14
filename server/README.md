# Project Skeleton Server

## Running

Launch server with `npm run start`. By default the application is available at <http://localhost:3001>. Alternately, to enable hot reloading of changes to the server, you can use `npm run watch`. In general, though, you should launch the client and server concurrently from the "top-level" package.

## Setup

You should install the dependencies from the "top-level" package as described in its README or via `npm install` in this directory.

## Development

## Configuring The Database

Install [mongodb](https://docs.mongodb.com/manual/administration/install-community/) on your computer. The `mongodb` node package is installed as part of the dependencies for the server package (see `server/package.json`). _Note_: The node package and the local installation are both required -- the local isntallation is the actual mongodb installation, and the node package is the JavaScript interface that allows us to interface with the actual database.

Install [jq](https://stedolan.github.io/jq/download/). Our automation scripts will use jq to transform raw geojson into a format that can be digested by mongodb.

All of the mongo files will exist within the `server/data` directory. This directory should never be committed (it is enumerated in the `.gitignore`). The mongo configuration file is `server/mongod.conf`. In this file, we specify which port to work on, and where to put the data.

```
net:
    port: 5000
storage:
    dbPath: ./data
```

The raw geojson file used to seed the database is located in [`server/raw-data/midd-lots.geojson`](raw-data/midd-lots.geojson). If you update the geojson file for any reason (i.e, adding parking lots, modifying properties, etc), make sure to replace the `midd-lots.geojson` file in `server/raw-data`. _Note_: After seeding, `server/raw-data` has 2 files: `midd-lots.geojson` and `midd-lots-raw.geojson`. The former is the file that gets processed with `jq` for ingestion, and the latter is the file that gets produced and is actually ingested into mongodb.

_Note_: All of the example commands for the database shown here assume you are located in the root of the project repo (hence, all the commands have the flag `--prefix server`).

In a separate terminal window, start the database with:

```
npm run --prefix server mongo:start
```

Once the database begins successfully, create and seed the databse with:

```
npm run --prefix server mongo:init
```

In order to render a Mapbox map on the client, make sure the proper API key is specified in in `server/.env` as follows:
```
MAPBOX_KEY=insert-key-value-here
```

Finally, run `npm start` to start the app.

If you're interested in the npm scripts used to automate mongo configuration, checkout [`server/package.json`](package.json)

### Querying the Database Directly

In a separate terminal window, start the database with:

```
npm run --prefix server mongo:start
```

Purge and re-seed the database with:

```
npm run --prefix server mongo:init
```

Open the database shell with:

```
mongo localhost:5000
```

Once in the shell, to query `midd-lots` database, run the following:

```
use midd-lots
```

To see which collections you can query against, run:

```
show collections
```

### Testing with Jest

The server is configured for testing with the Jest test runner. Tests can be run with:

```
npm test
```

### Linting with ESLint

The server is configured with the [AirBnB ESLint rules](https://github.com/airbnb/javascript). You can run the linter with `npm run lint` or `npx eslint .`. Include the `--fix` option to `eslint` to automatically fix many formatting errors, e.g. `npm run lint -- --fix`, although note that the "fix" option can introduce errors so we recommended committing beforehand.

For reference, the ESLint rules were installed with:

```
npx install-peerdeps --dev eslint-config-airbnb-base
npm install --save-dev eslint-config-prettier
```

and `.eslintrc.json` configured with:

```
{
  "extends": ["airbnb-base", "prettier",
  "env": {
    "jest": true
  }
}
```

### Managing Secrets

The skeleton uses the [dotenv](https://www.npmjs.com/package/dotenv) package to load the variables in the .env file into the environment when starting the server. You can place secrets, e.g. API keys or database passwords, into that file. Those secrets should not be committed into your version control system. To prevent you from doing so, the .env file is included in the .gitignore file (so that it will be ignored by Git). If your secrets are needed by your tests (as they are here in the example), you will need to [add them to your repository in Travis-CI](https://docs.travis-ci.com/user/environment-variables/).
